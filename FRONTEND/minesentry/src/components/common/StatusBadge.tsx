
import React from 'react';
import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  className
}) => {
  const normalized = status.toUpperCase().replace(/\s+/g, '_');

  let colorClasses = 'bg-zinc-800 text-zinc-300 border-zinc-700';
  let dotColor = 'bg-zinc-400';

  // Active / Completed / Safe
  if (
    ['ACTIVE', 'COMPLETED', 'RESOLVED', 'APPROVED', 'LOW']
      .includes(normalized)
  ) {
    colorClasses =
      'bg-emerald-950/40 text-emerald-300 border-emerald-500/30';
    dotColor = 'bg-emerald-400';
  }

  // Inactive
  else if (normalized === 'INACTIVE') {
    colorClasses =
      'bg-zinc-800/60 text-zinc-300 border-zinc-600/40';
    dotColor = 'bg-zinc-400';
  }

  // In Progress / Moderate
  else if (
    [
      'UNDER_AUDIT',
      'IN_PROGRESS',
      'MEDIUM',
      'MODERATE',
      'SCHEDULED',
      'FLAGGED_AS_VIOLATION'
    ].includes(normalized)
  ) {
    colorClasses =
      'bg-amber-950/40 text-amber-300 border-amber-500/30';
    dotColor = 'bg-amber-400';
  }

  // Critical / High Risk
  else if (
    [
      'CRITICAL',
      'HIGH',
      'URGENT',
      'OPEN',
      'REJECTED',
      'RESTRICTED'
    ].includes(normalized)
  ) {
    colorClasses =
      'bg-red-950/40 text-red-300 border-red-500/30';
    dotColor = 'bg-red-400 animate-pulse';
  }

  // Pending
  else if (
    [
      'PENDING_REVIEW',
      'PENDING_APPROVAL',
      'UNDER_REMEDIATION',
      'VERIFICATION_PENDING'
    ].includes(normalized)
  ) {
    colorClasses =
      'bg-yellow-950/40 text-yellow-300 border-yellow-500/30';
    dotColor = 'bg-yellow-400';
  }

  const formatText = (txt: string) => {
    return txt
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium tracking-wide uppercase rounded border',
        size === 'sm'
          ? 'px-2 py-0.5 text-[11px]'
          : 'px-2.5 py-1 text-xs',
        colorClasses,
        className
      )}
    >
      <span
        className={cn(
          'w-1.5 h-1.5 rounded-full inline-block',
          dotColor
        )}
      />
      {formatText(status)}
    </span>
  );
};
