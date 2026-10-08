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

/** 7 fingerprints hidden in the rooms + the cipher wheel. */
export const TOTAL_CLUES = 8;

export const cipher = { plain: "ENLIST AT THE YARD", key: 7 };
