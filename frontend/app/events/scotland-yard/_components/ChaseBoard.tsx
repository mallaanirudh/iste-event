"use client";

import { useState } from "react";
import { board, clues, ticketTypes, type Ticket } from "../content";
import Floor from "./Floor";
import { Clue } from "./Casebook";

const pos = new Map(board.stations.map((s) => [s.id, s]));
const WIDTH: Record<Ticket, number> = { taxi: 5, bus: 8, tube: 12, black: 5 };
const ORDER: Ticket[] = ["tube", "bus", "taxi"];

/** Floor 3: watch Mr. X move across a small board, surfacing only on reveal turns. */
export default function ChaseBoard() {
  const [step, setStep] = useState(0);
  const total = board.route.length;
  const lastReveal = [...board.reveals].reverse().find((r) => r <= step);
  const known = lastReveal ? board.route[lastReveal - 1].to : null;
  const surfacedNow = board.reveals.includes(step);
  const move = step > 0 ? board.route[step - 1] : null;
  const k = known ? pos.get(known)! : null;

  const status = !move
    ? "Mr. X has slipped into the factory with the recipe. Press Next move to follow his tickets."
    : surfacedNow
      ? `Move ${step}: he used a ${ticketTypes[move.ticket].label.toLowerCase()} and surfaced at station ${move.to}!`
      : `Move ${step}: he used a ${ticketTypes[move.ticket].label.toLowerCase()}. ${known ? `Last seen at station ${known}.` : "Nobody has seen him yet."}`;

  return (
    <Floor id="chase" label="3" name="Chocolate River" wall="#c8ecd9" labelledBy="h-chase">
      <div style={{ paddingTop: 44 }}>
        <p className="kicker" data-pop>The main event</p>
        <h2 id="h-chase" className="title" data-pop style={{ "--d": 1 } as React.CSSProperties}>Chase <em>Mr. X</em></h2>
        <p className="lede" data-pop style={{ "--d": 2 } as React.CSSProperties}>
          He sneaks through the factory by sweet cart, river boat and pipe. You only see the tickets he spends, and his face on reveal turns. Read the pattern and close the net.
        </p>

        <div className="chase" data-pop style={{ "--d": 3 } as React.CSSProperties}>
          <div className="board">
            <svg viewBox="0 0 840 470" role="img" aria-label={`Factory board. ${status}`}>
              <path d="M0 300 C160 270 220 330 360 300 S560 240 640 300 S780 330 840 290" fill="none" stroke="#5a2a1b" strokeWidth="44" />
              <path d="M0 300 C160 270 220 330 360 300 S560 240 640 300 S780 330 840 290" fill="none" stroke="#7a3b26" strokeWidth="14" strokeDasharray="30 40" className="river-flow" />
              <ellipse cx="200" cy="140" rx="70" ry="34" fill="#9be0b8" /><ellipse cx="690" cy="190" rx="60" ry="28" fill="#9be0b8" />
              <g color="#e2457a"><use href="#sy-gum" x="180" y="128" width="14" height="12" /><use href="#sy-gum" x="210" y="140" width="12" height="10" /></g>
              <use href="#sy-shroom" x="676" y="170" width="30" height="26" />
              {ORDER.map((type) =>
                board.links.filter(([, , t]) => t === type).map(([a, b]) => {
                  const p = pos.get(a)!, q = pos.get(b)!;
                  return (
                    <line key={`${a}-${b}-${type}`} className="link" x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                      stroke={ticketTypes[type].color} strokeWidth={WIDTH[type]} strokeDasharray={type === "tube" ? "2 14" : undefined} />
                  );
                }),
              )}
              {board.stations.map((s) => (
                <g key={s.id} className="stn">
                  <circle cx={s.x} cy={s.y} r="19" fill={known === s.id ? "#f5c834" : "#fdf8ee"} />
                  <text x={s.x} y={s.y}>{s.id}</text>
                </g>
              ))}
              {board.detectives.map((d, i) => {
                const p = pos.get(d)!;
                return <use key={d} href={i === 1 ? "#sy-helper" : "#sy-kid"} x={p.x + 8} y={p.y - 52} width="26" height="46" />;
              })}
              {k && (
                <g className="token" style={{ transform: `translate(${k.x - 16}px, ${k.y - 74}px)` }}>
                  <g className={surfacedNow ? undefined : "mrx-ghost"}><use href="#sy-mrx" width="32" height="64" /></g>
                </g>
              )}
            </svg>
          </div>

          <div className="log">
            <h3>Ticket log</h3>
            <p style={{ margin: 0, fontSize: 14 }}>Reveal turns: {board.reveals.join(", ")}</p>
            <ol>
              {board.route.map((m, i) => {
                const used = i < step;
                const t = ticketTypes[m.ticket];
                return (
                  <li key={i} className={`${used ? "used" : ""}${board.reveals.includes(i + 1) ? " reveal" : ""}`}
                    style={used ? { background: t.color, color: m.ticket === "taxi" ? "#2d1210" : undefined } : undefined}>
                    {used ? t.label : i + 1}
                  </li>
                );
              })}
            </ol>
            <p className="status" aria-live="polite">{status}</p>
            <div className="controls">
              <button type="button" className="btn gold small" onClick={() => setStep((s) => Math.min(total, s + 1))} disabled={step >= total}>Next move</button>
              <button type="button" className="btn cream small" onClick={() => setStep(0)} disabled={step === 0}>Restart</button>
            </div>
            <div className="legend">
              {(Object.keys(ticketTypes) as Ticket[]).map((t) => (
                <span key={t}><i style={{ background: ticketTypes[t].color }} />{ticketTypes[t].label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Clue at={{ right: "3%", top: "12%" }} note={clues.chase} />
    </Floor>
  );
}
