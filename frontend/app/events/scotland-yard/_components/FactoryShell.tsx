"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { floors, type FloorId } from "../content";

/**
 * Wraps the floors: drives the glass-elevator floor indicator, reveals floors as
 * they arrive, and turns on gentle section snapping on large screens.
 */
export default function FactoryShell({ rootClass, children }: { rootClass: string; children: ReactNode }) {
  const [current, setCurrent] = useState<FloorId>("roof");

  useEffect(() => {
    const root = document.getElementById("sy-root");
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-floor]"));

    // Only floors below the fold start hidden, so nothing on screen flashes.
    if (!reduce) {
      root.classList.add("js");
      sections.forEach((s) => { if (s.getBoundingClientRect().top > innerHeight * 0.85) s.classList.add("pending"); });
    }
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove("pending"); reveal.unobserve(e.target); } });
    }, { threshold: 0.15 });
    sections.forEach((s) => reveal.observe(s));

    // The floor crossing the middle of the screen is the current floor.
    const track = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.getAttribute("data-floor") as FloorId); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => track.observe(s));

    const html = document.documentElement;
    const prev = { snap: html.style.scrollSnapType, behavior: html.style.scrollBehavior };
    if (!reduce) html.style.scrollBehavior = "smooth";
    const big = matchMedia("(min-width: 900px) and (min-height: 680px)");
    const applySnap = () => { html.style.scrollSnapType = big.matches && !reduce ? "y proximity" : prev.snap; };
    applySnap();
    big.addEventListener("change", applySnap);

    return () => {
      reveal.disconnect();
      track.disconnect();
      big.removeEventListener("change", applySnap);
      html.style.scrollSnapType = prev.snap;
      html.style.scrollBehavior = prev.behavior;
      root.classList.remove("js");
    };
  }, []);

  const index = floors.findIndex((f) => f.id === current);

  return (
    <div id="sy-root" className={rootClass}>
      {children}
      <nav className="lift" aria-label="Floors">
        <div className="shaft" aria-hidden="true"><span className="car" style={{ "--i": index } as CSSProperties} /></div>
        <ul>
          {floors.map((f) => (
            <li key={f.id}>
              <a href={`#${f.id}`} aria-current={f.id === current ? "true" : undefined} title={f.name}>
                {f.label}<span className="sr-only">: {f.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
