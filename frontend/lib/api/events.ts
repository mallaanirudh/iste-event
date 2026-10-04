import { apiGet, isUuid } from "./client";
import {
  itemOf,
  listOf,
  toEntry,
  toEvent,
  toMegaEvent,
  toRound,
  type LeaderboardEntry,
  type MegaEvent,
  type PublicEvent,
  type PublicRound,
} from "./types";

export async function getEvents(): Promise<PublicEvent[] | null> {
  const data = await apiGet("/events");
  return data === null ? null : listOf(data, "events", toEvent);
}

/**
 * Finds one event: by explicit ID when configured, otherwise by SIG name
 * (and event name, if several events share the SIG). Matching is
 * case-insensitive so admins don't have to type names exactly.
 */
export async function findEvent(opts: {
  eventId?: string;
  sigName: string;
  eventName?: string;
}): Promise<PublicEvent | null> {
  if (opts.eventId && isUuid(opts.eventId)) {
    const data = await apiGet(`/events/${opts.eventId}`);
    const event = itemOf(data, "event", toEvent);
    if (event) return event;
  }
  const events = await getEvents();
  if (!events) return null;
  const norm = (s: string) => s.trim().toLowerCase();
  const bySig = events.filter((e) => norm(e.sigName) === norm(opts.sigName));
  if (opts.eventName) {
    const exact = bySig.find((e) => norm(e.name) === norm(opts.eventName!));
    if (exact) return exact;
  }
  return bySig[0] ?? null;
}

export async function getRounds(eventId: string): Promise<PublicRound[] | null> {
  if (!isUuid(eventId)) return null;
  const data = await apiGet(`/events/${eventId}/rounds`);
  if (data === null) return null;
  return listOf(data, "rounds", toRound).sort((a, b) => a.roundNumber - b.roundNumber);
}

export async function getRoundLeaderboard(roundId: string): Promise<LeaderboardEntry[] | null> {
  if (!isUuid(roundId)) return null;
  const data = await apiGet(`/rounds/${roundId}/leaderboard`, { revalidate: 15 });
  return data === null ? null : listOf(data, "leaderboard", toEntry);
}

/** Overall Mega Event leaderboard, as published by admins — never derived from round scores. */
export async function getOverallLeaderboard(eventId: string): Promise<LeaderboardEntry[] | null> {
  if (!isUuid(eventId)) return null;
  const data = await apiGet(`/events/${eventId}/leaderboard`, { revalidate: 15 });
  return data === null ? null : listOf(data, "leaderboard", toEntry);
}

export async function getMegaEvent(megaEventId: string): Promise<MegaEvent | null> {
  if (!isUuid(megaEventId)) return null;
  const data = await apiGet(`/mega-events/${megaEventId}`);
  return itemOf(data, "megaEvent", toMegaEvent);
}
