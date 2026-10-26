import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { LoadingState } from '../components/common/LoadingState';

import {
  Pickaxe,
  TrendingUp,
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Activity,
  HardHat,
  Layers,
} from 'lucide-react';


/* ========================================================= */
/* DASHBOARD MOCK DATA                                       */
/* ========================================================= */

const topMines = [
  {
    id: 'mine-jharia-ug',
    name: 'Jharia Underground Mine',
    location: 'Jharkhand',
    production: '1.84M t',
    productionTrend: 12.4,
    compliance: 96.2,
    risk: 'Low',
    icon: Pickaxe,
  },
  {
    id: 'mine-korba-oc',
    name: 'Korba Open Cast Mine',
    location: 'Chhattisgarh',
    production: '1.67M t',
    productionTrend: 8.1,
    compliance: 94.8,
    risk: 'Low',
    icon: HardHat,
  },
  {
    id: 'mine-singrauli-sp',
    name: 'Singrauli Super Pit',
    location: 'Madhya Pradesh',
    production: '1.42M t',
    productionTrend: 5.6,
    compliance: 92.6,
    risk: 'Moderate',
    icon: Layers,
  },
  {
    id: 'mine-talcher-ds',
    name: 'Talcher Deep Seam Mine',
    location: 'Odisha',
    production: '1.14M t',
    productionTrend: -2.3,
    compliance: 87.3,
    risk: 'High',
    icon: Activity,
  },
];


