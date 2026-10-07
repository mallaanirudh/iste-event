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


export const HERO = {
  kicker: "ISTE Charge at Square One",
  primary: "See the rounds",
  secondary: "Points of contact",
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
    { name: "Teammate 1", lines: ["Teams of up to 3"] },
    { name: "Teammate 2", lines: ["B.Tech batch of 2029"] },
    { name: "Teammate 3", lines: ["A third teammate is optional"] },
  ],
  winner: { name: "Winner", lines: ["Light the beacon", "Results at the end of the night"] },
} as const;

/*
 * The evening, from the event brief: "KSS and Round 1: 2 hrs (6PM-8PM)", then Round 2 from
 * 9 PM (Samarth, 7 Oct: it ends at 10:30 PM), then result declaration (no time given).
 * Anirudh asked to keep the round details short, so each round gets a one-line teaser.
 */
export const KSS = "Knowledge session";

/** Sent to registered teams before the night (Samarth, 7 Oct). */
export const CHEATSHEET = {
  time: "Before the event",
  title: "Cheatsheet",
  detail: "We will send you a cheatsheet ahead of the night. Go through it before you come.",
} as const;

export const RESULTS = {
  time: "End of the night",
  title: "Results",
  detail: "The winners are declared.",
} as const;

export type FallbackRound = {
  roundNumber: number;
  name: string;
  /** A one-line teaser. It always wins over the backend description, to keep the page brief. */
  teaser: string;
  time: string;
};

export const FALLBACK_ROUNDS: FallbackRound[] = [
  {
    roundNumber: 1,
    name: "Screening",
    time: "6 PM to 8 PM",
    teaser: "Learn the parts in the knowledge session, then clear the screening.",
  },
  {
    roundNumber: 2,
    name: "Auction and hackathon",
    time: "9 PM to 10:30 PM",
    teaser: "Bid for parts, then build with what you win. The rest stays a surprise.",
  },
];

export const GROUND = {
  kicker: "The night of the beacon",
  title: "See you at the beacon",
  facts: [
    { label: "Date", value: "Wednesday 14 October" },
    { label: "Doors open", value: "6 PM" },
    { label: "Venue", value: "LHC A Seminar Hall" },
  ],
  rulesTitle: "House rules",
  contactsTitle: "Points of contact",
} as const;

/** The general rules from the event brief. */
export const RULES = [
  "Sharing or copying answers with or from other teams leads to disqualification.",
  "If the platform malfunctions or a rule is unclear, contact an organiser.",
] as const;

/**
 * Floor 3: questions. Laid out like the FAQ on HackMIT, TreeHacks and HackHarvard: a strip
 * of numbers, then short questions that open one at a time. Every answer comes from the
 * event brief or from the organisers; nothing here should be guessed.
 */
export const FAQ = {
  kicker: "FAQ",
  title: "Good questions",
  lede: "The short answers. Anything else, call a point of contact at the bottom of the page.",
  stats: [
    { value: 150, suffix: "", label: "builders expected" },
    { value: 2, suffix: "", label: "rounds" },
    { value: 3, suffix: "", label: "per team, at most" },
    { value: 1, suffix: "", label: "night in LHC A" },
  ],
  items: [
    {
      q: "Who can take part?",
      a: "Students of the B.Tech batch of 2029, in teams of up to 3.",
    },
    {
      q: "Do I need to know electronics already?",
      a: "No. The night opens with a knowledge session on the components you will work with.",
    },
    {
      q: "Do I bring my own components?",
      a: "No. Components are provided on the night. In Round 2, your team wins them at the auction.",
    },
    {
      q: "Is the auction played with real money?",
      a: "No. Every team bids with the same purse of virtual money.",
    },
    {
      q: "How should I prepare?",
      a: "Go through the cheatsheet we send you before the event. That is all the homework there is.",
    },
    {
      q: "Where do I register?",
      a: "On the Square One main page, along with the other Square One events.",
    },
    {
      q: "When and where is it?",
      a: "Wednesday 14 October, LHC A Seminar Hall, NITK Surathkal. Doors open at 6 PM.",
    },
  ],
} as const;

/** Points of contact, as listed in the event brief. `tel` is the dialable form. */
export const CONTACTS = [
  { name: "Pratheek", phone: "+91 82172 99491", tel: "+918217299491" },
  { name: "Sanjeetha", phone: "+91 88615 78766", tel: "+918861578766" },
] as const;

