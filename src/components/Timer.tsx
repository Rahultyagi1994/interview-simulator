import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function Timer({ timeLimit, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isActive, onTimeUp]);

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
    <div className="flex flex-col items-center">
      <div className={cn("relative w-28 h-28", percentage <= 25 && "animate-pulse")}>
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
          <svg className={cn("w-4 h-4 mb-0.5", getColor())} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6V12L16 14" strokeLinecap="round"/>
          </svg>
          <span className={cn('text-lg font-bold font-mono', getColor())}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      {percentage <= 25 && (
        <p className="text-xs text-red-400 mt-2 animate-pulse">Time running out!</p>
      )}
    </div>
  );
}
