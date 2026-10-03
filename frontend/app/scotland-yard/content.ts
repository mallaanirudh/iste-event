/** Page content kept in one place so it can later come from the backend (mega event / rounds API). */

export const eventFacts = [
  { label: "Date", value: "To be announced" },
  { label: "Venue", value: "To be announced" },
  { label: "Squad size", value: "To be announced" },
  { label: "Registration", value: "Link coming soon" },
];

/** Provisional timings. */
export const agenda = [
  { time: "09:00", title: "Reporting for Duty", detail: "Check-in, squad formation and badges at the front desk." },
  { time: "09:30", title: "The Case Begins", detail: "Sealed dossiers handed out in the Briefing Room. The clock starts." },
  { time: "10:00", title: "Round I · Solve the Clues", detail: "Ciphers, puzzles and data trails in the Cipher & Data Bureau." },
  { time: "12:00", title: "Tea at the Yard", detail: "A break to compare notes. Keep your theories to yourselves." },
  { time: "13:00", title: "Round II · Forensics & Interrogation", detail: "Examine the evidence locker and question the witnesses." },
  { time: "15:00", title: "Round III · Track the Suspects", detail: "A live chase across the map. First squad to make the arrest wins." },
  { time: "16:30", title: "The Reveal", detail: "The culprit is unmasked, then prizes and commendations." },
];

/** 7 fingerprints hidden in the rooms + the cipher wheel. */
export const TOTAL_CLUES = 8;

export const cipher = { plain: "ENLIST AT THE YARD", key: 7 };
