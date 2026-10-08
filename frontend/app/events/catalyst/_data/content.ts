import {
  formatEventDate,
  formatEventTime,
  getFestivalEvent,
} from "@/data/festival-schedule";
const schedule = getFestivalEvent("catalyst");
export type Bulletin = {
  id: string;
  title: string;
  lines: string[];
  list?: string[];
  fragment?: string;
};

export const BULLETINS: Bulletin[] = [
  {
    id: "briefing",
    title: "The briefing",
    lines: [
      "LABLOCK: Escape the Lab. A team challenge on material balance, fluid flow, heat transfer, separation and process control. No lab coat needed, only logic and teamwork.",
    ],
    list: [
      formatEventDate(schedule),
      formatEventTime(schedule),
      "Teams of 2 to 3",
      "Open to B.Tech 1st years",
      "About 120 minutes in total",
    ],
  },
  {
    id: "round1",
    title: "Round 1: Process Diagnosis",
    fragment: "4",
    lines: [
      "30 to 45 minutes. Read process information, simplified flow diagrams and unit-operation clues. Find the fault and earn the override code.",
      "15 to 20 teams at once. Only teams with the correct code go through.",
    ],
  },
  {
    id: "round2",
    title: "Round 2: Process Stabilization",
    fragment: "2",
    lines: [
      "35 minutes. Physical and logical challenges on fluid flow, separation and process control. Each gives a code fragment. Combine them into the final shutdown code.",
      "Up to 10 teams. Highest score and best completion time wins.",
    ],
  },
  {
    id: "flow",
    title: "How the day runs",
    lines: [],
    list: [
      "Register",
      "Briefing",
      "Round 1",
      "Code verification",
      "Round 2",
      "Final code",
      "Scoring",
      "Results",
    ],
  },
  {
    id: "rules",
    title: "House rules",
    fragment: "7",
    lines: [],
    list: [
      "Use only the materials the organisers give you.",
      "No phones, internet or outside resources.",
      "Talk within your team, never with other teams.",
      "You can ask for a limited number of hints. Each costs points.",
      "Finish each round inside its time limit.",
      "A tie is broken by completion time.",
      "The organisers' decision on answers and penalties is final.",
    ],
  },
];

// The lock code is the fragments of these bulletins, in this order (currently 427).
export const CODE_ORDER = ["round1", "round2", "rules"];
export const CODE = CODE_ORDER.map(
  (id) => BULLETINS.find((b) => b.id === id)?.fragment,
).join("");

// Dead-end taunts. Rewrite these however you like.
export const TAUNTS = [
  "Dead end. The walls are not impressed.",
  "You have been here before. Spiritually.",
  "Even the flask is embarrassed.",
  "Bold guess. Wrong, but bold.",
];

export const CONTACT =
  "Questions? Find Adhil Ali or Kshama D Rai from ISTE Catalyst.";
