import { useState, useEffect, useCallback } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ timeLimit, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(timeLimit);
    setRunning(false);
  }, [timeLimit]);

  useEffect(() => {
    if (!running || !isActive) return;
    if (timeLeft <= 0) {
      setRunning(false);
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running, timeLeft, isActive, onTimeUp]);

  const reset = useCallback(() => {
    setTimeLeft(timeLimit);
    setRunning(false);
  }, [timeLimit]);

  const toggle = useCallback(() => {
    setRunning(prev => !prev);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / timeLimit) * 100;

  const getColor = () => {
    if (percentage > 50) return 'text-emerald-400';
    if (percentage > 25) return 'text-amber-400';
    return 'text-red-400';
  };

  const getTrackColor = () => {
    if (percentage > 50) return 'stroke-emerald-500';
    if (percentage > 25) return 'stroke-amber-500';
    return 'stroke-red-500';
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-700/50"
          />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
            className={cn('transition-all duration-1000', getTrackColor())}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Clock className={cn('w-4 h-4 mb-0.5', getColor())} />
          <span className={cn('text-lg font-bold font-mono', getColor())}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
        >
          {running ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
    </div>
  );
}
