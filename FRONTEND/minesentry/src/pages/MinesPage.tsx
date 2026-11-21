
import React, { useState, useMemo } from 'react';
import { useMines } from '../hooks/useMines';
import { PageHeader } from '../components/common/PageHeader';
import { MineCard } from '../components/common/MineCard';
import { SearchBar } from '../components/common/SearchBar';
import { FilterSelect } from '../components/common/FilterSelect';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';

export const MinesPage: React.FC = () => {
  const { mines, loading, error, refetch } = useMines();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter actual backend mine records
  const filteredMines = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return mines.filter((mine) => {
      const matchesSearch =
        mine.name.toLowerCase().includes(search) ||
        (mine.location ?? '').toLowerCase().includes(search) ||
        (mine.state ?? '').toLowerCase().includes(search) ||
        mine.code.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === 'all' ||
        mine.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [mines, searchTerm, statusFilter]);

  // Loading state
  if (loading) {
    return (
      <LoadingState message="Loading mine facilities..." />
    );
  }

  // API error state
  if (error) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <PageHeader
          title="Mines"
          subtitle="Manage and monitor registered mining sites"
        />

        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
          <h3 className="text-lg font-semibold text-red-400">
            Failed to load mines
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Page Header */}
      <PageHeader
        title="Mines"
        subtitle="Manage and monitor registered coal mining sites"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
            {mines.length} Sites Tracked
          </span>
        }
      />

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111417] p-3 rounded-lg border border-white/[0.08]">

        {/* Search */}
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by mine name, code, location, or state..."
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3">
          <FilterSelect
            label="Status:"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'ACTIVE' },
              { label: 'Inactive', value: 'INACTIVE' }
            ]}
          />
        </div>
      </div>

      {/* Mine Cards */}
      {filteredMines.length === 0 ? (
        <EmptyState
          title="No mine facilities found"
          description={
            mines.length === 0
              ? "No mines have been registered yet."
              : "Try clearing your search query or adjusting the status filter."
          }
          actionText="Reset Filters"
          onAction={() => {
            setSearchTerm('');
            setStatusFilter('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMines.map((mine) => (
            <MineCard
              key={mine.id}
              mine={mine}
            />
          ))}
        </div>
      )}

    </div>
  );
};
