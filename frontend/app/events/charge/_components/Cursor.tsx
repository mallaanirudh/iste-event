"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MQ } from "../_lib/gsap";
import s from "./cursor.module.css";

/**
 * A ring and dot that trail the native cursor (which stays visible) and grow a
 * label over [data-cursor] targets. Fine pointers with motion allowed only.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(`${MQ.fine} and ${MQ.motion}`);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || !ring.current || !dot.current || !label.current) return;
    const r = ring.current;
    const d = dot.current;
    const l = label.current;
    const rx = gsap.quickTo(r, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.35, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3" });
    let current = "";

    const show = (on: boolean) => gsap.to([r, d], { autoAlpha: on ? 1 : 0, duration: 0.2, overwrite: "auto" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-cursor]");
      const text = target?.dataset.cursor ?? "";
      if (target?.closest("[data-no-cursor]")) {
        show(false);
        return;
      }
      show(true);
      if (text !== current) {
        current = text;
        r.toggleAttribute("data-on", Boolean(text));
        l.textContent = text;
      }
    };
    const onLeave = () => show(false);
    // Pointer events stop at iframes (the Tally form), so hide on the way in.
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.("[data-no-cursor]")) show(false);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className={s.layer} aria-hidden="true">
      <div ref={ring} className={s.ring}>
        <span className={s.halo} />
        <span className={s.disc} />
        <span ref={label} className={s.label} />
      </div>
      <div ref={dot} className={s.dot} />
    </div>
  );
}
