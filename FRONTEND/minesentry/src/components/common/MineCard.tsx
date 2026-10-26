import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Mine } from '../../types';
import { StatusBadge } from './StatusBadge';

import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Layers,
} from 'lucide-react';


// =========================================================
// LOCAL MINE BACKGROUND IMAGES
// =========================================================
//
// These files are inside:
//
// public/assets/images/mines/
//
// Files:
// mine1.avif
// mine2.jpeg
// mine3.webp
// mine4.jpeg
// mine5.jpeg
// mine6.jpg
//
// Because they are inside "public", we reference them
// using root-relative URLs instead of importing them.
// =========================================================

const mineImagesByCode: Record<string, string> = {
  // Mine 1
  'JH-UG-04': '/assets/images/mines/mine1.avif',

  // Mine 2
  'KB-OC-11': '/assets/images/mines/mine2.jpeg',

  // Mine 3
  'SG-OC-02': '/assets/images/mines/mine3.webp',

  // Mine 4
  'TL-DS-08': '/assets/images/mines/mine4.jpeg',

  // Mine 5
   
   
    'RN-UG-01': '/assets/images/mines/mine5.jpeg',
    'NY-OC-06': '/assets/images/mines/mine6.jpg',
   
};


// =========================================================
// GET BACKGROUND IMAGE
// =========================================================

const getMineImage = (mine: Mine): string | undefined => {

  /*
   * First look for a locally mapped image using
   * the mine code.
   */
  const localImage = mineImagesByCode[mine.code];

  if (localImage) {
    return localImage;
  }


  /*
   * Fallback:
   * If a particular mine does not yet have a local
   * image mapping, use the existing image_url.
   */
  return mine.image_url || undefined;
};


// =========================================================
// MINE CARD
// =========================================================

interface MineCardProps {
  mine: Mine;
}


