"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "../_lib/gsap";
import { LenisContext } from "../_lib/lenis";
import { revealTitles } from "../_lib/titleReveal";
import { Cursor } from "./Cursor";
import s from "../charge.module.css";

export function ChargeRoot({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Lenis on desktop with motion allowed, synced to GSAP's ticker.
  useEffect(() => {
    const reduce = window.matchMedia(MQ.reduce).matches;
    const fine = window.matchMedia(MQ.fine).matches;
    if (reduce || !fine) return;
    const l = new Lenis({ lerp: 0.1, wheelMultiplier: 1, syncTouch: false });
    l.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the instance only exists on the client
    setLenis(l);
    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      l.destroy();
      setLenis(null);
    };
  }, []);

  // In-page anchors: glide with Lenis, then move focus to the target for keyboard users.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']");
      if (!a || !root.current?.contains(a)) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const focusTarget = () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      // Desktop floors already clear the fixed nav, so they land flush. Phone floors have a short
      // top padding (charge.module.css), so they stop at the nav's edge; anything else stops below it.
      const navH = document.querySelector("header")?.offsetHeight ?? 72;
      const floor = target.hasAttribute("data-bg");
      const offset = floor ? (window.matchMedia("(max-width: 899px)").matches ? -navH : 0) : -navH - 16;
      if (lenis) {
        lenis.scrollTo(id === "top" ? 0 : target, { offset: id === "top" ? 0 : offset, duration: 1.2, onComplete: focusTarget });
      } else {
        const reduce = window.matchMedia(MQ.reduce).matches;
        const y = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
        focusTarget();
      }
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  useGSAP(
    () => {
      const el = root.current!;
      const reduce = () => window.matchMedia(MQ.reduce).matches;
      const sections = gsap.utils.toArray<HTMLElement>("[data-bg]", el);
      // Floors own their colours. Only the chrome (nav, cursor) follows the floor under it.
      const vars = (sec: HTMLElement) => ({
        "--bg": sec.dataset.bg,
        "--fg": sec.dataset.fg,
        "--nav-btn-bg": sec.dataset.btnBg,
        "--nav-btn-fg": sec.dataset.btnFg,
      });

      const paint = (sec: HTMLElement) => {
        gsap.to(el, { ...vars(sec), duration: reduce() ? 0 : 0.35, ease: "power2.out", overwrite: "auto" });
      };

      // The nav repaints as each floor crosses the middle of the screen.
      sections.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (st) => {
            if (st.isActive) paint(sec);
          },
        });
      });

      // Paint the current floor straight away so the nav matches it before any scroll.
      const first = sections.find((sec) => ScrollTrigger.isInViewport(sec, 0.45)) ?? sections[0];
      if (first) gsap.set(el, vars(first));

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => revealTitles(el));

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <LenisContext.Provider value={lenis}>
      <div ref={root} className={s.root} data-charge-root="">
        <a className={s.skip} href="https://Feisteval-2026.vercel.app">
          Skip to registration
        </a>
        {children}
        <Cursor />
      </div>
    </LenisContext.Provider>
  );
}
