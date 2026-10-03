"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cipher } from "../content";
import { useCasebook } from "./ClueProvider";

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const N = 26;
const STEP = 360 / N;
const mod = (n: number) => ((n % N) + N) % N;
const shiftCh = (c: string, k: number) => (A.includes(c) ? A[mod(A.indexOf(c) + k)] : c);
const CIPHER = cipher.plain.split("").map((c) => shiftCh(c, cipher.key)).join("");

function ring(r: number) {
  return A.split("").map((letter, i) => {
    const a = ((i * STEP - 90) * Math.PI) / 180;
    const x = +(150 + r * Math.cos(a)).toFixed(1);
    const y = +(150 + r * Math.sin(a)).toFixed(1);
    return { letter, x, y, rot: i * STEP };
  });
}
const OUTER = ring(129);
const INNER = ring(95);

/** Caesar-cipher decoder wheel. Drag, click the arrows, or use arrow keys. */
export default function CipherWheel() {
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wheel = useRef<SVGSVGElement>(null);
  const inner = useRef<SVGGElement>(null);
  const drag = useRef<{ last: number; rot: number } | null>(null);
  const [solved, setSolved] = useState(false);
  const { logClue } = useCasebook();

  // Every turn goes through here so solving is detected in the event, not in an effect.
  const turn = (next: number) => {
    setPos(next);
    if (!solved && mod(next) === cipher.key) {
      setSolved(true);
      logClue(`Telegram decoded: ${cipher.plain}. Registration is your next move.`);
    }
  };

  const key = mod(pos);
  const reading = useMemo(() => CIPHER.split("").map((c) => shiftCh(c, -key)).join(""), [key]);

  // The inner disc is rotated imperatively so dragging stays smooth between letter snaps.
  useEffect(() => {
    if (!drag.current && inner.current) inner.current.style.transform = `rotate(${-pos * STEP}deg)`;
  }, [pos, dragging]);

  const angleOf = (e: PointerEvent) => {
    const r = wheel.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };
  const onPointerDown = (e: PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { last: angleOf(e), rot: -pos * STEP };
    setDragging(true);
  };
  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d) return;
    const a = angleOf(e);
    let delta = a - d.last;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    d.last = a;
    d.rot += delta;
    if (inner.current) inner.current.style.transform = `rotate(${d.rot}deg)`;
    const p = Math.round(-d.rot / STEP);
    if (p !== pos) turn(p);
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false); // effect snaps the disc to the nearest letter
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { turn(pos + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { turn(pos - 1); e.preventDefault(); }
  };

  return (
    <section className="cipher" id="cipher" aria-labelledby="h-cipher">
      <div className="wheel-wrap">
        <svg
          ref={wheel}
          className={`wheel${dragging ? " dragging" : ""}`}
          viewBox="0 0 300 300"
          role="slider"
          tabIndex={0}
          aria-label="Cipher wheel. Use the arrow keys to turn it."
          aria-valuemin={0}
          aria-valuemax={25}
          aria-valuenow={key}
          aria-valuetext={`Key ${key}. Reading: ${reading}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          <defs>
            <radialGradient id="brassRing" cx="50%" cy="40%" r="60%">
              <stop offset="0" stopColor="#f0d58a" /><stop offset=".6" stopColor="#d4a94f" /><stop offset="1" stopColor="#9c7430" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="150" r="149" fill="#4a2e17" />
          <circle cx="150" cy="150" r="144" fill="url(#brassRing)" />
          <circle cx="150" cy="150" r="114" fill="none" stroke="#4a2e17" strokeWidth="2" />
          <g className="f-type" fontSize="16" fill="#2b1d12" textAnchor="middle" dominantBaseline="central">
            {OUTER.map((l) => (
              <text key={l.letter} x={l.x} y={l.y} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>{l.letter}</text>
            ))}
          </g>
          <g ref={inner} className="inner f-type" fontSize="15" fill="#f0d58a" textAnchor="middle" dominantBaseline="central">
            <circle cx="150" cy="150" r="112" fill="#1f3a68" stroke="#2b1d12" strokeWidth="3" />
            <circle cx="150" cy="150" r="76" fill="none" stroke="#3c5f99" strokeWidth="1.2" strokeDasharray="2 5" />
            {INNER.map((l) => (
              <text key={l.letter} x={l.x} y={l.y} transform={`rotate(${l.rot} ${l.x} ${l.y})`}>{l.letter}</text>
            ))}
          </g>
          <circle cx="150" cy="150" r="42" fill="#e8d5b0" stroke="#b5893a" strokeWidth="4" />
          <text x="150" y="137" textAnchor="middle" className="f-sc" fontSize="12" fill="#4a3624" letterSpacing="2">KEY</text>
          <text x="150" y="163" textAnchor="middle" className="f-display" fontSize="30" fill="#b8472a">{key}</text>
          <rect x="135" y="3" width="30" height="80" rx="5" fill="rgba(240,213,138,.18)" stroke="#b8472a" strokeWidth="3" />
        </svg>
      </div>

      <div className={`telegram${solved ? " solved" : ""}`}>
        <span className="decoded-stamp" aria-hidden="true">DECODED</span>
        <div className="hdr">INTERCEPTED TELEGRAM</div>
        <h2 id="h-cipher">Crack the Cipher</h2>
        <p>Turn the wheel until the message reads clearly. Drag it, tap the arrows, or focus it and use your arrow keys.</p>
        <span className="lbl">Intercepted</span>
        <p className="ciph">{CIPHER}</p>
        <span className="lbl">Your reading</span>
        <p className="plain">
          {reading.split("").map((c, i) => (
            <span key={`${key}-${i}`} style={{ animationDelay: `${i * 18}ms` }}>{c === " " ? " " : c}</span>
          ))}
        </p>
        <div className="wheel-ctrls">
          <button type="button" aria-label="Turn the wheel back one letter" onClick={() => turn(pos - 1)}>&#9664;</button>
          <span>Key <strong>{key}</strong></span>
          <button type="button" aria-label="Turn the wheel forward one letter" onClick={() => turn(pos + 1)}>&#9654;</button>
        </div>
        <p className="hint">Hint: count the letters in YARD, then add three.</p>
      </div>
    </section>
  );
}
