/** Page content kept in one place so it can later come from the backend (mega event / rounds API). */
import {
  formatEventDate,
  formatEventTime,
  formatSessionTime,
  getFestivalEvent,
} from "@/data/festival-schedule";

const event = getFestivalEvent("scotland-yard");

export const eventFacts = [
  { label: "Date", value: formatEventDate(event) },
  { label: "Timings", value: formatEventTime(event) },
  {
    label: "Venue",
    value:
      "Campus-wide; LHC-C Seminar Hall, LHC-D, CIDS, or an alternate hall with a projector",
  },
  {
    label: "Squad size",
    value:
      "3 members; individual participants can register for team assignment",
  },
];

/** Exact round windows from the supplied event brief, all in IST. */
const details = [
  "Explore the campus, solve riddles and collect chocolates through a series of challenges.",
  "Collect ingredients and complete the ten stages of making and delivering your chocolate.",
  "Selected teams race against time in the final chocolate-themed challenge.",
];
export const agenda = event.sessions.map((session, index) => ({
  time: formatSessionTime(session),
  title: session.label,
  detail: details[index],
}));

export const ticketTypes = {
  taxi: { label: "Sweet cart", color: "#ffffff" },
  bus: { label: "River boat", color: "#6b3423" },
  tube: { label: "Pipe", color: "#7b3fb8" },
  black: { label: "Glass elevator", color: "#2b1236" },
} as const;
export type Ticket = keyof typeof ticketTypes;

/** A small board for the chase demo: stations, links and Mr. X's hidden route. */
export const board = {
  stations: [
    { id: 1, x: 80, y: 92, name: "Ticket Gates" }, { id: 2, x: 230, y: 70, name: "Candy Floss Clouds" },
    { id: 3, x: 390, y: 118, name: "Chocolate Room" }, { id: 4, x: 565, y: 82, name: "Inventing Room" },
    { id: 5, x: 730, y: 118, name: "Bubble Room" }, { id: 6, x: 120, y: 236, name: "Nut Room" },
    { id: 7, x: 300, y: 222, name: "Lemonade Pool" }, { id: 8, x: 470, y: 240, name: "Gobstopper Works" },
    { id: 9, x: 645, y: 252, name: "Wrapping Room" }, { id: 10, x: 92, y: 392, name: "Incinerator" },
    { id: 11, x: 262, y: 382, name: "Fudge Mountain" }, { id: 12, x: 432, y: 400, name: "Taffy Room" },
    { id: 13, x: 610, y: 408, name: "TV Room" }, { id: 14, x: 762, y: 372, name: "Elevator Dock" },
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

/** Fingerprints hidden one per floor, found by eye or with the "Lights out" torch. */
export const clues = {
  roof: "Cocoa dust on the chimney cap. Someone climbed out up here last night.",
  briefing: "A chocolate thumbprint on the empty recipe box. Still a little soft.",
  cipher: "A sticky print on the decoder: toffee. Mr. X has a sweet tooth.",
  chase: "A torn wrapper by the river. A glass elevator ticket, used twice.",
  rounds: "Someone nibbled the corner of the third bar. Tiny teeth marks.",
  scores: "Fudge smears on the scoreboard. Only on the top row.",
  gate: "Golden foil flakes by the gates. He left with a ticket of his own.",
};
export const TOTAL_CLUES = Object.keys(clues).length;
