import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCorrectiveActions } from '../hooks/useCorrectiveActions';
import { useMines } from '../hooks/useMines';
import { PageHeader } from '../components/common/PageHeader';
import { SearchBar } from '../components/common/SearchBar';
import { FilterSelect } from '../components/common/FilterSelect';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import {
  CheckSquare,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const CorrectiveActionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { mines } = useMines();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMine, setSelectedMine] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const { actions, loading, approve, reject } = useCorrectiveActions({
    mine_id: selectedMine,
    status: selectedStatus,
    search: searchTerm
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApprove = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await approve(id, 'Authorized by Chief Safety Officer');
    setToastMessage(`Action ${id} successfully approved and dispatched to engineering crew!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleReject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await reject(id, 'Requires revised support plan density');
    setToastMessage(`Action ${id} marked as rejected for engineering review.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  if (loading && actions.length === 0) {
    return <LoadingState message="Loading engineering remedies and AI recommendation pipeline..." />;
  }

  const pendingApprovals = actions.filter((a) => a.status === 'pending_approval');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <PageHeader
        title="Corrective Actions"
        subtitle="Review AI-recommended engineering remedies and monitor physical execution across mine panels"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            {pendingApprovals.length} Pending Sign-off
          </span>
        }
      />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111417] p-3.5 rounded-lg border border-white/[0.08]">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search action title, assigned engineer, or mine..."
          />
        </div>

        <div className="flex items-center gap-3">
          <FilterSelect
            label="Mine:"
            value={selectedMine}
            onChange={setSelectedMine}
            options={[
              { label: 'All Mines', value: 'all' },
              ...mines.map((m) => ({ label: m.name, value: m.mine_id || m.id }))
            ]}
          />

          <FilterSelect
            label="Status:"
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Pending Approval', value: 'pending_approval' },
              { label: 'Approved', value: 'approved' },
              { label: 'In Progress', value: 'in_progress' },
              { label: 'Completed', value: 'completed' },
              { label: 'Rejected', value: 'rejected' }
            ]}
          />
        </div>
      </div>

      {/* Actions List */}
      {actions.length === 0 ? (
        <EmptyState
          title="No corrective actions found"
          description="Try changing your search query or filters."
        />
      ) : (
        <div className="space-y-3.5">
          {actions.map((act) => (
            <div
              key={act.id}
              onClick={() => navigate(`/corrective-actions/${act.id}`)}
              className="p-5 rounded-xl bg-[#12161a] border border-white/[0.08] hover:border-amber-500/50 hover:bg-[#15191e] transition-all cursor-pointer group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/20">
                      {act.id}
                    </span>
                    <span className="text-xs font-semibold text-white">{act.mine_name}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs font-mono text-zinc-400">
                      Target: {act.target_completion_date}
                    </span>
                    {act.ai_recommended && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        AI Recommended
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {act.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-4xl">
                    {act.description}
                  </p>

                  <div className="mt-2.5 text-[11px] text-zinc-500 font-mono">
                    Assigned Lead: <span className="text-zinc-300">{act.assigned_engineer}</span>
                  </div>
                </div>

                {/* Right Action / Workflow Buttons */}
                <div className="flex items-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                  <StatusBadge status={act.status} />

                  {act.status === 'pending_approval' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleApprove(act.id, e)}
                        className="px-3 py-1.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 rounded shadow transition-all duration-150 flex items-center gap-1"
                        title="Authorize Engineering Dispatch"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Authorize</span>
                      </button>
                      <button
                        onClick={(e) => handleReject(act.id, e)}
                        className="px-2.5 py-1.5 text-xs font-medium text-red-300 hover:text-white bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 rounded transition-colors"
                        title="Request Revision"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 transition-colors hidden sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
