import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../config/assets';
import { ArrowRight } from 'lucide-react';

import { authService } from '../services/authservice';





export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setIsSubmitting(true);
  setErrorMessage('');

  try {
    // Authenticate using the actual FastAPI backend
    await authService.login(
      userId.trim(),
      password
    );

    // Clear password from component state
    setPassword('');

    // Navigate after successful authentication
    navigate('/home');

  } catch (error: unknown) {

    setErrorMessage(
      error instanceof Error
        ? error.message
        : 'Login failed. Please try again.'
    );

  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#080a0c] text-white">

      {/* ========================= */}
      {/* BACKGROUND VIDEO */}
      {/* ========================= */}

      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          poster={ASSETS.hero.truckImage}
        >
          <source
            src={ASSETS.hero.video}
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0c] via-transparent to-black/30" />
      </div>


      {/* ========================= */}
      {/* MAIN CONTENT */}
      {/* ========================= */}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


          {/* ========================= */}
          {/* LEFT: TITLE */}
          {/* ========================= */}

          <section className="flex flex-col justify-center">

            <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-amber-400 mb-5 animate-fade-in">
              Mining Safety Intelligence
            </p>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none animate-slide-up">
              MINE
              <span className="text-amber-400">
                SENTRY
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-zinc-300 text-sm md:text-lg leading-relaxed animate-fade-in-delay">
              Industrial Governance &amp; Safety Intelligence Platform
            </p>

          </section>


          {/* ========================= */}
          {/* RIGHT: LOGIN CARD */}
          {/* ========================= */}

          <section className="flex justify-center lg:justify-end">

            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl p-7 md:p-8 shadow-2xl animate-login-card">

              <h2 className="text-xl font-semibold">
                Welcome to MineSentry
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Sign in to access the MineSentry platform.
              </p>


              <form
                onSubmit={handleLogin}
                className="mt-7 space-y-5"
              >

                {/* User ID */}

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-300">
                    User ID
                  </label>

                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
                  />
                </div>


                {/* Password */}

                <div>
                  <label className="mb-2 block text-xs uppercase tracking-wider text-zinc-300">
                    Password
                  </label>

                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
                  />
                </div>


                {/* Login */}

                {errorMessage && (
                          <p
                            role="alert"
                            className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
                          >
                            {errorMessage}
                          </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-3 text-sm font-bold text-black transition hover:bg-amber-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    'Authorizing...'
                  ) : (
                    <>
                      Enter MineSentry
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

              </form>


              <div className="mt-6 border-t border-white/10 pt-4 text-xs text-zinc-500">
                Authorized personnel only
              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
};