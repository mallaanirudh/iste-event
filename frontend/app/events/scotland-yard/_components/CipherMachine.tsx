"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cipher, clues } from "../content";
import Floor from "./Floor";
import { Clue } from "./Casebook";

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const N = 26;
const STEP = 360 / N;
const mod = (n: number) => ((n % N) + N) % N;
const shift = (c: string, k: number) => (A.includes(c) ? A[mod(A.indexOf(c) + k)] : c);
const CODED = cipher.plain.split("").map((c) => shift(c, cipher.key)).join("");

const ring = (r: number) =>
  A.split("").map((letter, i) => {
    const a = ((i * STEP - 90) * Math.PI) / 180;
    return { letter, x: +(150 + r * Math.cos(a)).toFixed(1), y: +(150 + r * Math.sin(a)).toFixed(1), rot: i * STEP };
  });
const OUTER = ring(128);
const INNER = ring(96);

/** Floor 4: a Caesar-cipher decoder dial. Drag it, use the buttons, or the arrow keys. */
export default function CipherMachine() {
  const [pos, setPos] = useState(0);
  const [solved, setSolved] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dial = useRef<HTMLDivElement>(null);
  const disc = useRef<SVGGElement>(null);
  const drag = useRef<{ last: number; rot: number } | null>(null);

  const key = mod(pos);
  const reading = CODED.split("").map((c) => shift(c, -key)).join("");

  const turn = (next: number) => {
    setPos(next);
    if (mod(next) === cipher.key) setSolved(true);
  };

  useEffect(() => {
    if (!drag.current && disc.current) disc.current.style.transform = `rotate(${-pos * STEP}deg)`;
  }, [pos, dragging]);

  const angle = (e: PointerEvent) => {
    const r = dial.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { last: angle(e), rot: -pos * STEP };
    setDragging(true);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const a = angle(e);
    let delta = a - d.last;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    d.last = a;
    d.rot += delta;
    if (disc.current) disc.current.style.transform = `rotate(${d.rot}deg)`;
    const p = Math.round(-d.rot / STEP);
    if (p !== pos) turn(p);
  };
  const onUp = () => { if (drag.current) { drag.current = null; setDragging(false); } };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { turn(pos + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { turn(pos - 1); e.preventDefault(); }
  };

  const tiles = (text: string) =>
    text.split("").map((c, i) => <span key={i} className={c === " " ? "gap" : undefined}>{c === " " ? "" : c}</span>);

  return (
    <Floor id="cipher" label="4" name="Cipher Works" wall="#efdcb8" labelledBy="h-cipher">
      <div style={{ paddingTop: 44 }}>
        <p className="kicker" data-pop>Round one warm-up</p>
        <h2 id="h-cipher" className="title" data-pop style={{ "--d": 1 } as React.CSSProperties}>Solve the <em>Clues</em></h2>
        <p className="lede" data-pop style={{ "--d": 2 } as React.CSSProperties}>
          Mr. X left a coded note in the wrapping room. Turn the decoder dial until it reads clearly.
        </p>

        <div className="machine" data-pop style={{ "--d": 3 } as React.CSSProperties}>
          <div
            ref={dial}
            className={`dial${dragging ? " dragging" : ""}`}
            role="slider"
            tabIndex={0}
            aria-label="Decoder dial. Use the arrow keys to turn it."
            aria-valuemin={0}
            aria-valuemax={25}
            aria-valuenow={key}
            aria-valuetext={`Key ${key}. Reading: ${reading}`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
          >
            <svg viewBox="0 0 300 300" aria-hidden="true">
              <circle cx="150" cy="150" r="149" fill="#2d1210" />
              <circle cx="150" cy="150" r="143" fill="#e5a93b" />
              <circle cx="150" cy="150" r="114" fill="#2d1210" />
              <g fontSize="17" fill="#2d1210" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 700 }}>
                {OUTER.map((l) => <text key={l.letter} x={l.x} y={l.y} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>{l.letter}</text>)}
              </g>
              <g ref={disc} className="disc" fontSize="15" fill="#fff0b8" textAnchor="middle" dominantBaseline="central" style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 700 }}>
                <circle cx="150" cy="150" r="110" fill="#f0484c" />
                <circle cx="150" cy="150" r="76" fill="none" stroke="#fff0b8" strokeWidth="1.5" strokeDasharray="3 6" />
                {INNER.map((l) => <text key={l.letter} x={l.x} y={l.y} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>{l.letter}</text>)}
              </g>
              <circle cx="150" cy="150" r="44" fill="#fdf8ee" stroke="#2d1210" strokeWidth="5" />
              <text x="150" y="137" textAnchor="middle" fontSize="12" fill="#6b3423" style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 700, letterSpacing: 2 }}>KEY</text>
              <text x="150" y="164" textAnchor="middle" fontSize="32" fill="#f0484c" style={{ fontFamily: "var(--font-berkshire), serif" }}>{key}</text>
              <rect x="134" y="2" width="32" height="80" rx="6" fill="rgba(255,240,184,.25)" stroke="#fdf8ee" strokeWidth="3" />
            </svg>
          </div>

          <div className={`tape${solved ? " solved" : ""}`}>
            <span className="lbl">Coded note</span>
            <div className="row" aria-label={CODED}>{tiles(CODED)}</div>
            <span className="lbl">Your reading</span>
            <div className="row read" aria-hidden="true">{tiles(reading)}</div>
            <p className="sr-only" aria-live="polite">{solved ? `Decoded: ${cipher.plain}` : ""}</p>
            <div className="controls">
              <button type="button" className="btn cream small" onClick={() => turn(pos - 1)} aria-label="Turn the dial back one letter">◀ Back</button>
              <span className="keyread">Key {key}</span>
              <button type="button" className="btn cream small" onClick={() => turn(pos + 1)} aria-label="Turn the dial forward one letter">Forward ▶</button>
              <span className="stamp" aria-hidden="true">Cracked!</span>
            </div>
            <p className="hint">Hint: count the fingers on one hand.</p>
          </div>
        </div>
      </div>
      <Clue at={{ right: "6%", top: "14%" }} note={clues.cipher} />
    </Floor>
  );
}
