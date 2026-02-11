import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { 
  supabase, 
  signIn, 
  signUp, 
  signOut, 
  getUserProgress, 
  updateProgressAfterInterview,
  saveInterviewHistory,
  getInterviewHistory,
  isSupabaseConfigured,
  UserProgress,
  InterviewHistory
} from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  userProgress: UserProgress | null;
  interviewHistory: InterviewHistory[];
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProgress: () => Promise<void>;
  saveInterview: (data: {
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
    categoryScores: Record<string, { score: number; count: number }>;
  }) => Promise<void>;
  clearError: () => void;
}

// Local storage keys for demo mode
const LOCAL_STORAGE_KEYS = {
  USER: 'interview_sim_user',
  PROGRESS: 'interview_sim_progress',
  HISTORY: 'interview_sim_history',
};

// Demo user type for local storage fallback
interface DemoUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [interviewHistory, setInterviewHistory] = useState<InterviewHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  
  const isConfigured = isSupabaseConfigured();

  // Load demo user from local storage
  const loadDemoUser = useCallback(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    if (storedUser) {
      const parsed = JSON.parse(storedUser) as DemoUser;
      setDemoUser(parsed);
      
      // Load progress
      const storedProgress = localStorage.getItem(LOCAL_STORAGE_KEYS.PROGRESS);
      if (storedProgress) {
        setUserProgress(JSON.parse(storedProgress));
      }
      
      // Load history
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEYS.HISTORY);
      if (storedHistory) {
        setInterviewHistory(JSON.parse(storedHistory));
      }
    }
    setLoading(false);
  }, []);

  // Save demo user to local storage
  const saveDemoUser = useCallback((user: DemoUser) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(user));
    setDemoUser(user);
  }, []);

  // Save progress to local storage
  const saveDemoProgress = useCallback((progress: UserProgress) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    setUserProgress(progress);
  }, []);

  // Save history to local storage
  const saveDemoHistory = useCallback((history: InterviewHistory[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.HISTORY, JSON.stringify(history));
    setInterviewHistory(history);
  }, []);

  // Initialize auth state
  useEffect(() => {
    if (isConfigured) {
      // Use Supabase auth
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    } else {
      // Use local storage for demo mode
      loadDemoUser();
    }
  }, [isConfigured, loadDemoUser]);

  // Load user progress when user changes
  useEffect(() => {
    const loadProgress = async () => {
      if (isConfigured && user) {
        const progress = await getUserProgress(user.id);
        setUserProgress(progress);
        
        const { data: history } = await getInterviewHistory(user.id, 20);
        setInterviewHistory(history || []);
      }
    };
    
    if (user) {
      loadProgress();
    }
  }, [user, isConfigured]);

  const refreshProgress = useCallback(async () => {
    if (isConfigured && user) {
      const progress = await getUserProgress(user.id);
      setUserProgress(progress);
      
      const { data: history } = await getInterviewHistory(user.id, 20);
      setInterviewHistory(history || []);
    } else if (demoUser) {
      // Already loaded from local storage
    }
  }, [user, demoUser, isConfigured]);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    
    if (isConfigured) {
      const { data, error } = await signIn(email, password);
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } else {
      // Demo mode - check local storage
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
      if (storedUser) {
        const parsed = JSON.parse(storedUser) as DemoUser;
        if (parsed.email === email) {
          // Simple demo login - just check email matches
          setDemoUser(parsed);
          loadDemoUser();
          return { success: true };
        }
      }
      
      // For demo, create user if not exists
      const newUser: DemoUser = {
        id: `demo_${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        created_at: new Date().toISOString(),
      };
      saveDemoUser(newUser);
      return { success: true };
    }
  }, [isConfigured, loadDemoUser, saveDemoUser]);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    setError(null);
    
    if (isConfigured) {
      const { data, error } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        setUser(data.user);
        setSession(data.session);
      }
      
      return { success: true };
    } else {
      // Demo mode - save to local storage
      const newUser: DemoUser = {
        id: `demo_${Date.now()}`,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
      };
      saveDemoUser(newUser);
      
      // Initialize progress
      const initialProgress: UserProgress = {
        user_id: newUser.id,
        total_interviews: 0,
        total_questions_answered: 0,
        average_score: 0,
        average_confidence: 0,
        category_scores: {},
        company_practice: {},
        best_categories: [],
        weak_categories: [],
        last_interview_date: new Date().toISOString(),
      };
      saveDemoProgress(initialProgress);
      
      return { success: true };
    }
  }, [isConfigured, saveDemoUser, saveDemoProgress]);

  const logout = useCallback(async () => {
    if (isConfigured) {
      await signOut();
      setUser(null);
      setSession(null);
    } else {
      // Keep user data but log out
      setDemoUser(null);
    }
    setUserProgress(null);
    setInterviewHistory([]);
  }, [isConfigured]);

  const saveInterview = useCallback(async (data: {
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
    categoryScores: Record<string, { score: number; count: number }>;
  }) => {
    const userId = isConfigured ? user?.id : demoUser?.id;
    if (!userId) return;

    const historyEntry: InterviewHistory = {
      user_id: userId,
      interview_type: data.interview_type,
      company: data.company,
      categories: data.categories,
      difficulty: data.difficulty,
      total_questions: data.total_questions,
      score: data.score,
      confidence: data.confidence,
      duration_seconds: data.duration_seconds,
      questions_data: data.questions_data,
      created_at: new Date().toISOString(),
    };

    if (isConfigured) {
      await saveInterviewHistory(historyEntry);
      await updateProgressAfterInterview(userId, {
        company: data.company,
        categories: data.categories,
        score: data.score,
        confidence: data.confidence,
        questionsAnswered: data.total_questions,
        categoryScores: data.categoryScores,
      });
      await refreshProgress();
    } else {
      // Demo mode - save to local storage
      const newHistory = [historyEntry, ...interviewHistory].slice(0, 20);
      saveDemoHistory(newHistory);
      
      // Update progress
      const currentProgress = userProgress || {
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
      };
      
      const totalInterviews = currentProgress.total_interviews + 1;
      const totalQuestionsAnswered = currentProgress.total_questions_answered + data.total_questions;
      
      const prevTotalScore = currentProgress.average_score * currentProgress.total_questions_answered;
      const newTotalScore = prevTotalScore + (data.score * data.total_questions);
      const newAverageScore = totalQuestionsAnswered > 0 ? newTotalScore / totalQuestionsAnswered : 0;
      
      const prevTotalConfidence = currentProgress.average_confidence * currentProgress.total_questions_answered;
      const newTotalConfidence = prevTotalConfidence + (data.confidence * data.total_questions);
      const newAverageConfidence = totalQuestionsAnswered > 0 ? newTotalConfidence / totalQuestionsAnswered : 0;
      
      const categoryScores = { ...currentProgress.category_scores };
      for (const [category, catData] of Object.entries(data.categoryScores)) {
        if (categoryScores[category]) {
          categoryScores[category].total += catData.score * catData.count;
          categoryScores[category].count += catData.count;
        } else {
          categoryScores[category] = { total: catData.score * catData.count, count: catData.count };
        }
      }
      
      const companyPractice = { ...currentProgress.company_practice };
      companyPractice[data.company] = (companyPractice[data.company] || 0) + 1;
      
      const categoryAverages = Object.entries(categoryScores).map(([cat, d]) => ({
        category: cat,
        average: d.count > 0 ? d.total / d.count : 0,
      }));
      categoryAverages.sort((a, b) => b.average - a.average);
      
      const updatedProgress: UserProgress = {
        ...currentProgress,
        total_interviews: totalInterviews,
        total_questions_answered: totalQuestionsAnswered,
        average_score: Math.round(newAverageScore * 100) / 100,
        average_confidence: Math.round(newAverageConfidence * 100) / 100,
        category_scores: categoryScores,
        company_practice: companyPractice,
        best_categories: categoryAverages.slice(0, 3).map(c => c.category),
        weak_categories: categoryAverages.slice(-3).reverse().map(c => c.category),
        last_interview_date: new Date().toISOString(),
      };
      
      saveDemoProgress(updatedProgress);
    }
  }, [user, demoUser, isConfigured, userProgress, interviewHistory, refreshProgress, saveDemoHistory, saveDemoProgress]);

  const clearError = useCallback(() => setError(null), []);

  const currentUser = isConfigured ? user : (demoUser ? {
    id: demoUser.id,
    email: demoUser.email,
    user_metadata: { full_name: demoUser.full_name },
  } as unknown as User : null);

  return (
    <AuthContext.Provider value={{
      user: currentUser,
      session,
      loading,
      isConfigured,
      userProgress,
      interviewHistory,
      error,
      login,
      register,
      logout,
      refreshProgress,
      saveInterview,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
