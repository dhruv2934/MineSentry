import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { mockRiskBreakdown } from '../data/dashboard';
import { mockMines } from '../data/mines';
import { AlertTriangle, TrendingDown, Layers, ShieldAlert, ChevronRight } from 'lucide-react';

export const RiskPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Risk &amp; Recurrence Intelligence"
        subtitle="Predictive geotechnical strata instability, gas accumulation hazards, and recurring incident patterns"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Active Strata &amp; Gas Telemetry
          </span>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Portfolio Average Risk" value="42.6 / 100" subtext="Moderate Risk Envelope" accentColor="amber" />
        <StatCard label="Critical Risk Sites" value="1 (Talcher)" subtext="Gas sensor drift under repair" accentColor="rose" />
        <StatCard label="Recurrence Reduction" value="-34%" trend={{ value: 'Improving', isPositive: true }} subtext="Post-RAG implementation" accentColor="emerald" />
      </div>

      {/* Risk Category Breakdown */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
          Statutory Risk Distribution by Engineering Hazard Domain
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockRiskBreakdown.map((item) => (
            <div key={item.category} className="p-4 rounded-lg bg-[#181d22] border border-white/[0.06]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-white">{item.category}</span>
                <span className="font-mono text-amber-400 font-bold">
                  {item.score}/100 ({item.status})
                </span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${
                    item.score > 60 ? 'bg-red-500' : item.score > 35 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="text-[11px] text-zinc-400">
                {item.count} Active telemetry monitoring stations active in this category.
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mine Risk Heatmap Table */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="p-4 bg-[#161a1e] border-b border-white/[0.08]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Facility Risk Ranking &amp; Methane Classification
          </h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181d22] border-b border-white/[0.06] text-zinc-400 font-mono uppercase">
            <tr>
              <th className="p-4">Mine Name</th>
              <th className="p-4">Methane Degree</th>
              <th className="p-4">Seam Depth</th>
              <th className="p-4">Composite Risk Score</th>
              <th className="p-4">Risk Level</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {mockMines.map((m) => (
              <tr
                key={m.id}
                onClick={() => navigate(`/mines/${m.id}`)}
                className="hover:bg-white/[0.02] cursor-pointer"
              >
                <td className="p-4 font-semibold text-white">{m.name}</td>
                <td className="p-4 font-mono text-zinc-300">{m.methane_classification}</td>
                <td className="p-4 font-mono text-zinc-300">{m.seam_depth_meters}m</td>
                <td className="p-4 font-mono font-bold text-amber-400">{m.risk_score} / 100</td>
                <td className="p-4">
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                      m.risk_level === 'HIGH'
                        ? 'bg-red-950/60 text-red-300 border border-red-500/40'
                        : m.risk_level === 'MEDIUM'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {m.risk_level}
                  </span>
                </td>
                <td className="p-4 text-right text-amber-400 hover:underline">
                  Inspect Site →
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
