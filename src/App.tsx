import { useState, useRef } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';
import { SetupScreen, type InterviewConfig } from '@/components/SetupScreen';
import { QuestionCard } from '@/components/QuestionCard';
import { CodingEditor } from '@/components/CodingEditor';
import { ResultsScreen } from '@/components/ResultsScreen';
import { VoiceInterviewAgent, type VoiceInterviewResult } from '@/components/VoiceInterviewAgent';
import { questions as allQuestions, type Question } from '@/data/questions';
import { Home, X } from 'lucide-react';

type Screen = 'dashboard' | 'setup' | 'interview' | 'voice-interview' | 'results';

export interface QuestionResult {
  question: Question;
  score: number;
  answer: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function AppContent() {
  const { user, loading, saveInterview } = useAuth();
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [voiceResults, setVoiceResults] = useState<VoiceInterviewResult[]>([]);
  const interviewStartTime = useRef<number>(Date.now());

  // If user is not logged in, show auth screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const handleStart = (cfg: InterviewConfig) => {
    let filtered = allQuestions.filter(q => {
      if (cfg.company !== 'All' && q.company !== cfg.company) return false;
      if (!cfg.categories.includes(q.category)) return false;
      if (cfg.difficulty !== 'All' && q.difficulty !== cfg.difficulty) return false;
      return true;
    });
    filtered = shuffleArray(filtered);
    let selected = filtered.slice(0, cfg.questionCount);

    if (selected.length === 0) {
      selected = shuffleArray([...allQuestions]).slice(0, cfg.questionCount);
    }

    // For voice mode, filter out coding questions
    if (cfg.mode === 'voice') {
      selected = selected.filter(q => !q.isCoding && !q.starterCode);
      if (selected.length === 0) {
        const behavioralQuestions = allQuestions.filter(q => 
          !q.isCoding && !q.starterCode && 
          (cfg.company === 'All' || q.company === cfg.company)
        );
        selected = shuffleArray(behavioralQuestions).slice(0, cfg.questionCount);
      }
    }

    setSelectedQuestions(selected);
    setConfig(cfg);
    setCurrentIdx(0);
    setResults([]);
    setShowExitConfirm(false);
    interviewStartTime.current = Date.now();
    setScreen(cfg.mode === 'voice' ? 'voice-interview' : 'interview');
  };

  const saveInterviewResults = async (finalResults: QuestionResult[]) => {
    if (!config) return;

    const durationSeconds = Math.floor((Date.now() - interviewStartTime.current) / 1000);
    const totalScore = finalResults.reduce((sum, r) => sum + r.score, 0);
    const avgScore = finalResults.length > 0 ? (totalScore / finalResults.length) * 20 : 0; // Convert 1-5 to percentage
    const avgConfidence = finalResults.reduce((sum, r) => sum + r.score, 0) / finalResults.length;

    // Calculate category scores
    const categoryScores: Record<string, { score: number; count: number }> = {};
    finalResults.forEach(r => {
      const cat = r.question.category;
      if (!categoryScores[cat]) {
        categoryScores[cat] = { score: 0, count: 0 };
      }
      categoryScores[cat].score += r.score * 20; // Convert 1-5 to percentage
      categoryScores[cat].count += 1;
    });

    await saveInterview({
      interview_type: config.mode === 'voice' ? 'voice' : 
        finalResults.some(r => r.question.isCoding || r.question.starterCode) ? 'coding' : 'text',
      company: config.company,
      categories: config.categories,
      difficulty: config.difficulty,
      total_questions: finalResults.length,
      score: avgScore,
      confidence: avgConfidence,
      duration_seconds: durationSeconds,
      questions_data: finalResults.map(r => ({
        question_id: r.question.id,
        question: r.question.question,
        category: r.question.category,
        user_answer: r.answer,
        score: r.score * 20,
        confidence: r.score,
      })),
      categoryScores,
    });
  };

