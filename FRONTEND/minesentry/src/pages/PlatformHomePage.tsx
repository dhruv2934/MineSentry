import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LayoutDashboard, ShieldCheck, BarChart3 } from 'lucide-react';
import { ASSETS } from '../config/assets';

export const PlatformHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [operationsOpen, setOperationsOpen] = useState(false);


  const workflowRef = useRef<HTMLDivElement>(null);
  const [workflowVisible, setWorkflowVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);





  useEffect(() => {
  const element = workflowRef.current;

  if (!element) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setWorkflowVisible(true);
        observer.disconnect();
      }
    },
    {
      threshold: 0.2,
    }
  );

  observer.observe(element);

  return () => observer.disconnect();
}, []);

  return (
    <main className="min-h-screen bg-black text-white">

        <section className="relative h-screen overflow-hidden">

      {/* ========================================= */}
      {/* BACKGROUND */}
      {/* ========================================= */}

     <div className="absolute inset-0">

  {/* BACKGROUND */}
  <img
  src={ASSETS.hero.backgroundImage}
  alt="Open pit mine"
  className="
    absolute
    inset-0
    h-full
    w-full
    object-cover
    object-[50%_62%]
    scale-[1.0]
  "
/>

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/45" />

  {/* BOTTOM GRADIENT */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

</div>

      {/* ========================================= */}
      {/* TOP NAVIGATION */}
      {/* ========================================= */}

      <header
        className={`
          absolute left-0 right-0 top-0 z-50
          px-6 py-5 md:px-10
          transition-all duration-500
          ${showNav
            ? 'translate-y-0 opacity-100'
            : '-translate-y-8 opacity-0'
          }
        `}
      >

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}

          <button
            onClick={() => navigate('/home')}
            className="text-lg font-black tracking-[0.2em]"
          >
            MINE
            <span className="text-amber-400">SENTRY</span>
          </button>


          {/* Navigation */}

          <nav className="hidden items-center gap-8 md:flex">

            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>


            {/* Operations */}

            <div className="relative">

              <button
                onClick={() => setOperationsOpen(!operationsOpen)}
                className="flex items-center gap-1 text-sm text-white/80 transition hover:text-white"
              >
                Operations
                <ChevronDown
                  size={15}
                  className={`
                    transition-transform duration-200
                    ${operationsOpen ? 'rotate-180' : ''}
                  `}
                />
              </button>


              {operationsOpen && (
                <div className="absolute left-1/2 top-9 w-52 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-black/85 p-2 shadow-2xl backdrop-blur-xl">

                  <button
                    onClick={() => navigate('/mines')}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Mines
                  </button>

                  <button
                    onClick={() => navigate('/inspections')}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Inspections
                  </button>

                  <button
                    onClick={() => navigate('/observations')}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Observations
                  </button>

                  <button
                    onClick={() => navigate('/violations')}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Violations
                  </button>

                  <button
                    onClick={() => navigate('/corrective-actions')}
                    className="w-full rounded-lg px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Corrective Actions
                  </button>

                </div>
              )}

            </div>


            <button
              onClick={() => navigate('/compliance')}
              className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            >
              <ShieldCheck size={16} />
              Compliance
            </button>


            <button
              onClick={() => navigate('/analytics')}
              className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            >
              <BarChart3 size={16} />
              Analytics
            </button>

          </nav>

        </div>

      </header>


{/* ========================================= */}
{/* MINE SENTRY TITLE */}
{/* ========================================= */}

<section className="pointer-events-none absolute inset-0 z-10">

  <div
    className="
      absolute
      left-1/2
      bottom-[52%]
      w-full
      -translate-x-1/2
      animate-home-title
      text-center
    "
  >

    <p className="
      mb-4
      text-xs
      font-medium
      uppercase
      tracking-[0.5em]
      text-amber-300/80
      md:text-sm
    ">
      Industrial Governance & Safety Intelligence
    </p>

    <h1 className="
      text-[13vw]
      font-black
      leading-none
      tracking-[-0.06em]
    ">
      MINE
      <span className="text-amber-400"> SENTRY</span>
    </h1>

  </div>

</section>


{/* ========================================= */}
{/* FOREGROUND TRUCK */}
{/* ========================================= */}
<div className="pointer-events-none absolute inset-0 z-20">
  <img
    src={ASSETS.hero.truckForeground}
    alt=""
    className="
      absolute
      bottom-[-3%]
      left-2/5
      w-[59%]
      max-w-[1250px]
      -translate-x-1/2
      object-contain
      object-bottom
    "
  />
</div>


      {/* ========================================= */}
      {/* BOTTOM ENTRY ACTION */}
      {/* ========================================= */}

      <div
        className={`
          absolute bottom-8 left-1/2 z-40
          -translate-x-1/2
          transition-all duration-1000
          ${showNav
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
          }
        `}
      >

        <button
          onClick={() => navigate('/dashboard')}
          className="
            rounded-full
            border border-white/20
            bg-black/50
            px-8 py-3
            text-sm font-semibold
            tracking-wide
            backdrop-blur-md
            transition
            hover:bg-amber-400
            hover:text-black
          "
        >
          Enter Dashboard
        </button>

      </div>
      </section>









      <section className="relative bg-[#080808] px-6 py-24 md:px-12 md:py-32">

  <div className="mx-auto max-w-7xl">

    {/* Section heading */}

    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

      <div>

        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
          MineSentry Workflow
        </p>

        <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
          From Field
          <span className="text-amber-400"> Observation</span>
          <br />
          to Action.
        </h2>

        <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
          MineSentry connects what happens during a field inspection
          with regulatory intelligence, risk analysis, and corrective
          action — creating one continuous safety workflow.
        </p>

      </div>


      {/* Workflow */}

     <div
  ref={workflowRef}
  className="space-y-4"
>

        {/* Step 01 */}

       <div
  className={`
    group flex items-center gap-5 border-b border-white/10 pb-5
    transition-all duration-700
    ${workflowVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-8 opacity-0'
    }
  `}
>

          <span className="text-sm font-semibold text-amber-400">
            01
          </span>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Inspection
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              A scheduled inspection is assigned and carried out at the mine.
            </p>
          </div>

        </div>


        {/* Step 02 */}

       <div
  className={`
    group flex items-center gap-5 border-b border-white/10 pb-5
    transition-all duration-700 delay-100
    ${workflowVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-8 opacity-0'
    }
  `}
>
          <span className="text-sm font-semibold text-amber-400">
            02
          </span>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Observation
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Field observations and evidence are recorded during the inspection.
            </p>
          </div>

        </div>


        {/* Step 03 */}

       <div
  className={`
    group flex items-center gap-5 border-b border-white/10 pb-5
    transition-all duration-700 delay-200
    ${workflowVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-8 opacity-0'
    }
  `}
>

          <span className="text-sm font-semibold text-amber-400">
            03
          </span>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Regulation
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Relevant regulatory clauses are retrieved from the MineSentry knowledge base.
            </p>
          </div>

        </div>


        {/* Step 04 */}

       <div
  className={`
    group flex items-center gap-5 border-b border-white/10 pb-5
    transition-all duration-700 delay-300
    ${workflowVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-8 opacity-0'
    }
  `}
>

          <span className="text-sm font-semibold text-amber-400">
            04
          </span>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Risk
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              The finding is evaluated using severity, recurrence, workers affected, and historical context.
            </p>
          </div>

        </div>


        {/* Step 05 */}

       <div
  className={`
    group flex items-center gap-5 border-b border-white/10 pb-5
    transition-all duration-700 delay-400
    ${workflowVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-8 opacity-0'
    }
  `}
>
          <span className="text-sm font-semibold text-amber-400">
            05
          </span>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Corrective Action
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              The identified issue is converted into an actionable corrective recommendation.
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>
{/* ========================================= */}
{/* RUNNING TEXT */}
{/* ========================================= */}

<section className="relative overflow-hidden border-y border-white/10 bg-[#080808] py-8 md:py-10">

  <div className="flex w-max animate-marquee">

    {/* FIRST COPY */}
    <div className="flex items-center shrink-0 whitespace-nowrap">

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        BEYOND
      </span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-zinc-500 md:text-6xl">
        LIMITS
      </span>

      <span className="text-amber-400">✦</span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        BEYOND
      </span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-zinc-500 md:text-6xl">
        LIMITS
      </span>

      <span className="text-amber-400">✦</span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        BEYOND
      </span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-zinc-500 md:text-6xl">
        LIMITS
      </span>

      <span className="text-amber-400">✦</span>

    </div>


    {/* SECOND COPY — IDENTICAL */}
    <div className="flex items-center shrink-0 whitespace-nowrap">

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        BEYOND
      </span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-zinc-500 md:text-6xl">
        LIMITS
      </span>

      <span className="text-amber-400">✦</span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        BEYOND
      </span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-zinc-500 md:text-6xl">
        LIMITS
      </span>

      <span className="text-amber-400">✦</span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
        BEYOND
      </span>

      <span className="mx-6 text-4xl font-black uppercase tracking-tight text-zinc-500 md:text-6xl">
        LIMITS
      </span>

      <span className="text-amber-400">✦</span>

    </div>

  </div>

</section>


{/* ========================================= */}
{/* FOOTER */}
{/* ========================================= */}

<footer className="relative overflow-hidden border-t border-white/10 bg-[#050505]">

  {/* Main Footer */}
  <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
{/* ========================================= */}
{/* TOP FOOTER GRID */}
{/* ========================================= */}

<div className="grid gap-12 lg:grid-cols-[40%_60%]">


  {/* ========================================= */}
  {/* BRAND */}
  {/* ========================================= */}

  <div className="pr-10">

    <div className="mb-6 flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10">
        <span className="text-xl font-black text-amber-400">
          M
        </span>
      </div>

      <span className="text-2xl font-black tracking-tight text-white">
        Mine<span className="text-amber-400">Sentry</span>
      </span>

    </div>


    <p className="max-w-sm text-sm leading-7 text-zinc-500 md:text-base">
      Intelligent mining safety and compliance infrastructure built
      to transform field observations into actionable intelligence.
    </p>


    <div className="mt-8 flex items-center gap-3">

      <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.7)]" />

      <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        Building mines of the future
      </span>

    </div>

  </div>



  {/* ========================================= */}
  {/* RIGHT SIDE — THREE LISTS */}
  {/* ========================================= */}

  <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:pl-8">


    {/* ========================================= */}
    {/* PLATFORM */}
    {/* ========================================= */}

    <div>

      <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
        Platform
      </h3>

      <ul className="space-y-4 text-sm text-zinc-500">

        <li>
          <a
            href="#workflow"
            className="transition-colors duration-200 hover:text-white"
          >
            Workflow
          </a>
        </li>

        <li>
          <a
            href="#features"
            className="transition-colors duration-200 hover:text-white"
          >
            Features
          </a>
        </li>

        <li>
          <a
            href="#intelligence"
            className="transition-colors duration-200 hover:text-white"
          >
            Intelligence
          </a>
        </li>

        <li>
          <a
            href="#about"
            className="transition-colors duration-200 hover:text-white"
          >
            About MineSentry
          </a>
        </li>

      </ul>

    </div>



    {/* ========================================= */}
    {/* SYSTEM */}
    {/* ========================================= */}

    <div>

      <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
        System
      </h3>

      <ul className="space-y-4 text-sm text-zinc-500">

        <li>
          <a
            href="/login"
            className="transition-colors duration-200 hover:text-white"
          >
            Login
          </a>
        </li>

        <li>
          <a
            href="/dashboard"
            className="transition-colors duration-200 hover:text-white"
          >
            Dashboard
          </a>
        </li>

        <li>
          <a
            href="#compliance"
            className="transition-colors duration-200 hover:text-white"
          >
            Compliance
          </a>
        </li>

        <li>
          <a
            href="#documentation"
            className="transition-colors duration-200 hover:text-white"
          >
            Documentation
          </a>
        </li>

      </ul>

    </div>



    {/* ========================================= */}
    {/* HELP & SUPPORT */}
    {/* ========================================= */}

    <div>

      <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
        Help & Support
      </h3>

      <ul className="space-y-4 text-sm text-zinc-500">

        <li>
          <a
            href="#help"
            className="transition-colors duration-200 hover:text-white"
          >
            Help Center
          </a>
        </li>

        <li>
          <a
            href="#faq"
            className="transition-colors duration-200 hover:text-white"
          >
            Frequently Asked Questions
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className="transition-colors duration-200 hover:text-white"
          >
            Contact Support
          </a>
        </li>

        <li>
          <a
            href="#report"
            className="transition-colors duration-200 hover:text-white"
          >
            Report an Issue
          </a>
        </li>

      </ul>

    </div>

  </div>

</div>


    {/* ========================================= */}
    {/* DIVIDER */}
    {/* ========================================= */}

    <div className="my-12 h-px bg-white/10" />



    {/* ========================================= */}
    {/* BOTTOM ROW */}
    {/* ========================================= */}

    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">


      {/* Copyright */}

      <p className="text-xs text-zinc-600">
        © {new Date().getFullYear()} MineSentry. All rights reserved.
      </p>



      {/* Bottom Links */}

      <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-600">

        <a
          href="#privacy"
          className="transition-colors hover:text-zinc-300"
        >
          Privacy
        </a>

        <a
          href="#terms"
          className="transition-colors hover:text-zinc-300"
        >
          Terms
        </a>

        <span className="text-zinc-800">
          |
        </span>

        <span>
          AI • SAFETY • COMPLIANCE
        </span>

      </div>

    </div>

  </div>

</footer>








    </main>
  );
};