import { useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { Timer } from './Timer';
import type { Question } from '@/data/questions';
import {
  LightbulbIcon,
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  getCategoryIcon,
  getCompanyIcon,
} from './Icons';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onNext: (score: number, answer: string) => void;
  isLast: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  isLast
}: QuestionCardProps) {
  const [showTips, setShowTips] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [selfScore, setSelfScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleTimeUp = useCallback(() => {
    setTimeUp(true);
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    onNext(selfScore, userAnswer);
  };

  const difficultyColor = {
    Easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const difficultyIcon = {
    Easy: '🌱',
    Medium: '⚡',
    Hard: '🔥',
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-40 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main question area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Question card */}
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5', difficultyColor[question.difficulty])}>
                <span>{difficultyIcon[question.difficulty]}</span>
                {question.difficulty}
              </span>
              <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
                {getCategoryIcon(question.category, 14)}
                {question.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                {getCompanyIcon(question.company, 14)}
                {question.company}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-xl font-semibold text-white leading-relaxed mb-6">
              {question.question}
            </h2>

            {/* Answer textarea */}
            <div className="relative">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here... Practice articulating your thoughts clearly and concisely."
                className="w-full h-48 px-4 py-3 bg-slate-900/60 border border-slate-600/50 rounded-xl text-slate-200 placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm leading-relaxed"
                disabled={submitted}
              />
              <span className="absolute bottom-3 right-3 text-xs text-slate-500">
                {userAnswer.length} chars
              </span>
            </div>

            {timeUp && !submitted && (
              <div className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Time&apos;s up! Finish your answer and submit.
              </div>
            )}

            {/* Self-scoring */}
            {!submitted && (
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-sm text-slate-400">Rate your confidence:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => setSelfScore(score)}
                      className="p-1 transition-all hover:scale-110"
                    >
                      <StarIcon size={28} filled={score <= selfScore} />
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={userAnswer.trim().length === 0}
                  className="ml-auto px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <CheckIcon size={18} />
                  Submit Answer
                </button>
              </div>
            )}

            {/* Post-submit */}
            {submitted && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
                  <CheckIcon size={18} />
                  Answer submitted! Review the sample answer below to compare.
                </div>
                <button
                  onClick={handleNext}
                  className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 group"
                >
                  {isLast ? 'View Results' : 'Next Question'}
                  <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Expandable sections */}
          <div className="space-y-3">
            {/* Tips */}
            <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowTips(!showTips)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-700/30 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-amber-400">
                  <LightbulbIcon size={18} />
                  Interview Tips
                </span>
                <svg className={cn("w-5 h-5 text-slate-400 transition-transform", showTips && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showTips && (
                <div className="px-5 pb-4 space-y-2">
                  {question.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-amber-400 mt-0.5">•</span>
                      {tip}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sample Answer */}
            <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowSample(!showSample)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-700/30 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Sample Answer
                </span>
                <svg className={cn("w-5 h-5 text-slate-400 transition-transform", showSample && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showSample && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-slate-300 leading-relaxed">{question.sampleAnswer}</p>
                </div>
              )}
            </div>

            {/* Follow-up */}
            <div className="bg-slate-800/60 border border-slate-700/40 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowFollowUp(!showFollowUp)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-700/30 transition-colors"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-purple-400">
                  <ArrowRightIcon size={18} />
                  Follow-up Question
                </span>
                <svg className={cn("w-5 h-5 text-slate-400 transition-transform", showFollowUp && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showFollowUp && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-slate-300 leading-relaxed italic">&quot;{question.followUp}&quot;</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Timer */}
        <div className="space-y-4">
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5 flex flex-col items-center">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Time Limit</h3>
            <Timer
              timeLimit={question.timeLimit}
              onTimeUp={handleTimeUp}
              isActive={!submitted}
            />
          </div>

          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5">
            <h3 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
              <LightbulbIcon size={16} />
              Quick Tips
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                Take a moment to organize your thoughts
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                Use the STAR method for behavioral questions
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                Be specific with examples and data
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
                Practice speaking your answer aloud
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
