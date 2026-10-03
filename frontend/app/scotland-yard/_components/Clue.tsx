"use client";

import { useState, type CSSProperties } from "react";
import { useCasebook } from "./ClueProvider";

/** A faint fingerprint hidden in a room. Clicking it logs the clue in the casebook. */
export default function Clue({ at, note }: { at: CSSProperties; note: string }) {
  const [found, setFound] = useState(false);
  const { logClue, showToast } = useCasebook();

  return (
    <button
      type="button"
      className={`clue${found ? " found" : ""}`}
      style={at}
      aria-pressed={found}
      aria-label={found ? `Clue found: ${note}` : "Examine a faint fingerprint"}
      onClick={() => {
        if (found) return showToast(note);
        setFound(true);
        logClue(note);
      }}
    >
      <svg><use href="#fp" /></svg>
    </button>
  );
}
