import type { Metadata } from "next";
import { getEvents, getMegaEvent, getOverallLeaderboard, getRoundLeaderboard, getRounds } from "@/lib/api/events";
import { isUuid } from "@/lib/api/client";
import type { PublicEvent } from "@/lib/api/types";
import styles from "./scotland-yard.module.css";
import { EVENT_NAME, fallbackRounds } from "./content";
import Briefing from "./_components/Briefing";
import ChaseBoard from "./_components/ChaseBoard";
import CipherMachine from "./_components/CipherMachine";
import FactoryShell from "./_components/FactoryShell";
import { Slab } from "./_components/Floor";
import Gate, { type GateFact } from "./_components/Gate";
import Roof from "./_components/Roof";
import Rounds from "./_components/Rounds";
import Scoreboard, { type Board } from "./_components/Scoreboard";
import Symbols from "./_components/Symbols";

export const metadata: Metadata = {
  title: "Scotland Yard 2026 · ISTE",
  description: "ISTE's ultimate mystery challenge at the Grand Confectionery. Crack the ciphers, track Mr. X and claim a golden ticket.",
};

// Scores are cached for at most 15s (the leaderboard fetches use the same window).
export const revalidate = 15;

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

/** SCOTLAND_YARD_EVENT_ID wins; otherwise the event named "Scotland Yard" (case-insensitive). */
async function findScotlandYard(): Promise<PublicEvent | null> {
  const events = await getEvents();
  if (!events) return null;
  const id = process.env.SCOTLAND_YARD_EVENT_ID;
  if (isUuid(id)) {
    const byId = events.find((e) => e.id === id);
    if (byId) return byId;
  }
  return events.find((e) => e.name.trim().toLowerCase() === EVENT_NAME.toLowerCase()) ?? null;
}

export default async function ScotlandYardPage() {
  const event = await findScotlandYard();
  const [rounds, overall, mega] = event
    ? await Promise.all([getRounds(event.id), getOverallLeaderboard(event.id), getMegaEvent(event.megaEventId)])
    : [null, null, null];
  const roundBoards = rounds ? await Promise.all(rounds.map((r) => getRoundLeaderboard(r.id))) : [];

  const boards: Board[] = [];
  if (overall) boards.push({ id: "overall", label: "Overall standings", entries: overall });
  rounds?.forEach((r, i) => {
    const entries = roundBoards[i];
    if (entries?.length) boards.push({ id: r.id, label: `Round ${r.roundNumber}: ${r.name}`, entries });
  });

  const facts: GateFact[] = [
    { k: "Registration opens", v: mega?.registrationOpenAt ? dateFmt.format(new Date(mega.registrationOpenAt)) : "To be announced" },
    { k: "Registration closes", v: mega?.registrationCloseAt ? dateFmt.format(new Date(mega.registrationCloseAt)) : "To be announced" },
    { k: "Squad", v: "Team of detectives" },
  ];

  return (
    <FactoryShell rootClass={styles.root}>
      <Symbols />
      <div className="tower">
        <div className="pipe l" aria-hidden="true" />
        <div className="pipe r" aria-hidden="true" />
        <div className="vent" style={{ left: 8, top: 340 }} aria-hidden="true"><span /><span /><span /></div>
        <div className="vent" style={{ right: 4, top: 1900 }} aria-hidden="true"><span /><span /><span /></div>

        <Roof />
        <Slab />
        <Briefing />
        <Slab />
        <CipherMachine />
        <Slab />
        <ChaseBoard />
        <Slab />
        <Rounds rounds={rounds?.length ? rounds : fallbackRounds} live={!!rounds?.length} />
        <Slab />
        <Scoreboard boards={boards} online={!!event} />
        <Slab />
        <Gate facts={facts} />
      </div>
    </FactoryShell>
  );
}
