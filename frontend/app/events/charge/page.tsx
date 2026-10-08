import {
  findEvent,
  getMegaEvent,
  getOverallLeaderboard,
  getRoundLeaderboard,
  getRounds,
} from "@/lib/api/events";
import type { MegaEvent } from "@/lib/api/types";
import { EVENT, FALLBACK_ROUNDS, START_ISO } from "./_data/content";
import { Briefing, type RoundView } from "./_components/Briefing";
import { ChargeRoot } from "./_components/ChargeRoot";
import { Footer } from "./_components/Footer";
import { Ground } from "./_components/Ground";
import { type Board } from "./_components/Leaderboard";
import { Nav } from "./_components/Nav";
import { Roof } from "./_components/Roof";
import type { RegistrationWindow } from "./_components/Ticket";
import { Slab, Tower } from "./_components/Tower";

// ISR: the route is regenerated at most every 15 seconds, matching the leaderboard
// fetches in lib/api/events.ts (next.revalidate = 15). Open pages pull the new render
// every 30 seconds through <LiveRefresh />, so a score change shows within about 30 to 45 seconds.
export const revalidate = 15;

const IST_PARTS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  day: "numeric",
  month: "long",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** "12 October, 11:59 PM" in IST. */
function fmt(d: Date) {
  const p = Object.fromEntries(IST_PARTS.formatToParts(d).map((x) => [x.type, x.value]));
  return `${p.day} ${p.month}, ${p.hour}:${p.minute} ${String(p.dayPeriod ?? "").toUpperCase()}`.trim();
}

/** The registration window as a neutral date line, so it never contradicts the form panel. */
function registrationWindow(mega: MegaEvent | null): RegistrationWindow {
  if (!mega) return null;
  const now = Date.now();
  const open = mega.registrationOpenAt ? new Date(mega.registrationOpenAt) : null;
  const close = mega.registrationCloseAt ? new Date(mega.registrationCloseAt) : null;
  if (close && !Number.isNaN(close.getTime()) && now > close.getTime()) {
    return { state: "closed", label: "Registration has closed." };
  }
  if (open && !Number.isNaN(open.getTime()) && now < open.getTime()) {
    return { state: "upcoming", label: `Registration opens ${fmt(open)}.` };
  }
  if (close && !Number.isNaN(close.getTime())) {
    return { state: "open", label: `Registration closes ${fmt(close)}.` };
  }
  return null;
}

/** Before doors open the leaderboard shows a static note instead of the live ticker. */
function isPreEvent() {
  return Date.now() < new Date(START_ISO).getTime();
}

export default async function ChargePage() {
  const event = await findEvent({
    eventId: process.env.CHARGE_EVENT_ID,
    sigName: EVENT.sig,
    eventName: EVENT.name,
  });

  const [apiRounds, overall, mega] = event
    ? await Promise.all([getRounds(event.id), getOverallLeaderboard(event.id), getMegaEvent(event.megaEventId)])
    : [null, null, null];

  const fallbackFor = (n: number) => FALLBACK_ROUNDS.find((r) => r.roundNumber === n);

  // Backend rounds win; the brief's copy fills in anything the backend doesn't store.
  const rounds: RoundView[] =
    apiRounds && apiRounds.length > 0
      ? apiRounds.map((r) => {
          const fb = fallbackFor(r.roundNumber);
          return {
            key: r.id,
            roundNumber: r.roundNumber,
            name: r.name,
            description: r.description?.trim() || fb?.description || "",
            time: fb?.time ?? null,
            mode: fb?.mode ?? null,
            maxPoints: r.maxPoints,
          };
        })
      : FALLBACK_ROUNDS.map((r) => ({
          key: `fallback-${r.roundNumber}`,
          roundNumber: r.roundNumber,
          name: r.name,
          description: r.description,
          time: r.time,
          mode: r.mode,
          maxPoints: null,
        }));

  const roundBoards: Board[] =
    apiRounds && apiRounds.length > 0
      ? await Promise.all(
          apiRounds.map(async (r) => ({
            key: r.id,
            label: `Round ${r.roundNumber}`,
            title: `Round ${r.roundNumber}: ${r.name}`,
            entries: await getRoundLeaderboard(r.id),
          })),
        )
      : rounds.map((r) => ({
          key: r.key,
          label: `Round ${r.roundNumber}`,
          title: `Round ${r.roundNumber}: ${r.name}`,
          entries: event ? [] : null,
        }));

  const boards: Board[] = [
    ...roundBoards,
    {
      key: "overall",
      label: EVENT.megaEvent,
      title: `${EVENT.megaEvent} overall standings`,
      entries: overall,
    },
  ];

  const registration = registrationWindow(mega);
  const preEvent = isPreEvent();

  return (
    <ChargeRoot>
      <Nav />
      <Tower roof={<Roof />}>
        <Slab roof />
        <Briefing rounds={rounds} />
        <Slab />
        <Ground boards={boards} registration={registration} preEvent={preEvent} />
        <Slab foundation />
      </Tower>
      <Footer />
    </ChargeRoot>
  );
}
