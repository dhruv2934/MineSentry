import React, { useState } from 'react';
import { useRegulations } from '../hooks/useRegulations';
import { PageHeader } from '../components/common/PageHeader';
import { SearchBar } from '../components/common/SearchBar';
import { LoadingState } from '../components/common/LoadingState';
import {
  BookOpen,
  Gavel,
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const RegulationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { regulations, loading } = useRegulations(searchQuery);
  const [selectedReg, setSelectedReg] = useState<string | null>(null);

  if (loading && regulations.length === 0) {
    return <LoadingState message="Indexing Coal Mines Regulations 2017 &amp; DGMS circulars..." />;
  }

  const activeRegulation =
    regulations.find((r) => r.id === selectedReg) || regulations[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageHeader
        title="Regulatory Codex"
        subtitle="DGMS Safety Directives, Coal Mines Regulations (CMR 2017), and statutory compliance benchmarks"
        badge={
          <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            260+ Statutory Articles Indexed
          </span>
        }
      />

      {/* Search Header */}
      <div className="bg-[#111417] p-3.5 rounded-lg border border-white/[0.08] max-w-xl">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Semantic search regulations (e.g. CMR 123 support, CMR 153 ventilation, DGMS Circular)..."
        />
      </div>

      {/* Master-Detail Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Regulation List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {regulations.map((reg) => {
            const isSelected = activeRegulation?.id === reg.id;
            return (
              <div
                key={reg.id}
                onClick={() => setSelectedReg(reg.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#181d22] border-amber-500 shadow-lg shadow-amber-500/5'
                    : 'bg-[#12161a] border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {reg.code}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {reg.risk_category}
                  </span>
                </div>
                <h4 className="text-xs md:text-sm font-bold text-white mb-1">
                  {reg.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2">{reg.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Statutory Text Dossier (7 cols) */}
        {activeRegulation && (
          <div className="lg:col-span-7 bg-[#12161a] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6 sticky top-24">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {activeRegulation.code}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeRegulation.chapter}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {activeRegulation.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">{activeRegulation.act_name}</p>
            </div>

            {/* Official Statutory Text */}
            <div className="p-5 rounded-xl bg-[#181d22] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                Official Statutory Enactment Text
              </span>
              <p className="text-xs md:text-sm text-zinc-200 leading-relaxed whitespace-pre-line font-serif">
                "{activeRegulation.full_text}"
              </p>
            </div>

            {/* Penalties & Closure Mandates */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 flex items-start gap-3">
              <Gavel className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-red-300 block">
                  Statutory Penalty &amp; Closure Consequence
                </span>
                <p className="text-xs text-zinc-300 mt-1">
                  {activeRegulation.statutory_penalty}
                </p>
              </div>
            </div>

            {/* RAG Embedding Status */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Vector Embeddings Live in LangGraph RAG
              </span>
              <span className="font-mono text-zinc-500">DGMS Standard v2.4</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
