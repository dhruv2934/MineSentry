import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useObservations } from '../hooks/useObservations';
import { useMines } from '../hooks/useMines';
import { PageHeader } from '../components/common/PageHeader';
import { SearchBar } from '../components/common/SearchBar';
import { FilterSelect } from '../components/common/FilterSelect';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import {
  Eye,
  Sparkles,
  Cpu,
  ChevronRight,
  ShieldAlert,
  AlertTriangle,
  FileCheck2
} from 'lucide-react';

export const ObservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { mines } = useMines();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMine, setSelectedMine] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const { observations, loading } = useObservations({
    mine_id: selectedMine,
    severity: selectedSeverity,
    search: searchTerm
  });

  if (loading && observations.length === 0) {
    return <LoadingState message="Processing shift observations through LangGraph RAG pipeline..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Field Observations"
        subtitle="Mobile shift findings analyzed by LangGraph RAG against CMR 2017 &amp; DGMS circulars"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            AI RAG Verification Active
          </span>
        }
      />

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111417] p-3 rounded-lg border border-white/[0.08]">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search observations, detected hazards, or locations..."
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
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' }
            ]}
          />
        </div>
      </div>

      {/* Observations Grid */}
      {observations.length === 0 ? (
        <EmptyState
          title="No observations found"
          description="Try clearing your search terms or selecting another mine."
        />
      ) : (
        <div className="space-y-3.5">
          {observations.map((obs) => (
            <div
              key={obs.id}
              onClick={() => navigate(`/observations/${obs.id}`)}
              className="p-5 rounded-xl bg-[#12161a] border border-white/[0.08] hover:border-amber-500/50 hover:bg-[#15191e] transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                      {obs.id}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{obs.mine_name}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-400">{obs.location_in_mine}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {obs.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                    {obs.description}
                  </p>

                  {/* AI RAG Pipeline Badge */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-white/[0.04] text-[11px]">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>RAG Confidence: {(obs.ai_confidence_score * 100).toFixed(0)}%</span>
                    </div>

                    <div className="text-zinc-400 font-mono">
                      Detected Hazard: <span className="text-zinc-200">{obs.detected_hazard}</span>
                    </div>

                    {obs.rag_matched_clauses?.[0] && (
                      <div className="text-zinc-500 font-mono">
                        Matched: <span className="text-zinc-300">{obs.rag_matched_clauses[0].clause}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                  <StatusBadge status={obs.severity} />
                  <span className="text-[10px] font-mono text-zinc-500">{obs.observation_date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