export const MineCard: React.FC<MineCardProps> = ({ mine }) => {

  const navigate = useNavigate();

  const backgroundImage = getMineImage(mine);


  return (

    <div
      onClick={() =>
        navigate(`/mines/${mine.mine_id || mine.id}`)
      }

      className="
        group
        relative
        flex
        min-h-[320px]
        cursor-pointer
        flex-col
        justify-end
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.10]
        bg-[#12161a]

        transition-all
        duration-300

        hover:border-amber-500/50

        hover:shadow-2xl
        hover:shadow-amber-500/10
      "
    >


      {/* ===================================================== */}
      {/* BACKGROUND IMAGE */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >

        {backgroundImage ? (

          <img
            src={backgroundImage}
            alt={mine.name}

            className="
              h-full
              w-full
              object-cover

              transition-transform
              duration-700
              ease-out

              group-hover:scale-105
            "

            onError={(e) => {

              /*
               * If the local image fails, fall back
               * to the image_url supplied by the backend.
               */
              const target = e.currentTarget;

              if (
                mine.image_url &&
                target.src !== mine.image_url
              ) {
                target.src = mine.image_url;
              }

            }}
          />

        ) : (

          /*
           * Fallback appearance when no image exists.
           */
          <div
            className="
              h-full
              w-full
              bg-gradient-to-br
              from-zinc-900
              via-[#101418]
              to-black
            "
          />

        )}


        {/* ================================================= */}
        {/* CINEMATIC IMAGE OVERLAY */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/[0.95]
            via-black/[0.62]
            to-black/[0.18]
          "
        />


        {/* ================================================= */}
        {/* ADDITIONAL DARK DEPTH */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-black/[0.18]

            transition-all
            duration-300

            group-hover:bg-black/[0.08]
          "
        />


        {/* ================================================= */}
        {/* SUBTLE HOVER GLOW */}
        {/* ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            left-1/2
            h-48
            w-72
            -translate-x-1/2
            rounded-full
            bg-amber-400/[0.08]
            blur-[80px]
            opacity-0

            transition-opacity
            duration-500

            group-hover:opacity-100
          "
        />

      </div>


      {/* ===================================================== */}
      {/* TOP BAR */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          left-4
          right-4
          top-4
          z-10
          flex
          items-center
          justify-between
        "
      >

        {/* Mine Code */}

        <span
          className="
            rounded-lg
            border
            border-white/[0.12]
            bg-black/[0.48]
            px-2.5
            py-1
            font-mono
            text-[10px]
            font-semibold
            tracking-[0.08em]
            text-zinc-200
            shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
            backdrop-blur-md
          "
        >
          {mine.code}
        </span>


        {/* Mine Status */}

        <StatusBadge status={mine.status} />

      </div>


      {/* ===================================================== */}
      {/* BOTTOM CONTENT */}
      {/* ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          justify-end
          p-5
          md:p-6
        "
      >


        {/* ================================================= */}
        {/* MINE NAME + LOCATION */}
        {/* ================================================= */}

        <div className="mb-5">

          <h2
            className="
              text-xl
              font-bold
              tracking-tight
              text-white

              transition-colors
              duration-200

              md:text-2xl

              group-hover:text-amber-400
            "
          >
            {mine.name}
          </h2>


          <div
            className="
              mt-1.5
              flex
              items-center
              gap-1.5
              text-xs
              text-zinc-300
            "
          >

            <MapPin
              className="
                h-3.5
                w-3.5
                shrink-0
                text-amber-400
              "
            />

            <span>
              {mine.location}
            </span>

          </div>

        </div>


        {/* ================================================= */}
        {/* METRICS GLASS PANEL */}
        {/* ================================================= */}

        <div
          className="
            -mx-2
            grid
            grid-cols-3
            gap-2

            rounded-xl
            border
            border-white/[0.10]

            bg-black/[0.48]

            px-3
            py-3

            shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]

            backdrop-blur-md

            transition-all
            duration-300

            group-hover:border-white/[0.14]
            group-hover:bg-black/[0.38]
          "
        >


          {/* ================================================= */}
          {/* PRODUCTION */}
          {/* ================================================= */}

          <div>

            <span
              className="
                block
                text-[10px]
                font-mono
                uppercase
                tracking-[0.12em]
                text-zinc-400
              "
            >
              Production
            </span>


            <span
              className="
                mt-1
                flex
                items-center
                gap-1
                font-mono
                text-sm
                font-bold
                text-white
                md:text-base
              "
            >

              <TrendingUp
                className="
                  h-3
                  w-3
                  shrink-0
                  text-emerald-400
                "
              />

              {mine.production}

            </span>

          </div>


          {/* ================================================= */}
          {/* RISK SCORE */}
          {/* ================================================= */}

          <div>

            <span
              className="
                block
                text-[10px]
                font-mono
                uppercase
                tracking-[0.12em]
                text-zinc-400
              "
            >
              Risk Score
            </span>


            <span
              className={`
                mt-1
                flex
                items-center
                gap-1

                font-mono
                text-sm
                font-bold

                md:text-base

                ${
                  mine.risk_score > 60
                    ? 'text-rose-400'
                    : mine.risk_score > 40
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }
              `}
            >

              <AlertTriangle
                className="
                  h-3
                  w-3
                  shrink-0
                "
              />

              {mine.risk_score}

            </span>

          </div>


          {/* ================================================= */}
          {/* OPEN ITEMS */}
          {/* ================================================= */}

          <div>

            <span
              className="
                block
                text-[10px]
                font-mono
                uppercase
                tracking-[0.12em]
                text-zinc-400
              "
            >
              Open Items
            </span>


            <span
              className="
                mt-1
                flex
                items-center
                gap-1
                font-mono
                text-sm
                font-bold
                text-zinc-200
                md:text-base
              "
            >

              <Layers
                className="
                  h-3
                  w-3
                  shrink-0
                  text-zinc-400
                "
              />

              {mine.open_items}

            </span>

          </div>

        </div>

      </div>

    </div>

  );
};