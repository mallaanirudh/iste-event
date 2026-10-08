"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { errorMessage } from "../../_lib/api";
import { formatDateTime } from "../../_lib/format";
import { useResource } from "../../_lib/use-resource";
import type { LeaderboardEntryInput, LeaderboardRow, Team } from "../../_lib/types";
import Button from "../../_ui/Button";
import { Input, Select } from "../../_ui/Field";
import { ErrorState, TableSkeleton } from "../../_ui/States";
import { useToast } from "../../_ui/Toaster";

type Row = { key: number; teamId: string; points: string; rank: string };
type RowErrors = Partial<Record<keyof Row, string>>;

let keySeq = 1;
const toRows = (data: LeaderboardRow[]): Row[] =>
  data.map((r) => ({ key: keySeq++, teamId: r.teamId, points: String(r.points), rank: r.rank == null ? "" : String(r.rank) }));
const snapshot = (rows: Row[]) => JSON.stringify(rows.map(({ teamId, points, rank }) => [teamId, points.trim(), rank.trim()]));
const isInt = (v: string) => /^-?\d+$/.test(v.trim());

function EditorBody({
  initial, teams, maxPoints, onSave,
}: {
  initial: LeaderboardRow[];
  teams: Team[];
  maxPoints?: number | null;
  onSave: (entries: LeaderboardEntryInput[]) => Promise<void>;
}) {
  const toast = useToast();
  const [rows, setRows] = useState<Row[]>(() => toRows(initial));
  const [baseline] = useState(() => snapshot(toRows(initial)));
  const [errors, setErrors] = useState<Record<number, RowErrors>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string>();

  const dirty = snapshot(rows) !== baseline;
  const used = new Set(rows.map((r) => r.teamId).filter(Boolean));
  const unused = teams.filter((t) => !used.has(t.id));
  const teamCode = new Map(teams.map((t) => [t.id, t.teamCode]));
  const lastUpdated = initial.reduce<string | null>((max, r) => (!max || r.updatedAt > max ? r.updatedAt : max), null);

  const update = (key: number, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
    setErrors((e) => ({ ...e, [key]: {} }));
  };

  const addRow = (teamId = unused[0]?.id ?? "") => setRows((rs) => [...rs, { key: keySeq++, teamId, points: "0", rank: "" }]);
  const addAll = () => setRows((rs) => [...rs, ...unused.map((t) => ({ key: keySeq++, teamId: t.id, points: "0", rank: "" }))]);

  // Competition ranking: equal points share a rank, the next rank skips (1, 1, 3).
  const rankByPoints = () => {
    if (rows.some((r) => !isInt(r.points))) { toast("error", "Fix the points first: every row needs a whole number."); return; }
    const sorted = [...rows].sort((a, b) => Number(b.points) - Number(a.points));
    let prev: number | null = null;
    let rank = 0;
    const ranked = sorted.map((r, i) => {
      const p = Number(r.points);
      if (p !== prev) { rank = i + 1; prev = p; }
      return { ...r, rank: String(rank) };
    });
    setRows(ranked);
  };

  const save = async () => {
    const next: Record<number, RowErrors> = {};
    const seen = new Set<string>();
    for (const r of rows) {
      const e: RowErrors = {};
      if (!r.teamId) e.teamId = "Choose a team.";
      else if (seen.has(r.teamId)) e.teamId = "This team is already listed.";
      seen.add(r.teamId);
      if (!isInt(r.points)) e.points = "Whole number.";
      if (r.rank.trim() && (!isInt(r.rank) || Number(r.rank) < 1)) e.rank = "1 or more.";
      if (Object.keys(e).length) next[r.key] = e;
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setSaving(true);
    setSaveError(undefined);
    try {
      await onSave(rows.map((r) => ({
        teamId: r.teamId,
        points: Number(r.points),
        ...(r.rank.trim() ? { rank: Number(r.rank) } : {}),
      })));
      toast("success", "Leaderboard saved.");
    } catch (err) {
      setSaveError(errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const overMax = (r: Row) => maxPoints != null && isInt(r.points) && Number(r.points) > maxPoints;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {rows.length} team{rows.length === 1 ? "" : "s"}
          {lastUpdated && <> · last saved {formatDateTime(lastUpdated)}</>}
          {maxPoints != null && <> · round max {maxPoints} pts</>}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => addRow()} disabled={!unused.length}>Add team</Button>
          <Button size="sm" variant="secondary" onClick={addAll} disabled={!unused.length}>Add all remaining</Button>
          <Button size="sm" variant="secondary" onClick={rankByPoints} disabled={!rows.length}>Rank by points</Button>
        </div>
      </div>

      {!teams.length ? (
        <div className="px-4 py-10 text-center text-sm text-zinc-600 dark:text-zinc-400">
          This mega event has no teams yet. <Link className="font-medium text-blue-800 underline dark:text-blue-400" href="/admin/teams">Create teams</Link> first.
        </div>
      ) : !rows.length ? (
        <div className="px-4 py-10 text-center text-sm text-zinc-600 dark:text-zinc-400">
          No teams on this leaderboard yet. Use <strong>Add team</strong> or <strong>Add all remaining</strong>.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="text-xs text-zinc-600 dark:text-zinc-400">
                <th scope="col" className="px-4 py-2 font-medium">Team</th>
                <th scope="col" className="w-36 px-4 py-2 font-medium">Points</th>
                <th scope="col" className="w-28 px-4 py-2 font-medium">Rank</th>
                <th scope="col" className="w-16 px-4 py-2"><span className="sr-only">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const e = errors[r.key] ?? {};
                return (
                  <tr key={r.key} className="border-t border-zinc-100 dark:border-zinc-800/70">
                    <td className="px-4 py-2 align-top">
                      <Select
                        aria-label={`Team for row ${i + 1}`}
                        value={r.teamId}
                        onChange={(ev) => update(r.key, { teamId: ev.target.value })}
                        aria-invalid={e.teamId ? true : undefined}
                        className="font-mono"
                      >
                        <option value="">Choose a team…</option>
                        {teams.filter((t) => t.id === r.teamId || !used.has(t.id)).map((t) => (
                          <option key={t.id} value={t.id}>{t.teamCode}</option>
                        ))}
                        {r.teamId && !teamCode.has(r.teamId) && <option value={r.teamId}>Unknown team ({r.teamId.slice(0, 8)})</option>}
                      </Select>
                      {e.teamId && <p className="mt-1 text-xs text-red-700 dark:text-red-400">{e.teamId}</p>}
                    </td>
                    <td className="px-4 py-2 align-top">
                      <Input
                        aria-label={`Points for row ${i + 1}`}
                        type="number"
                        inputMode="numeric"
                        step={1}
                        value={r.points}
                        onChange={(ev) => update(r.key, { points: ev.target.value })}
                        aria-invalid={e.points ? true : undefined}
                        className="tabular-nums"
                      />
                      {e.points ? (
                        <p className="mt-1 text-xs text-red-700 dark:text-red-400">{e.points}</p>
                      ) : overMax(r) ? (
                        <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">Above round max</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-2 align-top">
                      <Input
                        aria-label={`Rank for row ${i + 1}`}
                        type="number"
                        inputMode="numeric"
                        min={1}
                        step={1}
                        placeholder="None"
                        value={r.rank}
                        onChange={(ev) => update(r.key, { rank: ev.target.value })}
                        aria-invalid={e.rank ? true : undefined}
                        className="tabular-nums"
                      />
                      {e.rank && <p className="mt-1 text-xs text-red-700 dark:text-red-400">{e.rank}</p>}
                    </td>
                    <td className="px-4 py-2 text-right align-top">
                      <Button size="sm" variant="ghost" aria-label={`Remove row ${i + 1}`} className="mt-1 text-red-700 dark:text-red-400"
                        onClick={() => setRows((rs) => rs.filter((x) => x.key !== r.key))}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {dirty ? "Unsaved changes. Saving replaces the whole leaderboard." : "No unsaved changes."}
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={!dirty || saving} onClick={() => { setRows(toRows(initial)); setErrors({}); setSaveError(undefined); }}>
            Discard changes
          </Button>
          <Button onClick={save} loading={saving} disabled={!dirty}>Save leaderboard</Button>
        </div>
      </div>
      {saveError && <p className="px-4 pb-3 text-sm text-red-700 dark:text-red-400" role="alert">{saveError}</p>}
    </div>
  );
}

/** Loads a leaderboard and mounts a fresh editor whenever the source or a save changes it. */
export default function LeaderboardEditor({
  sourceKey, load, save, teams, maxPoints, note,
}: {
  sourceKey: string;
  load: () => Promise<LeaderboardRow[]>;
  save: (entries: LeaderboardEntryInput[]) => Promise<void>;
  teams: Team[];
  maxPoints?: number | null;
  note?: ReactNode;
}) {
  const board = useResource(sourceKey, load);

  if (board.error) return <ErrorState message={board.error} onRetry={board.reload} />;
  if (!board.data) return <TableSkeleton rows={4} cols={3} />;

  // Remount the editor when fresh data arrives (new source, or a reload after saving).
  const dataKey = sourceKey + JSON.stringify(board.data.map((r) => [r.teamId, r.points, r.rank, r.updatedAt]));

  return (
    <>
      {note}
      <EditorBody
        key={dataKey}
        initial={board.data}
        teams={teams}
        maxPoints={maxPoints}
        onSave={async (entries) => { await save(entries); board.reload(); }}
      />
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
        Leaderboards are edited directly. Points are never calculated automatically.{" "}
        <Link className="font-medium text-blue-800 underline dark:text-blue-400" href="/admin/audit-logs">View audit log</Link>
      </p>
    </>
  );
}
