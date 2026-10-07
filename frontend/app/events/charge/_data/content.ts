/**
 * Copy for the Charge SQ1 page, taken from the "POWER THE BEACON" event brief.
 * Edit text here — components only read from this file.
 *
 * This page is information only: registration and the leaderboards live on the
 * Square One main page. Rounds come from the backend; the `FALLBACK_ROUNDS` below are
 * only shown when the backend is unreachable or has no rounds for this event yet.
 */

export const EVENT = {
  sig: "Charge",
  name: "Power the Beacon",
  megaEvent: "Square One",
  tagline: "Bid for parts. Build the circuit. Light the beacon before the clock runs out.",
  date: "2026-10-14",
  dateLabel: "Wednesday, 14 October 2026",
  dateShort: "Wed 14 October",
  timeLabel: "6 PM to 11 PM",
  venue: "LHC A Seminar Hall",
  campus: "NITK Surathkal",
  eligibility: "B.Tech batch of 2029",
  teamSize: "Up to 3 per team",
  teamMax: 3,
  expected: "About 150 builders",
} as const;

/** Doors open (the knowledge session) and the end of the night, in IST. */
export const START_ISO = "2026-10-14T18:00:00+05:30";
export const END_ISO = "2026-10-14T23:00:00+05:30";

export const HERO = {
  kicker: "ISTE Charge at Square One",
  primary: "See the rounds",
  secondary: "Wire the beacon",
} as const;

/**
 * The hero hotbar (each icon name is a sprite in _lib/sprite.tsx). `phone: true` slots also show on small screens; the rest live on
 * floor 2 there (team size is its headline, eligibility is in the inventory row).
 */
export const HERO_FACTS = [
  { icon: "calendar", label: "Date", value: "Wed 14 Oct 2026", phone: true },
  { icon: "clock", label: "Time", value: "6 PM to 11 PM", phone: true },
  { icon: "compass", label: "Venue", value: "LHC A Seminar Hall", phone: true },
  { icon: "book", label: "Who", value: "B.Tech batch of 2029", phone: false },
  { icon: "head", label: "Team", value: "Up to 3", phone: false },
] as const;

export const BRIEFING = {
  title: "Teams of up to 3",
  circuitLabel: "How the evening runs",
  craftingLabel: "Crafting",
  inventoryLabel: "Inventory",
  recipeLabel: "Recipe: your team plus both rounds makes a winner",
} as const;

/** Tooltip copy for the crafting grid. Round slots take their names from the rounds data. */
export const CRAFT = {
  teammates: [
    { name: "Teammate 1", lines: ["One person registers the whole team"] },
    { name: "Teammate 2", lines: ["Teams of up to 3"] },
    { name: "Teammate 3", lines: ["B.Tech batch of 2029"] },
  ],
  winner: { name: "Winner", lines: ["Light the beacon", "Results after 11 PM"] },
} as const;

export type Step = { time: string; title: string; detail: string };

/** The evening, in order. Rounds 1 and 2 take their names and descriptions from the backend when it has them. */
export const KNOWLEDGE_SESSION: Step = {
  time: "6 PM",
  title: "Knowledge session",
  detail: "A quick walk through the components you'll be bidding on and how they work.",
};

export const RESULTS: Step = {
  time: "After 11 PM",
  title: "Results",
  detail: "The winners are announced in the hall at the end of the night.",
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
    time: "6 PM to 8 PM",
    mode: "Offline, in the hall",
    description: "Checks the basics you'll need for the build. The top teams go through to Round 2.",
  },
  {
    roundNumber: 2,
    name: "Auction and build",
    time: "9 PM to 11 PM",
    mode: "Live auction, then the build",
    description: "Every team gets the same purse of virtual money. Bid for components, then build a working circuit from only what you won.",
  },
];

export const GROUND = {
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

/**
 * The workbench puzzle on floor 3: turn the wire tiles until the redstone runs from the
 * power block to the lamp. Solving it sends the beacon on the roof to full power.
 */
export const WORKBENCH = {
  kicker: "Workbench",
  title: "Wire the beacon",
  lede: "Tap a tile to turn it. Run the redstone from the power block to the lamp. In Round 2 you build for real, with only the parts your team wins.",
  solved: "Circuit complete. The beacon on the roof is at full power.",
  scramble: "Scramble",
} as const;

/**
 * Five parts hidden around the page. Each one found drops into the hotbar and shows a fact.
 * `id` is also the sprite name in _lib/sprite.tsx.
 */
export const PARTS = [
  { id: "led", name: "LED", fact: "Doors open at 6 PM on Wednesday 14 October, in the LHC A Seminar Hall." },
  { id: "battery", name: "Battery", fact: "In Round 2 every team starts the auction with the same purse of virtual money." },
  { id: "capacitor", name: "Capacitor", fact: "Teams of up to 3, open to the B.Tech batch of 2029." },
  { id: "resistor", name: "Resistor", fact: "Round 1, the screening, runs offline in the hall from 6 PM to 8 PM." },
  { id: "transistor", name: "Transistor", fact: "Round 2 runs from 9 PM to 11 PM: a live auction, then the build." },
] as const;

export type PartId = (typeof PARTS)[number]["id"];

export const HUNT = {
  hint: "5 parts are hidden on this page",
  done: "All 5 parts found",
  doneFact: "Inventory full. See you in the hall on 14 October.",
} as const;
