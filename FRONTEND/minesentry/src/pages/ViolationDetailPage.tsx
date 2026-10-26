import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useViolation } from '../hooks/useViolations';
import { useCorrectiveActions } from '../hooks/useCorrectiveActions';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import {
  ArrowLeft,
  AlertOctagon,
  Gavel,
  Calendar,
  User,
  ShieldAlert,
  ArrowRight,
  FileCheck2,
  CheckSquare
} from 'lucide-react';

export const ViolationDetailPage: React.FC = () => {
  const { violationId } = useParams<{ violationId: string }>();
  const navigate = useNavigate();
  const { violation, loading } = useViolation(violationId);
  const { actions } = useCorrectiveActions({ search: violationId });

  if (loading || !violation) {
    return <LoadingState message="Loading violation statutory dossier & legal risk..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <button
        onClick={() => navigate('/violations')}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Violations</span>
      </button>

      {/* Header */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-300 font-bold">
                {violation.id}
              </span>
              <StatusBadge status={violation.severity} />
              <StatusBadge status={violation.status} />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {violation.title}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Facility: <span className="text-white font-semibold">{violation.mine_name}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-500 block">Remediation Due</span>
            <span className="text-sm font-mono text-red-400 font-bold">{violation.due_date}</span>
            <p className="text-[11px] text-zinc-400 mt-1">Assigned: {violation.assigned_to}</p>
          </div>
        </div>

        {/* Statutory Citation Banner */}
        <div className="mt-6 p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-start gap-3">
          <Gavel className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-mono font-bold text-red-300 block">
              {violation.act_name} — {violation.regulation_clause}
            </span>
            <p className="text-xs text-zinc-300 mt-1">
              <strong>Statutory Legal Exposure:</strong> {violation.penalty_risk}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 pt-6 border-t border-white/[0.06]">
          <h3 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">
            Non-Compliance Narrative
          </h3>
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed bg-[#181d22] p-4 rounded-xl border border-white/[0.04]">
            {violation.description}
          </p>
        </div>

        {violation.closure_evidence && (
          <div className="mt-4 p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
            <strong>Remediation Note:</strong> {violation.closure_evidence}
          </div>
        )}
      </div>

      {/* Linked Corrective Actions */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-amber-400" />
            Remedial Engineering Actions
          </h3>
          <button
            onClick={() => navigate('/corrective-actions')}
            className="text-xs text-amber-400 hover:underline"
          >
            All Actions →
          </button>
        </div>

        {actions.length === 0 ? (
          <p className="text-xs text-zinc-400">No corrective actions logged specifically for this violation.</p>
        ) : (
          <div className="space-y-3">
            {actions.map((act) => (
              <div
                key={act.id}
                onClick={() => navigate(`/corrective-actions/${act.id}`)}
                className="p-4 rounded-lg bg-[#181d22] border border-white/[0.06] hover:border-amber-500/40 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-amber-400">{act.id}</span>
                    <h4 className="text-xs font-bold text-white">{act.title}</h4>
                  </div>
                  <p className="text-[11px] text-zinc-400">{act.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={act.status} />
                  <span className="text-xs text-amber-400 font-medium hover:underline flex items-center gap-1">
                    Inspect Action <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
