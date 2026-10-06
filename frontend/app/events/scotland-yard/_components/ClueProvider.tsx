"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { TOTAL_CLUES } from "../content";

type Casebook = { logClue: (note: string) => void; showToast: (msg: string) => void };
const CasebookContext = createContext<Casebook | null>(null);

export function useCasebook() {
  const ctx = useContext(CasebookContext);
  if (!ctx) throw new Error("useCasebook must be used inside <ClueProvider>");
  return ctx;
}

/** Tracks found clues, renders the casebook counter and the toast. */
export default function ClueProvider({ children }: { children: ReactNode }) {
  const [found, setFound] = useState(0);
  const [toast, setToast] = useState<{ msg: string; on: boolean }>({ msg: "", on: false });
  const [bump, setBump] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, on: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 4200);
  }, []);

  const logClue = useCallback((note: string) => {
    setFound((n) => n + 1);
    setBump(true);
    showToast(note);
  }, [showToast]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const solved = found >= TOTAL_CLUES;

  return (
    <CasebookContext.Provider value={{ logClue, showToast }}>
      {children}
      <div
        className={`casebook${solved ? " solved" : ""}${bump ? " bump" : ""}`}
        role="status"
        aria-live="polite"
        onAnimationEnd={() => setBump(false)}
      >
        <svg aria-hidden="true"><use href="#fp" /></svg>
        <span className="count-msg">
          Hidden clues found: <strong>{found} / {TOTAL_CLUES}</strong>
        </span>
        <span className="solved-msg">
          Case cracked, detective! <a href="#details">Make it official →</a>
        </span>
      </div>
      <div className={`toast${toast.on ? " show" : ""}`} aria-hidden="true">{toast.msg}</div>
    </CasebookContext.Provider>
  );
}
