import type { CSSProperties } from "react";
import { Star } from "lucide-react";

type Entry = { name: string; domain: string; points: number; rank: number };

export function FestivalScoreboard({
  entries,
  full,
}: {
  entries: Entry[];
  full: boolean;
}) {
  return (
    <>
      <div className="festival-scoreboard">
        <div className="festival-scoreboard-header" aria-hidden="true">
          <span>Rank</span>
          <span>Team / chamber</span>
          <span className="text-right">Points</span>
        </div>
        <ol
          aria-label={
            full ? "Full sample leaderboard" : "Top five sample teams"
          }
        >
          {entries.map((team) => (
            <li key={team.name} className="festival-scoreboard-row">
              <span
                className="festival-scoreboard-rank"
                style={
                  {
                    "--medal-color":
                      ["#e9cb80", "#cbd1df", "#ca9570"][team.rank - 1] ??
                      "#bda4d1",
                  } as CSSProperties
                }
              >
                {team.rank <= 3 && (
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                )}
                <span>
                  <span className="sr-only">Rank </span>
                  {String(team.rank).padStart(2, "0")}
                </span>
              </span>
              <div className="min-w-0">
                <p className="festival-scoreboard-name">{team.name}</p>
                <p className="festival-scoreboard-domain">{team.domain}</p>
              </div>
              <span className="festival-scoreboard-points">
                {team.points.toLocaleString("en-US")}
                <span className="sr-only"> points</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      {entries.length === 0 && (
        <p className="px-4 py-8 text-center text-sm text-[#c4acd9]">
          No teams found. Try another name or chamber.
        </p>
      )}
    </>
  );
}
