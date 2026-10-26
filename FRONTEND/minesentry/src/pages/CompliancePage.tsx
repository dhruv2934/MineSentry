import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMines } from '../hooks/useMines';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { ShieldCheck, FileCheck, AlertTriangle, ArrowRight, Gavel, CheckCircle2 } from 'lucide-react';

export const CompliancePage: React.FC = () => {
  const navigate = useNavigate();
  const { mines, loading } = useMines();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Compliance &amp; Statutory Governance"
        subtitle="DGMS Safety audits, environmental mandates, and regulatory rating across operations"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Portfolio Rating: 93.8% (DGMS Grade A)
          </span>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Portfolio Statutory Index" value="93.8%" trend={{ value: '+1.2%', isPositive: true }} accentColor="emerald" />
        <StatCard label="Mines Fully Compliant" value="5 / 6" subtext="83.3% compliance coverage" accentColor="emerald" />
        <StatCard label="DGMS Directives Addressed" value="96.2%" trend={{ value: '+3.4%', isPositive: true }} accentColor="amber" />
        <StatCard label="Statutory Notices Pending" value="2" subtext="Immediate resolution required" accentColor="rose" />
      </div>

      {/* Compliance Matrix by Mine Facility */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#161a1e] border-b border-white/[0.08] flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Mine-by-Mine Regulatory Compliance Scores
          </h3>
          <span className="text-xs font-mono text-zinc-400">DGMS Standard CMR 2017</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181d22] border-b border-white/[0.06] text-zinc-400 font-mono uppercase">
              <tr>
                <th className="p-4">Mine Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Compliance Rating</th>
                <th className="p-4">Open Violations</th>
                <th className="p-4">Audit Status</th>
                <th className="p-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {mines.map((mine) => (
                <tr
                  key={mine.mine_id || mine.id}
                  onClick={() => navigate(`/mines/${mine.mine_id || mine.id}`)}
                  className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="p-4 font-semibold text-white">{mine.name}</td>
                  <td className="p-4 text-zinc-400">{mine.location}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400">
                        {mine.compliance_score}%
                      </span>
                      <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${mine.compliance_score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-red-400">
                    {mine.open_violations}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={mine.status} />
                  </td>
                  <td className="p-4 text-right text-amber-400 hover:underline">
                    View Mine →
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
