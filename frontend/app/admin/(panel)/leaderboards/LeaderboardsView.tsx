"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { api } from "../../_lib/api";
import { byName, useEvents, useMegaEvents, useRounds, useTeams } from "../../_lib/queries";
import type { LeaderboardRow } from "../../_lib/types";
import EventPicker from "../../_ui/EventPicker";
import { Select } from "../../_ui/Field";
import PageHeader from "../../_ui/PageHeader";
import { EmptyState, ErrorState } from "../../_ui/States";
import LeaderboardEditor from "./LeaderboardEditor";

const TABS = [
  { id: "round", label: "Round leaderboards" },
  { id: "overall", label: "Overall leaderboard" },
] as const;

export default function LeaderboardsView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const tab = params.get("tab") === "overall" ? "overall" : "round";
  const eventId = params.get("event") ?? "";
  const roundId = params.get("round") ?? "";
  const megaId = params.get("mega") ?? "";

  const setParams = (next: Record<string, string>) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) sp.set(k, v);
    router.replace(`${pathname}${sp.size ? `?${sp}` : ""}`);
  };

  const events = useEvents();
  const megaEvents = useMegaEvents();
  const teams = useTeams();
  const rounds = useRounds(tab === "round" && eventId ? eventId : null);

  const event = events.data?.find((e) => e.id === eventId);
  const round = rounds.data?.find((r) => r.id === roundId);
  const loadError = events.error ?? megaEvents.error ?? teams.error;

  return (
    <>
      <PageHeader
        title="Leaderboards"
        description="Set points and ranks by hand. The overall leaderboard is separate and is not calculated from round scores."
      />

      <div role="group" aria-label="Leaderboard type" className="mb-6 inline-flex rounded-md border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setParams({ tab: t.id === "overall" ? "overall" : "", mega: megaId })}
            className={`rounded px-3 py-1.5 text-sm transition-colors ${
              tab === t.id
                ? "bg-blue-800 font-medium text-white dark:bg-blue-600"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loadError ? (
        <ErrorState message={loadError} onRetry={() => { events.reload(); megaEvents.reload(); teams.reload(); }} />
      ) : tab === "round" ? (
        <section aria-label="Round leaderboard">
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
            <EventPicker events={events.data ?? []} value={eventId} onChange={(id) => setParams({ event: id })} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="round-picker" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Round</label>
              <Select id="round-picker" value={roundId} disabled={!eventId || !rounds.data} onChange={(e) => setParams({ event: eventId, round: e.target.value })}>
                <option value="">{!eventId ? "Choose an event first" : rounds.data?.length === 0 ? "This event has no rounds" : "Choose a round…"}</option>
                {rounds.data?.map((r) => <option key={r.id} value={r.id}>Round {r.roundNumber}: {r.name}</option>)}
              </Select>
            </div>
          </div>

          {rounds.error ? (
            <ErrorState message={rounds.error} onRetry={rounds.reload} />
          ) : eventId && rounds.data?.length === 0 ? (
            <EmptyState title="No rounds in this event">
              <Link className="font-medium text-blue-800 underline dark:text-blue-400" href={`/admin/rounds?event=${eventId}`}>Add rounds</Link> before entering scores.
            </EmptyState>
          ) : round && event && teams.data ? (
            <LeaderboardEditor
              sourceKey={`round:${round.id}`}
              teams={teams.data.filter((t) => t.megaEventId === event.megaEventId)}
              maxPoints={round.maxPoints}
              load={() => api<{ leaderboard: LeaderboardRow[] }>(`/rounds/${round.id}/leaderboard`).then((r) => r.leaderboard)}
              save={(entries) => api(`/admin/rounds/${round.id}/leaderboard`, { method: "PUT", body: { entries } })}
            />
          ) : (
            <EmptyState title="Pick an event and a round">The round&apos;s leaderboard will open here for editing.</EmptyState>
          )}
        </section>
      ) : (
        <section aria-label="Overall leaderboard">
          <div className="mb-6 max-w-md">
            <label htmlFor="mega-picker" className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Mega event</label>
            <Select id="mega-picker" value={megaId} onChange={(e) => setParams({ tab: "overall", mega: e.target.value })}>
              <option value="">Choose a mega event…</option>
              {[...(megaEvents.data ?? [])].sort(byName).map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </Select>
          </div>

          {megaId && teams.data && events.data ? (
            (() => {
              // The backend reads the overall board through any event of the mega event.
              const anyEvent = events.data.find((e) => e.megaEventId === megaId);
              return (
                <LeaderboardEditor
                  sourceKey={`overall:${megaId}`}
                  teams={teams.data.filter((t) => t.megaEventId === megaId)}
                  load={() =>
                    anyEvent
                      ? api<{ leaderboard: LeaderboardRow[] }>(`/events/${anyEvent.id}/leaderboard`).then((r) => r.leaderboard)
                      : Promise.resolve([])
                  }
                  save={(entries) => api(`/admin/mega-events/${megaId}/leaderboard`, { method: "PUT", body: { entries } })}
                  note={
                    !anyEvent && (
                      <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
                        This mega event has no events yet, so the saved overall leaderboard can&apos;t be read back. You can still save a new one.
                      </p>
                    )
                  }
                />
              );
            })()
          ) : (
            <EmptyState title="Pick a mega event">Its overall leaderboard will open here for editing.</EmptyState>
          )}
        </section>
      )}
    </>
  );
}
