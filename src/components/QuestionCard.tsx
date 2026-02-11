import { useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { Timer } from './Timer';
import type { Question } from '@/data/questions';
import {
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
  const [showSample, setShowSample] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [selfScore, setSelfScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{
    strengths: string[];
    improvements: string[];
    overall: string;
    keywordsMatched: string[];
    keywordsMissed: string[];
  } | null>(null);

  const handleTimeUp = useCallback(() => {
    setTimeUp(true);
  }, []);

  const generateFeedback = (answer: string, sampleAnswer: string) => {
    const answerLower = answer.toLowerCase();
    const sampleLower = sampleAnswer.toLowerCase();

    const keyPhrases = sampleLower
      .split(/[.,;!?]/)
      .filter(phrase => phrase.trim().length > 10)
      .map(phrase => {
        const words = phrase.trim().split(/\s+/);
        return words.slice(0, 3).join(' ');
      })
      .filter((phrase, index, self) => self.indexOf(phrase) === index)
      .slice(0, 6);

    const matched = keyPhrases.filter(phrase =>
      answerLower.includes(phrase.split(' ')[0]) ||
      answerLower.includes(phrase.split(' ').slice(-1)[0])
    );
    const missed = keyPhrases.filter(phrase => !matched.includes(phrase));

    const strengths: string[] = [];
    const improvements: string[] = [];

    if (answer.length > 200) {
      strengths.push('Good level of detail in your response');
    } else {
      improvements.push('Try to provide more detailed examples');
    }

    if (answer.includes('example') || answer.includes('instance') || answer.includes('specifically')) {
      strengths.push('Used specific examples to support your points');
    } else {
      improvements.push('Include specific examples from your experience');
    }

    if (answer.includes('result') || answer.includes('outcome') || answer.includes('achieved') || answer.includes('impact')) {
      strengths.push('Mentioned results and outcomes');
    } else {
      improvements.push('Quantify results and impact where possible');
    }

    if (answer.includes('team') || answer.includes('collaborated') || answer.includes('together')) {
      strengths.push('Demonstrated teamwork and collaboration');
    }

    if (answer.includes('learned') || answer.includes('improved') || answer.includes('growth')) {
      strengths.push('Showed self-reflection and growth mindset');
    }

    if (matched.length >= keyPhrases.length / 2) {
      strengths.push('Covered many key concepts expected in this answer');
    } else {
      improvements.push('Review the sample answer for additional key points');
    }

    const score = (matched.length / Math.max(keyPhrases.length, 1)) * 100;
    let overall = '';
    if (score >= 70 && answer.length > 150) {
      overall = 'Strong answer! You covered the main points well and provided good context.';
    } else if (score >= 40 || answer.length > 100) {
      overall = 'Good attempt! Consider expanding on your examples and covering additional aspects.';
    } else {
      overall = 'Keep practicing! Focus on using the STAR method and providing specific examples.';
    }

    return {
      strengths: strengths.length > 0 ? strengths : ['You attempted the question - keep practicing!'],
      improvements: improvements.slice(0, 3),
      overall,
      keywordsMatched: matched.slice(0, 4),
      keywordsMissed: missed.slice(0, 4)
    };
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const feedback = generateFeedback(userAnswer, question.sampleAnswer);
    setAiFeedback(feedback);
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

            {/* Self-scoring & Submit */}
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

            {/* Post-submit section */}
            {submitted && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
                  <CheckIcon size={18} />
                  Answer submitted! Review your feedback below.
                </div>

                {/* AI Feedback */}
                {aiFeedback && (
                  <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-4 space-y-4">
                    <h4 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a8 8 0 0 0-8 8c0 3.5 2 6 4 8l1 5h6l1-5c2-2 4-4.5 4-8a8 8 0 0 0-8-8z"/>
                        <path d="M9 22h6"/>
                      </svg>
                      AI Feedback
                    </h4>

                    <div>
                      <h5 className="text-xs font-medium text-emerald-400 mb-2">✓ Strengths</h5>
                      <ul className="space-y-1">
                        {aiFeedback.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {aiFeedback.improvements.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium text-amber-400 mb-2">△ Areas to Improve</h5>
                        <ul className="space-y-1">
                          {aiFeedback.improvements.map((s, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-amber-400 mt-0.5">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {aiFeedback.keywordsMatched.map((k, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                          ✓ {k}
                        </span>
                      ))}
                      {aiFeedback.keywordsMissed.map((k, i) => (
                        <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                          ✗ {k}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-sm text-slate-300">{aiFeedback.overall}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="w-full px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 group"
                >
                  {isLast ? 'View Results' : 'Next Question'}
                  <ArrowRightIcon size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Expandable sections - ONLY AFTER SUBMISSION */}
          {submitted && (
            <div className="space-y-3">
              {/* Tips - only after submission */}
              {question.tips && (
                <div className="bg-slate-800/60 border border-amber-500/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-700/30 transition-colors bg-amber-500/10"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-amber-400">
                      <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a8 8 0 0 0-8 8c0 3.5 2 6 4 8l1 5h6l1-5c2-2 4-4.5 4-8a8 8 0 0 0-8-8z"/>
                        <path d="M9 22h6"/>
                      </svg>
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
              )}

              {/* Sample Answer - only after submission */}
              <div className="bg-slate-800/60 border border-emerald-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowSample(!showSample)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-700/30 transition-colors bg-emerald-500/10"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <CheckIcon size={18} />
                    Sample Answer (Compare with yours)
                  </span>
                  <svg className={cn("w-5 h-5 text-slate-400 transition-transform", showSample && "rotate-180")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {showSample && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{question.sampleAnswer}</p>
                  </div>
                )}
              </div>

              {/* Follow-up - only after submission */}
              <div className="bg-slate-800/60 border border-purple-500/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowFollowUp(!showFollowUp)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-700/30 transition-colors bg-purple-500/10"
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
          )}

          {/* Locked indicators - BEFORE submission */}
          {!submitted && (
            <div className="space-y-3">
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl overflow-hidden opacity-50">
                <div className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-not-allowed">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    AI Feedback &amp; Tips (Submit to unlock)
                  </span>
                  <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl overflow-hidden opacity-50">
                <div className="w-full flex items-center justify-between px-5 py-3.5 text-left cursor-not-allowed">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Sample Answer (Submit to unlock)
                  </span>
                  <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Timer only */}
        <div className="space-y-4">
          <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5 flex flex-col items-center">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Time Remaining</h3>
            <Timer
              timeLimit={question.timeLimit}
              onTimeUp={handleTimeUp}
              isActive={!submitted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
