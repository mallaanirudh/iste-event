"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { logRoundScoreAction } from "@/app/actions/scoring";

export default function PocScoringPage({ events = [], teamsList = [] }: { events: any[]; teamsList: any[] }) {
  const [selectedTeamId, setSelectedTeamId] = useState<number | "">("");
  const [selectedEventId, setSelectedEventId] = useState<number | "">(events[0]?.id || 1);
  const [attendanceMode, setAttendanceMode] = useState<"full_3" | "duo_2_bonus" | "absent">("full_3");
  const [syPoints, setSyPoints] = useState(0);
  const [sqPoints, setSqPoints] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const [penalties, setPenalties] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | "">("");
  const [isMisconduct, setIsMisconduct] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId || !selectedEventId) {
      setMessage({ type: "error", text: "Please select a team and an event." });
      return;
    }

    startTransition(async () => {
      const res = await logRoundScoreAction({
        teamId: Number(selectedTeamId),
        eventId: Number(selectedEventId),
        attendanceMode,
        syPoints: Number(syPoints),
        sqPoints: Number(sqPoints),
        bonusPoints: Number(bonusPoints),
        penalties: Number(penalties),
        completionTimeSeconds: completionTime ? Number(completionTime) : undefined,
        isMisconductFlagged: isMisconduct,
      });

      if (res.success) {
        setMessage({ type: "success", text: res.message || "Score logged!" });
        setSyPoints(0);
        setSqPoints(0);
        setBonusPoints(0);
        setPenalties(0);
        setCompletionTime("");
        setIsMisconduct(false);
      } else {
        setMessage({ type: "error", text: res.error || "Failed to log score." });
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              POC
            </div>
            <span className="text-xl font-bold tracking-tight text-white">POC & SIG Head Workspace</span>
          </div>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            ← Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-extrabold text-white mb-2">Fast Score & Attendance Entry</h1>
          <p className="text-slate-400 text-sm mb-6">
            Log team scores, attendance modes (+2 duo bonus handling), and misconduct flags for SIG rounds.
          </p>

          {message && (
            <div
              className={`p-4 rounded-xl text-sm font-medium mb-6 border ${
                message.type === "success"
                  ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                  : "bg-red-950/60 border-red-800 text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleScoreSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Select Team (#Code)</label>
                <select
                  required
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value ? Number(e.target.value) : "")}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="">-- Choose Team --</option>
                  {teamsList.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.teamCode} {t.isAutoGrouped ? "(Auto-Grouped)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Select SIG Event</label>
                <select
                  required
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value ? Number(e.target.value) : "")}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  {events.length === 0 && <option value="1">General Event Round 1</option>}
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.venue || "Main Auditorium"})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Attendance Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">Attendance Status</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendanceMode("full_3")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    attendanceMode === "full_3"
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Full 3 Members
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceMode("duo_2_bonus")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    attendanceMode === "duo_2_bonus"
                      ? "bg-amber-950 border-amber-500 text-amber-300 shadow-md shadow-amber-950"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Duo (2 Members) <span className="block text-[10px] opacity-80">+2 Bonus Applied</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceMode("absent")}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    attendanceMode === "absent"
                      ? "bg-red-950 border-red-500 text-red-300 shadow-md shadow-red-950"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Absent / Disqualified
                </button>
              </div>
            </div>

            {/* Points Fields */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Scotland Yard (Max 20)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={syPoints}
                  onChange={(e) => setSyPoints(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Square One (Max 60)</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={sqPoints}
                  onChange={(e) => setSqPoints(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Bonus Points (Max 10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={bonusPoints}
                  onChange={(e) => setBonusPoints(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Penalties</label>
                <input
                  type="number"
                  min="0"
                  value={penalties}
                  onChange={(e) => setPenalties(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Completion Time (Seconds - Tiebreaker)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 450"
                  value={completionTime}
                  onChange={(e) => setCompletionTime(e.target.value ? Number(e.target.value) : "")}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center space-x-3 cursor-pointer p-3 bg-red-950/40 border border-red-900/60 rounded-xl w-full">
                  <input
                    type="checkbox"
                    checked={isMisconduct}
                    onChange={(e) => setIsMisconduct(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-xs font-bold text-red-300">Flag Misconduct (Zeros Round Score)</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20 text-sm"
            >
              {isPending ? "Logging Score..." : "Submit Verified Score Record"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
