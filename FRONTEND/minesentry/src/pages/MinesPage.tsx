import React, { useState, useMemo } from 'react';
import { useMines } from '../hooks/useMines';
import { PageHeader } from '../components/common/PageHeader';
import { MineCard } from '../components/common/MineCard';
import { SearchBar } from '../components/common/SearchBar';
import { FilterSelect } from '../components/common/FilterSelect';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { Pickaxe, ShieldAlert } from 'lucide-react';

export const MinesPage: React.FC = () => {
  const { mines, loading, error, refetch } = useMines();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMines = useMemo(() => {
    return mines.filter((mine) => {
      const matchesSearch =
        mine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mine.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mine.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || mine.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [mines, searchTerm, statusFilter]);

  if (loading) {
    return <LoadingState message="Loading mine facility telemetry & photographic assets..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <PageHeader
        title="Mines"
        subtitle="Operational command of coal extraction sites, continuous miner panels, and opencast complexes"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
            {mines.length} Sites Tracked
          </span>
        }
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111417] p-3 rounded-lg border border-white/[0.08]">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search mine name, code, or location (e.g. Jharia, KB-OC-11)..."
          />
        </div>

        <div className="flex items-center gap-3">
          <FilterSelect
            label="Status:"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Under Audit', value: 'UNDER_AUDIT' },
              { label: 'Maintenance', value: 'MAINTENANCE' }
            ]}
          />
        </div>
      </div>

      {/* TWO LARGE CARDS PER ROW ON DESKTOP (Requirement 14) */}
      {filteredMines.length === 0 ? (
        <EmptyState
          title="No mine facilities found"
          description="Try clearing your search query or adjusting the status filter."
          actionText="Reset Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMines.map((mine) => (
            <MineCard key={mine.mine_id || mine.id} mine={mine} />
          ))}
        </div>
      )}
    </div>
  );
};
