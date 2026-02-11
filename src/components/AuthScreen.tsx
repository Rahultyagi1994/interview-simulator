import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BrainIcon,
  TargetIcon,
  MicrophoneIcon,
  ChartIcon,
  CheckIcon,
  CloseIcon,
  LightbulbIcon,
} from './Icons';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { login, register, error, clearError, isConfigured } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    clearError();

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (!result.success) {
          // Error is handled by context
        }
      } else {
        const result = await register(email, password, fullName);
        if (result.success) {
          if (isConfigured) {
            setSuccessMessage('Account created! Please check your email to verify your account.');
            setIsLogin(true);
          }
          // For demo mode, user is automatically logged in
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setSuccessMessage('');
    clearError();
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-4 shadow-2xl shadow-purple-500/40">
            <BrainIcon size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Interview Simulator</h1>
          <p className="text-slate-400">Master your interviews with AI-powered practice</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {/* Demo Mode Notice */}
          {!isConfigured && (
            <div className="mb-6 p-4 bg-amber-500/20 border border-amber-500/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <LightbulbIcon size={20} />
                </div>
                <div>
                  <p className="text-amber-300 text-sm font-medium">Demo Mode</p>
                  <p className="text-amber-300/70 text-xs mt-1">
                    Supabase is not configured. Your progress will be saved locally in your browser.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckIcon size={20} />
                <p className="text-emerald-300 text-sm">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <CloseIcon size={20} />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" stroke="#94a3b8" strokeWidth="2"/>
                      <path d="M4 20C4 16.6863 7.13401 14 12 14C16.866 14 20 16.6863 20 20" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#94a3b8" strokeWidth="2"/>
                    <path d="M3 7L12 13L21 7" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#94a3b8" strokeWidth="2"/>
                    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="1.5" fill="#94a3b8"/>
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-slate-400">Must be at least 6 characters</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <TargetIcon size={32} />
            </div>
            <p className="text-xs text-slate-300 font-medium">Real Questions</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <MicrophoneIcon size={32} />
            </div>
            <p className="text-xs text-slate-300 font-medium">AI Voice Agent</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:border-pink-500/50 transition-all">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
              <ChartIcon size={32} />
            </div>
            <p className="text-xs text-slate-300 font-medium">Track Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
