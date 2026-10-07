"use client";

import { useEffect, useId, useRef } from "react";
import { EVENT, WORLD } from "../_data/content";
import { gsap, MQ, prefersReducedMotion, useGSAP } from "../_lib/gsap";
import { floorProps } from "../_lib/tokens";
import c from "../charge.module.css";
import s from "./world.module.css";

/* ---------- the overworld at night (pixel SVG, 1440 x 900, 32px blocks) ---------- */

const B = 32;

/** Terrain heights in blocks, one per 32px column, for the near hills. */
const NEAR = [5, 5, 6, 6, 6, 7, 7, 6, 6, 5, 5, 4, 4, 4, 5, 5, 4, 4, 4, 4, 5, 5, 4, 4, 4, 5, 5, 6, 6, 7, 7, 7, 6, 6, 6, 5, 5, 6, 6, 7, 7, 8, 8, 7, 7, 6];
/** Far hills, in blocks, drawn flat and hazy. */
const FAR = [9, 9, 10, 10, 11, 11, 11, 10, 10, 9, 9, 9, 10, 11, 12, 12, 12, 11, 10, 10, 9, 9, 9, 10, 10, 11, 11, 12, 13, 13, 12, 12, 11, 10, 10, 10, 11, 11, 12, 12, 11, 10, 10, 9, 9, 9];
/** The far hill the beacon stands on (clear of the hanging ticket on wide screens). */
const BEACON = 35;
/** Stars: [x, y, size]. Every third one twinkles. */
const STARS: [number, number, number][] = [
  [60, 90, 4], [170, 40, 6], [300, 150, 4], [410, 70, 4], [520, 30, 6], [640, 120, 4], [760, 60, 4],
  [880, 170, 4], [960, 40, 6], [1080, 110, 4], [1240, 220, 4], [1330, 60, 6], [1400, 160, 4], [230, 240, 4],
  [700, 230, 4], [1010, 260, 4], [120, 330, 4], [1360, 330, 4],
];
/** Faint night clouds: [x, y, width in blocks]. */
const CLOUDS: [number, number, number][] = [
  [80, 200, 5], [500, 150, 6], [980, 230, 4], [1500, 180, 5],
];
/** Oak trees: [column, trunk height in blocks]. */
const TREES: [number, number][] = [
  [3, 4],
  [40, 5],
];
/** Torches on the hills: columns. */
const TORCHES = [9, 17, 26, 34];

/** A Minecraft beacon in three-quarter view: a glass block, a glowing core on obsidian, a beam. */
function BeaconBlock({ x, y, size, beam = 0 }: { x: number; y: number; size: number; beam?: number }) {
  const u = size / 16;
  const P = (pts: [number, number][]) => pts.map(([a, b]) => `${x + a * u},${y + b * u}`).join(" ");
  return (
    <g>
      {beam ? (
        <g className={s.beam}>
          <rect x={x + 6 * u} y={y + 3 * u - beam} width={4 * u} height={beam} fill="url(#ptb-night-beam)" />
          <rect x={x + 7.3 * u} y={y + 3 * u - beam} width={1.4 * u} height={beam} fill="#f2feff" />
        </g>
      ) : null}
      {/* Obsidian base, inside the glass. */}
      <polygon points={P([[2, 12], [8, 15], [14, 12], [8, 9]])} fill="#3b2a5c" />
      <polygon points={P([[2, 12], [8, 15], [8, 18], [2, 15]])} fill="#1b1030" />
      <polygon points={P([[8, 15], [14, 12], [14, 15], [8, 18]])} fill="#2a1a46" />
      {/* The core. */}
      <polygon points={P([[5, 8], [8, 9.5], [11, 8], [8, 6.5]])} fill="#e6feff" />
      <polygon points={P([[5, 8], [8, 9.5], [8, 13], [5, 11.5]])} fill="#5ef2ff" />
      <polygon points={P([[8, 9.5], [11, 8], [11, 11.5], [8, 13]])} fill="#2fc7d6" />
      {/* Glass faces and edges. */}
      <polygon points={P([[0, 4], [8, 8], [16, 4], [8, 0]])} fill="#bff3ff" fillOpacity="0.35" stroke="#e8fdff" strokeWidth={u * 0.7} />
      <polygon points={P([[0, 4], [8, 8], [8, 18], [0, 14]])} fill="#9fe6f5" fillOpacity="0.28" stroke="#e8fdff" strokeWidth={u * 0.7} />
      <polygon points={P([[8, 8], [16, 4], [16, 14], [8, 18]])} fill="#7fd6ea" fillOpacity="0.22" stroke="#e8fdff" strokeWidth={u * 0.7} />
    </g>
  );
}

