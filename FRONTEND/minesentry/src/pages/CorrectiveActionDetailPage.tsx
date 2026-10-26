import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCorrectiveAction } from '../hooks/useCorrectiveActions';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import {
  ArrowLeft,
  CheckSquare,
  Sparkles,
  Calendar,
  User,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { ActionStatus } from '../types';

export const CorrectiveActionDetailPage: React.FC = () => {
  const { actionId } = useParams<{ actionId: string }>();
  const navigate = useNavigate();
  const { action, loading, refetch } = useCorrectiveAction(actionId);

  const [comment, setComment] = useState('');
  const [updating, setUpdating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (loading || !action) {
    return <LoadingState message="Loading corrective action engineering specifications..." />;
  }

  const handleStatusChange = async (newStatus: ActionStatus) => {
    setUpdating(true);
    // Simulate updating action status
    action.status = newStatus;
    if (newStatus === 'approved') {
      action.approval_details = {
        approved_by: 'Authorized Safety Engineer (You)',
        approval_timestamp: new Date().toISOString(),
        comments: comment || 'Approved for immediate field execution.'
      };
    }
    setUpdating(false);
    setToast(`Action status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      <button
        onClick={() => navigate('/corrective-actions')}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Corrective Actions</span>
      </button>

      {/* Header */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 font-bold">
                {action.id}
              </span>
              <StatusBadge status={action.status} />
              <StatusBadge status={action.priority} />
              {action.ai_recommended && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {action.title}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Facility: <span className="text-white font-semibold">{action.mine_name}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-500 block">Target Completion</span>
            <span className="text-sm font-mono text-amber-400 font-bold">{action.target_completion_date}</span>
            <p className="text-[11px] text-zinc-400 mt-1">Lead: {action.assigned_engineer}</p>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-6 pt-6 border-t border-white/[0.06]">
          <h3 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">
            Engineering Remediation Scope
          </h3>
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed bg-[#181d22] p-4 rounded-xl border border-white/[0.04]">
            {action.description}
          </p>
        </div>
      </div>

      {/* AI Recommendation Rationale (Requirement 23) */}
      {action.ai_recommended && action.recommendation_rationale && (
        <div className="bg-[#12161a] border border-cyan-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              LangGraph AI Rationale &amp; Statutory Justification
            </h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed bg-[#161a1e] p-4 rounded-xl border border-white/[0.04]">
            {action.recommendation_rationale}
          </p>
        </div>
      )}

      {/* Workflow Controls / Status Update */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
          Human Engineering Approval &amp; Workflow Execution
        </h3>

        {action.approval_details ? (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs mb-4">
            <div className="flex items-center justify-between text-emerald-300 font-bold mb-1">
              <span>Authorized by: {action.approval_details.approved_by}</span>
              <span className="font-mono text-[11px] text-zinc-400">
                {new Date(action.approval_details.approval_timestamp || '').toLocaleString()}
              </span>
            </div>
            <p className="text-zinc-300 mt-1">
              Comments: {action.approval_details.comments || 'No comments provided.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Authorization Notes / Dispatch Instructions
              </label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="e.g. Authorized urgent deployment from Central Mine Rescue inventory..."
                className="w-full bg-[#181d22] border border-white/[0.1] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStatusChange('approved')}
                disabled={updating}
                className="px-4 py-2 font-bold text-xs text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded shadow transition-all duration-150 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorize &amp; Dispatch Remedy</span>
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                disabled={updating}
                className="px-4 py-2 font-medium text-xs text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 rounded transition-colors"
              >
                Reject / Request Revision
              </button>
            </div>
          </div>
        )}

        {/* Change operational phase */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
          <span className="text-xs text-zinc-400">Advance Phase:</span>
          {(['approved', 'in_progress', 'completed'] as ActionStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                action.status === st
                  ? 'bg-amber-500 text-zinc-950 font-bold'
                  : 'bg-[#181d22] text-zinc-300 hover:bg-[#22272e]'
              }`}
            >
              {st.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
