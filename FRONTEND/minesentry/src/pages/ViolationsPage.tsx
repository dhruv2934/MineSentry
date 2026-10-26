import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useViolations } from '../hooks/useViolations';
import { useMines } from '../hooks/useMines';
import { PageHeader } from '../components/common/PageHeader';
import { SearchBar } from '../components/common/SearchBar';
import { FilterSelect } from '../components/common/FilterSelect';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  ChevronRight,
  ShieldAlert,
  Gavel
} from 'lucide-react';

export const ViolationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { mines } = useMines();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMine, setSelectedMine] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const { violations, loading } = useViolations({
    mine_id: selectedMine,
    severity: selectedSeverity,
    search: searchTerm
  });

  if (loading && violations.length === 0) {
    return <LoadingState message="Auditing statutory violations against Mines Act & CMR 2017..." />;
  }

  const criticalCount = violations.filter((v) => v.severity === 'Critical').length;
  const majorCount = violations.filter((v) => v.severity === 'Major').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Statutory Violations"
        subtitle="Manage DGMS citations, CMR 2017 regulatory non-compliances, and statutory show-cause risks"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
            {violations.length} Open Violations ({criticalCount} Critical)
          </span>
        }
      />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111417] p-3.5 rounded-lg border border-white/[0.08]">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search violation title, regulation clause, or mine..."
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
            label="Severity:"
            value={selectedSeverity}
            onChange={setSelectedSeverity}
            options={[
              { label: 'All Severities', value: 'all' },
              { label: 'Critical', value: 'critical' },
              { label: 'Major', value: 'major' },
              { label: 'Moderate', value: 'moderate' },
              { label: 'Minor', value: 'minor' }
            ]}
          />
        </div>
      </div>

      {/* Violations Table */}
      {violations.length === 0 ? (
        <EmptyState
          title="No violations found"
          description="All operations are currently compliant with selected criteria."
        />
      ) : (
        <div className="bg-[#12161a] border border-white/[0.08] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161a1e] border-b border-white/[0.08] text-zinc-400 font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-4">Violation ID</th>
                  <th className="p-4">Mine</th>
                  <th className="p-4">Regulation &amp; Act</th>
                  <th className="p-4">Issue Title</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Statutory Risk</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {violations.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => navigate(`/violations/${v.id}`)}
                    className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                  >
                    <td className="p-4 font-mono font-bold text-red-400 group-hover:text-red-300">
                      {v.id}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {v.mine_name}
                    </td>
                    <td className="p-4 text-zinc-300 max-w-xs truncate">
                      <span className="font-mono text-amber-400 block">{v.regulation_clause}</span>
                      <span className="text-[10px] text-zinc-500">{v.act_name}</span>
                    </td>
                    <td className="p-4 text-zinc-200 font-medium max-w-xs truncate">
                      {v.title}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={v.severity} />
                    </td>
                    <td className="p-4 text-zinc-400 max-w-xs truncate text-[11px]">
                      {v.penalty_risk}
                    </td>
                    <td className="p-4 font-mono text-zinc-300">
                      {v.due_date}
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1">
                        Inspect <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
