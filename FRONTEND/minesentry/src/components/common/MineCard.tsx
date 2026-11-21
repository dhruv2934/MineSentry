
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Mine } from '../../types';
import { StatusBadge } from './StatusBadge';
import { getMineImage } from '../../config/assets';

import { MapPin, TrendingUp } from 'lucide-react';

interface MineCardProps {
  mine: Mine;
}

export const MineCard: React.FC<MineCardProps> = ({ mine }) => {
  const navigate = useNavigate();

  // Image assigned using the real database Mine ID
  const imageSource = getMineImage(mine);

  // Remember failed images to avoid broken-image loops
  const [failedImage, setFailedImage] = useState<string | null>(
    null
  );

  const showImage = failedImage !== imageSource;

  // Location returned by FastAPI
  const locationText =
    [mine.location, mine.state]
      .filter(Boolean)
      .join(', ') || 'Location not provided';

  const productionText = mine.production_tons.toLocaleString(
    'en-IN',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  const openMineDetails = () => {
    navigate(`/mines/${mine.id}`);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openMineDetails}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          openMineDetails();
        }
      }}
      className="
        group relative flex min-h-[320px] cursor-pointer
        flex-col justify-end overflow-hidden rounded-2xl
        border border-white/[0.10] bg-[#12161a]
        transition-all duration-300
        hover:border-amber-500/50
        hover:shadow-2xl hover:shadow-amber-500/10
        focus:outline-none focus:ring-2 focus:ring-amber-500
      "
    >
      {/* ============================================ */}
      {/* BACKGROUND IMAGE */}
      {/* ============================================ */}

      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Gradient fallback */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-zinc-900 via-[#101418] to-black
          "
        />

        {/* Mine-specific photograph */}
        {showImage && (
          <img
            src={imageSource}
            alt={mine.name}
            loading="lazy"
            onError={() => setFailedImage(imageSource)}
            className="
              absolute inset-0 h-full w-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-105
            "
          />
        )}

        {/* Cinematic gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/[0.90]
            via-black/[0.48]
            to-black/[0.12]
          "
        />

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0 bg-black/[0.08]
            transition-all duration-300
            group-hover:bg-transparent
          "
        />

        {/* Hover glow */}
        <div
          className="
            pointer-events-none absolute -bottom-24
            left-1/2 h-48 w-72 -translate-x-1/2
            rounded-full bg-amber-400/[0.08]
            blur-[80px] opacity-0
            transition-opacity duration-500
            group-hover:opacity-100
          "
        />

      </div>

      {/* ============================================ */}
      {/* TOP BAR */}
      {/* ============================================ */}

      <div
        className="
          absolute left-4 right-4 top-4 z-10
          flex items-center justify-between
        "
      >
        {/* Mine Code */}
        <span
          className="
            rounded-lg border border-white/[0.12]
            bg-black/[0.48] px-2.5 py-1
            font-mono text-[10px] font-semibold
            tracking-[0.08em] text-zinc-200
            backdrop-blur-md
          "
        >
          {mine.code}
        </span>

        {/* Actual Backend Status */}
        <StatusBadge status={mine.status} />
      </div>

      {/* ============================================ */}
      {/* BOTTOM CONTENT */}
      {/* ============================================ */}

      <div
        className="
          relative z-10 flex flex-col
          justify-end p-5 md:p-6
        "
      >
        {/* Mine Name and Location */}
        <div className="mb-5">

          <h2
            className="
              text-xl font-bold tracking-tight text-white
              transition-colors duration-200
              md:text-2xl group-hover:text-amber-400
            "
          >
            {mine.name}
          </h2>

          <div
            className="
              mt-1.5 flex items-center gap-1.5
              text-xs text-zinc-300
            "
          >
            <MapPin
              className="
                h-3.5 w-3.5 shrink-0
                text-amber-400
              "
            />

            <span>{locationText}</span>
          </div>
        </div>

        {/* ======================================== */}
        {/* PRODUCTION PANEL */}
        {/* ======================================== */}

        <div
          className="
            -mx-2 rounded-xl border border-white/[0.10]
            bg-black/[0.48] px-3 py-3
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]
            backdrop-blur-md transition-all duration-300
            group-hover:border-white/[0.14]
            group-hover:bg-black/[0.38]
          "
        >
          <span
            className="
              block font-mono text-[10px] uppercase
              tracking-[0.12em] text-zinc-400
            "
          >
            Current Month Production
          </span>

          <span
            className="
              mt-1 flex items-center gap-2
              font-mono text-sm font-bold
              text-white md:text-base
            "
          >
            <TrendingUp
              className="
                h-4 w-4 shrink-0 text-emerald-400
              "
            />

            {productionText} tonnes
          </span>
        </div>
      </div>
    </div>
  );
};
