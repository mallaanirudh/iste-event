"use client";

import { useEffect, useRef } from "react";
import { EVENT, WORLD } from "../_data/content";
import { gsap, MQ, prefersReducedMotion, useGSAP } from "../_lib/gsap";
import { ItemIcon } from "../_lib/sprite";
import { floorProps } from "../_lib/tokens";
import c from "../charge.module.css";
import s from "./world.module.css";

/* ---------- the overworld (pixel SVG, 1440 x 900, 32px blocks) ---------- */

const B = 32;

/** Terrain heights in blocks, one per 32px column, for the near hills. */
const NEAR = [5, 5, 6, 6, 6, 7, 7, 6, 6, 5, 5, 4, 4, 4, 5, 5, 4, 4, 4, 4, 5, 5, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 6, 6, 6, 5, 5, 6, 6, 7, 7, 8, 8, 7, 7, 6];
/** Far hills, in blocks, drawn flat and hazy. */
const FAR = [9, 9, 10, 10, 11, 11, 11, 10, 10, 9, 9, 9, 10, 11, 12, 12, 12, 11, 10, 10, 9, 9, 9, 10, 10, 11, 11, 12, 13, 13, 12, 12, 11, 10, 10, 10, 11, 11, 12, 12, 11, 10, 10, 9, 9, 9];
/** The far hill the beacon stands on (clear of the hanging ticket on wide screens). */
const BEACON = 38;
/** Blocky clouds: [x, y, width in blocks]. */
const CLOUDS: [number, number, number][] = [
  [80, 120, 5], [420, 70, 7], [860, 140, 4], [1150, 90, 6], [1500, 130, 5],
];
/** Oak trees: [column, trunk height in blocks]. */
const TREES: [number, number][] = [
  [3, 4],
  [40, 5],
];
/** Flowers on the grass: [column, colour]. */
const FLOWERS: [number, string][] = [
  [8, "#E0281F"], [13, "#FFD23F"], [19, "#E0281F"], [24, "#FFD23F"], [31, "#E0281F"], [36, "#FFD23F"],
];

