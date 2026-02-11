import React from 'react';
import { useAuth } from '../context/AuthContext';
import { InterviewHistory } from '../lib/supabase';
import {
  TrophyIcon,
  ChartIcon,
  StarIcon,
  CheckIcon,
  PlayIcon,
  LogoutIcon,
  TimerIcon,
  TargetIcon,
  MicrophoneIcon,
  CodingIcon,
  DocumentIcon,
  getCategoryIcon,
  getCompanyIcon,
} from './Icons';

interface DashboardProps {
  onStartInterview: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartInterview }) => {
  const { user, userProgress, interviewHistory, logout } = useAuth();

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (score >= 80) return { grade: 'A', color: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (score >= 60) return { grade: 'C', color: 'text-amber-400', bg: 'bg-amber-500/20' };
    return { grade: 'D', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {userName}!</h1>
              <p className="text-slate-400">Ready to ace your next interview?</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onStartInterview}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              <PlayIcon size={20} />
              Start Interview
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center gap-2 hover:bg-white/10 rounded-lg"
            >
              <LogoutIcon size={20} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-indigo-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/30 to-indigo-600/30 rounded-xl flex items-center justify-center">
                <DocumentIcon size={28} />
              </div>
              <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">Total</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{userProgress?.total_interviews || 0}</p>
            <p className="text-sm text-slate-400">Interviews Completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 rounded-xl flex items-center justify-center">
                <CheckIcon size={28} />
              </div>
              <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">Average</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{userProgress?.average_score?.toFixed(0) || 0}%</p>
            <p className="text-sm text-slate-400">Overall Score</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-xl flex items-center justify-center">
                <TargetIcon size={28} />
              </div>
              <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">Answered</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{userProgress?.total_questions_answered || 0}</p>
            <p className="text-sm text-slate-400">Total Questions</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-amber-600/30 rounded-xl flex items-center justify-center">
                <StarIcon size={28} filled />
              </div>
              <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">Avg</span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{userProgress?.average_confidence?.toFixed(1) || 0}</p>
            <p className="text-sm text-slate-400">Confidence Rating</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Interviews */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <TimerIcon size={24} />
              Recent Interviews
            </h2>
            
            {interviewHistory.length > 0 ? (
              <div className="space-y-3">
                {interviewHistory.slice(0, 5).map((interview: InterviewHistory, index: number) => {
                  const gradeInfo = getGrade(interview.score);
                  return (
                    <div 
                      key={interview.id || index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          interview.interview_type === 'voice' ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20' :
                          interview.interview_type === 'coding' ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20' : 
                          'bg-gradient-to-br from-purple-500/20 to-pink-600/20'
                        }`}>
                          {interview.interview_type === 'voice' ? <MicrophoneIcon size={24} /> :
                           interview.interview_type === 'coding' ? <CodingIcon size={24} /> : 
                           <DocumentIcon size={24} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="shrink-0">{getCompanyIcon(interview.company, 18)}</span>
                            <p className="text-white font-medium">{interview.company}</p>
                          </div>
                          <p className="text-sm text-slate-400">
                            {interview.total_questions} questions • {interview.categories.slice(0, 2).join(', ')}
                            {interview.categories.length > 2 && ` +${interview.categories.length - 2}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${gradeInfo.bg}`}>
                          <p className={`text-lg font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{formatDate(interview.created_at || '')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DocumentIcon size={40} />
                </div>
                <p className="text-slate-400 mb-4">No interviews yet</p>
                <button
                  onClick={onStartInterview}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-colors border border-purple-500/30"
                >
                  Start Your First Interview
                </button>
              </div>
            )}
          </div>

          {/* Skills Overview */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <ChartIcon size={24} />
              Skills Overview
            </h2>

            {userProgress?.category_scores && Object.keys(userProgress.category_scores).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(userProgress.category_scores)
                  .map(([category, data]) => ({
                    category,
                    average: data.count > 0 ? data.total / data.count : 0,
                    count: data.count
                  }))
                  .sort((a, b) => b.average - a.average)
                  .slice(0, 6)
                  .map(({ category, average, count }) => (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-300 flex items-center gap-2">
                          {getCategoryIcon(category, 16)} {category}
                        </span>
                        <span className="text-sm font-medium text-white">{average.toFixed(0)}%</span>
                      </div>
                      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            average >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-400' :
                            average >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                            average >= 40 ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : 
                            'bg-gradient-to-r from-red-500 to-orange-400'
                          }`}
                          style={{ width: `${average}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{count} questions answered</p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ChartIcon size={32} />
                </div>
                <p className="text-slate-400 text-sm">Complete interviews to see your skill breakdown</p>
              </div>
            )}

            {/* Best & Weak Categories */}
            {userProgress?.best_categories && userProgress.best_categories.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="mb-4">
                  <p className="text-sm text-emerald-400 font-medium mb-2 flex items-center gap-2">
                    <TrophyIcon size={16} /> Strengths
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {userProgress.best_categories.slice(0, 3).map(cat => (
                      <span key={cat} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-lg flex items-center gap-2 border border-emerald-500/30">
                        {getCategoryIcon(cat, 14)} {cat}
                      </span>
                    ))}
                  </div>
                </div>
                {userProgress.weak_categories && userProgress.weak_categories.length > 0 && (
                  <div>
                    <p className="text-sm text-amber-400 font-medium mb-2 flex items-center gap-2">
                      <TargetIcon size={16} /> Focus Areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {userProgress.weak_categories.slice(0, 3).map(cat => (
                        <span key={cat} className="px-3 py-1.5 bg-amber-500/20 text-amber-300 text-xs rounded-lg flex items-center gap-2 border border-amber-500/30">
                          {getCategoryIcon(cat, 14)} {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Company Practice */}
        {userProgress?.company_practice && Object.keys(userProgress.company_practice).length > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3 21h18M3 7v14M21 7v14M6 21V11M10 21V11M14 21V11M18 21V11M12 7L3 11M12 7l9 4M12 3v4" stroke="url(#building-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="building-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7"/>
                    <stop offset="1" stopColor="#6366F1"/>
                  </linearGradient>
                </defs>
              </svg>
              Companies Practiced
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(userProgress.company_practice)
                .sort((a, b) => b[1] - a[1])
                .map(([company, count]) => (
                  <div 
                    key={company}
                    className="px-4 py-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-colors"
                  >
                    {getCompanyIcon(company, 24)}
                    <div>
                      <span className="text-white font-medium">{company}</span>
                      <p className="text-xs text-slate-400">
                        {count} {count === 1 ? 'interview' : 'interviews'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
