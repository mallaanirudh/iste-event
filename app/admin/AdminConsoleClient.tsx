"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { autoGroupSolosAction } from "@/app/actions/registration";
import { publishLeaderboardSnapshotAction } from "@/app/actions/scoring";

export default function AdminConsoleClient({
  unassignedSolos = [],
  allTeams = [],
}: {
  unassignedSolos: any[];
  allTeams: any[];
}) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAutoGroup = () => {
    setMessage(null);
    startTransition(async () => {
      const res = await autoGroupSolosAction();
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Auto-grouping completed!" });
      } else {
        setMessage({ type: "error", text: res.error || "Auto-grouping failed." });
      }
    });
  };

  const handlePublishSnapshot = () => {
    setMessage(null);
    startTransition(async () => {
      const res = await publishLeaderboardSnapshotAction();
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Leaderboard snapshot published!" });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to publish snapshot." });
      }
    });
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,TeamCode,IsAutoGrouped,CreatedAt\n";
    allTeams.forEach((t) => {
      csvContent += `${t.teamCode},${t.isAutoGrouped},${t.createdAt}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "master_teams_registry.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              EC
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Events Coordinator Admin Panel</span>
          </div>
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            ← Home
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-medium border ${
              message.type === "success"
                ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                : "bg-red-950/60 border-red-800 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Action Controls Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Auto-Grouping Tool */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-1">1-Click Auto-Grouping</h2>
              <h3 className="text-xl font-bold text-white mb-2">{unassignedSolos.length} Unassigned Solos</h3>
              <p className="text-xs text-slate-400 mb-4">
                Combines every 3 individual registrants into a `#TEAM` code automatically.
              </p>
            </div>
            <button
              onClick={handleAutoGroup}
              disabled={isPending || unassignedSolos.length < 3}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition-colors shadow-md"
            >
              Run Auto-Grouping Algorithm
            </button>
          </div>

          {/* Leaderboard Snapshot Control */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-violet-400 font-semibold mb-1">Leaderboard Control Room</h2>
              <h3 className="text-xl font-bold text-white mb-2">Publish Official Snapshot</h3>
              <p className="text-xs text-slate-400 mb-4">
                Calculates tiebreakers (Scotland Yard score multiplier & completion times) and updates public homepage.
              </p>
            </div>
            <button
              onClick={handlePublishSnapshot}
              disabled={isPending}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-40 transition-colors shadow-md"
            >
              Publish Official Snapshot
            </button>
          </div>

          {/* Master CSV Export */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-1">Master Records Export</h2>
              <h3 className="text-xl font-bold text-white mb-2">{allTeams.length} Registered Teams</h3>
              <p className="text-xs text-slate-400 mb-4">Export full master registry CSV for physical event management.</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md"
            >
              Export CSV Master Registry
            </button>
          </div>
        </div>

        {/* Master Teams List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Master Teams Registry</h2>
          {allTeams.length === 0 ? (
            <p className="text-slate-400 text-sm">No teams registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-xs">
                    <th className="py-3 px-4">Team Code</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {allTeams.map((team) => (
                    <tr key={team.id} className="hover:bg-slate-800/40">
                      <td className="py-3.5 px-4 font-bold text-indigo-400">{team.teamCode}</td>
                      <td className="py-3.5 px-4 text-xs">
                        {team.isAutoGrouped ? (
                          <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 font-medium">
                            Auto-Grouped Solo Trio
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                            Direct 3-Member Team
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        {team.isDisqualified ? (
                          <span className="px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold">Disqualified</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-medium">Active</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right text-xs text-slate-400">
                        {new Date(team.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
