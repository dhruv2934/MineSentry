import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { UserCog, FileClock, Settings, ShieldCheck, Database, Key } from 'lucide-react';
import { cn } from '../utils/cn';

export const AdminPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.replace('/', '') || 'settings';

  const [activeTab, setActiveTab] = useState<'users' | 'audit-logs' | 'settings'>(
    path === 'users' ? 'users' : path === 'audit-logs' ? 'audit-logs' : 'settings'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Administration &amp; System Configuration"
        subtitle="Role-based access control, cryptographic audit logs, and LangGraph model hyperparameters"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
            System v2.4 (Enterprise)
          </span>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
        {(['users', 'audit-logs', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 text-xs font-semibold capitalize rounded-md transition-colors',
              activeTab === tab
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-white'
            )}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
        {activeTab === 'users' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Authorized Mine Safety Officers &amp; Engineers
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Er. R. S. Varma', role: 'Chief Safety Controller', email: 'rs.varma@minesentry.internal', badge: 'Admin' },
                { name: 'Raj Kumar', role: 'Senior DGMS Mine Inspector', email: 'raj.kumar@dgms.gov.in', badge: 'Auditor' },
                { name: 'Er. R. K. Mukherjee', role: 'Jharia Colliery Manager', email: 'rkm@jharia-mines.in', badge: 'Manager' },
                { name: 'Er. Alok Vardhan', role: 'Korba Open Cast Lead', email: 'alok.v@korba-coal.in', badge: 'Manager' }
              ].map((u) => (
                <div key={u.email} className="p-3 rounded-lg bg-[#181d22] border border-white/[0.04] flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{u.name}</p>
                    <p className="text-[11px] text-zinc-400">{u.role} · {u.email}</p>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {u.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit-logs' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Immutable Cryptographic Audit Trail
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {[
                { time: '2026-09-28 09:30:12', user: 'Er. R. S. Varma', event: 'Approved Corrective Action ACT-301 for Jharia Seam XIII' },
                { time: '2026-09-28 08:15:00', user: 'SYSTEM (LangGraph)', event: 'RAG Embedding matched OBS-401 to CMR-2017 Reg 123 (score: 0.94)' },
                { time: '2026-09-27 18:22:45', user: 'Raj Kumar (Inspector)', event: 'Submitted Inspection INS-001 digital sign-off with DGMS token' }
              ].map((l, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#181d22] border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-zinc-500 shrink-0">{l.time}</span>
                  <span className="text-zinc-300 flex-1">{l.event}</span>
                  <span className="text-amber-400 font-bold shrink-0">{l.user}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                LangGraph RAG Knowledge Embeddings
              </h3>
              <p className="text-xs text-zinc-400 mb-4">
                Configure embedding models and regulatory indexing schedules.
              </p>
              <div className="p-4 rounded-lg bg-[#181d22] border border-white/[0.06] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Vector Index Provider</span>
                  <span className="font-mono text-amber-400">FAISS / pgvector (Local)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">CMR 2017 RAG Cutoff Threshold</span>
                  <span className="font-mono text-white">0.82 Cosine Similarity</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300">Continuous Methane Sensor Sampling</span>
                  <span className="font-mono text-emerald-400">Every 15 Seconds</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
