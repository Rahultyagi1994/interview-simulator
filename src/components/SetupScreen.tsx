import { useState } from 'react';
import { cn } from '@/utils/cn';
import { companies, categories } from '@/data/questions';
import type { Category, Difficulty } from '@/data/questions';
import {
  BrainIcon,
  TargetIcon,
  TrophyIcon,
  CodingIcon,
  MicrophoneIcon,
  DocumentIcon,
  ArrowRightIcon,
  getCompanyIcon,
  getCategoryIcon,
} from './Icons';

interface SetupScreenProps {
  onStart: (config: InterviewConfig) => void;
}

export type InterviewMode = 'text' | 'voice';

export interface InterviewConfig {
  company: string;
  categories: Category[];
  difficulty: Difficulty | 'All';
  questionCount: number;
  mode: InterviewMode;
}

const difficulties: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard'];

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [questionCount, setQuestionCount] = useState(5);
  const [interviewMode, setInterviewMode] = useState<InterviewMode>('text');

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleStart = () => {
    onStart({
      company: selectedCompany,
      categories: selectedCategories.length > 0 ? selectedCategories : [...categories],
      difficulty: selectedDifficulty,
      questionCount,
      mode: interviewMode,
    });
  };

  const companyOptions = ['All', ...companies];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/30 mb-6">
            <BrainIcon size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Interview <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Simulator</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Practice with real-world interview questions from top tech companies. Build confidence and ace your next interview.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mb-10">
          {[
            { icon: <TargetIcon size={32} />, label: '50+ Real Questions', desc: 'From top companies' },
            { icon: <CodingIcon size={32} />, label: 'Coding Challenges', desc: 'With live test runner' },
            { icon: <TrophyIcon size={32} />, label: 'Track Progress', desc: 'Score & improve' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-slate-700/40 rounded-xl">
              <div className="shrink-0">{icon}</div>
              <div>
                <div className="text-sm font-medium text-white">{label}</div>
                <div className="text-xs text-slate-400">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Setup card */}
        <div className="w-full max-w-2xl bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <TargetIcon size={20} />
            Configure Your Interview
          </h2>

          {/* Company selection */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 7L3 11M12 7l9 4M12 3v4"/>
              </svg>
              Target Company
            </label>
            <div className="flex flex-wrap gap-2">
              {companyOptions.map(company => (
                <button
                  key={company}
                  onClick={() => setSelectedCompany(company)}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2',
                    selectedCompany === company
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                  )}
                >
                  {company !== 'All' && <span className="shrink-0">{getCompanyIcon(company, 18)}</span>}
                  {company}
                </button>
              ))}
            </div>
          </div>

          {/* Category selection */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              Question Categories
              <span className="text-xs text-slate-500 ml-1">(leave empty for all)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2',
                    selectedCategories.includes(cat)
                      ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                  )}
                >
                  <span className="shrink-0">{getCategoryIcon(cat, 18)}</span>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <TargetIcon size={16} />
              Difficulty Level
            </label>
            <div className="flex gap-2">
              {difficulties.map(diff => {
                const colors: Record<string, string> = {
                  All: 'bg-indigo-600 border-indigo-500',
                  Easy: 'bg-emerald-600 border-emerald-500',
                  Medium: 'bg-amber-600 border-amber-500',
                  Hard: 'bg-red-600 border-red-500',
                };
                const icons: Record<string, React.ReactNode> = {
                  All: '🎯',
                  Easy: '🌱',
                  Medium: '⚡',
                  Hard: '🔥',
                };
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2',
                      selectedDifficulty === diff
                        ? `${colors[diff]} text-white shadow-lg`
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700'
                    )}
                  >
                    <span>{icons[diff]}</span>
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question count */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="9" x2="20" y2="9"/>
                <line x1="4" y1="15" x2="20" y2="15"/>
                <line x1="10" y1="3" x2="8" y2="21"/>
                <line x1="16" y1="3" x2="14" y2="21"/>
              </svg>
              Number of Questions: <span className="text-indigo-400 font-bold">{questionCount}</span>
            </label>
            <input
              type="range"
              min={1}
              max={15}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1</span>
              <span>Quick (5)</span>
              <span>Full (10)</span>
              <span>15</span>
            </div>
          </div>

          {/* Interview Mode */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <MicrophoneIcon size={16} />
              Interview Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInterviewMode('text')}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  interviewMode === 'text'
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500'
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    interviewMode === 'text' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600' : 'bg-slate-600'
                  )}>
                    <DocumentIcon size={24} />
                  </div>
                  <span className="font-medium text-white">Text Mode</span>
                </div>
                <p className="text-xs text-slate-400">
                  Type your answers. Great for practicing at your own pace.
                </p>
              </button>
              
              <button
                onClick={() => setInterviewMode('voice')}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  interviewMode === 'voice'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500'
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    interviewMode === 'voice' ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-slate-600'
                  )}>
                    <MicrophoneIcon size={24} />
                  </div>
                  <span className="font-medium text-white">Voice Agent</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white">NEW</span>
                </div>
                <p className="text-xs text-slate-400">
                  AI agent asks questions aloud. Speak your answers naturally.
                </p>
              </button>
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-base font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 group"
          >
            Start Interview Simulation
            <ArrowRightIcon size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
