/**
 * Copy and fallbacks for the Scotland Yard page. Rounds and scores come from the
 * backend when it is reachable; these are what the page shows until then.
 */

export const EVENT_NAME = "Scotland Yard";

export const floors = [
  { id: "roof", label: "R", name: "The Roof" },
  { id: "briefing", label: "5", name: "Briefing Room" },
  { id: "cipher", label: "4", name: "Cipher Works" },
  { id: "chase", label: "3", name: "Chase Room" },
  { id: "rounds", label: "2", name: "The Rounds" },
  { id: "scores", label: "1", name: "Scoreboard" },
  { id: "gate", label: "G", name: "Front Gate" },
] as const;

export type FloorId = (typeof floors)[number]["id"];

export const briefing = {
  title: "The Case Begins",
  body:
    "Somewhere in the city, Mr. X is on the move. Your squad gets a sealed dossier, a city map and a fistful of tickets. Read the file, plan the route, and start the chase before the trail goes cold.",
  facts: [
    { k: "Format", v: "Squads of detectives" },
    { k: "Rounds", v: "Three, each harder" },
    { k: "Goal", v: "Corner Mr. X" },
  ],
};

export const cipher = { plain: "MEET AT THE CLOCK TOWER", key: 5 };

export const fallbackRounds = [
  { roundNumber: 1, name: "The Dossier", description: "Decode the case file and the first ciphers before anyone else.", maxPoints: null as number | null },
  { roundNumber: 2, name: "The Chase", description: "Track Mr. X across the board with a limited set of tickets.", maxPoints: null as number | null },
  { roundNumber: 3, name: "The Interrogation", description: "Question the suspects, connect the evidence, name the culprit.", maxPoints: null as number | null },
];

/** Provisional timings. */
export const agenda = [
  { time: "09:00", title: "Report for duty", detail: "Check-in and squad badges" },
  { time: "09:30", title: "Briefing", detail: "Dossiers handed out" },
  { time: "10:00", title: "Round 1", detail: "The Dossier" },
  { time: "12:00", title: "Tea break", detail: "Compare notes" },
  { time: "13:00", title: "Round 2", detail: "The Chase" },
  { time: "15:00", title: "Round 3", detail: "The Interrogation" },
  { time: "16:30", title: "The Reveal", detail: "Culprit unmasked, prizes" },
];

export const ticketTypes = {
  taxi: { label: "Taxi", color: "#f4c430" },
  bus: { label: "Bus", color: "#3f9e5a" },
  tube: { label: "Underground", color: "#e04848" },
  black: { label: "Black ticket", color: "#2b1d16" },
} as const;
export type Ticket = keyof typeof ticketTypes;

/** A small board for the chase demo: stations, links and Mr. X's hidden route. */
export const board = {
  stations: [
    { id: 1, x: 80, y: 80 }, { id: 2, x: 230, y: 60 }, { id: 3, x: 390, y: 95 }, { id: 4, x: 560, y: 70 },
    { id: 5, x: 720, y: 110 }, { id: 6, x: 130, y: 230 }, { id: 7, x: 300, y: 210 }, { id: 8, x: 470, y: 230 },
    { id: 9, x: 640, y: 250 }, { id: 10, x: 90, y: 380 }, { id: 11, x: 260, y: 370 }, { id: 12, x: 430, y: 390 },
    { id: 13, x: 610, y: 400 }, { id: 14, x: 760, y: 360 },
  ],
  links: [
    [1, 2, "taxi"], [2, 3, "taxi"], [3, 4, "bus"], [4, 5, "taxi"], [1, 6, "bus"], [2, 7, "taxi"], [3, 8, "taxi"],
    [4, 9, "bus"], [5, 9, "taxi"], [6, 7, "taxi"], [7, 8, "bus"], [8, 9, "taxi"], [6, 10, "taxi"], [7, 11, "taxi"],
    [8, 12, "bus"], [9, 13, "taxi"], [9, 14, "taxi"], [10, 11, "bus"], [11, 12, "taxi"], [12, 13, "taxi"],
    [13, 14, "bus"], [1, 8, "tube"], [8, 14, "tube"], [10, 3, "tube"],
  ] as [number, number, Ticket][],
  start: 7,
  route: [
    { to: 8, ticket: "bus" }, { to: 12, ticket: "bus" }, { to: 13, ticket: "taxi" }, { to: 9, ticket: "taxi" },
    { to: 4, ticket: "bus" }, { to: 3, ticket: "black" }, { to: 10, ticket: "tube" }, { to: 11, ticket: "bus" },
  ] as { to: number; ticket: Ticket }[],
  /** Moves after which Mr. X must show himself, as in the board game. */
  reveals: [3, 6, 8],
  detectives: [1, 5, 13],
};
