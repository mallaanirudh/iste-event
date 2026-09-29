"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAction } from "@/app/actions/registration";

export default function RegisterPage() {
  const router = useRouter();
  const [isIndividual, setIsIndividual] = useState(true); // Default to solo registration first
  const [members, setMembers] = useState([
    { name: "", email: "", password: "" },
    { name: "", email: "", password: "" },
    { name: "", email: "", password: "" },
  ]);

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleMemberChange = (index: number, field: "name" | "email" | "password", value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const payloadMembers = isIndividual ? [members[0]] : members;
      const res = await registerAction({
        isIndividual,
        members: payloadMembers,
      });

      if (res.success) {
        setMessage({ type: "success", text: res.message || "Registration successful! Redirecting to sign in..." });
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        setMessage({ type: "error", text: res.error || "Registration failed." });
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              ME
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Mega Event Portal</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/login" className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl w-full mx-auto px-6 py-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-extrabold text-white mb-2">Participant Registration</h1>
          <p className="text-slate-400 text-sm mb-6">
            First, register as a solo player with your custom password. Once registered, you can form a 3-member team or enter the auto-grouping pool!
          </p>

          {/* Mode Toggle */}
          <div className="flex bg-slate-950 border border-slate-800 p-1.5 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setIsIndividual(true)}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${isIndividual ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
            >
              1. Solo Player Registration
            </button>
            <button
              type="button"
              onClick={() => setIsIndividual(false)}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${!isIndividual ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
            >
              2. Register 3-Member Team
            </button>
          </div>

          {message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium mb-6 border ${message.type === "success"
                  ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                  : "bg-red-950/60 border-red-800 text-red-300"
                }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isIndividual ? (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-semibold text-slate-200">Solo Player Account Details</h3>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={members[0].name}
                    onChange={(e) => handleMemberChange(0, "name", e.target.value)}
                    placeholder="Anirudh Malla"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={members[0].email}
                    onChange={(e) => handleMemberChange(0, "email", e.target.value)}
                    placeholder="mallaanirudh80@gmail.com"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Create Password</label>
                  <input
                    type="password"
                    required
                    value={members[0].password}
                    onChange={(e) => handleMemberChange(0, "password", e.target.value)}
                    placeholder="•••••••• (Min 8 chars, 1 upper, 1 lower, 1 number, 1 special)"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Requires at least 8 characters, uppercase, lowercase, number, and special character.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-xs text-amber-400 bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl mb-4">
                  Note: All 3 members must be registered solo players before forming a team!
                </p>
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="p-4 mb-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-semibold text-indigo-400">Team Member #{idx + 1}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={members[idx].name}
                          onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                          placeholder={`Member ${idx + 1} Name`}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={members[idx].email}
                          onChange={(e) => handleMemberChange(idx, "email", e.target.value)}
                          placeholder={`member${idx + 1}@example.com`}
                          className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20 text-sm"
            >
              {isPending ? "Submitting Registration..." : isIndividual ? "Complete Solo Player Registration" : "Register 3-Member Team"}
            </button>
          </form>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2026 Mega Event Management Portal. All rights reserved.
      </footer>
    </div>
  );
}
