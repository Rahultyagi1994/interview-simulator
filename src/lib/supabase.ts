import { createClient } from '@supabase/supabase-js';

// Supabase configuration - CONNECTED!
const supabaseUrl = 'https://uthgcmazjrfovjpsxtqr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0aGdjbWF6anJmb3ZqcHN4dHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzEzOTQsImV4cCI6MjA4NjQwNzM5NH0.h6ZhcYV5CSkPldJx-52vUc4Iy-OJgqQ5_uOQ5zBzDkE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface UserProgress {
  id?: string;
  user_id: string;
  total_interviews: number;
  total_questions_answered: number;
  average_score: number;
  average_confidence: number;
  category_scores: Record<string, { total: number; count: number }>;
  company_practice: Record<string, number>;
  best_categories: string[];
  weak_categories: string[];
  last_interview_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface InterviewHistory {
  id?: string;
  user_id: string;
  interview_type: 'text' | 'voice' | 'coding';
  company: string;
  categories: string[];
  difficulty: string;
  total_questions: number;
  score: number;
  confidence: number;
  duration_seconds: number;
  questions_data: Array<{
    question_id: number;
    question: string;
    category: string;
    user_answer: string;
    score: number;
    confidence: number;
  }>;
  created_at?: string;
}

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl.includes('supabase.co') && supabaseAnonKey.length > 20;
};

// Auth functions
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Progress functions
export const saveUserProgress = async (userId: string, progress: Partial<UserProgress>) => {
  const { data: existing } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (existing) {
    // Update existing progress
    const { data, error } = await supabase
      .from('user_progress')
      .update({
        ...progress,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();
    return { data, error };
  } else {
    // Create new progress
    const { data, error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        total_interviews: 0,
        total_questions_answered: 0,
        average_score: 0,
        average_confidence: 0,
        category_scores: {},
        company_practice: {},
        best_categories: [],
        weak_categories: [],
        last_interview_date: new Date().toISOString(),
        ...progress,
      })
      .select()
      .single();
    return { data, error };
  }
};

export const getUserProgress = async (userId: string): Promise<UserProgress | null> => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) return null;
  return data as UserProgress;
};

// Interview history functions
export const saveInterviewHistory = async (history: InterviewHistory) => {
  const { data, error } = await supabase
    .from('interview_history')
    .insert(history)
    .select()
    .single();
  return { data, error };
};

export const getInterviewHistory = async (userId: string, limit = 10) => {
  const { data, error } = await supabase
    .from('interview_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  return { data: data as InterviewHistory[] | null, error };
};

// Update progress after interview completion
export const updateProgressAfterInterview = async (
  userId: string,
  interviewData: {
    company: string;
    categories: string[];
    score: number;
    confidence: number;
    questionsAnswered: number;
    categoryScores: Record<string, { score: number; count: number }>;
  }
) => {
  const currentProgress = await getUserProgress(userId);
  
  const totalInterviews = (currentProgress?.total_interviews || 0) + 1;
  const totalQuestionsAnswered = (currentProgress?.total_questions_answered || 0) + interviewData.questionsAnswered;
  
  // Calculate new average score
  const prevTotalScore = (currentProgress?.average_score || 0) * (currentProgress?.total_questions_answered || 0);
  const newTotalScore = prevTotalScore + (interviewData.score * interviewData.questionsAnswered);
  const newAverageScore = totalQuestionsAnswered > 0 ? newTotalScore / totalQuestionsAnswered : 0;
  
  // Calculate new average confidence
  const prevTotalConfidence = (currentProgress?.average_confidence || 0) * (currentProgress?.total_questions_answered || 0);
  const newTotalConfidence = prevTotalConfidence + (interviewData.confidence * interviewData.questionsAnswered);
  const newAverageConfidence = totalQuestionsAnswered > 0 ? newTotalConfidence / totalQuestionsAnswered : 0;
  
  // Update category scores
  const categoryScores = { ...(currentProgress?.category_scores || {}) };
  for (const [category, data] of Object.entries(interviewData.categoryScores)) {
    if (categoryScores[category]) {
      categoryScores[category].total += data.score * data.count;
      categoryScores[category].count += data.count;
    } else {
      categoryScores[category] = { total: data.score * data.count, count: data.count };
    }
  }
  
  // Update company practice count
  const companyPractice = { ...(currentProgress?.company_practice || {}) };
  companyPractice[interviewData.company] = (companyPractice[interviewData.company] || 0) + 1;
  
  // Calculate best and weak categories
  const categoryAverages = Object.entries(categoryScores).map(([cat, data]) => ({
    category: cat,
    average: data.count > 0 ? data.total / data.count : 0,
  }));
  categoryAverages.sort((a, b) => b.average - a.average);
  
  const bestCategories = categoryAverages.slice(0, 3).map(c => c.category);
  const weakCategories = categoryAverages.slice(-3).reverse().map(c => c.category);
  
  return saveUserProgress(userId, {
    total_interviews: totalInterviews,
    total_questions_answered: totalQuestionsAnswered,
    average_score: Math.round(newAverageScore * 100) / 100,
    average_confidence: Math.round(newAverageConfidence * 100) / 100,
    category_scores: categoryScores,
    company_practice: companyPractice,
    best_categories: bestCategories,
    weak_categories: weakCategories,
    last_interview_date: new Date().toISOString(),
  });
};
