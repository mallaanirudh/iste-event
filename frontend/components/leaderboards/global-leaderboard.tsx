
import type { LeaderboardEntry } from "@/lib/api/types";

export function GlobalLeaderboardTable({
  entries,
}: {
  entries: LeaderboardEntry[];
}) {
  const rows = [...entries].sort(
    (a, b) =>
      (a.rank ?? Number.MAX_SAFE_INTEGER) -
        (b.rank ?? Number.MAX_SAFE_INTEGER) ||
      b.points - a.points
  );

  return (
    <div className="w-full max-h-[600px] overflow-y-auto overflow-x-auto rounded-lg">
      <table className="w-full text-left">
        <thead className="sticky top-0 z-10 bg-[#171020]">
          <tr className="border-b border-[#b68a40]/40 text-xs uppercase tracking-wider text-[#c4acd9]">
            <th className="px-3 py-3">Rank</th>
            <th className="px-3 py-3">Team</th>
            <th className="px-3 py-3 text-right">Points</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((team) => (
            <tr
              key={team.id}
              className="border-b border-[#b68a40]/15"
            >
              <td className="px-3 py-4 font-bold text-[#ffd700]">
                {team.rank ?? "—"}
              </td>

              <td className="px-3 py-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <strong>{team.teamCode}</strong>
                  <span className="text-sm text-[#c4acd9]">
                    {team.teamName}
                  </span>
                </div>
              </td>

              <td className="px-3 py-4 text-right font-black">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