function Overworld() {
  const ground = (h: number) => 900 - h * B;
  const bx = BEACON * B;
  const by = ground(FAR[BEACON]) - 36;
  return (
    <svg className={s.worldSvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <pattern id="ptb-grass" width={B} height={B} patternUnits="userSpaceOnUse">
          <rect width={B} height={B} fill="#3e2a1a" />
          <rect y="0" width={B} height="10" fill="#2f5e2a" />
          <rect x="4" y="10" width="4" height="4" fill="#2f5e2a" />
          <rect x="18" y="10" width="6" height="4" fill="#2f5e2a" />
          <rect x="10" y="0" width="6" height="4" fill="#3d7536" />
          <rect x="24" y="4" width="4" height="4" fill="#244b20" />
          <rect x="6" y="20" width="4" height="4" fill="#2f2014" />
          <rect x="22" y="24" width="4" height="4" fill="#4d3622" />
        </pattern>
        <pattern id="ptb-dirt" width={B} height={B} patternUnits="userSpaceOnUse">
          <rect width={B} height={B} fill="#3e2a1a" />
          <rect x="4" y="6" width="4" height="4" fill="#2f2014" />
          <rect x="20" y="2" width="4" height="4" fill="#4d3622" />
          <rect x="14" y="18" width="4" height="4" fill="#2f2014" />
          <rect x="26" y="24" width="4" height="4" fill="#4d3622" />
        </pattern>
        <linearGradient id="ptb-night-beam" x1="0" x2="1">
          <stop offset="0" stopColor="#7feaff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#c9fbff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7feaff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ptb-torch-glow">
          <stop offset="0" stopColor="#ffb21e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb21e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g shapeRendering="crispEdges">
        <g>
          {STARS.map(([x, y, sz], i) => (
            <rect key={i} className={i % 3 === 0 ? s.twinkle : undefined} x={x} y={y} width={sz} height={sz} fill="#fff6d8" style={{ animationDelay: `${(i % 5) * -0.7}s` }} />
          ))}
        </g>

        {/* The moon, square as in the game. */}
        <rect x="1150" y="70" width="104" height="104" fill="#e8ecf5" opacity="0.16" />
        <rect x="1166" y="86" width="72" height="72" fill="#e8ecf5" />
        <rect x="1180" y="100" width="16" height="16" fill="#c9cfdc" />
        <rect x="1210" y="126" width="12" height="12" fill="#c9cfdc" />

        <g className={s.clouds}>
          {CLOUDS.map(([x, y, w]) => (
            <g key={x} fill="#4a3f78" opacity="0.45">
              <rect x={x} y={y} width={w * B} height={B / 2} />
              <rect x={x + B} y={y - B / 2} width={(w - 2) * B} height={B / 2} />
            </g>
          ))}
        </g>
      </g>

      {/* Far hills, hazy, with the beacon on one of them. */}
      <g data-world-depth="0.3">
        <g fill="#2a2f52" shapeRendering="crispEdges">
          {FAR.map((h, i) => (
            <rect key={i} x={i * B} y={ground(h)} width={B} height={h * B} />
          ))}
        </g>
        <BeaconBlock x={bx - 2} y={by} size={36} beam={by + 60} />
      </g>

      {/* Near hills: grass blocks over dirt, trees, and torches with a warm glow. */}
      <g data-world-depth="0.7" shapeRendering="crispEdges">
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
              <rect x={col * B} y={base - trunk * B} width={B} height={trunk * B} fill="#3e2c17" />
              <rect x={col * B + 6} y={base - trunk * B} width="4" height={trunk * B} fill="#2e2010" />
              <rect x={(col - 2) * B} y={base - (trunk + 2) * B} width={5 * B} height={2 * B} fill="#1f4a1c" />
              <rect x={(col - 1) * B} y={base - (trunk + 3) * B} width={3 * B} height={B} fill="#275a23" />
              <rect x={(col - 1) * B + 8} y={base - (trunk + 2) * B + 10} width="8" height="8" fill="#163814" />
            </g>
          );
        })}
        {TORCHES.map((col) => {
          const base = ground(NEAR[col]);
          return (
            <g key={col}>
              <circle className={s.torchGlow} cx={col * B + 16} cy={base - 20} r="46" fill="url(#ptb-torch-glow)" />
              <rect x={col * B + 14} y={base - 22} width="4" height="22" fill="#6b4f2a" />
              <rect x={col * B + 13} y={base - 28} width="6" height="6" fill="#ffd36e" />
              <rect x={col * B + 15} y={base - 26} width="2" height="2" fill="#fff6d8" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** The beacon for the ticket's stub, as its own small SVG. */
function StubBeacon() {
  const gid = useId().replace(/:/g, "");
  return (
    <svg className={s.beaconIcon} viewBox="-2 -14 20 34" aria-hidden="true">
      <defs>
        <linearGradient id={`${gid}-b`} x1="0" x2="1">
          <stop offset="0" stopColor="#5ef2ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#c9fbff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#5ef2ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="5.5" y="-14" width="5" height="18" fill={`url(#${gid}-b)`} />
      <polygon points="2,12 8,15 14,12 8,9" fill="#3b2a5c" />
      <polygon points="2,12 8,15 8,18 2,15" fill="#1b1030" />
      <polygon points="8,15 14,12 14,15 8,18" fill="#2a1a46" />
      <polygon points="5,8 8,9.5 11,8 8,6.5" fill="#e6feff" />
      <polygon points="5,8 8,9.5 8,13 5,11.5" fill="#5ef2ff" />
      <polygon points="8,9.5 11,8 11,11.5 8,13" fill="#2fc7d6" />
      <polygon points="0,4 8,8 16,4 8,0" fill="#bff3ff" fillOpacity="0.4" stroke="#1a110e" strokeWidth="0.6" />
      <polygon points="0,4 8,8 8,18 0,14" fill="#9fe6f5" fillOpacity="0.32" stroke="#1a110e" strokeWidth="0.6" />
      <polygon points="8,8 16,4 16,14 8,18" fill="#7fd6ea" fillOpacity="0.26" stroke="#1a110e" strokeWidth="0.6" />
    </svg>
  );
}

/**
 * Floor 4: the overworld at night at the foot of the tower, with the golden ticket
 * hanging on two fine threads that come down from above.
 *
 * The threads behave like a two-thread swing: both turn by the same angle, the ticket rides
 * their ends along an arc and lags into a slight twist, and a soft breeze keeps it drifting.
 * A pointer moving near the ticket nudges it with its own speed; a tap punches it back in
 * depth (rotateX about the thread tops) and away from the side that was hit.
 */
export function World() {
  const ref = useRef<HTMLElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const ticket = useRef<HTMLDivElement>(null);
  const threads = useRef<(SVGLineElement | null)[]>([]);

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

    const render = (now: number) => {
      // Thread length = how far the ticket hangs below the thread tops (its offset in the rig).
      const L = t.offsetTop;
      const w = t.offsetWidth;
      const h = t.offsetHeight;
      // The ticket lags into a slight twist as it swings, and bobs a little on the air.
      const twist = Math.max(-3, Math.min(3, -omega * 2.5)) + Math.sin(now / 1700) * 0.5;
      const tx = L * Math.sin(theta);
      const ty = -L * (1 - Math.cos(theta)) + Math.sin(now / 1300) * 3;
      t.style.transform = `translate(${tx}px, ${ty}px) rotate(${twist}deg) scale(${1 - press * 0.04})`;
      r.style.transform = `rotateX(${phi}deg)`;
      // Each thread runs from its fixed top to the ticket's hole, wherever the ticket is.
      const a = (twist * Math.PI) / 180;
      const cx = w / 2 + tx;
      const cy = L + h / 2 + ty;
      [-1, 1].forEach((side, i) => {
        const line = threads.current[i];
        if (!line) return;
        const ex = side * w * 0.37;
        const ey = -h / 2 + 4;
        line.setAttribute("x1", String(w / 2 + side * w * 0.37));
        line.setAttribute("y1", "0");
        line.setAttribute("x2", String(cx + ex * Math.cos(a) - ey * Math.sin(a)));
        line.setAttribute("y2", String(cy + ex * Math.sin(a) + ey * Math.cos(a)));
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - (last || now)) / 1000);
      last = now;
      // Soft, continuous breeze: never quite still, never busy.
      const breeze = Math.sin(now / 2300) * 0.035 + Math.sin(now / 900) * 0.012;
      omega += (-9 * Math.sin(theta) - 0.55 * omega + breeze) * dt;
      // The widest swing keeps the ticket on screen: ~0.55 rad on desktop, less on phones.
      const limit = 0.18 + 0.37 * Math.min(1, window.innerWidth / 900);
      theta = Math.max(-limit, Math.min(limit, theta + omega * dt));
      psi += (-55 * phi - 5 * psi) * dt;
      phi = Math.max(-40, Math.min(14, phi + psi * dt));
      press = Math.max(0, press - dt * 6);
      render(now);
      raf = visible ? requestAnimationFrame(tick) : 0;
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
      const reach = Math.min(1, window.innerWidth / 900) ** 1.6;
      omega += Math.max(-1.2, Math.min(1.2, vx)) * (inside ? 0.42 : 0.24) * reach;
      wake();
    };

    // A tap punches it: back into the world, and away from the side that was hit.
    const onDown = (e: PointerEvent) => {
      const b = t.getBoundingClientRect();
      const hit = ((e.clientX - b.left) / b.width) * 2 - 1; // -1 left edge .. 1 right edge
      omega += -hit * 1.3 * Math.min(1, window.innerWidth / 900) ** 1.6;
      psi -= 240;
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
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      t.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <section ref={ref} {...floorProps("world", "world-title")} className={`${c.floor} ${s.world}`}>
      <h2 id="world-title" className={c.vh}>
        {WORLD.band}
      </h2>
      <Overworld />

      <div className={s.hang}>
        <div ref={rig} className={s.rig}>
          <svg className={s.threads} aria-hidden="true">
            {[0, 1].map((i) => (
              <line
                key={i}
                ref={(el) => {
                  threads.current[i] = el;
                }}
                className={s.thread}
                // Resting position without script or with reduced motion; the loop takes over otherwise.
                x1={i === 0 ? "13%" : "87%"}
                x2={i === 0 ? "13%" : "87%"}
                y1="0"
                y2="100%"
              />
            ))}
          </svg>

          <div ref={ticket} className={s.ticketWrap} data-cursor="Hit it">
            <span className={s.glow} aria-hidden="true" />
            <article className={s.ticket}>
              <span className={`${s.eyelet} ${s.eyeletL}`} aria-hidden="true" />
              <span className={`${s.eyelet} ${s.eyeletR}`} aria-hidden="true" />
              <div className={s.main}>
                <p className={s.band}>{WORLD.band}</p>
                <p className={s.name}>{EVENT.name}</p>
                <p className={s.admit}>{WORLD.admit}</p>
              </div>
              <div className={s.stub} aria-hidden="true">
                <StubBeacon />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
