export type FestivalEventId =
  | "scotland-yard"
  | "concrete"
  | "clutch"
  | "charge"
  | "crypt"
  | "catalyst";

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
    sessions: [],
  },
  {
    id: "concrete",
    chamberId: "concrete-sq1",
    name: "Titanic: Float It for Jack",
    sig: "Concrete",
    description:
      "Earn virtual cash, choose your materials and build a floating structure to rescue Jack.",
    href: "/events/concrete",
    sessions: [],
  },
  {
    id: "clutch",
    chamberId: "clutch-sq1",
    name: "Magnetic Grand Prix",
    sig: "Clutch",
    description:
      "Design a car powered by magnetic attraction or repulsion, then compete in the Grand Prix.",
    href: "/events/clutch",
    sessions: [],
  },
  {
    id: "charge",
    chamberId: "charge-sq1",
    name: "Power the Beacon",
    sig: "Charge",
    description: "Bid for parts, build a working circuit and light the beacon.",
    href: "/events/charge",
    sessions: [],
  },
  {
    id: "crypt",
    chamberId: "crypt-sq1",
    name: "Trust No Link",
    sig: "Crypt",
    description:
      "A Capture the Flag challenge with internet puzzles and mathematics. Trust your reasoning.",
    href: null,
    sessions: [],
  },
  {
    id: "catalyst",
    chamberId: "catalyst-sq1",
    name: "LABLOCK: Escape the Lab",
    sig: "Catalyst",
    description:
      "Diagnose a simulated process emergency, stabilise the system and obtain the shutdown code.",
    href: "/events/catalyst",
    sessions: [],
  },
];

export function getFestivalEvent(id: FestivalEventId): FestivalEvent | undefined {
  return festivalEvents.find((event) => event.id === id);
}

export const festivalSlots = festivalEvents
  .flatMap((event) =>
    (event.sessions ?? []).map((session) => ({
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
  if (!festivalSlots.length) {
    return { current: [], next: null, phase: "before" as const };
  }

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
  if (!slots.length) {
    return { current: null, next: null, status: "upcoming" as const };
  }

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

export function formatEventDate(event?: { sessions?: { startsAt: string }[] }) {
  if (!event?.sessions?.[0]?.startsAt) return "Date TBD";

  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(event.sessions[0].startsAt));
}

export function formatSessionTime(session?: EventSession) {
  if (!session?.startsAt || !session?.endsAt) return "Time TBD";

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: FESTIVAL_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formatter.format(new Date(session.startsAt)).toUpperCase()}–${formatter.format(new Date(session.endsAt)).toUpperCase()} IST`;
}

export function formatEventTime(event?: FestivalEvent) {
  if (!event?.sessions?.length) return "Time TBD";
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