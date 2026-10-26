import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useObservation } from '../hooks/useObservations';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import {
  ArrowLeft,
  Sparkles,
  Cpu,
  BookOpen,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const ObservationDetailPage: React.FC = () => {
  const { observationId } = useParams<{ observationId: string }>();
  const navigate = useNavigate();
  const { observation, loading } = useObservation(observationId);

  if (loading || !observation) {
    return <LoadingState message="Retrieving LangGraph RAG embeddings & statutory matches..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <button
        onClick={() => navigate('/observations')}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Observations</span>
      </button>

      {/* Header */}
      <div className="bg-[#12161a] border border-white/[0.08] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-bold">
                {observation.id}
              </span>
              <StatusBadge status={observation.severity} />
              <StatusBadge status={observation.status} />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {observation.title}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Logged at <span className="text-white">{observation.mine_name}</span> · {observation.location_in_mine}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-zinc-500 block">Logged Timestamp</span>
            <span className="text-xs font-mono text-zinc-300">{observation.observation_date}</span>
            <p className="text-[11px] text-zinc-400 mt-1">Reporter: {observation.reported_by}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.06]">
          <h3 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">Field Observation Narrative</h3>
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed bg-[#181d22] p-4 rounded-xl border border-white/[0.04]">
            {observation.description}
          </p>
        </div>
      </div>

      {/* 2. THE AI / RAG INTELLIGENCE PIPELINE CARD (Requirement 23) */}
      <div className="bg-[#12161a] border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                LangGraph Regulatory RAG Synthesis
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono">
                  Confidence: {(observation.ai_confidence_score * 100).toFixed(0)}%
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Vector semantic retrieval matched against 260+ clauses in Coal Mines Regulations 2017
              </p>
            </div>
          </div>
        </div>

        {/* Hazard Classification */}
        <div className="p-3.5 rounded-lg bg-[#181d22] border border-white/[0.06] mb-5">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
            Detected Geological / Mechanical Hazard
          </span>
          <p className="text-xs font-semibold text-amber-300">
            {observation.detected_hazard}
          </p>
        </div>

        {/* Matched Statutory Regulations */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Statutory Regulations Matched via RAG Embeddings
          </h3>

          <div className="space-y-3">
            {observation.rag_matched_clauses.map((clause, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#161a1e] border border-white/[0.06] hover:border-amber-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white font-mono">{clause.clause}</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    Similarity: {(clause.similarity_score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{clause.citation}</p>
                <div className="mt-2.5 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-mono">Reference ID: {clause.regulation_id}</span>
                  <button
                    onClick={() => navigate('/regulations')}
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    View in Codex <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Step CTA */}
        {observation.recommended_violation_flag && (
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              <strong className="text-red-400">Action Recommended:</strong> AI flagged this observation as a statutory violation requiring immediate remediation.
            </div>
            <button
              onClick={() => navigate('/violations')}
              className="px-4 py-2 text-xs font-bold text-zinc-950 bg-red-400 hover:bg-red-300 rounded shadow transition-colors flex items-center gap-1.5"
            >
              <span>Inspect Violation Notices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
