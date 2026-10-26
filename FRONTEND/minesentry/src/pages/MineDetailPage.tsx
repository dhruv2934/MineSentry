import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMine } from '../hooks/useMines';
import { useInspections } from '../hooks/useInspections';
import { useObservations } from '../hooks/useObservations';
import { useViolations } from '../hooks/useViolations';
import { useCorrectiveActions } from '../hooks/useCorrectiveActions';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  ClipboardCheck,
  AlertOctagon,
  CheckSquare,
  Sparkles,
  Flame,
  Users,
  Compass,
  FileText
} from 'lucide-react';
import { cn } from '../utils/cn';






// =========================================================
// LOCAL MINE IMAGES
// =========================================================

const mineImagesByCode: Record<string, string> = {
  'JH-UG-04': '/assets/images/mines/mine1.avif',
  'KB-OC-11': '/assets/images/mines/mine2.jpeg',
  'SG-OC-02': '/assets/images/mines/mine3.webp',
  'TL-DS-08': '/assets/images/mines/mine4.jpeg',

 
    'RN-UG-01': '/assets/images/mines/mine5.jpeg',
    'NY-OC-06': '/assets/images/mines/mine6.jpg',
   
};









type MineTab =
  | 'overview'
  | 'inspections'
  | 'observations'
  | 'violations'
  | 'corrective-actions'
  | 'compliance'
  | 'risk'
  | 'activity';

