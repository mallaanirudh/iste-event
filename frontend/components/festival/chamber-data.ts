import {
  EVENT as chargeEvent,
  START_ISO,
} from "@/app/events/charge/_data/content";

export type Chamber = {
  id: string;
  title: string;
  description: string;
  theme: string;
  discipline: string;
  sig: string;
  color: string;
  artwork: "mystery" | "beacon" | "maze" | "terminal" | "race" | "voyage";
  href: string | null;
  eventName: string;
};

// Chamber order, titles, descriptions, and themes are taken from the original
// HomePageComponents/InventingRoomsSection.tsx at the pulled commit 7b793b2.
// Route names follow the actual app, rather than the old footer's stale URLs.
export const chambers: Chamber[] = [
  {
    id: "scotland-yard",
    title: "Scotland Yard",
    description:
      "A mystery awaits. Grab your magnifying glass and uncover the hidden truths within the fog.",
    theme: "Mystery",
    discipline: "Investigation & teamwork",
    sig: "ISTE",
    color: "#ffd700",
    artwork: "mystery",
    href: "/events/scotland-yard",
    eventName: "Scotland Yard",
  },
  {
    id: "charge-sq1",
    title: "Charge Sq1",
    description:
      "Break the blocks, find the diamonds. An 8-bit adventure of epic mechanical proportions.",
    theme: "8-bit",
    discipline: "Electronics & electrical engineering",
    sig: "Charge",
    color: "#65f0b5",
    artwork: "beacon",
    href: "/events/charge",
    eventName: chargeEvent.name,
  },
  {
    id: "catalyst-sq1",
    title: "Catalyst Sq1",
    description:
      "Infinite doors, infinite choices. Can you navigate the labyrinth of the backrooms?",
    theme: "Escape Room",
    discipline: "Chemical engineering & process puzzles",
    sig: "Catalyst",
    color: "#b69cff",
    artwork: "maze",
    href: "/events/catalyst",
    eventName: "LABLOCK",
  },
  {
    id: "crypt-sq1",
    title: "Crypt Sq1",
    description:
      "The internet is lying. Hack the glitching terminals and find the core mainframe.",
    theme: "Glitch",
    discipline: "Computing & problem solving",
    sig: "Crypt",
    color: "#00e5ff",
    artwork: "terminal",
    href: null,
    eventName: "Crypt Sq1",
  },
  {
    id: "clutch-sq1",
    title: "Clutch Sq1",
    description:
      "Checkered flags and burning rubber. Only the fastest survive this high-octane circuit.",
    theme: "Formula 1",
    discipline: "Mechanical engineering & racing",
    sig: "Clutch",
    color: "#ff9e57",
    artwork: "race",
    href: "/events/clutch",
    eventName: "Magnetic Grand Prix",
  },
  {
    id: "concrete-sq1",
    title: "Concrete Sq1",
    description:
      "Float it for Jack. A nautical engineering marvel hidden in the depths of the factory.",
    theme: "Nautical",
    discipline: "Civil engineering & floating structures",
    sig: "Concrete",
    color: "#ff83bf",
    artwork: "voyage",
    href: "/events/concrete",
    eventName: "Float It for Jack",
  },
];

export const featuredChamber = chambers[0];
export const festivalSchedule = {
  nextEventName: chargeEvent.name,
  nextEventStartsAt: START_ISO,
  nextEventDate: `${chargeEvent.dateLabel} · 6 PM IST`,
  nextEventDescription: chargeEvent.tagline,
  nextEventHref: "/events/charge",
};

// These are the original homepage's fallback examples, not published results.
export const leaderboard = [
  {
    name: "The Gobstopper Guild",
    initials: "GG",
    domain: "Catalyst Sq1",
    points: 14500,
    color: "#ffd700",
  },
  {
    name: "Oompa Loompa Ops",
    initials: "OO",
    domain: "Charge Sq1",
    points: 13200,
    color: "#65f0b5",
  },
  {
    name: "Fizzy Lifting Flyers",
    initials: "FL",
    domain: "Concrete Sq1",
    points: 12850,
    color: "#ff83bf",
  },
  {
    name: "Slugworth's Saboteurs",
    initials: "SS",
    domain: "Scotland Yard",
    points: 11400,
    color: "#b69cff",
  },
  {
    name: "Wonkavisionaries",
    initials: "WV",
    domain: "Crypt Sq1",
    points: 10900,
    color: "#00e5ff",
  },
];