function Overworld() {
  const ground = (h: number) => 900 - h * B;
  return (
    <svg className={s.worldSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges" aria-hidden="true">
      <defs>
        <pattern id="ptb-grass" width={B} height={B} patternUnits="userSpaceOnUse">
          <rect width={B} height={B} fill="#8a5a33" />
          <rect y="0" width={B} height="10" fill="#5daa3c" />
          <rect x="4" y="10" width="4" height="4" fill="#5daa3c" />
          <rect x="18" y="10" width="6" height="4" fill="#5daa3c" />
          <rect x="10" y="0" width="6" height="4" fill="#77c24f" />
          <rect x="24" y="4" width="4" height="4" fill="#4a8f2e" />
          <rect x="6" y="20" width="4" height="4" fill="#6e4526" />
          <rect x="22" y="24" width="4" height="4" fill="#a06c40" />
        </pattern>
        <pattern id="ptb-dirt" width={B} height={B} patternUnits="userSpaceOnUse">
          <rect width={B} height={B} fill="#8a5a33" />
          <rect x="4" y="6" width="4" height="4" fill="#6e4526" />
          <rect x="20" y="2" width="4" height="4" fill="#a06c40" />
          <rect x="14" y="18" width="4" height="4" fill="#6e4526" />
          <rect x="26" y="24" width="4" height="4" fill="#a06c40" />
        </pattern>
        <linearGradient id="ptb-world-beam" x1="0" x2="1">
          <stop offset="0" stopColor="#bff4ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e6fdff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#bff4ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* The sun, square as in the game. */}
      <rect x="1180" y="60" width="96" height="96" fill="#fff6a8" opacity="0.35" />
      <rect x="1196" y="76" width="64" height="64" fill="#fffbd6" />

      <g className={s.clouds}>
        {CLOUDS.map(([x, y, w]) => (
          <g key={x} fill="#ffffff" opacity="0.92">
            <rect x={x} y={y} width={w * B} height={B / 2} />
            <rect x={x + B} y={y - B / 2} width={(w - 2) * B} height={B / 2} />
          </g>
        ))}
      </g>

      {/* Far hills, hazy, with the beacon on the highest one. */}
      <g data-world-depth="0.3">
        <g fill="#8fbf9a" opacity="0.75">
          {FAR.map((h, i) => (
            <rect key={i} x={i * B} y={ground(h)} width={B} height={h * B} />
          ))}
        </g>
        <g className={s.beam}>
          <rect x={BEACON * B + 8} y="-40" width="16" height={ground(FAR[BEACON]) + 40} fill="url(#ptb-world-beam)" />
          <rect x={BEACON * B + 13} y="-40" width="6" height={ground(FAR[BEACON]) + 40} fill="#f2feff" />
        </g>
        <rect x={BEACON * B} y={ground(FAR[BEACON]) - B} width={B} height={B} fill="#5ed6e0" />
        <rect x={BEACON * B + 6} y={ground(FAR[BEACON]) - B + 6} width={20} height={20} fill="#c9fbff" />
      </g>

      {/* Near hills: grass blocks over dirt, trees and flowers. */}
      <g data-world-depth="0.7">
        {NEAR.map((h, i) => (
          <g key={i}>
            <rect x={i * B} y={ground(h)} width={B} height={B} fill="url(#ptb-grass)" />
            <rect x={i * B} y={ground(h) + B} width={B} height={(h - 1) * B} fill="url(#ptb-dirt)" />
          </g>
        ))}
        {TREES.map(([col, trunk]) => {
          const base = ground(NEAR[col]);
          return (
            <g key={col}>
              <rect x={col * B} y={base - trunk * B} width={B} height={trunk * B} fill="#6b4f2a" />
              <rect x={col * B + 6} y={base - trunk * B} width="4" height={trunk * B} fill="#563f21" />
              <rect x={(col - 2) * B} y={base - (trunk + 2) * B} width={5 * B} height={2 * B} fill="#3f7f2a" />
              <rect x={(col - 1) * B} y={base - (trunk + 3) * B} width={3 * B} height={B} fill="#4a8f32" />
              <rect x={(col - 1) * B + 8} y={base - (trunk + 2) * B + 10} width="8" height="8" fill="#2f6420" />
              <rect x={(col + 1) * B + 4} y={base - (trunk + 1) * B - 18} width="8" height="8" fill="#5aa040" />
            </g>
          );
        })}
        {FLOWERS.map(([col, colour]) => {
          const base = ground(NEAR[col]);
          return (
            <g key={col}>
              <rect x={col * B + 14} y={base - 14} width="4" height="14" fill="#3f7f2a" />
              <rect x={col * B + 10} y={base - 22} width="12" height="8" fill={colour} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ---------- the hanging ticket ---------- */

/** A pixel iron bolt where a chain meets the beam. */
function Bolt({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 8 8" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" fill="#5a5a5a" />
      <rect x="2" y="2" width="4" height="4" fill="#a8a8a8" />
      <rect x="3" y="3" width="2" height="2" fill="#dcdcdc" />
    </svg>
  );
}

/**
 * Floor 4: the overworld at the foot of the tower, with the golden ticket hanging from
 * two chains under an oak beam.
 *
 * The rig behaves like a two-chain swing: both chains turn by the same angle about their
 * bolts, so the ticket stays level and travels along an arc (a parallelogram). A light
 * spring-damper gives that swing, and a second one tips the whole rig back in depth
 * (rotateX about the beam) when the ticket is hit. A pointer moving near the ticket nudges
 * it with its own speed; a tap punches it back and to the side of the hit.
 */
export function World() {
  const ref = useRef<HTMLElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const ticket = useRef<HTMLDivElement>(null);
  const chains = useRef<(HTMLSpanElement | null)[]>([]);

  // Depth parallax of the hills as the floor scrolls in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<SVGGElement>("[data-world-depth]", ref.current!).forEach((g) => {
          gsap.fromTo(
            g,
            { y: 120 * Number(g.dataset.worldDepth) },
            { y: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.5 } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  useEffect(() => {
    const section = ref.current;
    const r = rig.current;
    const t = ticket.current;
    if (!section || !r || !t || prefersReducedMotion()) return;

    let theta = 0; // swing angle, rad
    let omega = 0;
    let phi = 0; // depth tip, deg (negative = pushed away)
    let psi = 0;
    let press = 0; // squash on a hit, 0..1
    let raf = 0;
    let last = 0;
    let visible = false;
    let lastX = 0;
    let lastT = 0;
    let breeze = performance.now() + 2500;

    const chainLength = () => chains.current[0]?.offsetHeight ?? 160;

    const render = () => {
      const L = chainLength();
      const deg = (theta * 180) / Math.PI;
      chains.current.forEach((ch) => {
        if (ch) ch.style.transform = `rotate(${-deg}deg)`;
      });
      // The ticket rides the chain ends: out along the arc and up as it swings.
      t.style.transform = `translate(${L * Math.sin(theta)}px, ${-L * (1 - Math.cos(theta))}px) scale(${1 - press * 0.04})`;
      r.style.transform = `rotateX(${phi}deg)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - (last || now)) / 1000);
      last = now;
      // A faint breeze now and then, so the ticket never looks pinned in place.
      if (now > breeze) {
        omega += (Math.random() - 0.5) * 0.12;
        breeze = now + 3000 + Math.random() * 3000;
      }
      omega += (-15 * Math.sin(theta) - 0.9 * omega) * dt;
      theta = Math.max(-0.6, Math.min(0.6, theta + omega * dt));
      psi += (-70 * phi - 7 * psi) * dt;
      phi = Math.max(-40, Math.min(14, phi + psi * dt));
      press = Math.max(0, press - dt * 6);
      render();
      const settled = Math.abs(theta) < 0.0005 && Math.abs(omega) < 0.0005 && Math.abs(phi) < 0.02 && Math.abs(psi) < 0.02 && press === 0;
      raf = visible && !settled ? requestAnimationFrame(tick) : 0;
      if (settled) last = 0;
    };
    const wake = () => {
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    // A pointer moving close to the ticket brushes it with its own speed.
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const vx = lastT ? (e.clientX - lastX) / Math.max(8, now - lastT) : 0; // px per ms
      lastX = e.clientX;
      lastT = now;
      const b = t.getBoundingClientRect();
      const pad = Math.min(120, b.width * 0.25);
      const dx = Math.max(b.left - pad - e.clientX, 0, e.clientX - b.right - pad);
      const dy = Math.max(b.top - pad - e.clientY, 0, e.clientY - b.bottom - pad);
      if (dx > 0 || dy > 0) return;
      const inside = e.clientX > b.left && e.clientX < b.right && e.clientY > b.top && e.clientY < b.bottom;
      // Narrow screens get a smaller swing, so the ticket stays on screen.
      const reach = Math.min(1, window.innerWidth / 900);
      omega += Math.max(-1.2, Math.min(1.2, vx)) * (inside ? 0.5 : 0.28) * reach;
      wake();
    };

    // A tap punches it: back into the world, and away from the side that was hit.
    const onDown = (e: PointerEvent) => {
      const b = t.getBoundingClientRect();
      const hit = ((e.clientX - b.left) / b.width) * 2 - 1; // -1 left edge .. 1 right edge
      omega += -hit * 1.6 * Math.min(1, window.innerWidth / 900);
      psi -= 260;
      press = 1;
      wake();
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) wake();
    });
    io.observe(section);
    section.addEventListener("pointermove", onMove, { passive: true });
    t.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", render);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      t.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", render);
    };
  }, []);

  return (
    <section ref={ref} {...floorProps("world", "world-title")} className={`${c.floor} ${s.world}`}>
      <h2 id="world-title" className={c.vh}>
        {WORLD.band}
      </h2>
      <Overworld />

      <div className={s.beamLog} aria-hidden="true" />

      <div className={s.hang}>
        <div ref={rig} className={s.rig}>
          {[0, 1].map((i) => (
            <span key={i} className={`${s.mount} ${i === 0 ? s.mountL : s.mountR}`}>
              <Bolt className={s.bolt} />
              <span
                ref={(el) => {
                  chains.current[i] = el;
                }}
                className={s.chain}
                aria-hidden="true"
              />
            </span>
          ))}

          <div ref={ticket} className={s.ticketWrap} data-cursor="Hit it">
            <article className={s.ticket}>
              <span className={`${s.eyelet} ${s.eyeletL}`} aria-hidden="true" />
              <span className={`${s.eyelet} ${s.eyeletR}`} aria-hidden="true" />
              <div className={s.main}>
                <p className={s.band}>{WORLD.band}</p>
                <p className={s.name}>{EVENT.name}</p>
                <p className={s.admit}>{WORLD.admit}</p>
              </div>
              <div className={s.stub} aria-hidden="true">
                <ItemIcon name="beacon" className={s.beacon} />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
