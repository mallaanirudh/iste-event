import { agenda, clues } from "../content";
import Floor from "./Floor";
import { Clue } from "./Casebook";

export type RoundCard = { roundNumber: number; name: string; description: string | null; maxPoints: number | null };

/** Floor 2: one factory door per round (native <details>, no script), and the day on a conveyor belt. */
export default function Rounds({ rounds, live }: { rounds: RoundCard[]; live: boolean }) {
  return (
    <Floor id="rounds" label="2" name="Tasting Hall" wall="#ffd8b8" labelledBy="h-rounds">
      <div style={{ paddingTop: 44 }}>
        <p className="kicker" data-pop>{live ? "From the event desk" : "Provisional"}</p>
        <h2 id="h-rounds" className="title" data-pop style={{ "--d": 1 } as React.CSSProperties}>Three bars, <em>one thief</em></h2>
        <p className="lede" data-pop style={{ "--d": 2 } as React.CSSProperties}>Each round unwraps a new room of the factory. Tap a bar to unwrap it.</p>

        <div className="doors" data-pop style={{ "--d": 3 } as React.CSSProperties}>
          {rounds.map((r) => (
            <details key={r.roundNumber} className="door bar">
              <summary>
                <span className="foil" aria-hidden="true" />
                <span className="rn" aria-hidden="true">{r.roundNumber}</span>
                <span className="rname">{r.name}</span>
                <span className="knob">Round {r.roundNumber} · unwrap</span>
              </summary>
              <div className="inside">
                <p>{r.description || "Details are sealed until the day."}</p>
                {r.maxPoints != null && <span className="pts">Up to {r.maxPoints} points</span>}
              </div>
            </details>
          ))}
        </div>

        <div className="belt-wrap" data-pop style={{ "--d": 4 } as React.CSSProperties}>
          <div className="belt-title">
            <h3>The day, on the belt</h3>
            <small>Timings are provisional. Scroll the belt sideways.</small>
          </div>
          <div className="belt" tabIndex={0} aria-label="Event schedule">
            <ol>
              {agenda.map((a) => (
                <li key={a.time} className="crate">
                  <time>{a.time}</time>
                  <b>{a.title}</b>
                  <span>{a.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <Clue at={{ left: "2%", bottom: "8%" }} note={clues.rounds} />
    </Floor>
  );
}