export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    data,
    loading,
    refetch,
  } = useDashboard();


  if (loading || !data) {
    return (
      <LoadingState message="Connecting to DGMS telemetry & loading portfolio status..." />
    );
  }


  const {
    kpis,
    recentActivity,
    productionTrends,
    riskBreakdown,
    attentionRequired,
  } = data;


  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ========================================================= */}
      {/* 1. TOP COMMAND CENTER HEADER */}
      {/* ========================================================= */}

      <PageHeader
        title="Dashboard"
        subtitle="Overall Mine Portfolio Command Center &amp; Risk Intelligence"

        badge={
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live Sentinel Telemetry
          </span>
        }

        actions={
          <div className="flex items-center gap-3">

            {/* New Inspection */}
            <button
              type="button"
              onClick={() => navigate('/inspections')}
              className="
                flex items-center gap-1.5
                rounded-lg
                bg-amber-400
                px-3.5 py-2
                text-xs font-semibold
                text-zinc-950
                shadow-[0_0_20px_rgba(251,191,36,0.12)]
                transition-all duration-200
                hover:bg-amber-300
                hover:shadow-[0_0_25px_rgba(251,191,36,0.20)]
              "
            >
              <HardHat className="h-3.5 w-3.5" />
              <span>+ New Inspection</span>
            </button>


            {/* Refresh */}
            <button
              type="button"
              onClick={() => refetch()}
              className="
                rounded-lg
                border border-white/[0.08]
                bg-white/[0.035]
                px-3 py-2
                text-xs font-medium
                text-zinc-300
                backdrop-blur-md
                transition-all duration-200
                hover:border-white/[0.15]
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              Refresh Feed
            </button>

          </div>
        }
      />


      {/* ========================================================= */}
      {/* 2. EXECUTIVE KPI CARDS */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          label="Total Mines"
          value={kpis.total_mines}
          subtext={`${kpis.active_mines} Active · 1 Under Audit`}
          icon={Pickaxe}
          accentColor="amber"
          onClick={() => navigate('/mines')}
        />

        <StatCard
          label="Total Production"
          value={kpis.total_production}
          subtext="+8.4% vs Quarterly Target"
          trend={{ value: '+8.4%', isPositive: true }}
          icon={TrendingUp}
          accentColor="emerald"
          onClick={() => navigate('/analytics')}
        />

        <StatCard
          label="Overall Compliance"
          value={`${kpis.overall_compliance_pct}%`}
          subtext="CMR 2017 & DGMS Directives"
          trend={{ value: '▲ 1.2%', isPositive: true }}
          icon={ShieldCheck}
          accentColor="emerald"
          onClick={() => navigate('/compliance')}
        />

        <StatCard
          label="Open Violations"
          value={kpis.open_violations}
          subtext={`${kpis.critical_violations} Critical statutory notices`}
          trend={{ value: 'Critical: 2', isPositive: false }}
          icon={AlertOctagon}
          accentColor="rose"
          onClick={() => navigate('/violations')}
        />

      </div>


      {/* ========================================================= */}
      {/* 3. ATTENTION REQUIRED */}
      {/* ========================================================= */}

      <section
        className="
          rounded-2xl
          border border-amber-400/[0.20]
          bg-[#0d1114]/80
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.28)]
          backdrop-blur-xl
        "
      >

        <div className="mb-5 flex items-center justify-between border-b border-white/[0.07] pb-4">

          <div className="flex items-center gap-3">

            <div className="
              flex h-9 w-9 items-center justify-center
              rounded-xl
              border border-amber-400/20
              bg-amber-400/[0.08]
              text-amber-400
            ">
              <AlertTriangle className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white">
                Attention Required Across Portfolio
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Priority items requiring operational attention
              </p>
            </div>

          </div>

          <span className="font-mono text-xs text-zinc-400">
            {attentionRequired.length} Urgent Action Items
          </span>

        </div>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {attentionRequired.map((item) => (

            <div
              key={item.id}
              onClick={() => navigate(item.action_url)}
              className="
                group
                cursor-pointer
                rounded-xl
                border border-white/[0.07]
                bg-white/[0.025]
                p-4
                backdrop-blur-md
                transition-all duration-300
                hover:border-amber-400/25
                hover:bg-white/[0.045]
              "
            >

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span className="font-mono text-[11px] text-zinc-400">
                    {item.item_type}
                  </span>

                  <span
                    className={`
                      rounded-md
                      border
                      px-1.5 py-0.5
                      font-mono text-[10px] font-bold
                      ${
                        item.urgency === 'CRITICAL'
                          ? 'border-red-500/30 bg-red-500/[0.08] text-red-300'
                          : 'border-amber-500/30 bg-amber-500/[0.08] text-amber-300'
                      }
                    `}
                  >
                    {item.urgency}
                  </span>

                </div>

                <h4 className="
                  line-clamp-2
                  text-xs font-semibold leading-5
                  text-zinc-200
                  transition-colors
                  group-hover:text-amber-400
                ">
                  {item.headline}
                </h4>

              </div>


              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3">

                <span className="truncate text-[11px] text-zinc-500">
                  {item.mine}
                </span>

                <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-amber-400">
                  {item.days_remaining}
                  <ChevronRight className="h-3 w-3" />
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ========================================================= */}
      {/* 4. MINE PERFORMANCE */}
      {/* ========================================================= */}

      <section
        className="
          group
          relative
          overflow-hidden
          rounded-[30px]
          border border-white/[0.16]
          bg-[#070b0e]/88
          p-5
          shadow-[
            0_30px_90px_rgba(0,0,0,0.50),
            0_0_50px_rgba(251,191,36,0.07),
            0_0_70px_rgba(45,212,191,0.05),
            0_0_80px_rgba(251,113,133,0.04)
          ]
          backdrop-blur-2xl
          sm:p-6
        "
      >

        {/* ===================================================== */}
        {/* OUTER AMBIENT GLOW                                   */}
        {/* ===================================================== */}

        {/* Warm upper-left glow */}
        <div
          className="
            pointer-events-none absolute
            -left-24 -top-24
            h-72 w-72
            rounded-full
            bg-amber-400/[0.22]
            blur-[95px]
          "
        />

        {/* Cool upper-right glow */}
        <div
          className="
            pointer-events-none absolute
            -right-24 -top-20
            h-72 w-72
            rounded-full
            bg-cyan-300/[0.15]
            blur-[100px]
          "
        />

        {/* Emerald right edge */}
        <div
          className="
            pointer-events-none absolute
            -right-28 top-[32%]
            h-72 w-72
            rounded-full
            bg-emerald-400/[0.13]
            blur-[105px]
          "
        />

        {/* Rose bottom-right glow */}
        <div
          className="
            pointer-events-none absolute
            -bottom-28 -right-16
            h-80 w-80
            rounded-full
            bg-rose-400/[0.16]
            blur-[105px]
          "
        />

        {/* Amber bottom-left glow */}
        <div
          className="
            pointer-events-none absolute
            -bottom-28 -left-20
            h-72 w-72
            rounded-full
            bg-amber-300/[0.11]
            blur-[110px]
          "
        />

        {/* Dark central glass fade */}
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(
              ellipse_at_center,
              rgba(3,7,10,0.12)_0%,
              rgba(3,7,10,0.46)_42%,
              rgba(3,7,10,0.82)_78%
            )]
          "
        />

        {/* White glass sheen */}
        <div
          className="
            pointer-events-none absolute
            inset-x-[8%] top-0
            h-36
            bg-[radial-gradient(
              ellipse_at_top,
              rgba(255,255,255,0.13),
              rgba(255,255,255,0.035)_42%,
              transparent_72%
            )]
            blur-[1px]
          "
        />

        {/* Bright top rim */}
        <div
          className="
            pointer-events-none absolute
            left-[7%] right-[7%] top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent
          "
        />

        {/* Glass edge */}
        <div
          className="
            pointer-events-none absolute inset-[1px]
            rounded-[29px]
            border border-white/[0.06]
          "
        />


        {/* ===================================================== */}
        {/* CONTENT                                               */}
        {/* ===================================================== */}

        <div className="relative z-10">

          {/* Header */}
          <div className="mb-7 flex items-start justify-between gap-6">

            <div>

              <div className="flex flex-wrap items-center gap-3">

                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Mine Performance
                </h2>

                <span
                  className="
                    inline-flex items-center gap-2
                    rounded-full
                    border border-amber-300/25
                    bg-amber-300/[0.09]
                    px-3 py-1.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-amber-300
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]
                    backdrop-blur-xl
                  "
                >
                  <TrendingUp className="h-3 w-3" />
                  Top Producers
                </span>

              </div>

              <p className="mt-2 text-sm text-zinc-400">
                Top 4 mines ranked by total production
              </p>

            </div>


            {/* View All Mines */}
            <button
              type="button"
              onClick={() => navigate('/mines')}
              className="
                group/mines
                flex shrink-0 items-center gap-2
                rounded-xl
                border border-white/[0.16]
                bg-white/[0.07]
                px-4 py-2.5
                text-xs font-medium
                text-zinc-200
                shadow-[
                  inset_0_1px_1px_rgba(255,255,255,0.12),
                  0_10px_25px_rgba(0,0,0,0.15)
                ]
                backdrop-blur-xl
                transition-all duration-300
                hover:border-cyan-300/30
                hover:bg-white/[0.11]
                hover:text-white
              "
            >
              View All Mines

              <ArrowUpRight
                className="
                  h-3.5 w-3.5
                  transition-transform duration-300
                  group-hover/mines:-translate-y-0.5
                  group-hover/mines:translate-x-0.5
                "
              />
            </button>

          </div>


          {/* ===================================================== */}
          {/* GLASS TABLE                                           */}
          {/* ===================================================== */}

          <div
            className="
              overflow-x-auto
              rounded-[22px]
              border border-white/[0.10]
              bg-black/[0.22]
              shadow-[
                inset_0_1px_1px_rgba(255,255,255,0.05),
                0_15px_50px_rgba(0,0,0,0.20)
              ]
              backdrop-blur-xl
            "
          >

            <table className="w-full min-w-[880px] border-separate border-spacing-x-0 border-spacing-y-2 px-3 pb-3">

              {/* Table Header */}
              <thead>

                <tr>

                  <th className="w-[58px] px-3 pb-2 pt-3 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    #
                  </th>

                  <th className="px-3 pb-2 pt-3 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Mine
                  </th>

                  <th className="w-[21%] px-4 pb-2 pt-3 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Production
                  </th>

                  <th className="w-[24%] px-4 pb-2 pt-3 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Compliance
                  </th>

                  <th className="w-[16%] px-4 pb-2 pt-3 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Risk
                  </th>

                </tr>

              </thead>


              {/* Table Body */}
              <tbody>

                {topMines.map((mine, index) => {
                  const MineIcon = mine.icon;
                  const isTopProducer = index === 0;
                  const productionUp = mine.productionTrend >= 0;

                  return (
                    <tr
                      key={mine.id}
                      onClick={() => navigate(`/mines/${mine.id}`)}
                      className="group/mine cursor-pointer"
                    >

                      {/* Rank */}
                      <td
                        className={`
                          rounded-l-2xl
                          border-y border-l
                          px-3 py-4
                          transition-all duration-300
                          ${
                            isTopProducer
                              ? 'border-amber-300/20 bg-gradient-to-r from-amber-300/[0.12] via-white/[0.045] to-white/[0.025]'
                              : 'border-white/[0.06] bg-white/[0.025] group-hover/mine:bg-white/[0.045]'
                          }
                        `}
                      >
                        <div
                          className={`
                            flex h-9 w-9 items-center justify-center
                            rounded-xl
                            border
                            text-[10px] font-bold
                            backdrop-blur-md
                            ${
                              isTopProducer
                                ? 'border-amber-300/30 bg-amber-300/[0.12] text-amber-200 shadow-[0_0_22px_rgba(251,191,36,0.10)]'
                                : 'border-white/[0.09] bg-white/[0.045] text-zinc-400'
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </td>


                      {/* Mine */}
                      <td
                        className={`
                          border-y px-3 py-4
                          transition-all duration-300
                          ${
                            isTopProducer
                              ? 'border-amber-300/20 bg-gradient-to-r from-white/[0.045] to-white/[0.025]'
                              : 'border-white/[0.06] bg-white/[0.025] group-hover/mine:bg-white/[0.045]'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">

                          <div
                            className={`
                              flex h-11 w-11 shrink-0 items-center justify-center
                              rounded-xl
                              border
                              backdrop-blur-xl
                              shadow-[inset_0_1px_1px_rgba(255,255,255,0.10)]
                              transition-all duration-300
                              group-hover/mine:scale-105
                              ${
                                isTopProducer
                                  ? 'border-amber-300/25 bg-amber-300/[0.10] text-amber-200'
                                  : 'border-white/[0.10] bg-white/[0.045] text-zinc-300'
                              }
                            `}
                          >
                            <MineIcon className="h-5 w-5" strokeWidth={1.8} />
                          </div>

                          <div className="min-w-0">

                            <div
                              className="
                                truncate
                                text-sm font-semibold
                                text-white
                                transition-colors duration-200
                                group-hover/mine:text-cyan-200
                              "
                            >
                              {mine.name}
                            </div>

                            <div className="mt-1 text-[11px] text-zinc-500">
                              {mine.location}
                            </div>

                          </div>

                        </div>
                      </td>


                      {/* Production */}
                      <td
                        className={`
                          border-y px-4 py-4 text-right
                          ${
                            isTopProducer
                              ? 'border-amber-300/20 bg-white/[0.025]'
                              : 'border-white/[0.06] bg-white/[0.025] group-hover/mine:bg-white/[0.045]'
                          }
                        `}
                      >
                        <div className="flex items-center justify-end gap-3">

                          <span className="font-mono text-sm font-semibold tracking-tight text-white sm:text-base">
                            {mine.production}
                          </span>

                          <span
                            className={`
                              inline-flex items-center gap-1
                              rounded-lg
                              border
                              px-2 py-1
                              font-mono text-[10px] font-semibold
                              ${
                                productionUp
                                  ? 'border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-300'
                                  : 'border-rose-400/15 bg-rose-400/[0.07] text-rose-300'
                              }
                            `}
                          >
                            {productionUp ? '↗' : '↘'}
                            {Math.abs(mine.productionTrend).toFixed(1)}%
                          </span>

                        </div>
                      </td>


                      {/* Compliance */}
                      <td
                        className={`
                          border-y px-4 py-4 text-right
                          ${
                            isTopProducer
                              ? 'border-amber-300/20 bg-white/[0.025]'
                              : 'border-white/[0.06] bg-white/[0.025] group-hover/mine:bg-white/[0.045]'
                          }
                        `}
                      >
                        <div className="flex items-center justify-end gap-3">

                          <div className="hidden h-2 w-28 overflow-hidden rounded-full bg-white/[0.08] md:block">
                            <div
                              className={`
                                h-full rounded-full
                                transition-all duration-500
                                ${
                                  mine.compliance >= 90
                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_14px_rgba(52,211,153,0.35)]'
                                    : 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.30)]'
                                }
                              `}
                              style={{
                                width: `${mine.compliance}%`,
                              }}
                            />
                          </div>

                          <span
                            className={`
                              min-w-[52px]
                              text-right
                              text-sm
                              font-semibold
                              ${
                                mine.compliance >= 90
                                  ? 'text-emerald-300'
                                  : 'text-amber-300'
                              }
                            `}
                          >
                            {mine.compliance}%
                          </span>

                        </div>
                      </td>


                      {/* Risk */}
                      <td
                        className={`
                          rounded-r-2xl
                          border-y border-r
                          px-4 py-4 text-right
                          ${
                            isTopProducer
                              ? 'border-amber-300/20 bg-gradient-to-l from-amber-300/[0.08] to-white/[0.025]'
                              : 'border-white/[0.06] bg-white/[0.025] group-hover/mine:bg-white/[0.045]'
                          }
                        `}
                      >
                        <span
                          className={`
                            inline-flex items-center gap-2
                            rounded-full
                            border
                            px-3.5 py-1.5
                            text-[11px]
                            font-semibold
                            backdrop-blur-md
                            ${
                              mine.risk === 'Low'
                                ? 'border-emerald-400/25 bg-emerald-400/[0.09] text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.05)]'
                                : mine.risk === 'Moderate'
                                ? 'border-amber-400/25 bg-amber-400/[0.09] text-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.05)]'
                                : 'border-rose-400/25 bg-rose-400/[0.09] text-rose-300 shadow-[0_0_18px_rgba(251,113,133,0.06)]'
                            }
                          `}
                        >
                          <span
                            className={`
                              h-1.5 w-1.5 rounded-full
                              ${
                                mine.risk === 'Low'
                                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                                  : mine.risk === 'Moderate'
                                  ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                                  : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]'
                              }
                            `}
                          />

                          {mine.risk}
                        </span>
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* 5. PRODUCTION & RISK OVERVIEW */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ======================================================= */}
        {/* PRODUCTION OVERVIEW */}
        {/* ======================================================= */}

        <div
          className="
            lg:col-span-2
            rounded-2xl
            border border-white/[0.09]
            bg-[#0d1114]/80
            p-6
            shadow-[0_20px_60px_rgba(0,0,0,0.28)]
            backdrop-blur-xl
          "
        >

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h3 className="text-base font-bold text-white">
                Production Overview (MT)
              </h3>

              <p className="mt-0.5 text-xs text-zinc-500">
                Target vs Actual Coal Extraction across portfolio (Last 6 Months)
              </p>

            </div>


            <div className="flex items-center gap-4 font-mono text-xs">

              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="h-2.5 w-2.5 rounded bg-zinc-600" />
                Target
              </span>

              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="h-2.5 w-2.5 rounded bg-amber-500" />
                Actual
              </span>

            </div>

          </div>


          {/* Chart */}

          <div className="
            flex h-48 items-end justify-between gap-4
            border-b border-white/[0.07]
            pb-2 pt-4
          ">

            {productionTrends.map((pt) => {

              const maxVal = 600;

              const targetHeight =
                (pt.target / maxVal) * 100;

              const actualHeight =
                (pt.actual / maxVal) * 100;


              return (
                <div
                  key={pt.month}
                  className="
                    flex h-full flex-1
                    flex-col items-center
                    justify-end gap-2
                  "
                >

                  <div className="
                    flex h-full w-full
                    items-end justify-center
                    gap-1.5
                  ">

                    {/* Target */}
                    <div
                      style={{
                        height: `${targetHeight}%`,
                      }}
                      className="
                        w-4 rounded-t
                        bg-zinc-700/60
                        transition-all duration-300
                        hover:bg-zinc-600
                        sm:w-6
                      "
                      title={`Target: ${pt.target}K MT`}
                    />


                    {/* Actual */}
                    <div
                      style={{
                        height: `${actualHeight}%`,
                      }}
                      className="
                        w-4 rounded-t
                        bg-gradient-to-t
                        from-amber-600
                        via-amber-500
                        to-amber-300
                        shadow-[0_0_18px_rgba(251,191,36,0.14)]
                        transition-all duration-300
                        hover:brightness-110
                        sm:w-6
                      "
                      title={`Actual: ${pt.actual}K MT`}
                    />

                  </div>


                  <span className="font-mono text-xs text-zinc-400">
                    {pt.month}
                  </span>

                </div>
              );

            })}

          </div>


          {/* Chart Footer */}

          <div className="
            mt-4
            flex items-center justify-between
            text-xs text-zinc-400
          ">

            <span>
              Current Month Extraction:{' '}
              <strong className="font-mono text-white">
                580,000 MT
              </strong>
            </span>


            <button
              type="button"
              onClick={() => navigate('/analytics')}
              className="
                flex items-center gap-1
                text-amber-400
                transition-colors
                hover:text-amber-300
              "
            >
              Detailed Analytics
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

          </div>

        </div>


        {/* ======================================================= */}
        {/* SAFETY & RISK HEALTH */}
        {/* ======================================================= */}

        <div
          className="
            rounded-2xl
            border border-white/[0.09]
            bg-[#0d1114]/80
            p-6
            backdrop-blur-xl
          "
        >

          <div>

            <div className="mb-4 flex items-center justify-between">

              <h3 className="text-base font-bold text-white">
                Safety &amp; Risk Health
              </h3>

              <span className="
                rounded-lg
                border border-emerald-400/20
                bg-emerald-400/[0.07]
                px-2.5 py-1
                font-mono text-xs
                text-emerald-300
              ">
                Index: 93.8%
              </span>

            </div>


            <p className="mb-5 text-xs text-zinc-400">
              Statutory risk exposure by critical engineering discipline:
            </p>


            <div className="space-y-4">

              {riskBreakdown.map((item) => (

                <div key={item.category}>

                  <div className="
                    mb-1.5
                    flex items-center justify-between
                    text-xs
                  ">

                    <span className="truncate text-zinc-300">
                      {item.category}
                    </span>


                    <span
                      className={`
                        font-mono text-[11px] font-semibold
                        ${
                          item.status === 'High'
                            ? 'text-rose-400'
                            : item.status === 'Moderate'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }
                      `}
                    >
                      {item.score}/100 ({item.status})
                    </span>

                  </div>


                  <div className="
                    h-1.5
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-white/[0.07]
                  ">

                    <div
                      className={`
                        h-full
                        rounded-full
                        transition-all duration-500
                        ${
                          item.status === 'High'
                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.25)]'
                            : item.status === 'Moderate'
                            ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.20)]'
                            : 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.20)]'
                        }
                      `}
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>


          <div className="
            mt-6
            border-t border-white/[0.07]
            pt-5
          ">

            <button
              type="button"
              onClick={() => navigate('/risk')}
              className="
                w-full
                rounded-xl
                border border-white/[0.08]
                bg-white/[0.035]
                py-2.5
                text-center
                text-xs font-semibold
                text-zinc-300
                backdrop-blur-md
                transition-all duration-200
                hover:border-amber-400/20
                hover:bg-amber-400/[0.05]
                hover:text-white
              "
            >
              View Full Risk Matrix
            </button>

          </div>

        </div>

      </div>


      {/* ========================================================= */}
      {/* 6. RECENT ACTIVITY & ACTIVE MINES */}
      {/* ========================================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ======================================================= */}
        {/* RECENT ACTIVITY */}
        {/* ======================================================= */}

        <div
          className="
            lg:col-span-2
            rounded-2xl
            border border-white/[0.09]
            bg-[#0d1114]/80
            p-6
            backdrop-blur-xl
          "
        >

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h3 className="text-base font-bold text-white">
                Recent Operational Activity
              </h3>

              <p className="text-xs text-zinc-500">
                Audits, sensor flags, RAG verifications and engineer approvals
              </p>

            </div>


            <button
              type="button"
              onClick={() => navigate('/audit-logs')}
              className="
                text-xs
                text-zinc-400
                transition-colors
                hover:text-white
              "
            >
              View All Logs
            </button>

          </div>


          <div className="space-y-4">

            {recentActivity.map((act) => (

              <div
                key={act.id}
                className="
                  flex items-start gap-3.5
                  rounded-xl
                  border border-white/[0.05]
                  bg-white/[0.025]
                  p-3.5
                  transition-all duration-200
                  hover:border-white/[0.10]
                  hover:bg-white/[0.04]
                "
              >

                <div className="
                  mt-0.5
                  shrink-0
                  rounded-lg
                  border border-white/[0.06]
                  bg-white/[0.05]
                  p-2
                ">

                  {act.type === 'ai_rag' ? (
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                  ) : act.type === 'inspection' ? (
                    <HardHat className="h-4 w-4 text-emerald-400" />
                  ) : act.type === 'violation' ? (
                    <AlertOctagon className="h-4 w-4 text-rose-400" />
                  ) : (
                    <Activity className="h-4 w-4 text-amber-400" />
                  )}

                </div>


                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-2">

                    <h4 className="truncate text-xs font-bold text-white">
                      {act.title}
                    </h4>

                    <span className="
                      shrink-0
                      font-mono text-[10px]
                      text-zinc-500
                    ">
                      {act.timestamp}
                    </span>

                  </div>


                  <p className="mt-0.5 text-xs text-zinc-400">
                    {act.description}
                  </p>


                  <div className="
                    mt-2
                    flex items-center gap-2
                    font-mono text-[10px]
                    text-zinc-500
                  ">

                    <span className="text-zinc-400">
                      {act.mine_name}
                    </span>

                    <span>·</span>

                    <span className="uppercase text-amber-400/90">
                      {act.type.replace('_', ' ')}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ======================================================= */}
        {/* ACTIVE MINE SITES */}
        {/* ======================================================= */}

        <div
          className="
            flex flex-col justify-between
            rounded-2xl
            border border-white/[0.09]
            bg-[#0d1114]/80
            p-6
            backdrop-blur-xl
          "
        >

          <div>

            <div className="mb-4 flex items-center justify-between">

              <h3 className="text-base font-bold text-white">
                Active Mine Sites
              </h3>

              <button
                type="button"
                onClick={() => navigate('/mines')}
                className="
                  text-xs
                  text-amber-400
                  transition-colors
                  hover:text-amber-300
                "
              >
                All 6 Sites →
              </button>

            </div>


            <p className="mb-4 text-xs leading-5 text-zinc-400">
              Quick access to individual facility telemetry and continuous miner headings:
            </p>


            <div className="space-y-2.5">

              {[
                {
                  id: 'mine-jharia-ug',
                  name: 'Jharia Underground',
                  score: 93.4,
                  risk: 42,
                },
                {
                  id: 'mine-korba-oc',
                  name: 'Korba Open Cast',
                  score: 96.8,
                  risk: 28,
                },
                {
                  id: 'mine-singrauli-sp',
                  name: 'Singrauli Super Pit',
                  score: 95.1,
                  risk: 35,
                },
                {
                  id: 'mine-talcher-ds',
                  name: 'Talcher Deep Seam',
                  score: 87.2,
                  risk: 68,
                },
              ].map((m) => (

                <div
                  key={m.id}
                  onClick={() => navigate(`/mines/${m.id}`)}
                  className="
                    flex cursor-pointer
                    items-center justify-between
                    rounded-xl
                    border border-white/[0.06]
                    bg-white/[0.025]
                    p-3
                    transition-all duration-200
                    hover:border-amber-400/20
                    hover:bg-white/[0.04]
                  "
                >

                  <div className="min-w-0">

                    <h5 className="truncate text-xs font-semibold text-zinc-200">
                      {m.name}
                    </h5>

                    <span className="
                      font-mono text-[10px]
                      text-zinc-500
                    ">
                      Risk Score: {m.risk}
                    </span>

                  </div>


                  <span className="
                    font-mono text-xs font-bold
                    text-emerald-400
                  ">
                    {m.score}%
                  </span>

                </div>

              ))}

            </div>

          </div>


          <div className="mt-6 border-t border-white/[0.07] pt-4">

            <button
              type="button"
              onClick={() => navigate('/mines')}
              className="
                flex w-full
                items-center justify-center gap-1.5
                rounded-xl
                bg-amber-400
                py-2.5
                text-xs font-bold
                text-zinc-950
                shadow-[0_0_22px_rgba(251,191,36,0.10)]
                transition-all duration-200
                hover:bg-amber-300
                hover:shadow-[0_0_28px_rgba(251,191,36,0.16)]
              "
            >

              <Pickaxe className="h-4 w-4" />

              <span>
                Browse All Mine Sites
              </span>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