  const handleNextQuestion = (questionIdx: number, score: number, answer: string) => {
    const newResult = {
      question: selectedQuestions[questionIdx],
      score,
      answer,
    };

    setResults(prev => {
      const exists = prev.findIndex(r => r.question.id === selectedQuestions[questionIdx]?.id);
      if (exists === -1) {
        return [...prev, newResult];
      }
      return prev;
    });

    if (questionIdx < selectedQuestions.length - 1) {
      setCurrentIdx(questionIdx + 1);
    } else {
      // Save results when interview is complete
      const finalResults = [...results, newResult];
      saveInterviewResults(finalResults);
      setScreen('results');
    }
  };

  const handleVoiceComplete = (vResults: VoiceInterviewResult[]) => {
    setVoiceResults(vResults);
    const convertedResults: QuestionResult[] = vResults.map(vr => ({
      question: vr.question,
      score: Math.ceil(vr.feedback.score / 20),
      answer: vr.candidateAnswer,
    }));
    setResults(convertedResults);
    saveInterviewResults(convertedResults);
    setScreen('results');
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setResults([]);
    setShowExitConfirm(false);
    interviewStartTime.current = Date.now();
    setScreen('interview');
  };

  const handleNewSession = () => {
    setScreen('setup');
    setConfig(null);
    setSelectedQuestions([]);
    setCurrentIdx(0);
    setResults([]);
    setVoiceResults([]);
    setShowExitConfirm(false);
  };

  const handleBackToDashboard = () => {
    setScreen('dashboard');
    setConfig(null);
    setSelectedQuestions([]);
    setCurrentIdx(0);
    setResults([]);
    setVoiceResults([]);
    setShowExitConfirm(false);
  };

  // ---- RENDER ----

  if (screen === 'dashboard') {
    return <Dashboard onStartInterview={() => setScreen('setup')} />;
  }

  if (screen === 'setup') {
    return (
      <div className="relative">
        <button
          onClick={handleBackToDashboard}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Dashboard
        </button>
        <SetupScreen onStart={handleStart} />
      </div>
    );
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        results={results}
        voiceResults={voiceResults}
        onRestart={handleRestart}
        onNewSession={handleBackToDashboard}
      />
    );
  }

  if (screen === 'voice-interview') {
    return (
      <VoiceInterviewAgent
        questions={selectedQuestions}
        companyName={config?.company || 'Company'}
        onComplete={handleVoiceComplete}
        onExit={handleBackToDashboard}
      />
    );
  }

  // Interview screen
  const currentQuestion = selectedQuestions[currentIdx];
  const isCodingQuestion = currentQuestion?.isCoding === true || 
    (currentQuestion?.category === 'SQL' && currentQuestion?.starterCode) ||
    (currentQuestion?.category === 'Analytics' && currentQuestion?.starterCode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-6 px-4">
      {/* Top navigation */}
      <div className={`${isCodingQuestion ? 'max-w-6xl' : 'max-w-4xl'} mx-auto mb-6 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">IS</span>
          </div>
          <span className="text-sm font-medium text-slate-400">
            {config?.company !== 'All' ? `${config?.company} ` : ''}Interview Session
          </span>
          {isCodingQuestion && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              💻 Coding Challenge
            </span>
          )}
        </div>
        <button
          onClick={() => setShowExitConfirm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors text-sm"
        >
          <Home className="w-4 h-4" />
          Exit
        </button>
      </div>

      {/* Question */}
      {currentQuestion ? (
        isCodingQuestion ? (
          <CodingEditor
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIdx + 1}
            totalQuestions={selectedQuestions.length}
            onNext={(score: number, answer: string) => {
              handleNextQuestion(currentIdx, score, answer);
            }}
            isLast={currentIdx === selectedQuestions.length - 1}
          />
        ) : (
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={currentIdx + 1}
            totalQuestions={selectedQuestions.length}
            onNext={(score: number, answer: string) => {
              handleNextQuestion(currentIdx, score, answer);
            }}
            isLast={currentIdx === selectedQuestions.length - 1}
          />
        )
      ) : (
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-slate-400 text-lg mb-4">No questions found for your selection.</p>
          <button
            onClick={handleNewSession}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
          >
            Go Back to Setup
          </button>
        </div>
      )}

      {/* Exit confirm modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Exit Interview?</h3>
              <button onClick={() => setShowExitConfirm(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Your progress will be saved. Are you sure you want to exit?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Continue Interview
              </button>
              <button
                onClick={handleBackToDashboard}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
