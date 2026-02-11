import {
  Trophy, RotateCcw, Star, BarChart3, Target,
  TrendingUp, Award, ChevronDown, ChevronUp, Code2, CheckCircle2, XCircle, Mic
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import type { Question } from '@/data/questions';
import type { VoiceInterviewResult } from './VoiceInterviewAgent';

interface QuestionResult {
  question: Question;
  score: number;
  answer: string;
}

export interface ResultsScreenProps {
  results: QuestionResult[];
  voiceResults?: VoiceInterviewResult[];
  onRestart: () => void;
  onNewSession: () => void;
}

export function ResultsScreen({ results, voiceResults, onRestart, onNewSession }: ResultsScreenProps) {
  const isVoiceInterview = voiceResults && voiceResults.length > 0;
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const maxScore = results.length * 5;
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const avgScore = results.length > 0 ? (totalScore / results.length).toFixed(1) : '0';

  const codingResults = results.filter(r => 
    r.question.isCoding || 
    ((r.question.category === 'SQL' || r.question.category === 'Analytics') && r.question.starterCode)
  );
  const regularResults = results.filter(r => 
    !r.question.isCoding && 
    !((r.question.category === 'SQL' || r.question.category === 'Analytics') && r.question.starterCode)
  );

  const categoryScores = results.reduce((acc, r) => {
    const cat = r.question.category;
    if (!acc[cat]) acc[cat] = { total: 0, count: 0 };
    acc[cat].total += r.score;
    acc[cat].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const getGrade = () => {
    if (percentage >= 90) return { letter: 'A+', color: 'text-emerald-400', message: 'Outstanding! You\'re interview-ready!' };
    if (percentage >= 80) return { letter: 'A', color: 'text-emerald-400', message: 'Excellent performance! Almost perfect!' };
    if (percentage >= 70) return { letter: 'B+', color: 'text-blue-400', message: 'Great job! A few areas to polish.' };
    if (percentage >= 60) return { letter: 'B', color: 'text-blue-400', message: 'Good effort! Keep practicing.' };
    if (percentage >= 50) return { letter: 'C', color: 'text-amber-400', message: 'Decent start. Review sample answers.' };
    return { letter: 'D', color: 'text-red-400', message: 'Keep practicing! Review tips and sample answers.' };
  };

  const grade = getGrade();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl shadow-amber-500/30 mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Interview Complete!</h1>
          <p className="text-slate-400">{grade.message}</p>
        </div>

        {/* Score card */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
              <div className={cn('text-3xl font-bold mb-1', grade.color)}>{grade.letter}</div>
              <div className="text-xs text-slate-400">Grade</div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
              <div className="text-3xl font-bold text-white mb-1">{percentage}%</div>
              <div className="text-xs text-slate-400">Score</div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="text-3xl font-bold text-white">{avgScore}</span>
              </div>
              <div className="text-xs text-slate-400">Avg Score</div>
            </div>
            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
              <div className="text-3xl font-bold text-white mb-1">{results.length}</div>
              <div className="text-xs text-slate-400">Questions</div>
            </div>
          </div>

          {/* Summary counts */}
          {codingResults.length > 0 && regularResults.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300">
                  {codingResults.length} Coding {codingResults.length === 1 ? 'Challenge' : 'Challenges'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/50 rounded-lg">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-slate-300">
                  {regularResults.length} Interview {regularResults.length === 1 ? 'Question' : 'Questions'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Category breakdown */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            Category Breakdown
          </h2>
          <div className="space-y-3">
            {Object.entries(categoryScores).map(([cat, data]) => {
              const catPct = Math.round((data.total / (data.count * 5)) * 100);
              const isCodingCategory = cat === 'Coding' || cat === 'SQL' || cat === 'Analytics';
              const categoryIcons: Record<string, string> = {
                Behavioral: '🧠',
                Technical: '⚙️',
                'System Design': '🏗️',
                'Problem Solving': '💡',
                Leadership: '👥',
                Situational: '🎯',
                Coding: '💻',
                SQL: '🗄️',
                Analytics: '📊',
              };
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300 flex items-center gap-1.5">
                      <span>{categoryIcons[cat] || '📋'}</span>
                      {isCodingCategory && <Code2 className="w-3.5 h-3.5 text-cyan-400" />}
                      {cat}
                      <span className="text-xs text-slate-500">({data.count})</span>
                    </span>
                    <span className="text-sm text-slate-400">{catPct}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-1000',
                        isCodingCategory
                          ? (catPct >= 80 ? 'bg-cyan-500' : catPct >= 60 ? 'bg-cyan-600' : 'bg-cyan-700')
                          : (catPct >= 80 ? 'bg-emerald-500' : catPct >= 60 ? 'bg-blue-500' : catPct >= 40 ? 'bg-amber-500' : 'bg-red-500')
                      )}
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question details */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Question Review
          </h2>
          <div className="space-y-2">
            {results.map((r, idx) => {
              const isCoding = r.question.isCoding || 
                ((r.question.category === 'SQL' || r.question.category === 'Analytics') && r.question.starterCode);

              return (
                <div key={idx} className="border border-slate-700/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/30 transition-colors text-left"
                  >
                    <span className="text-xs font-mono text-slate-500 w-6">Q{idx + 1}</span>
                    {isCoding && <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    <span className="flex-1 text-sm text-slate-300 truncate">{r.question.question.split(':')[0]}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCoding ? (
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full font-medium',
                          r.score >= 4 ? 'bg-emerald-500/20 text-emerald-400' : r.score >= 2 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                        )}>
                          {r.score >= 4 ? (
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Passed</span>
                          ) : (
                            <span className="flex items-center gap-1"><XCircle className="w-3 h-3" /> {r.score}/5</span>
                          )}
                        </span>
                      ) : (
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              className={cn('w-3 h-3', s <= r.score ? 'text-amber-400 fill-amber-400' : 'text-slate-600')}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    {expandedIdx === idx ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {expandedIdx === idx && (
                    <div className="px-4 pb-4 space-y-3">
                      {/* Full question */}
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">Question:</div>
                        <p className="text-sm text-slate-400">{r.question.question}</p>
                      </div>

                      {/* User's answer */}
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                          {isVoiceInterview && <Mic className="w-3 h-3 text-purple-400" />}
                          {isCoding ? 'Your Code:' : isVoiceInterview ? 'Your Spoken Answer:' : 'Your Answer:'}
                        </div>
                        {isCoding ? (
                          <pre className="text-sm text-slate-300 bg-slate-900/50 rounded-lg px-3 py-2 font-mono overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                            {r.answer || 'No code submitted'}
                          </pre>
                        ) : (
                          <p className="text-sm text-slate-300 bg-slate-900/50 rounded-lg px-3 py-2">
                            {r.answer || <span className="italic text-slate-500">No answer provided</span>}
                          </p>
                        )}
                      </div>

                      {/* Voice Interview Feedback */}
                      {isVoiceInterview && voiceResults[idx] && (
                        <div className="space-y-2 mt-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-emerald-900/20 border border-emerald-800/30 rounded-lg p-3">
                              <div className="text-xs font-medium text-emerald-400 mb-1.5 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Strengths
                              </div>
                              <ul className="text-xs text-slate-300 space-y-1">
                                {voiceResults[idx].feedback.strengths.map((s, i) => (
                                  <li key={i}>• {s}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-3">
                              <div className="text-xs font-medium text-amber-400 mb-1.5 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> To Improve
                              </div>
                              <ul className="text-xs text-slate-300 space-y-1">
                                {voiceResults[idx].feedback.improvements.map((s, i) => (
                                  <li key={i}>• {s}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Solution */}
                      <div>
                        <div className="text-xs font-medium text-emerald-500 mb-1">
                          {isCoding ? 'Solution Code:' : 'Sample Answer:'}
                        </div>
                        {isCoding ? (
                          <pre className="text-sm text-emerald-300 bg-emerald-900/20 border border-emerald-800/30 rounded-lg px-3 py-2 font-mono overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed">
                            {r.question.solutionCode}
                          </pre>
                        ) : (
                          <p className="text-sm text-slate-300 bg-emerald-900/20 border border-emerald-800/30 rounded-lg px-3 py-2">
                            {r.question.sampleAnswer}
                          </p>
                        )}
                      </div>

                      {/* Explanation for coding questions */}
                      {isCoding && r.question.explanation && (
                        <div>
                          <div className="text-xs font-medium text-purple-400 mb-1">Explanation:</div>
                          <p className="text-sm text-slate-300 bg-purple-900/10 border border-purple-800/30 rounded-lg px-3 py-2">
                            {r.question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Improvement tips */}
        <div className="bg-slate-800/70 border border-slate-700/50 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Tips for Improvement
          </h2>
          <ul className="space-y-2">
            {[
              'Practice answering questions out loud to build fluency',
              'Use the STAR method consistently for behavioral questions',
              'Study system design fundamentals and practice whiteboarding',
              'Research each company\'s values and culture before interviews',
              ...(codingResults.length > 0 ? [
                'Practice coding problems daily on platforms like LeetCode',
                'Always write test cases before coding your solution',
                'Analyze time and space complexity of your solutions',
                'Learn common patterns: two pointers, sliding window, hash maps, DP',
              ] : [
                'Prepare 5-7 strong stories that cover multiple competencies',
                'Record yourself answering to identify filler words and pauses',
              ]),
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <Award className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Same Questions
          </button>
          <button
            onClick={onNewSession}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Target className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
