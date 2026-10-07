"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "@/lib/api/types";
import Floor from "./Floor";

export type Board = { id: string; label: string; entries: LeaderboardEntry[] };

const timeFmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Kolkata" });

/** Floor 1: overall and per-round standings. Refreshes every 30s while the tab is visible. */
export default function Scoreboard({ boards, online }: { boards: Board[]; online: boolean }) {
  const router = useRouter();
  const [active, setActive] = useState(boards[0]?.id ?? "");
  const [updated, setUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!online) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const tick = () => { router.refresh(); setUpdated(timeFmt.format(new Date())); };
    const start = () => { clearInterval(timer); timer = setInterval(tick, 30_000); };
    const onVis = () => { if (document.visibilityState === "visible") { tick(); start(); } else clearInterval(timer); };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", onVis); };
  }, [online, router]);

  const board = boards.find((b) => b.id === active) ?? boards[0];
  const rows = [...(board?.entries ?? [])].sort((a, b) => (a.rank ?? 1e9) - (b.rank ?? 1e9) || b.points - a.points);

  return (
    <Floor id="scores" label="1" name="Scoreboard" wall="#dcc095" labelledBy="h-scores">
      <div style={{ paddingTop: 44 }}>
        <p className="kicker" data-pop>Who&apos;s closing in</p>
        <h2 id="h-scores" className="title" data-pop style={{ "--d": 1 } as React.CSSProperties}>The <em>Scoreboard</em></h2>

        <div className="scoreboard" data-pop style={{ "--d": 2 } as React.CSSProperties}>
          <div className="sb-head">
            <h3>{board?.label ?? "Standings"}</h3>
            <span className="live">{online ? (updated ? `Live · updated ${updated}` : "Live") : "Offline · scores appear here on the day"}</span>
          </div>
          {boards.length > 1 && (
            <div className="sb-tabs" role="group" aria-label="Choose a leaderboard">
              {boards.map((b) => (
                <button key={b.id} type="button" aria-pressed={b.id === board?.id} onClick={() => setActive(b.id)}>{b.label}</button>
              ))}
            </div>
          )}
          {rows.length ? (
            <table className="sb-table">
              <caption className="sr-only">{board?.label}</caption>
              <thead><tr><th scope="col">Rank</th><th scope="col">Squad</th><th scope="col" style={{ textAlign: "right" }}>Points</th></tr></thead>
              <tbody>
                {rows.slice(0, 10).map((r) => (
                  <tr key={r.id} className={r.rank === 1 ? "top" : undefined}>
                    <td>{r.rank ?? "-"}</td>
                    <td className="team">{r.teamCode}</td>
                    <td>{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="sb-empty">No scores yet. The board lights up once the chase begins.</p>
          )}
        </div>
      </div>
    </Floor>
  );
}