export const MineDetailPage: React.FC = () => {
  const { mineId } = useParams<{ mineId: string }>();
  const navigate = useNavigate();
  const { mine, loading } = useMine(mineId);

  const [activeTab, setActiveTab] = useState<MineTab>('overview');

  // Related data hooks filtered by this mine
  const { inspections } = useInspections({ mine_id: mineId });
  const { observations } = useObservations({ mine_id: mineId });
  const { violations } = useViolations({ mine_id: mineId });
  const { actions, approve } = useCorrectiveActions({ mine_id: mineId });

  if (loading || !mine) {
    return <LoadingState message="Loading geological strata telemetry & mine dossier..." />;
  }

  const tabs: { key: MineTab; label: string; count?: number }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'inspections', label: 'Inspections', count: inspections.length },
    { key: 'observations', label: 'Observations', count: observations.length },
    { key: 'violations', label: 'Violations', count: violations.length },
    { key: 'corrective-actions', label: 'Corrective Actions', count: actions.length },
    { key: 'compliance', label: 'Compliance' },
    { key: 'risk', label: 'Risk' },
    { key: 'activity', label: 'Activity' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/mines')}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Mines Portfolio</span>
      </button>

      {/* 1. MINE HERO BANNER & HEADER */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#12161a] min-h-[260px] flex flex-col justify-end p-6 md:p-8">
        {/* Photographic Background */}
        <div className="absolute inset-0 z-0">
  <img
    src={mineImagesByCode[mine.code] || mine.image_url}
    alt={mine.name}
    className="w-full h-full object-cover object-center"
    onError={(e) => {
      const target = e.currentTarget;

      if (
        mine.image_url &&
        target.src !== mine.image_url
      ) {
        target.src = mine.image_url;
      } else {
        target.src = '/assets/images/mine-truck.jpg';
      }
    }}
  />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-[#080a0c]/80 to-[#080a0c]/40" />
        </div>

        {/* Banner Details */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-black/60 border border-white/20 text-amber-300 tracking-wider">
                {mine.code}
              </span>
              <StatusBadge status={mine.status} />
              <span className="text-xs font-mono text-zinc-400">
                Seam Depth: {mine.seam_depth_meters}m
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {mine.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {mine.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Methane: {mine.methane_classification}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Workforce: {mine.workforce_headcount} Personnel
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/inspections')}
              className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded shadow transition-all duration-150"
            >
              + Conduct Inspection
            </button>
          </div>
        </div>
      </div>

      {/* 2. SUMMARY TILES (Requirement 15) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-lg bg-[#12161a] border border-white/[0.08]">
          <span className="block text-[10px] font-mono uppercase text-zinc-400">PRODUCTION</span>
          <span className="text-lg md:text-xl font-bold font-mono text-white flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            {mine.production}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-[#12161a] border border-white/[0.08]">
          <span className="block text-[10px] font-mono uppercase text-zinc-400">COMPLIANCE</span>
          <span className="text-lg md:text-xl font-bold font-mono text-emerald-400 flex items-center gap-1 mt-1">
            <ShieldCheck className="w-4 h-4" />
            {mine.compliance_score}%
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-[#12161a] border border-white/[0.08]">
          <span className="block text-[10px] font-mono uppercase text-zinc-400">RISK SCORE</span>
          <span
            className={`text-lg md:text-xl font-bold font-mono flex items-center gap-1 mt-1 ${
              mine.risk_score > 60 ? 'text-red-400' : 'text-amber-400'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            {mine.risk_score} / 100
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-[#12161a] border border-white/[0.08]">
          <span className="block text-[10px] font-mono uppercase text-zinc-400">OPEN VIOLATIONS</span>
          <span className="text-lg md:text-xl font-bold font-mono text-red-400 flex items-center gap-1 mt-1">
            <AlertOctagon className="w-4 h-4" />
            {mine.open_violations}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-[#12161a] border border-white/[0.08]">
          <span className="block text-[10px] font-mono uppercase text-zinc-400">ACTIVE INSPECTIONS</span>
          <span className="text-lg md:text-xl font-bold font-mono text-cyan-400 flex items-center gap-1 mt-1">
            <ClipboardCheck className="w-4 h-4" />
            {mine.active_inspections}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-[#12161a] border border-white/[0.08]">
          <span className="block text-[10px] font-mono uppercase text-zinc-400">CORRECTIVE ACTIONS</span>
          <span className="text-lg md:text-xl font-bold font-mono text-amber-400 flex items-center gap-1 mt-1">
            <CheckSquare className="w-4 h-4" />
            {mine.open_corrective_actions}
          </span>
        </div>
      </div>

      {/* 3. NAVIGATION TABS (Progressive Disclosure) */}
      <div className="flex items-center gap-1 border-b border-white/[0.08] overflow-x-auto pb-px">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-4 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5',
              activeTab === tab.key
                ? 'border-amber-500 text-amber-400 bg-amber-500/10 rounded-t'
                : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 font-mono">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 4. TAB CONTENTS */}
      <div className="min-h-[300px]">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                  Facility Description &amp; Extraction Methodology
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{mine.description}</p>
                <div className="mt-4 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500">Chief Engineer</span>
                    <p className="font-semibold text-white mt-0.5">{mine.chief_mining_engineer}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500">Coordinates</span>
                    <p className="font-mono text-zinc-300 mt-0.5">
                      {mine.coordinates.lat}° N, {mine.coordinates.lng}° E
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-500">State / District</span>
                    <p className="font-semibold text-white mt-0.5">
                      {mine.state} / {mine.district}
                    </p>
                  </div>
                </div>
              </div>

              {/* Linked Violations Preview */}
              <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Open Statutory Violations ({violations.length})
                  </h3>
                  <button
                    onClick={() => setActiveTab('violations')}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    View All →
                  </button>
                </div>
                {violations.length === 0 ? (
                  <p className="text-xs text-zinc-400">Zero active statutory notices.</p>
                ) : (
                  <div className="space-y-2.5">
                    {violations.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => navigate(`/violations/${v.id}`)}
                        className="p-3 rounded-lg bg-[#181d22] border border-white/[0.06] hover:border-red-500/40 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-red-400">{v.id}</span>
                            <span className="text-xs font-semibold text-zinc-200">{v.title}</span>
                          </div>
                          <span className="text-[11px] text-zinc-500">{v.regulation_clause}</span>
                        </div>
                        <StatusBadge status={v.severity} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: AI RAG & Strata Summary */}
            <div className="space-y-6">
              <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                  <Sparkles className="w-4 h-4" />
                  AI RAG Strata Intelligence
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Continuous LangGraph synthesis for {mine.name} indicates heightened strata displacement risks near fault line intersections.
                </p>
                <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200">
                  <strong>Recommendation:</strong> Ensure CMR-123 support plans are pre-tensioned to 120 kN along Seam XIII heading.
                </div>
              </div>

              <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('inspections')}
                    className="w-full text-left px-3 py-2 rounded bg-[#181d22] hover:bg-[#20252b] text-xs text-zinc-200 flex items-center justify-between transition-colors"
                  >
                    <span>View Inspection Log</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>
                  <button
                    onClick={() => setActiveTab('corrective-actions')}
                    className="w-full text-left px-3 py-2 rounded bg-[#181d22] hover:bg-[#20252b] text-xs text-zinc-200 flex items-center justify-between transition-colors"
                  >
                    <span>Remediation Action Items</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSPECTIONS TAB */}
        {activeTab === 'inspections' && (
          <div className="space-y-4">
            {inspections.length === 0 ? (
              <EmptyState title="No inspections logged for this mine" />
            ) : (
              <div className="bg-[#12161a] border border-white/[0.08] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#181d22] border-b border-white/[0.08] text-zinc-400 uppercase font-mono">
                    <tr>
                      <th className="p-3.5">ID</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Type</th>
                      <th className="p-3.5">Inspector</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {inspections.map((i) => (
                      <tr
                        key={i.id}
                        onClick={() => navigate(`/inspections/${i.id}`)}
                        className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                      >
                        <td className="p-3.5 font-mono font-bold text-amber-400">{i.id}</td>
                        <td className="p-3.5 text-zinc-300">{i.inspection_date}</td>
                        <td className="p-3.5 text-white font-medium">{i.type}</td>
                        <td className="p-3.5 text-zinc-300">{i.inspector_name}</td>
                        <td className="p-3.5"><StatusBadge status={i.status} /></td>
                        <td className="p-3.5 text-right text-amber-400 hover:underline">View Dossier →</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* OBSERVATIONS TAB */}
        {activeTab === 'observations' && (
          <div className="space-y-3">
            {observations.map((o) => (
              <div
                key={o.id}
                onClick={() => navigate(`/observations/${o.id}`)}
                className="p-4 rounded-xl bg-[#12161a] border border-white/[0.08] hover:border-amber-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">{o.id}</span>
                    <h4 className="text-sm font-bold text-white">{o.title}</h4>
                  </div>
                  <StatusBadge status={o.severity} />
                </div>
                <p className="text-xs text-zinc-400">{o.description}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Reported: {o.reported_by}</span>
                  <span className="text-amber-400">AI Confidence: {(o.ai_confidence_score * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIOLATIONS TAB */}
        {activeTab === 'violations' && (
          <div className="space-y-3">
            {violations.map((v) => (
              <div
                key={v.id}
                onClick={() => navigate(`/violations/${v.id}`)}
                className="p-4 rounded-xl bg-[#12161a] border border-white/[0.08] hover:border-red-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-red-400">{v.id}</span>
                    <h4 className="text-sm font-bold text-white">{v.title}</h4>
                  </div>
                  <StatusBadge status={v.severity} />
                </div>
                <p className="text-xs text-zinc-400">{v.description}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Clause: {v.regulation_clause}</span>
                  <span className="text-red-400">Due: {v.due_date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CORRECTIVE ACTIONS TAB */}
        {activeTab === 'corrective-actions' && (
          <div className="space-y-3">
            {actions.map((a) => (
              <div
                key={a.id}
                className="p-4 rounded-xl bg-[#12161a] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-amber-400">{a.id}</span>
                    <h4 className="text-sm font-bold text-white">{a.title}</h4>
                    {a.ai_recommended && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                        AI Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">{a.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={a.status} />
                  {a.status === 'pending_approval' && (
                    <button
                      onClick={() => approve(a.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded shadow"
                    >
                      Authorize
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-2">
              Statutory Compliance Dossier for {mine.name}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Tracked against Coal Mines Regulations 2017 &amp; Directorate General of Mines Safety circulars.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#181d22] border border-white/[0.06]">
                <span className="text-xs text-zinc-400">Statutory Score</span>
                <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {mine.compliance_score}%
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#181d22] border border-white/[0.06]">
                <span className="text-xs text-zinc-400">DGMS Category</span>
                <p className="text-2xl font-bold font-mono text-white mt-1">Grade A</p>
              </div>
              <div className="p-4 rounded-lg bg-[#181d22] border border-white/[0.06]">
                <span className="text-xs text-zinc-400">Last External Audit</span>
                <p className="text-2xl font-bold font-mono text-zinc-300 mt-1">14 Sep 2026</p>
              </div>
            </div>
          </div>
        )}

        {/* RISK & ACTIVITY TABS */}
        {(activeTab === 'risk' || activeTab === 'activity') && (
          <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
            <h3 className="text-base font-bold text-white capitalize mb-2">{activeTab} Details</h3>
            <p className="text-xs text-zinc-400">
              Live telemetry streams and geological sensor log for {mine.name} updated every 60 seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
