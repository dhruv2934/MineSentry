import React from 'react';
import { cn } from '../../utils/cn';
import { ShieldAlert } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'No matching operational telemetry or items available for the selected filters.',
  actionText,
  onAction,
  className
}) => {
  return (
    <div
      className={cn(
        'w-full py-16 px-6 flex flex-col items-center justify-center text-center bg-[#101316] border border-dashed border-white/[0.1] rounded-lg',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-400 mb-3">
        <ShieldAlert className="w-6 h-6 text-amber-500/80" />
      </div>
      <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
      <p className="text-xs text-zinc-400 max-w-md mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-semibold text-zinc-900 bg-amber-400 hover:bg-amber-300 rounded shadow transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
