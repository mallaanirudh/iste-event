"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { TOTAL_CLUES } from "../content";

type Ctx = { logClue: (note: string) => void; showToast: (msg: string) => void; dark: boolean; setDark: (on: boolean) => void };
const CasebookContext = createContext<Ctx | null>(null);

export function useCasebook() {
  const ctx = useContext(CasebookContext);
  if (!ctx) throw new Error("useCasebook must be used inside <Casebook>");
  return ctx;
}

/**
 * Hidden fingerprints and torch mode. The page starts with the lights out: a beam follows
 * the mouse (or your finger on touch screens) until the visitor finds the light switch.
 */
export default function Casebook({ children }: { children: ReactNode }) {
  const [found, setFound] = useState(0);
  const [toast, setToast] = useState({ msg: "", on: false });
  const [dark, setDark] = useState(true);
  const [bump, setBump] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const overlay = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, on: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 4200);
  }, []);
  const logClue = useCallback((note: string) => { setFound((n) => n + 1); setBump(true); showToast(note); }, [showToast]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    document.getElementById("sy-root")?.classList.toggle("lights-out", dark);
    if (!dark) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDark(false); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [dark]);

  // Beam follows the mouse, or the finger while touching and scrolling. One write per frame.
  useEffect(() => {
    let raf = 0, x = 0, y = 0;
    const place = (px: number, py: number) => {
      x = px; y = py;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        overlay.current?.style.setProperty("--x", `${x}px`);
        overlay.current?.style.setProperty("--y", `${y}px`);
      });
    };
    const onPointer = (e: PointerEvent) => place(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) place(t.clientX, t.clientY); };
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("pointerdown", onPointer, { passive: true });
    addEventListener("touchstart", onTouch, { passive: true });
    addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      removeEventListener("pointermove", onPointer);
      removeEventListener("pointerdown", onPointer);
      removeEventListener("touchstart", onTouch);
      removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(raf);
    };
  }, []);

  const solved = found >= TOTAL_CLUES;

  return (
    <CasebookContext.Provider value={{ logClue, showToast, dark, setDark }}>
      {dark && (
        <button type="button" className="skip-light" onClick={() => setDark(false)}>
          Turn the lights on
        </button>
      )}
      {children}
      <div ref={overlay} className={`torch${dark ? " on" : ""}`} aria-hidden="true" />
      <div className="casebar">
        {dark ? (
          <p className="hint-chip">
            <span className="bulb-ico" aria-hidden="true" />
            <span className="hint-mouse">Lights are out. Find the switch on the roof.</span>
            <span className="hint-touch">Lights are out. Drag your finger to search for the switch on the roof.</span>
          </p>
        ) : (
          <button
            type="button"
            className="torch-btn"
            onClick={() => {
              showToast("Lights out. Sweep your torch across the floors to find fingerprints.");
              setDark(true);
            }}
          >
            <span className="bulb-ico" aria-hidden="true" />
            Lights out
          </button>
        )}
        <div className={`casebook${bump ? " bump" : ""}`} role="status" aria-live="polite" onAnimationEnd={() => setBump(false)}>
          <svg aria-hidden="true"><use href="#sy-fp" /></svg>
          {solved ? (
            <span>Case cracked! <a href="#gate">Claim your ticket</a></span>
          ) : (
            <span>Clues <strong>{found} / {TOTAL_CLUES}</strong></span>
          )}
        </div>
      </div>
      <div className={`toast${toast.on ? " show" : ""}`} aria-hidden="true">{toast.msg}</div>
    </CasebookContext.Provider>
  );
}

/** A faint fingerprint hidden in a room. Brighter (and easier to spot) in torch mode. */
export function Clue({ at, note }: { at: CSSProperties; note: string }) {
  const [done, setDone] = useState(false);
  const { logClue, showToast } = useCasebook();
  return (
    <button
      type="button"
      className={`clue${done ? " found" : ""}`}
      style={at}
      aria-pressed={done}
      aria-label={done ? `Clue found: ${note}` : "Examine a faint fingerprint"}
      onClick={() => {
        if (done) return showToast(note);
        setDone(true);
        logClue(note);
      }}
    >
      <svg aria-hidden="true"><use href="#sy-fp" /></svg>
    </button>
  );
}

/** The wall switch hidden on the roof. Flipping it turns the factory lights on (or off again). */
export function LightSwitch({ at }: { at: CSSProperties }) {
  const { dark, setDark, showToast } = useCasebook();
  return (
    <button
      type="button"
      className={`switch${dark ? "" : " up"}`}
      style={at}
      aria-pressed={!dark}
      aria-label={dark ? "Light switch: turn the factory lights on" : "Light switch: turn the factory lights off"}
      onClick={() => {
        if (dark) showToast("Lights on! Now find the seven fingerprints hidden in the factory.");
        setDark(!dark);
      }}
    >
      <svg viewBox="0 0 40 60" aria-hidden="true">
        <rect x="2" y="2" width="36" height="56" rx="6" fill="#e5a93b" stroke="#2d1210" strokeWidth="3" />
        <circle cx="9" cy="9" r="2" fill="#6b3423" /><circle cx="31" cy="51" r="2" fill="#6b3423" />
        <rect x="14" y="16" width="12" height="28" rx="4" fill="#2d1210" />
        <g className="lever"><rect x="16" y="12" width="8" height="20" rx="4" fill="#fdf8ee" stroke="#2d1210" strokeWidth="2" /></g>
      </svg>
      <span className="switch-label" aria-hidden="true">Lights</span>
    </button>
  );
}
