import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingStateProps {
  message?: string;
  rows?: number;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading telemetry & records...',
  rows = 4,
  className
}) => {
  return (
    <div className={cn('w-full py-12 px-6 flex flex-col items-center justify-center', className)}>
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-2 border-amber-500/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-sm font-medium text-zinc-400 mb-6 font-mono tracking-wider">{message}</p>

      <div className="w-full max-w-2xl space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-12 bg-white/[0.03] border border-white/[0.04] rounded-md animate-pulse"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
};
