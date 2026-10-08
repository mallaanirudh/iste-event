/**
 * Copy for the Charge SQ1 page, taken from the "POWER THE BEACON" event brief.
 * Edit text here — components only read from this file.
 *
 * Rounds and leaderboards come from the backend. The `FALLBACK_ROUNDS` below are
 * only shown when the backend is unreachable or has no rounds for this event yet.
 */

import { REGISTRATION_URL } from "@/data/registration";
import {
  formatEventDate,
  formatEventTime,
  formatSessionTime,
  getFestivalEvent,
} from "@/data/festival-schedule";

const schedule = getFestivalEvent("charge");

export const EVENT = {
  sig: "Charge",
  name: "Power the Beacon",
  megaEvent: "Square One",
  tagline:
    "Bid for parts. Build the circuit. Light the beacon before the clock runs out.",
  date: "2026-10-14",
  dateLabel: formatEventDate(schedule),
  dateShort: "Wed 14 October",
  timeLabel: formatEventTime(schedule),
  venue: "LHC A Seminar Hall",
  campus: "NITK Surathkal",
  eligibility: "B.Tech batch of 2029",
  teamSize: "Up to 3 per team",
  teamMax: 3,
  expected: "About 150 builders",
  registerHref: "https://Feisteval-2026.vercel.app",
  homeHref: "/",
} as const;

/** Doors open (the knowledge session) and the end of the night, in IST. */
export const START_ISO = "2026-10-14T18:00:00+05:30";
export const END_ISO = "2026-10-14T23:00:00+05:30";

export const HERO = {
  kicker: "ISTE Charge at Square One",
  primary: "Register your team",
  secondary: "See the rounds",
} as const;

/**
 * The hero hotbar (each icon name is a sprite in _lib/sprite.tsx). `phone: true` slots also show on small screens; the rest live on
 * floor 2 there (team size is its headline, eligibility is in the inventory row).
 */
export const HERO_FACTS = [
  { icon: "calendar", label: "Date", value: "Wed 14 Oct 2026", phone: true },
  { icon: "clock", label: "Time", value: EVENT.timeLabel, phone: true },
  { icon: "compass", label: "Venue", value: "LHC A Seminar Hall", phone: true },
  { icon: "book", label: "Who", value: "B.Tech batch of 2029", phone: false },
  { icon: "head", label: "Team", value: "Up to 3", phone: false },
] as const;

export const BRIEFING = {
  title: "Teams of up to 3",
  /** Shown in the registration dialog, not on floor 2. */
  signupNote:
    "Bring up to two teammates to the hall. One person signs up the whole team.",
  circuitLabel: "How the evening runs",
  registerNote: "Register your team before 14 October.",
  craftingLabel: "Crafting",
  inventoryLabel: "Inventory",
  recipeLabel: "Recipe: your team plus both rounds makes a winner",
} as const;

/** Tooltip copy for the crafting grid. Round slots take their names from the rounds data. */
export const CRAFT = {
  teammates: [
    { name: "Teammate 1", lines: ["One person signs up the whole team"] },
    { name: "Teammate 2", lines: ["Teams of up to 3"] },
    { name: "Teammate 3", lines: ["B.Tech batch of 2029"] },
  ],
  winner: {
    name: "Winner",
    lines: ["Light the beacon", "Results after 11 PM"],
  },
} as const;

export type Step = { time: string; title: string; detail: string };

/** The evening, in order. Rounds 1 and 2 take their names and descriptions from the backend when it has them. */
export const KNOWLEDGE_SESSION: Step = {
  time: "6 PM",
  title: "Knowledge session",
  detail:
    "A quick walk through the components you'll be bidding on and how they work.",
};

export const RESULTS: Step = {
  time: "After 11 PM",
  title: "Results",
  detail: "Scores go up on the leaderboard and the winners are announced.",
};

export type FallbackRound = {
  roundNumber: number;
  name: string;
  description: string;
  time: string;
  mode: string;
};

export const FALLBACK_ROUNDS: FallbackRound[] = [
  {
    roundNumber: 1,
    name: "Screening",
    time: schedule?.sessions?.[0]
      ? formatSessionTime(schedule.sessions[0])
      : "6:00 PM – 7:30 PM",
    mode: "Offline, in the hall",
    description:
      "Checks the basics you'll need for the build. The top teams go through to Round 2.",
  },
  {
    roundNumber: 2,
    name: "Auction and build",
    time: schedule?.sessions?.[1]
      ? formatSessionTime(schedule.sessions[1])
      : "7:30 PM – 11:00 PM",
    mode: "Live auction, then the build",
    description:
      "Every team gets the same purse of virtual money. Bid for components, then build a working circuit from only what you won.",
  },
];

export const GROUND = {
  title: "Registration",
  lede: "One registration per team, up to 3 members.",
  rulesTitle: "House rules",
  contactsTitle: "Points of contact",
} as const;

export const RULES = [
  "Sharing or copying answers with other teams leads to disqualification.",
  "In Round 2 you build only with the components your team won at auction.",
  "If the platform malfunctions or a rule is unclear, contact an organiser.",
] as const;

/** Points of contact, as listed in the event brief. `tel` is the dialable form. */
export const CONTACTS = [
  { name: "Pratheek", phone: "+91 82172 99491", tel: "+918217299491" },
  { name: "Sanjeetha", phone: "+91 88615 78766", tel: "+918861578766" },
] as const;