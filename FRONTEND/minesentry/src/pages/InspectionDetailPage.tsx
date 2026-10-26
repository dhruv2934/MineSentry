import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInspection } from '../hooks/useInspections';
import { useObservations } from '../hooks/useObservations';
import { useViolations } from '../hooks/useViolations';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import {
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Clock
} from 'lucide-react';

export const InspectionDetailPage: React.FC = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const navigate = useNavigate();
  const { inspection, loading } = useInspection(inspectionId);

  const { observations } = useObservations({ search: inspectionId });
  const { violations } = useViolations({ search: inspectionId });

  if (loading || !inspection) {
    return <LoadingState message="Loading inspection audit dossier..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Back button */}
      <button
        onClick={() => navigate('/inspections')}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Inspections</span>
      </button>

      {/* Header Banner */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
                {inspection.id}
              </span>
              <StatusBadge status={inspection.status} />
              {inspection.dgms_officer_present && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                  DGMS Attended
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {inspection.type}
            </h1>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
              <span>Facility:</span>
              <span
                onClick={() => navigate(`/mines/${inspection.mine_id}`)}
                className="text-amber-400 font-semibold hover:underline cursor-pointer"
              >
                {inspection.mine_name}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-zinc-500 block">
                Audit Date
              </span>
              <span className="text-sm font-mono text-zinc-200 font-semibold">
                {inspection.inspection_date}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/[0.06]">
          <div className="p-3 rounded-lg bg-[#181d22]">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Inspector</span>
            <p className="text-xs font-semibold text-white mt-0.5">{inspection.inspector_name}</p>
            <p className="text-[10px] text-zinc-500">{inspection.inspector_designation}</p>
          </div>

          <div className="p-3 rounded-lg bg-[#181d22]">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Shift &amp; Section</span>
            <p className="text-xs font-semibold text-white mt-0.5">{inspection.shift}</p>
            <p className="text-[10px] text-zinc-500">{inspection.section_inspected}</p>
          </div>

          <div className="p-3 rounded-lg bg-[#181d22]">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Observations</span>
            <p className="text-xs font-semibold font-mono text-cyan-400 mt-0.5">
              {inspection.observations_count} Logged
            </p>
            <p className="text-[10px] text-zinc-500">AI RAG verified</p>
          </div>

          <div className="p-3 rounded-lg bg-[#181d22]">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Violations Flagged</span>
            <p className="text-xs font-semibold font-mono text-red-400 mt-0.5">
              {inspection.violations_found} Statutory
            </p>
            <p className="text-[10px] text-zinc-500">Requires remediation</p>
          </div>
        </div>
      </div>

      {/* Audit Scope and Summary */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
          Executive Summary &amp; Scope
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">{inspection.summary}</p>
      </div>

      {/* Related Observations & Violations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Observations */}
        <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Linked Observations
            </h3>
            <span className="text-xs font-mono text-zinc-400">{observations.length} Found</span>
          </div>

          {observations.length === 0 ? (
            <p className="text-xs text-zinc-500">No abnormal observations logged during this audit.</p>
          ) : (
            <div className="space-y-3">
              {observations.map((obs) => (
                <div
                  key={obs.id}
                  onClick={() => navigate(`/observations/${obs.id}`)}
                  className="p-3 rounded-lg bg-[#181d22] border border-white/[0.06] hover:border-amber-500/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-400">{obs.id}</span>
                    <StatusBadge status={obs.severity} />
                  </div>
                  <h4 className="text-xs font-semibold text-white">{obs.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{obs.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Violations */}
        <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Resulting Statutory Violations
            </h3>
            <span className="text-xs font-mono text-zinc-400">{violations.length} Flagged</span>
          </div>

          {violations.length === 0 ? (
            <p className="text-xs text-zinc-500">No regulatory violations incurred.</p>
          ) : (
            <div className="space-y-3">
              {violations.map((vio) => (
                <div
                  key={vio.id}
                  onClick={() => navigate(`/violations/${vio.id}`)}
                  className="p-3 rounded-lg bg-[#181d22] border border-white/[0.06] hover:border-red-500/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-red-400">{vio.id}</span>
                    <StatusBadge status={vio.severity} />
                  </div>
                  <h4 className="text-xs font-semibold text-white">{vio.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">{vio.regulation_clause}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
