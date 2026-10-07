import { findEvent, getRounds } from "@/lib/api/events";
import { EVENT, FALLBACK_ROUNDS } from "./_data/content";
import { Briefing, type RoundView } from "./_components/Briefing";
import { ChargeRoot } from "./_components/ChargeRoot";
import { Ground } from "./_components/Ground";
import { Nav } from "./_components/Nav";
import { Roof } from "./_components/Roof";
import { Slab, Tower } from "./_components/Tower";

// The page is information only (registration and leaderboards live on the Square One main
// page). Rounds come from the backend, so the route is regenerated at most once a minute.
export const revalidate = 60;

export default async function ChargePage() {
  const event = await findEvent({
    eventId: process.env.CHARGE_EVENT_ID,
    sigName: EVENT.sig,
    eventName: EVENT.name,
  });

  const apiRounds = event ? await getRounds(event.id) : null;

  const fallbackFor = (n: number) => FALLBACK_ROUNDS.find((r) => r.roundNumber === n);

  // Backend rounds supply names and points; the short teasers and times come from the brief.
  const rounds: RoundView[] =
    apiRounds && apiRounds.length > 0
      ? apiRounds.map((r) => {
          const fb = fallbackFor(r.roundNumber);
          return {
            key: r.id,
            roundNumber: r.roundNumber,
            name: r.name,
            description: fb?.teaser || r.description?.trim() || "",
            time: fb?.time ?? null,
            maxPoints: r.maxPoints,
          };
        })
      : FALLBACK_ROUNDS.map((r) => ({
          key: `fallback-${r.roundNumber}`,
          roundNumber: r.roundNumber,
          name: r.name,
          description: r.teaser,
          time: r.time,
          maxPoints: null,
        }));

  return (
    <ChargeRoot>
      <Nav />
      <Tower roof={<Roof />}>
        <Slab roof />
        <Briefing rounds={rounds} />
        <Slab />
        <Ground />
        <Slab foundation />
      </Tower>
    </ChargeRoot>
  );
}
