export type FestivalEventId =
  "scotland-yard" | "concrete" | "clutch" | "charge" | "crypt" | "catalyst";
export type EventSession = { label: string; startsAt: string; endsAt: string };
export type FestivalEvent = {
  id: FestivalEventId;
  chamberId: string;
  name: string;
  sig: string;
  description: string;
  href: string | null;
  sessions: EventSession[];
};

export const FESTIVAL_TIME_ZONE = "Asia/Kolkata";

/** Organizer's October 2026 brief. Specific Charge slots override the shared Square One slot. */
export const festivalEvents: FestivalEvent[] = [
  {
    id: "scotland-yard",
    chamberId: "scotland-yard",
    name: "Scotland Yard",
    sig: "ISTE",
    description:
      "A campus-wide treasure hunt, chocolate-making challenges and a final race against the clock.",
    href: "/events/scotland-yard",
    sessions: [
      {
        label: "Round 1 · Campus-wide treasure hunt",
        startsAt: "2026-10-11T09:00:00+05:30",
        endsAt: "2026-10-11T13:00:00+05:30",
      },
      {
        label: "Round 2 · Chocolate-making challenge",
        startsAt: "2026-10-11T15:00:00+05:30",
        endsAt: "2026-10-11T17:00:00+05:30",
      },
      {
        label: "Round 3 · The final challenge",
        startsAt: "2026-10-11T18:00:00+05:30",
        endsAt: "2026-10-11T19:00:00+05:30",
      },
    ],
  },
  {
    id: "concrete",
    chamberId: "concrete-sq1",
    name: "Titanic: Float It for Jack",
    sig: "Concrete",
    description:
      "Earn virtual cash, choose your materials and build a floating structure to rescue Jack.",
    href: "/events/concrete",
    sessions: [
      {
        label: "Square One · Concrete",
        startsAt: "2026-10-12T18:30:00+05:30",
        endsAt: "2026-10-12T20:30:00+05:30",
      },
    ],
  },
  {
    id: "clutch",
    chamberId: "clutch-sq1",
    name: "Magnetic Grand Prix",
    sig: "Clutch",
    description:
      "Design a car powered by magnetic attraction or repulsion, then compete in the Grand Prix.",
    href: "/events/clutch",
    sessions: [
      {
        label: "Square One · Clutch",
        startsAt: "2026-10-13T18:30:00+05:30",
        endsAt: "2026-10-13T20:30:00+05:30",
      },
    ],
  },
  {
    id: "charge",
    chamberId: "charge-sq1",
    name: "Power the Beacon",
    sig: "Charge",
    description: "Bid for parts, build a working circuit and light the beacon.",
    href: "/events/charge",
    sessions: [
      {
        label: "KSS & Round 1",
        startsAt: "2026-10-14T18:00:00+05:30",
        endsAt: "2026-10-14T20:00:00+05:30",
      },
      {
        label: "Round 2 · Auction and build",
        startsAt: "2026-10-14T21:00:00+05:30",
        endsAt: "2026-10-14T23:00:00+05:30",
      },
    ],
  },
  {
    id: "crypt",
    chamberId: "crypt-sq1",
    name: "Trust No Link",
    sig: "Crypt",
    description:
      "A Capture the Flag challenge with internet puzzles and mathematics. Trust your reasoning.",
    href: null,
    sessions: [
      {
        label: "Square One · Crypt",
        startsAt: "2026-10-15T18:30:00+05:30",
        endsAt: "2026-10-15T20:30:00+05:30",
      },
    ],
  },
  {
    id: "catalyst",
    chamberId: "catalyst-sq1",
    name: "LABLOCK: Escape the Lab",
    sig: "Catalyst",
    description:
      "Diagnose a simulated process emergency, stabilise the system and obtain the shutdown code.",
    href: "/events/catalyst",
    sessions: [
      {
        label: "Square One · Catalyst",
        startsAt: "2026-10-16T18:30:00+05:30",
        endsAt: "2026-10-16T20:30:00+05:30",
      },
    ],
  },
];

export function getFestivalEvent(id: FestivalEventId): FestivalEvent {
  return festivalEvents.find((event) => event.id === id)!;
}

export const festivalSlots = festivalEvents
  .flatMap((event) =>
    event.sessions.map((session) => ({
      event,
      session,
      start: Date.parse(session.startsAt),
      end: Date.parse(session.endsAt),
    })),
  )
  .sort((a, b) => a.start - b.start);
export type FestivalSlot = (typeof festivalSlots)[number];

/** Start-inclusive, end-exclusive: breaks and overnight gaps never count as live. */
export function getFestivalSnapshot(now: number) {
  const current = festivalSlots.filter(
    (slot) => slot.start <= now && now < slot.end,
  );
  const next = festivalSlots.find((slot) => slot.start > now) ?? null;
  const phase = current.length
    ? "live"
    : now < festivalSlots[0].start
      ? "before"
      : next
        ? "between"
        : "complete";
  return { current, next, phase };
}

export function getEventTiming(id: FestivalEventId, now: number) {
  const slots = festivalSlots.filter((slot) => slot.event.id === id);
  const current =
    slots.find((slot) => slot.start <= now && now < slot.end) ?? null;
  const next = slots.find((slot) => slot.start > now) ?? null;
  const status = current
    ? "live"
    : next
      ? now < slots[0].start
        ? "upcoming"
        : "intermission"
      : "complete";
  return { current, next, status };
}

export function formatEventDate(event: FestivalEvent) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: FESTIVAL_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(event.sessions[0].startsAt));
}
export function formatSessionTime(session: EventSession) {
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: FESTIVAL_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${formatter.format(new Date(session.startsAt)).toUpperCase()}–${formatter.format(new Date(session.endsAt)).toUpperCase()} IST`;
}
export function formatEventTime(event: FestivalEvent) {
  return event.sessions.map(formatSessionTime).join(" · ");
}
export function countdownValues(milliseconds: number) {
  const seconds = Math.floor(Math.max(0, milliseconds) / 1000);
  return [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
}
