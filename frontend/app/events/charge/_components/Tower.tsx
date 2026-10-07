"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "../_lib/gsap";
import s from "./tower.module.css";

/**
 * The building cutaway. Brick pillars frame both edges (CSS), and below the roof a
 * copper pipe runs down the left side carrying the current: it fills as you scroll
 * and each floor slab's lamp lights when the floor below it is reached.
 */
export function Tower({ roof, children }: { roof: ReactNode; children: ReactNode }) {
  const shaft = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = shaft.current!;
      const fill = el.querySelector<HTMLElement>("[data-current]")!;
      const slabs = gsap.utils.toArray<HTMLElement>("[data-slab]", el);
      const mm = gsap.matchMedia();

      slabs.forEach((slab) => {
        ScrollTrigger.create({
          trigger: slab,
          start: "top 60%",
          onEnter: () => slab.setAttribute("data-lit", ""),
          onLeaveBack: () => slab.removeAttribute("data-lit"),
        });
      });

      mm.add(MQ.motion, () => {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 60%", scrub: 0.3 },
          },
        );
      });
      mm.add(MQ.reduce, () => {
        gsap.set(fill, { scaleY: 1 });
      });
      return () => mm.revert();
    },
    { scope: shaft },
  );

  return (
    <main className={s.tower} id="main">
      {roof}
      {/* Scroll room for the opening curtain: the pinned roof stays put while this passes under it. */}
      <div className={s.runway} data-runway="" aria-hidden="true" />
      <div ref={shaft} className={s.shaft}>
        <div className={s.pipe} aria-hidden="true">
          <span className={s.current} data-current="" />
        </div>
        {children}
      </div>
    </main>
  );
}

/**
 * The slab between two floors. `roof` is the parapet the character stands on;
 * `foundation` closes the base of the tower and carries no lamp.
 */
export function Slab({ roof = false, foundation = false }: { roof?: boolean; foundation?: boolean }) {
  if (foundation) return <div className={s.slab} aria-hidden="true" />;
  return (
    <div className={`${s.slab} ${roof ? s.roofSlab : ""}`} data-slab="" aria-hidden="true">
      <span className={s.valve} />
    </div>
  );
}
