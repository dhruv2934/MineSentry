import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { mockAnalyticsData } from '../data/analytics';
import { BarChart3, TrendingUp, ShieldCheck, Activity, Award } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { safetyIndices, recurrenceTrends, minePerformanceRankings } = mockAnalyticsData;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Analytics &amp; Operational Benchmarks"
        subtitle="Longitudinal performance metrics, Lost Time Injury Frequency Rate (LTIFR), and AI recommendation adoption"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            Executive Mining Intelligence
          </span>
        }
      />

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Portfolio LTIFR"
          value={safetyIndices.lostTimeInjuryFrequencyRate}
          subtext={`vs Industry benchmark: ${safetyIndices.industryBenchmarkLTIFR}`}
          trend={{ value: '68% Lower', isPositive: true }}
          accentColor="emerald"
        />
        <StatCard
          label="Near-Miss Rate"
          value={`${safetyIndices.nearMissReportingRate} / 100k`}
          subtext="Healthy proactive reporting culture"
          accentColor="cyan"
        />
        <StatCard
          label="Statutory Index"
          value={`${safetyIndices.statutoryComplianceIndex}%`}
          trend={{ value: '+2.1%', isPositive: true }}
          accentColor="emerald"
        />
        <StatCard
          label="AI Remedy Adoption"
          value={`${safetyIndices.aiRecommendationAdoptionRate}%`}
          subtext="Engineers accepting LangGraph actions"
          accentColor="amber"
        />
      </div>

      {/* Recurrence Trends Chart Section */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Incident &amp; Anomaly Recurrence Trend
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Historical count of geological strata warnings vs gas spikes over 5 months
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Strata Issues
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 rounded bg-cyan-500 inline-block" /> Gas Issues
            </span>
          </div>
        </div>

        {/* Visual Bar Progression */}
        <div className="h-44 flex items-end justify-between gap-6 pt-4 border-b border-white/[0.08] pb-2">
          {recurrenceTrends.map((rt) => {
            const strataH = (rt.strataIssues / 10) * 100;
            const gasH = (rt.gasIssues / 10) * 100;

            return (
              <div key={rt.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-2 h-full">
                  <div
                    style={{ height: `${strataH}%` }}
                    className="w-5 sm:w-8 bg-amber-500 rounded-t transition-all hover:brightness-110"
                    title={`Strata: ${rt.strataIssues}`}
                  />
                  <div
                    style={{ height: `${gasH}%` }}
                    className="w-5 sm:w-8 bg-cyan-500 rounded-t transition-all hover:brightness-110"
                    title={`Gas: ${rt.gasIssues}`}
                  />
                </div>
                <span className="text-xs font-mono text-zinc-400">{rt.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Facility Rankings */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl overflow-hidden">
        <div className="p-4 bg-[#161a1e] border-b border-white/[0.08] flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Safety &amp; Compliance League Table
          </h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#181d22] border-b border-white/[0.06] text-zinc-400 font-mono uppercase">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Mine Complex</th>
              <th className="p-4">Compliance Rating</th>
              <th className="p-4">Risk Score</th>
              <th className="p-4 text-right">Performance Class</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {minePerformanceRankings.map((item) => (
              <tr key={item.rank} className="hover:bg-white/[0.02]">
                <td className="p-4 font-mono font-bold text-amber-400">#{item.rank}</td>
                <td className="p-4 font-semibold text-white">{item.mine}</td>
                <td className="p-4 font-mono text-emerald-400 font-semibold">{item.compliance}%</td>
                <td className="p-4 font-mono text-zinc-300">{item.riskScore}</td>
                <td className="p-4 text-right">
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'EXCELLENT'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                        : item.status === 'GOOD'
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                        : item.status === 'MODERATE'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        : 'bg-red-950/60 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
