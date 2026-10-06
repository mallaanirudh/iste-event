"use client";

import { useEffect, useRef, useState } from "react";
import { useCasebook } from "./ClueProvider";

/** "Lights out" mode: darkens the page and turns the pointer into a torch beam. */
export default function TorchToggle() {
  const [on, setOn] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const { showToast } = useCasebook();

  useEffect(() => {
    document.getElementById("sy-root")?.classList.toggle("lights-out", on);
    if (!on) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOn(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [on]);

  useEffect(() => {
    let raf = 0, x = 0, y = 0;
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

  return (
    <>
      <div ref={overlay} className="torch" aria-hidden="true" />
      <button
        type="button"
        className="torch-btn"
        aria-pressed={on}
        onClick={() => {
          if (!on) showToast("Lights out. Sweep your torch over the rooms to spot fingerprints.");
          setOn(!on);
        }}
      >
        <span className="bulb" aria-hidden="true" />
        <span className="torch-label">{on ? "Lights on" : "Lights out"}</span>
      </button>
    </>
  );
}
