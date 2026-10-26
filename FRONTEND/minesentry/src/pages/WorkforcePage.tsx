import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { mockWorkforceData } from '../data/analytics';
import { Users, CalendarCheck, MessageSquareWarning, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

export const WorkforcePage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '') || 'workforce';

  const [activeSubTab, setActiveSubTab] = useState<'workforce' | 'attendance' | 'grievances' | 'welfare'>(
    path === 'attendance' ? 'attendance' : path === 'grievances' ? 'grievances' : path === 'welfare' ? 'welfare' : 'workforce'
  );

  const { activeHeadcount, shiftAttendancePct, safetyTrainedPct, openGrievances, welfareIndex, recentGrievances } =
    mockWorkforceData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Workforce &amp; Mine Welfare"
        subtitle="Shift attendance, personal protective gear distribution, grievances and welfare index"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
            {activeHeadcount.toLocaleString()} Registered Miners
          </span>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Shift Attendance" value={`${shiftAttendancePct}%`} trend={{ value: 'Normal', isNeutral: true }} accentColor="emerald" />
        <StatCard label="Safety Trained (DGMS)" value={`${safetyTrainedPct}%`} subtext="Annual refresher certified" accentColor="emerald" />
        <StatCard label="Open Grievances" value={openGrievances} subtext="Under resolution committee" accentColor="amber" />
        <StatCard label="Welfare Index" value={`${welfareIndex}%`} subtext="Canteen, medical & water" accentColor="zinc" />
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
        {(['workforce', 'attendance', 'grievances', 'welfare'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={cn(
              'px-4 py-2 text-xs font-semibold capitalize rounded-md transition-colors',
              activeSubTab === tab
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-white'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
        {activeSubTab === 'grievances' ? (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Active Workforce Safety Grievances
            </h3>
            <div className="space-y-3">
              {recentGrievances.map((g) => (
                <div
                  key={g.id}
                  className="p-3.5 rounded-lg bg-[#181d22] border border-white/[0.06] flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{g.id}</span>
                      <span className="text-xs font-semibold text-white">{g.mine}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{g.issue}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {g.status}
                    </span>
                    <span className="block text-[10px] text-zinc-500 mt-1">{g.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <Users className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white capitalize">{activeSubTab} Telemetry Log</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
              Biometric check-in and statutory shift muster roll synced with Central Mine Planning &amp; Design Institute standards.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
