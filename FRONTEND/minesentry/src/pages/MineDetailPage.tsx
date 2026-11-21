
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import type { Mine } from '../types';
import { useMine } from '../hooks/useMines';
import { getMineImage } from '../config/assets';

import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';

import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  Pickaxe,
  CalendarDays,
  Clock3,
  Hash,
  Building2,
  Map,
  ClipboardCheck,
  ChevronRight,
} from 'lucide-react';

// ======================================================
// FUTURE MODULE IMPORTS
// Uncomment after connecting their backend APIs.
// ======================================================

// import { useInspections } from '../hooks/useInspections';
// import { useObservations } from '../hooks/useObservations';
// import { useViolations } from '../hooks/useViolations';
// import { useCorrectiveActions } from '../hooks/useCorrectiveActions';
// import { cn } from '../utils/cn';

// ======================================================
// DATE FORMATTER
// ======================================================

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Unavailable';
  }

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ======================================================
// MINE BANNER IMAGE
// Uses the same image mapping as MineCard.tsx
// ======================================================

interface MineBannerImageProps {
  mine: Mine;
}

const MineBannerImage: React.FC<MineBannerImageProps> = ({
  mine,
}) => {
  // Get image using database mine ID
  const imageSource = getMineImage(mine);

  const [failedImage, setFailedImage] = useState<string | null>(
    null
  );

  const showImage = failedImage !== imageSource;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">

      {/* Gradient fallback if image is unavailable */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-zinc-800 via-[#12161a] to-black
        "
      />

      {/* Mine-specific image */}
      {showImage && (
        <img
          src={imageSource}
          alt={mine.name}
          onError={() => setFailedImage(imageSource)}
          className="
            absolute inset-0
            h-full w-full
            object-cover object-center
          "
        />
      )}

      {/* Dark overlay for text visibility */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-[#080a0c]/90
          via-[#080a0c]/45
          to-[#080a0c]/10
        "
      />
    </div>
  );
};

// ======================================================
// FUTURE NAVIGATION TABS
// ======================================================

/*
type MineTab =
  | 'overview'
  | 'inspections'
  | 'observations'
  | 'violations'
  | 'corrective-actions'
  | 'compliance'
  | 'risk'
  | 'activity';
*/

// ======================================================
// MINE DETAIL PAGE
// ======================================================

export const MineDetailPage: React.FC = () => {
  const { mineId } = useParams<{ mineId: string }>();
  const navigate = useNavigate();

  const { mine, loading, error, refetch } = useMine(mineId);

  // ====================================================
  // FUTURE MODULE STATE AND HOOKS
  // ====================================================

  /*
  const [activeTab, setActiveTab] =
    useState<MineTab>('overview');

  // Connect these to real backend services first.

  const { inspections } = useInspections({
    mine_id: mineId
  });

  const { observations } = useObservations({
    mine_id: mineId
  });

  const { violations } = useViolations({
    mine_id: mineId
  });

  const { actions } = useCorrectiveActions({
    mine_id: mineId
  });

  // Update mine_id filtering and type definitions
  // according to each finalized backend API.
  */

  // ====================================================
  // LOADING STATE
  // ====================================================

  if (loading) {
    return (
      <LoadingState message="Loading mine details..." />
    );
  }

  // ====================================================
  // API ERROR STATE
  // ====================================================

  if (error) {
    return (
      <div className="space-y-6">

        <button
          onClick={() => navigate('/mines')}
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Mines
        </button>

        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">

          <h2 className="text-lg font-bold text-red-400">
            Unable to load mine details
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            {error}
          </p>

          <button
            onClick={() => void refetch()}
            className="mt-5 rounded-lg bg-amber-400 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-300"
          >
            Retry
          </button>

        </div>
      </div>
    );
  }

  // ====================================================
  // MINE NOT FOUND
  // ====================================================

  if (!mine) {
    return (
      <EmptyState
        title="Mine not found"
        description="The requested mine does not exist."
        actionText="Back to Mines"
        onAction={() => navigate('/mines')}
      />
    );
  }

  // ====================================================
  // REAL BACKEND DATA
  // ====================================================

  const locationText =
    [mine.location, mine.state]
      .filter(Boolean)
      .join(', ') || 'Location not provided';

  const production = mine.production_tons.toLocaleString(
    'en-IN',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  // ====================================================
  // PAGE RENDER
  // ====================================================

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* ============================================== */}
      {/* BACK NAVIGATION */}
      {/* ============================================== */}

      <button
        onClick={() => navigate('/mines')}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Mines Portfolio</span>
      </button>

      {/* ============================================== */}
      {/* MINE HERO BANNER */}
      {/* ============================================== */}

      <div
        className="
          relative flex min-h-[300px] flex-col
          justify-end overflow-hidden rounded-2xl
          border border-white/[0.1] bg-[#12161a]
          p-6 md:p-8
        "
      >

        {/* Actual image assigned to this mine */}
        <MineBannerImage
          key={mine.id}
          mine={mine}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            {/* Mine Code and Status */}
            <div className="mb-3 flex items-center gap-2.5">

              <span className="rounded border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-xs tracking-wider text-amber-300">
                {mine.code}
              </span>

              <StatusBadge status={mine.status} />

            </div>

            {/* Mine Name */}
            <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
              {mine.name}
            </h1>

            {/* Location */}
            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-300">

              <MapPin className="h-4 w-4 text-amber-400" />

              <span>{locationText}</span>

            </div>
          </div>

          {/* Inspection Navigation */}
          <button
            onClick={() => navigate('/inspections')}
            className="rounded bg-amber-400 px-4 py-2 text-xs font-semibold text-zinc-950 shadow transition-all hover:bg-amber-300"
          >
            + Conduct Inspection
          </button>

        </div>
      </div>

      {/* ============================================== */}
      {/* SUMMARY CARDS */}
      {/* ============================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* PRODUCTION */}
        <div className="rounded-xl border border-white/[0.08] bg-[#12161a] p-5">

          <div className="flex items-center gap-2 text-zinc-400">

            <TrendingUp className="h-4 w-4 text-emerald-400" />

            <span className="font-mono text-[11px] uppercase">
              Current Month Production
            </span>

          </div>

          <p className="mt-3 font-mono text-xl font-bold text-white md:text-2xl">
            {production}

            <span className="ml-2 text-sm text-zinc-400">
              tonnes
            </span>
          </p>
        </div>

        {/* OPERATIONAL STATUS */}
        <div className="rounded-xl border border-white/[0.08] bg-[#12161a] p-5">

          <div className="flex items-center gap-2 text-zinc-400">

            <Pickaxe className="h-4 w-4 text-amber-400" />

            <span className="font-mono text-[11px] uppercase">
              Operational Status
            </span>

          </div>

          <div className="mt-4">
            <StatusBadge status={mine.status} size="md" />
          </div>
        </div>

        {/* DATABASE MINE ID */}
        <div className="rounded-xl border border-white/[0.08] bg-[#12161a] p-5">

          <div className="flex items-center gap-2 text-zinc-400">

            <Hash className="h-4 w-4 text-cyan-400" />

            <span className="font-mono text-[11px] uppercase">
              Database Mine ID
            </span>

          </div>

          <p className="mt-3 font-mono text-xl font-bold text-white md:text-2xl">
            #{mine.id}
          </p>
        </div>

      </div>

      {/* ============================================== */}
      {/* FUTURE SUMMARY STATISTICS */}
      {/* ============================================== */}

      {/*
        FUTURE AGGREGATED METRICS

        Restore these after implementing backend
        aggregation endpoints.

        Example:

        <StatCard
          title="Active Workforce"
          value={mineStats.active_workers}
        />

        <StatCard
          title="Open Violations"
          value={mineStats.open_violations}
        />

        <StatCard
          title="Active Inspections"
          value={mineStats.active_inspections}
        />

        <StatCard
          title="Open Corrective Actions"
          value={mineStats.open_corrective_actions}
        />

        The StatCard component is illustrative.
        These values must come from a real API.
      */}

      {/* ============================================== */}
      {/* FUTURE TABS - COMMENTED OUT */}
      {/* ============================================== */}

      {/*
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/[0.08]">

        {[
          'overview',
          'inspections',
          'observations',
          'violations',
          'corrective-actions',
          'compliance',
          'risk',
          'activity'
        ].map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab as MineTab)}
            className={
              activeTab === tab
                ? 'border-b-2 border-amber-500 px-4 py-3 text-amber-400'
                : 'px-4 py-3 text-zinc-400'
            }
          >
            {tab.replace(/-/g, ' ').toUpperCase()}
          </button>

        ))}
      </div>
      */}

      {/* ============================================== */}
      {/* MAIN CONTENT */}
      {/* ============================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-2">

          {/* ========================================== */}
          {/* MINE INFORMATION */}
          {/* ========================================== */}

          <div className="rounded-xl border border-white/[0.08] bg-[#12161a] p-6">

            <div className="mb-6 flex items-center gap-2">

              <Building2 className="h-4 w-4 text-amber-400" />

              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Mine Information
              </h3>

            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Mine Name */}
              <div>
                <span className="block text-xs text-zinc-500">
                  Mine Name
                </span>

                <p className="mt-1 text-sm font-semibold text-white">
                  {mine.name}
                </p>
              </div>

              {/* Mine Code */}
              <div>
                <span className="block text-xs text-zinc-500">
                  Mine Code
                </span>

                <p className="mt-1 font-mono text-sm font-semibold text-amber-400">
                  {mine.code}
                </p>
              </div>

              {/* Location */}
              <div>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" />
                  Location
                </span>

                <p className="mt-1 text-sm font-semibold text-white">
                  {mine.location ?? 'Not provided'}
                </p>
              </div>

              {/* State */}
              <div>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <Map className="h-3.5 w-3.5" />
                  State
                </span>

                <p className="mt-1 text-sm font-semibold text-white">
                  {mine.state ?? 'Not provided'}
                </p>
              </div>

              {/* Created At */}
              <div>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Created At
                </span>

                <p className="mt-1 text-sm font-semibold text-white">
                  {formatDate(mine.created_at)}
                </p>
              </div>

              {/* Updated At */}
              <div>
                <span className="flex items-center gap-1 text-xs text-zinc-500">
                  <Clock3 className="h-3.5 w-3.5" />
                  Last Updated
                </span>

                <p className="mt-1 text-sm font-semibold text-white">
                  {formatDate(mine.updated_at)}
                </p>
              </div>

            </div>
          </div>

          {/* ========================================== */}
          {/* FUTURE INSPECTIONS TAB */}
          {/* ========================================== */}

          {/*
            Restore after connecting useInspections
            to the real Inspection API.

            Expected fields:

            id
            mine_id
            inspection_date
            inspection_type
            inspector_name
            status
            priority

            Example future rendering:

            {activeTab === 'inspections' && (
              <InspectionTable inspections={inspections} />
            )}
          */}

          {/* ========================================== */}
          {/* FUTURE OBSERVATIONS TAB */}
          {/* ========================================== */}

          {/*
            Restore after connecting Observation APIs.

            Observations should be retrieved through
            inspections associated with this mine.

            Use:
            observation_text
            location
            severity
            evidence_url

            Do not display unsupported AI confidence.
          */}

          {/* ========================================== */}
          {/* FUTURE VIOLATIONS TAB */}
          {/* ========================================== */}

          {/*
            Restore after connecting Violation APIs.

            Relationship:

            Mine
              -> Inspection
              -> Observation
              -> Violation

            Display actual:
            title
            description
            severity
            category
            status
            risk_score

            Regulation references should come from
            the real regulation association API.
          */}

          {/* ========================================== */}
          {/* FUTURE CORRECTIVE ACTIONS TAB */}
          {/* ========================================== */}

          {/*
            Restore after connecting CorrectiveAction APIs.

            Display:
            title
            description
            assigned_to
            due_date
            status
            completed_at
            risk_score

            Only implement approval/completion controls
            after backend status transitions are finalized.
          */}

          {/* ========================================== */}
          {/* FUTURE COMPLIANCE TAB */}
          {/* ========================================== */}

          {/*
            Restore when a real compliance score or
            verified audit information is available.

            Do not hardcode DGMS grades or audit dates.
          */}

          {/* ========================================== */}
          {/* FUTURE RISK TAB */}
          {/* ========================================== */}

          {/*
            Restore after connecting the deterministic
            risk assessment engine.

            Calculate mine-level risk only after
            defining the aggregation formula.
          */}

          {/* ========================================== */}
          {/* FUTURE ACTIVITY TAB */}
          {/* ========================================== */}

          {/*
            Restore when actual timestamped activity
            logs or lifecycle events are available.

            Do not display simulated live telemetry.
          */}

        </div>

        {/* ============================================ */}
        {/* RIGHT COLUMN */}
        {/* ============================================ */}

        <div className="space-y-6">

          {/* QUICK ACTIONS */}
          <div className="rounded-xl border border-white/[0.08] bg-[#12161a] p-6">

            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Quick Actions
            </h4>

            <div className="space-y-2">

              <button
                onClick={() => navigate('/inspections')}
                className="flex w-full items-center justify-between rounded bg-[#181d22] px-3 py-3 text-left text-xs text-zinc-200 transition-colors hover:bg-[#20252b]"
              >
                <span className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-amber-400" />
                  View Inspections
                </span>

                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </button>

              <button
                onClick={() => navigate('/mines')}
                className="flex w-full items-center justify-between rounded bg-[#181d22] px-3 py-3 text-left text-xs text-zinc-200 transition-colors hover:bg-[#20252b]"
              >
                <span className="flex items-center gap-2">
                  <Pickaxe className="h-4 w-4 text-amber-400" />
                  All Mines
                </span>

                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </button>

            </div>
          </div>

          {/* DATA SOURCE */}
          <div className="rounded-xl border border-white/[0.08] bg-[#12161a] p-6">

            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
              Data Source
            </h4>

            <p className="text-xs leading-relaxed text-zinc-400">
              Mine information is retrieved from the
              MineSentry FastAPI backend and stored
              in PostgreSQL.
            </p>

          </div>

          {/* ========================================== */}
          {/* FUTURE AI / RAG PANEL */}
          {/* ========================================== */}

          {/*
            Restore only when the AI/RAG backend
            returns verified analysis results.

            Required:
            - Actual AI analysis
            - Related RegulationChunk references
            - Processing status
            - Generation timestamp
            - No hardcoded safety claims
          */}

        </div>
      </div>
    </div>
  );
};
