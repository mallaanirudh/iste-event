"use client";

import { useState } from "react";
import { board, clues, ticketTypes, type Ticket } from "../content";
import Floor from "./Floor";
import { landmarks, MapGround } from "./MapArt";
import { Clue } from "./Casebook";

const pos = new Map(board.stations.map((s) => [s.id, s]));
const ORDER: Ticket[] = ["tube", "bus", "taxi"];

/** A gently curved path between two stations; neighbouring links bow opposite ways. */
function curve(p: { x: number; y: number }, q: { x: number; y: number }, bow: number, i: number) {
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
  const dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy) || 1;
  const k = (i % 2 ? -1 : 1) * bow;
  return `M${p.x} ${p.y} Q${(mx - (dy / len) * k).toFixed(1)} ${(my + (dx / len) * k).toFixed(1)} ${q.x} ${q.y}`;
}

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
    <Floor id="chase" label="3" name="Factory Map" wall="#c8ecd9" labelledBy="h-chase">
      <div style={{ paddingTop: 44 }}>
        <p className="kicker" data-pop>The main event</p>
        <h2 id="h-chase" className="title" data-pop style={{ "--d": 1 } as React.CSSProperties}>Chase <em>Mr. X</em></h2>
        <p className="lede" data-pop style={{ "--d": 2 } as React.CSSProperties}>
          He sneaks through the factory by sweet cart, river boat and pipe. You only see the tickets he spends, and his face on reveal turns. Read the pattern and close the net.
        </p>

        <div className="chase" data-pop style={{ "--d": 3 } as React.CSSProperties}>
          <div className="board">
            <svg viewBox="0 0 840 470" role="img" aria-label={`Factory map. ${status}`}>
              <MapGround />
              {/* pipes under the paths, then chocolate streams, then the white sweet-cart road */}
              {ORDER.map((type) =>
                board.links.filter(([, , t]) => t === type).map(([a, b], i) => {
                  const d = curve(pos.get(a)!, pos.get(b)!, type === "bus" ? 26 : type === "taxi" ? 14 : 0, i);
                  const key = `${a}-${b}-${type}`;
                  if (type === "tube") return (
                    <g key={key}>
                      <path d={d} className="link" stroke="#2b1236" strokeWidth="15" />
                      <path d={d} className="link" stroke={ticketTypes.tube.color} strokeWidth="9" />
                      <path d={d} className="link" stroke="#c9b2e8" strokeWidth="9" strokeDasharray="3 26" />
                    </g>
                  );
                  if (type === "bus") return (
                    <g key={key}>
                      <path d={d} className="link" stroke={ticketTypes.bus.color} strokeWidth="11" />
                      <path d={d} className="link river-flow" stroke="#9a5a3c" strokeWidth="3" strokeDasharray="10 14" />
                    </g>
                  );
                  return <path key={key} d={d} className="link" stroke="#ffffff" strokeWidth="9" />;
                }),
              )}
              {board.stations.map((s) => {
                const l = landmarks[s.id];
                return <g key={`art-${s.id}`} transform={`translate(${s.x} ${s.y})`}>{l?.art}</g>;
              })}
              {board.stations.map((s) => (
                <g key={s.id} className="stn">
                  <circle cx={s.x} cy={s.y} r="14" fill={known === s.id ? "#f5c834" : "#fdf8ee"} />
                  <text x={s.x} y={s.y}>{s.id}</text>
                </g>
              ))}
              {board.stations.map((s) => {
                const l = landmarks[s.id];
                if (!l) return null;
                return (
                  <text key={`lbl-${s.id}`} className="map-label" x={s.x + l.lx} y={s.y + l.ly} textAnchor={l.anchor ?? "middle"}>
                    {s.name}
                  </text>
                );
              })}
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
