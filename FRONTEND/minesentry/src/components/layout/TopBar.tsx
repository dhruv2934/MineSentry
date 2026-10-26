import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  ShieldAlert,
  HardHat,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface TopBarProps {
  collapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Generate breadcrumb title from path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentSection = pathParts[0] || 'dashboard';

  const formatTitle = (str: string) => {
    return str
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <header
      className={cn(
        'h-16 fixed top-0 right-0 z-30 bg-[#0d1013]/90 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between px-6 transition-all duration-300',
        collapsed ? 'left-16' : 'left-64'
      )}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <Link to="/dashboard" className="text-zinc-400 hover:text-zinc-200 transition-colors">
          Portfolio
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        <span className="font-semibold text-white tracking-wide">
          {formatTitle(currentSection)}
        </span>
        {pathParts[1] && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              {pathParts[1]}
            </span>
          </>
        )}
      </div>

      {/* Right: Operational Status, Search Shortcut & Notifications */}
      <div className="flex items-center gap-4">
        {/* Real-time Sentinel Telemetry Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DGMS Sentinel Online</span>
        </div>

        {/* AI RAG Engine Quick Indicator */}
        <div
          onClick={() => navigate('/regulations')}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181d22] border border-white/[0.1] text-xs text-zinc-300 hover:border-amber-500/40 cursor-pointer transition-colors"
          title="CMR 2017 AI Codex"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-[11px]">RAG Codex</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-md transition-colors relative"
            title="Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#12161a] border border-white/[0.12] rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Operational Alerts
                </span>
                <span className="text-[10px] font-mono text-amber-400">3 Unresolved</span>
              </div>
              <div className="mt-3 space-y-2.5 text-xs">
                <div
                  onClick={() => {
                    navigate('/violations/VIO-901');
                    setShowNotifications(false);
                  }}
                  className="p-2 rounded bg-red-950/20 border border-red-500/30 hover:border-red-500/60 cursor-pointer"
                >
                  <p className="font-semibold text-red-300">VIO-901: Critical CH4 Level</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Talcher Deep Seam - Exceeded 0.75% threshold
                  </p>
                </div>
                <div
                  onClick={() => {
                    navigate('/corrective-actions/ACT-301');
                    setShowNotifications(false);
                  }}
                  className="p-2 rounded bg-amber-950/20 border border-amber-500/30 hover:border-amber-500/60 cursor-pointer"
                >
                  <p className="font-semibold text-amber-300">ACT-301: Pending Approval</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Jharia Seam XIII - 6 Resin bolting units
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Landing Link */}
        <Link
          to="/"
          className="text-xs text-zinc-400 hover:text-amber-400 flex items-center gap-1 transition-colors pl-2 border-l border-white/[0.1]"
          title="Back to Cinematic Landing"
        >
          <span className="hidden lg:inline">Landing</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
};
