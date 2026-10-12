
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "@/lib/api/types";
import { ScotlandLeaderboard } from "@/data/leaderboards/scotland-yard";
import Floor from "./Floor";
import { Clue } from "./Casebook";
import { clues } from "../content";

export type Board = {
  id: string;
  label: string;
  entries: LeaderboardEntry[];
};

const timeFmt = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Asia/Kolkata",
});

/** Floor 1: final Scotland Yard standings. */
export default function Scoreboard({
  boards,
  online,
}: {
  boards: Board[];
  online: boolean;
}) {
  const router = useRouter();
  const [updated, setUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!online) return;

    let timer: ReturnType<typeof setInterval> | undefined;

    const tick = () => {
      router.refresh();
      setUpdated(timeFmt.format(new Date()));
    };

    const start = () => {
      clearInterval(timer);
      timer = setInterval(tick, 30_000);
    };

    const onVis = () => {
      if (document.visibilityState === "visible") {
        tick();
        start();
      } else {
        clearInterval(timer);
      }
    };

    start();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [online, router]);

  // Use the static Scotland Yard winners for the final leaderboard.
  const rows: LeaderboardEntry[] = [...ScotlandLeaderboard].sort(
    (a, b) =>
      (a.rank ?? 1e9) - (b.rank ?? 1e9) ||
      b.points - a.points
  );

  const boardLabel = "Final Standings";

  return (
    <Floor
      id="scores"
      label="1"
      name="Scoreboard"
      wall="#e3d4f7"
      labelledBy="h-scores"
    >
      <div style={{ paddingTop: 44 }}>
        <p className="kicker" data-pop>
          Who&apos;s closing in
        </p>

        <h2
          id="h-scores"
          className="title"
          data-pop
          style={{ "--d": 1 } as React.CSSProperties}
        >
          The <em>Sweetest Squads</em>
        </h2>

        <div
          className="scoreboard"
          data-pop
          style={{ "--d": 2 } as React.CSSProperties}
        >
          <div className="sb-head">
            <h3>{boardLabel}</h3>
            <span className="live">
              {online
                ? updated
                  ? `Live · updated ${updated}`
                  : "Final results"
                : ""}
            </span>
          </div>

          {rows.length ? (
            <table className="sb-table">
              <caption className="sr-only">{boardLabel}</caption>

              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Squad</th>
                  <th scope="col" style={{ textAlign: "right" }}>
                    Points
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className={r.rank === 1 ? "top" : undefined}
                  >
                    <td>{r.rank ?? "-"}</td>

                    <td className="team">
                      <strong>{r.teamCode}</strong>
                       <span style={{ marginLeft: "10px" }}>{r.teamName}</span>
                    </td>

                    <td>{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="sb-empty">
              No scores yet. The board lights up once the chase begins.
            </p>
          )}
        </div>
      </div>

      <Clue at={{ right: "4%", top: "13%" }} note={clues.scores} />
    </Floor>
  );
}
