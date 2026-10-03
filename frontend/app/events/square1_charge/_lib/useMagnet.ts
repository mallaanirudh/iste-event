"use client";

import { useEffect, type RefObject } from "react";
import { gsap, MQ } from "./gsap";

/**
 * Pulls an element toward the pointer when it comes within `radius` px.
 * Fine pointers only, never under reduced motion. Springs back with power3.out.
 */
export function useMagnet<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { radius = 80, strength = 0.3 }: { radius?: number; strength?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      let near = false;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const reach = radius + Math.max(r.width, r.height) / 2;
        if (Math.hypot(dx, dy) < reach) {
          near = true;
          xTo(dx * strength);
          yTo(dy * strength);
        } else if (near) {
          near = false;
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        gsap.set(el, { x: 0, y: 0 });
      };
    });
    return () => mm.revert();
  }, [ref, radius, strength]);
}
