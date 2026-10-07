"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { TOTAL_CLUES } from "../content";

type Ctx = { logClue: (note: string) => void; showToast: (msg: string) => void };
const CasebookContext = createContext<Ctx | null>(null);

export function useCasebook() {
  const ctx = useContext(CasebookContext);
  if (!ctx) throw new Error("useCasebook must be used inside <Casebook>");
  return ctx;
}

/**
 * Hidden fingerprints and "Lights out" torch mode: counts found clues, shows notes,
 * and darkens the page with a beam that follows the pointer.
 */
export default function Casebook({ children }: { children: ReactNode }) {
  const [found, setFound] = useState(0);
  const [toast, setToast] = useState({ msg: "", on: false });
  const [dark, setDark] = useState(false);
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

  // Beam follows the pointer; writes are batched to one per frame.
  useEffect(() => {
    let raf = 0, x = innerWidth / 2, y = innerHeight / 2;
    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        overlay.current?.style.setProperty("--x", `${x}px`);
        overlay.current?.style.setProperty("--y", `${y}px`);
      });
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => { removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const solved = found >= TOTAL_CLUES;

  return (
    <CasebookContext.Provider value={{ logClue, showToast }}>
      {children}
      <div ref={overlay} className="torch" aria-hidden="true" />
      <div className="casebar">
        <button
          type="button"
          className="torch-btn"
          aria-pressed={dark}
          onClick={() => {
            if (!dark) showToast("Lights out. Sweep your torch across the floors to find fingerprints.");
            setDark(!dark);
          }}
        >
          <span className="bulb-ico" aria-hidden="true" />
          {dark ? "Lights on" : "Lights out"}
        </button>
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
