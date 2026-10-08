"use client";

import { api } from "./api";
import type { AdminEvent, MegaEvent, Round, Sig, Team } from "./types";
import { useResource } from "./use-resource";

export const useMegaEvents = () =>
  useResource("mega-events", () => api<{ megaEvents: MegaEvent[] }>("/admin/mega-events").then((r) => r.megaEvents));

export const useSigs = () =>
  useResource("sigs", () => api<{ sigs: Sig[] }>("/admin/sigs").then((r) => r.sigs));

export const useEvents = () =>
  useResource("events", () => api<{ events: AdminEvent[] }>("/admin/events").then((r) => r.events));

export const useTeams = () =>
  useResource("teams", () => api<{ teams: Team[] }>("/admin/teams").then((r) => r.teams));

export const useRounds = (eventId: string | null) =>
  useResource(eventId ? `rounds:${eventId}` : null, () =>
    api<{ rounds: Round[] }>(`/admin/events/${eventId}/rounds`).then((r) => r.rounds));

export const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name);
