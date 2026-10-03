"use client";

import { useEffect } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#?";

/**
 * Page-wide effects that act on the server-rendered illustration:
 * rooms lighting up on scroll, heading decode, section reveals, the tower clock,
 * and a parallax fallback for browsers without CSS scroll timelines.
 * Renders nothing.
 */
export default function SceneEffects() {
  useEffect(() => {
    const root = document.getElementById("sy-root");
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const timeouts = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => { timeouts.delete(t); fn(); }, ms);
      timeouts.add(t);
    };

    const html = document.documentElement;
    const prevScroll = html.style.scrollBehavior;
    html.style.scrollBehavior = "smooth";
    cleanups.push(() => { html.style.scrollBehavior = prevScroll; });

    /* Heading decode, played once when a room's lights come on */
    const scramble = (el: HTMLElement) => {
      if (reduce || el.dataset.done) return;
      el.dataset.done = "1";
      const final = el.textContent ?? "";
      el.setAttribute("aria-label", final);
      const frames = 34;
      let f = 0;
      const tick = () => {
        f++;
        const reveal = (f / frames) * final.length;
        el.textContent = final.split("").map((c, i) =>
          c === " " || i < reveal ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join("");
        if (f < frames) requestAnimationFrame(tick);
        else { el.textContent = final; el.removeAttribute("aria-label"); }
      };
      tick();
    };

    /* Rooms light up floor by floor */
    const rooms = Array.from(root.querySelectorAll<HTMLElement>(".room"));
    const lightAll = () => rooms.forEach((r) => r.classList.add("lit"));
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          later(() => {
            e.target.classList.add("lit");
            const h = e.target.querySelector<HTMLElement>(".note h2");
            if (h) later(() => scramble(h), 500);
          }, Math.random() * 260);
        });
      }, { threshold: 0.3 });
      rooms.forEach((r) => io.observe(r));
      cleanups.push(() => io.disconnect());
    } else {
      lightAll();
    }

    /* Agenda + cipher reveal */
    const revealEls = Array.from(root.querySelectorAll(".folder, ol.timeline, .cipher"));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.2 });
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      revealEls.forEach((el) => el.classList.add("in"));
    }

    /* Parallax fallback: write --p from a rAF poll when CSS scroll timelines are missing */
    if (!reduce && !CSS.supports("animation-timeline: scroll()")) {
      root.classList.add("no-sdt");
      const scene = root.querySelector<HTMLElement>(".bg-scene");
      let lastY = -1, raf = 0;
      const poll = () => {
        const y = scrollY;
        if (y !== lastY && scene) {
          lastY = y;
          const max = Math.max(1, html.scrollHeight - innerHeight);
          scene.style.setProperty("--p", Math.min(1, y / max).toFixed(4));
          root.style.setProperty("--hp", Math.min(1, y / (innerHeight * 0.75)).toFixed(4));
        }
        raf = requestAnimationFrame(poll);
      };
      raf = requestAnimationFrame(poll);
      cleanups.push(() => { cancelAnimationFrame(raf); root.classList.remove("no-sdt"); });
    }

    /* Tower clock: real time, bell swings when the minute changes */
    const clock = root.querySelector("#clock");
    const bell = root.querySelector("#bell");
    const hands = ["#clk-h", "#clk-m", "#clk-s"].map((id) => root.querySelector<SVGGElement>(id));
    let lastMin: number | null = null;
    const tickClock = () => {
      const d = new Date();
      const t = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
      const [h, m, s] = hands;
      if (s) s.style.transform = `rotate(${t * 6}deg)`;
      if (m) m.style.transform = `rotate(${t * 0.1}deg)`;
      if (h) h.style.transform = `rotate(${t / 120}deg)`;
      const min = d.getMinutes();
      if (lastMin !== null && min !== lastMin && !reduce && bell) {
        bell.classList.remove("ring");
        bell.getBoundingClientRect();
        bell.classList.add("ring");
      }
      lastMin = min;
    };
    tickClock();
    const readyRaf = requestAnimationFrame(() => requestAnimationFrame(() => clock?.classList.add("ready")));
    const clockTimer = setInterval(tickClock, 1000);
    cleanups.push(() => { clearInterval(clockTimer); cancelAnimationFrame(readyRaf); });

    return () => {
      cleanups.forEach((fn) => fn());
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return null;
}
