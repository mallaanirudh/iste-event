"use client";

import { useState } from "react";
import { loginWithPassword } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await loginWithPassword(formData);
      if (result?.error) setError(result.error);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-slate-900 p-10 rounded-2xl shadow-2xl border border-slate-800">
        <div>
          <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-extrabold text-white text-xl shadow-lg shadow-indigo-500/20 mb-4">
            ME
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Portal Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Sign in with your Email and Password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                placeholder="anirudh@admin.com or participant@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm font-medium bg-red-950/60 border border-red-800 p-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20 text-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">

        </div>
      </div>
    </div>
  );
}
