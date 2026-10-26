import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  ShieldCheck,
  AlertOctagon,
  Pickaxe,
  Activity,
} from 'lucide-react';

type AccentColor = 'amber' | 'emerald' | 'rose' | 'zinc';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: React.ElementType;
  accentColor?: AccentColor;
  onClick?: () => void;
}

export function StatCard({
  label,
  value,
  subtext,
  trend,
  icon: Icon,
  accentColor = 'zinc',
  onClick,
}: StatCardProps) {

  const themes = {
  amber: {
    border: 'border-white/[0.14]',
    hoverBorder: 'hover:border-amber-400/40',

    glow: 'bg-amber-400/25',

    iconBg: 'bg-white/[0.07]',
    iconBorder: 'border-white/[0.14]',
    icon: 'text-amber-400',

    line: 'bg-amber-400',

    shadow:
      'shadow-[0_0_45px_rgba(251,191,36,0.10)]',
  },

  emerald: {
    border: 'border-white/[0.14]',
    hoverBorder: 'hover:border-emerald-400/40',

    glow: 'bg-emerald-400/25',

    iconBg: 'bg-white/[0.07]',
    iconBorder: 'border-white/[0.14]',
    icon: 'text-emerald-400',

    line: 'bg-emerald-400',

    shadow:
      'shadow-[0_0_45px_rgba(52,211,153,0.10)]',
  },

  rose: {
    border: 'border-white/[0.14]',
    hoverBorder: 'hover:border-rose-400/40',

    glow: 'bg-rose-400/25',

    iconBg: 'bg-white/[0.07]',
    iconBorder: 'border-white/[0.14]',
    icon: 'text-rose-400',

    line: 'bg-rose-400',

    shadow:
      'shadow-[0_0_45px_rgba(251,113,133,0.10)]',
  },

  zinc: {
    border: 'border-white/[0.14]',
    hoverBorder: 'hover:border-white/30',

    glow: 'bg-white/[0.14]',

    iconBg: 'bg-white/[0.07]',
    iconBorder: 'border-white/[0.14]',
    icon: 'text-zinc-300',

    line: 'bg-zinc-400',

    shadow:
      'shadow-[0_0_45px_rgba(255,255,255,0.06)]',
  },
};

  const theme = themes[accentColor];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group relative w-full overflow-hidden rounded-2xl
        border ${theme.border} ${theme.hoverBorder}
        bg-white/[0.075]
        backdrop-blur-2xl
        ${theme.shadow}
        p-5 text-left
        transition-all duration-300
        hover:-translate-y-[2px]
        hover:bg-white/[0.010]
      `}
    >
{/* ========================================= */}
{/* GLASS SURFACE */}
{/* ========================================= */}

<div
  className={`
    pointer-events-none absolute inset-0
    bg-gradient-to-br
    from-white/[0.12]
    via-white/[0.035]
    to-transparent
  `}
/>


{/* ========================================= */}
{/* COLORED GLASS GLOW */}
{/* ========================================= */}

<div
  className={`
    pointer-events-none absolute
    -right-20 -top-20
    h-56 w-56
    rounded-full
    ${theme.glow}
    blur-[70px]
    opacity-70
    transition-all duration-500
    group-hover:scale-110
    group-hover:opacity-90
  `}
/>


{/* ========================================= */}
{/* BOTTOM COLOR GLOW */}
{/* ========================================= */}

<div
  className={`
    pointer-events-none absolute
    -bottom-24 -left-10
    h-40 w-56
    rounded-full
    ${theme.glow}
    blur-[80px]
    opacity-30
  `}
/>


{/* ========================================= */}
{/* GLASS HIGHLIGHT */}
{/* ========================================= */}

<div
  className="
    pointer-events-none
    absolute inset-x-0 top-0
    h-24
    bg-gradient-to-b
    from-white/[0.08]
    to-transparent
    opacity-80
  "
/>


      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between">

          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            {label}
          </p>


          {/* Icon */}

          {Icon && (
            <div
             
            >
              <Icon
                size={20}
                strokeWidth={1.8}
                className={theme.icon}
              />
            </div>
          )}

        </div>


        {/* ========================================= */}
        {/* KPI VALUE */}
        {/* ========================================= */}

        <div className="mt-7 flex items-end gap-3">

          <span className="text-[2.7rem] font-bold leading-none tracking-[-0.04em] text-white">
            {value}
          </span>

          {trend && (
            <span
              className={`
                mb-1 flex items-center gap-1
                rounded-md px-2 py-1
                text-xs font-semibold
                ${
                  trend.isPositive
                    ? 'bg-emerald-400/10 text-emerald-400'
                    : 'bg-rose-400/10 text-rose-400'
                }
              `}
            >
              {trend.isPositive ? (
                <ArrowUpRight size={13} />
              ) : (
                <ArrowDownRight size={13} />
              )}

              {trend.value}
            </span>
          )}

        </div>


        {/* ========================================= */}
        {/* SUBTEXT */}
        {/* ========================================= */}

        {subtext && (
          <p className="mt-5 max-w-[90%] text-sm leading-5 text-zinc-500">
            {subtext}
          </p>
        )}


        {/* ========================================= */}
        {/* BOTTOM INDICATOR */}
        {/* ========================================= */}

        <div className="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-white/5">

          <div
            className={`
              h-full w-1/4 rounded-full
              ${theme.line}
              shadow-[0_0_12px_currentColor]
              transition-all duration-500
              group-hover:w-2/5
            `}
          />

        </div>

      </div>

    </button>
  );
}