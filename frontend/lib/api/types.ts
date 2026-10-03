/**
 * Response shapes of the public backend routes, plus runtime guards.
 * The guards mean a malformed or unexpected response is dropped instead of
 * being rendered, so a backend bug can't break or inject into a page.
 */

export type PublicEvent = {
  id: string;
  name: string;
  description: string | null;
  megaEventId: string;
  megaEventName: string;
  sigId: string;
  sigName: string;
};

export type PublicRound = {
  id: string;
  eventId: string;
  roundNumber: number;
  name: string;
  description: string | null;
  maxPoints: number | null;
};

export type LeaderboardEntry = {
  id: string;
  teamId: string;
  teamCode: string;
  rank: number | null;
  points: number;
};

export type MegaEvent = {
  id: string;
  name: string;
  description: string | null;
  registrationOpenAt: string | null;
  registrationCloseAt: string | null;
};

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown): v is string => typeof v === "string";
const strOrNull = (v: unknown): v is string | null => v === null || str(v);
const int = (v: unknown): v is number =>
  typeof v === "number" && Number.isInteger(v);
const intOrNull = (v: unknown): v is number | null => v === null || int(v);

export function toEvent(v: unknown): PublicEvent | null {
  if (!isObj(v)) return null;
  const { id, name, description, megaEventId, megaEventName, sigId, sigName } = v;
  if (
    !str(id) || !str(name) || !strOrNull(description ?? null) ||
    !str(megaEventId) || !str(megaEventName) || !str(sigId) || !str(sigName)
  ) {
    return null;
  }
  return {
    id, name, description: (description as string | null) ?? null,
    megaEventId, megaEventName, sigId, sigName,
  };
}

export function toRound(v: unknown): PublicRound | null {
  if (!isObj(v)) return null;
  const { id, eventId, roundNumber, name, description, maxPoints } = v;
  if (
    !str(id) || !str(eventId) || !int(roundNumber) || !str(name) ||
    !strOrNull(description ?? null) || !intOrNull(maxPoints ?? null)
  ) {
    return null;
  }
  return {
    id, eventId, roundNumber, name,
    description: (description as string | null) ?? null,
    maxPoints: (maxPoints as number | null) ?? null,
  };
}

export function toEntry(v: unknown): LeaderboardEntry | null {
  if (!isObj(v)) return null;
  const { id, teamId, teamCode, rank, points } = v;
  if (!str(id) || !str(teamId) || !str(teamCode) || !intOrNull(rank ?? null) || !int(points)) {
    return null;
  }
  return { id, teamId, teamCode, rank: (rank as number | null) ?? null, points };
}

export function toMegaEvent(v: unknown): MegaEvent | null {
  if (!isObj(v)) return null;
  const { id, name, description, registrationOpenAt, registrationCloseAt } = v;
  if (
    !str(id) || !str(name) || !strOrNull(description ?? null) ||
    !strOrNull(registrationOpenAt ?? null) || !strOrNull(registrationCloseAt ?? null)
  ) {
    return null;
  }
  return {
    id, name,
    description: (description as string | null) ?? null,
    registrationOpenAt: (registrationOpenAt as string | null) ?? null,
    registrationCloseAt: (registrationCloseAt as string | null) ?? null,
  };
}

/** Maps an array field through a guard, dropping invalid items. */
export function listOf<T>(v: unknown, key: string, guard: (x: unknown) => T | null): T[] {
  if (!isObj(v) || !Array.isArray(v[key])) return [];
  return (v[key] as unknown[]).map(guard).filter((x): x is T => x !== null);
}

export function itemOf<T>(v: unknown, key: string, guard: (x: unknown) => T | null): T | null {
  return isObj(v) ? guard(v[key]) : null;
}
