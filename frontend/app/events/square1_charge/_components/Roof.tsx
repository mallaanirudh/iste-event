"use client";

import { useEffect, useRef } from "react";
import { EVENT, HERO, HERO_FACTS } from "../_data/content";
import { gsap, prefersReducedMotion } from "../_lib/gsap";
import { ItemIcon } from "../_lib/sprite";
import { floorProps } from "../_lib/tokens";
import { useMagnet } from "../_lib/useMagnet";
import { BeaconScene } from "./BeaconScene";
import c from "../charge.module.css";
import s from "./roof.module.css";

/** Pixel stars, in the sky's 1440 x 900 viewBox. Every third one twinkles. */
const STARS: [number, number, number][] = [
  [96, 132, 4], [212, 64, 6], [318, 188, 4], [430, 96, 4], [548, 40, 6], [604, 214, 4], [702, 120, 4],
  [786, 58, 4], [858, 176, 6], [944, 92, 4], [1012, 30, 4], [1090, 150, 4], [1176, 70, 6], [1262, 196, 4],
  [1340, 110, 4], [1400, 40, 4], [160, 262, 4], [492, 300, 4], [760, 278, 4], [1220, 300, 4],
];

/** Distant factory rooftops on the horizon: [x, width, height]. */
const SKYLINE: [number, number, number][] = [
  [0, 120, 64], [120, 56, 104], [176, 140, 48], [316, 40, 136], [356, 150, 72], [506, 72, 40], [578, 32, 120],
  [610, 168, 56], [778, 88, 96], [866, 124, 44], [990, 48, 152], [1038, 150, 80], [1188, 60, 52], [1248, 36, 128],
  [1284, 156, 60],
];

export function Roof() {
  const primary = useRef<HTMLAnchorElement>(null);
  const figure = useRef<HTMLButtonElement>(null);
  useMagnet(primary);

  /*
   * The beacon starts dark (CSS, only when scripting is on and motion is allowed) and
   * powers on 1 second after the page starts loading, or at the first input of any
   * kind, whichever comes first. Without JS, or with reduced motion, it is simply lit.
   */
  useEffect(() => {
    const scene = figure.current;
    if (!scene) return;
    const events = ["pointerdown", "touchstart", "wheel", "keydown", "scroll"] as const;
    let timer = 0;
    const light = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, light, true));
      scene.setAttribute("data-lit", "");
    };
    if (prefersReducedMotion()) {
      light();
      return;
    }
    events.forEach((e) => window.addEventListener(e, light, { capture: true, passive: true }));
    timer = window.setTimeout(light, Math.max(0, 1000 - performance.now()));
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, light, true));
    };
  }, []);

  // Clicking the beacon sends a surge up the beam.
  const pulse = () => {
    const root = figure.current;
    if (!root) return;
    const beam = root.querySelector<SVGGElement>("[data-pulse]");
    const ring = root.querySelector<SVGRectElement>("[data-ring]");
    const halo = root.querySelector<SVGCircleElement>("[data-halo]");
    if (!beam || !ring || !halo) return;
    if (prefersReducedMotion()) {
      gsap.fromTo(halo, { opacity: 1.6 }, { opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true });
      return;
    }
    gsap
      .timeline({ defaults: { overwrite: "auto" } })
      .fromTo(beam, { scaleX: 1 }, { scaleX: 2.4, duration: 0.14, ease: "power2.out", svgOrigin: "60 0" })
      .to(beam, { scaleX: 1, duration: 0.9, ease: "elastic.out(1, 0.45)", svgOrigin: "60 0" })
      .fromTo(
        ring,
        { attr: { x: 46, y: -74, width: 28, height: 28 }, opacity: 1 },
        { attr: { x: 30, y: -90, width: 60, height: 60 }, opacity: 0, duration: 0.7, ease: "power2.out" },
        0,
      )
      .fromTo(halo, { opacity: 1.8 }, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0);
  };

  return (
    <section {...floorProps("top", "roof-title")} className={`${c.floor} ${s.roof}`}>
      <div className={s.sky} aria-hidden="true">
        <svg className={s.skySvg} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
          <g className={s.stars}>
          {STARS.map(([x, y, size], i) => (
            <rect key={i} className={i % 3 === 0 ? s.twinkle : undefined} x={x} y={y} width={size} height={size} fill="#FFF6D8" style={{ animationDelay: `${(i % 5) * -0.7}s` }} />
          ))}
          </g>
          <g className={s.cloud} fill="#F3EADB">
            <rect x="180" y="380" width="160" height="16" />
            <rect x="212" y="364" width="80" height="16" />
            <rect x="1110" y="250" width="200" height="16" />
            <rect x="1150" y="234" width="96" height="16" />
            <rect x="1182" y="218" width="40" height="16" />
            <rect x="640" y="440" width="120" height="16" />
          </g>
          <g fill="#2E1C52">
            {SKYLINE.map(([x, w, h]) => (
              <rect key={x} x={x} y={900 - h} width={w} height={h} />
            ))}
          </g>
          <g fill="#FFB21E" opacity="0.5">
            <rect x="330" y="790" width="8" height="8" />
            <rect x="1004" y="770" width="8" height="8" />
            <rect x="1004" y="794" width="8" height="8" />
            <rect x="1262" y="800" width="8" height="8" />
            <rect x="800" y="830" width="8" height="8" />
          </g>
        </svg>
      </div>

      <div className={`${c.wrap} ${s.stage}`}>
        <div className={s.copy}>
          <h1 id="roof-title" className={s.title}>
            <span className={s.line}>Power the</span> <span className={s.line}>Beacon</span>
          </h1>
          <p className={s.tagline}>{EVENT.tagline}</p>
          <ul className={s.facts}>
            {HERO_FACTS.map((f) => (
              <li key={f.label} className={f.phone ? s.fact : `${s.fact} ${s.factWide}`}>
                <ItemIcon name={f.icon} className={s.factIcon} />
                <span className={s.factLabel}>{f.label}</span>
                <span className={s.factValue}>{f.value}</span>
              </li>
            ))}
          </ul>
          <div className={s.ctas}>
            <a
              ref={primary}
              href={EVENT.registerHref}
              className={`${c.btn} ${s.primary}`}
              data-register-open=""
              data-cursor="Register"
              aria-haspopup="dialog"
            >
              {HERO.primary}
            </a>
            <a href="#briefing" className={`${c.btn} ${c.btnGhost} ${s.secondary}`}>
              {HERO.secondary}
            </a>
          </div>
        </div>
      </div>

      <div className={s.figureWrap}>
        <button
          ref={figure}
          type="button"
          className={s.figure}
          onClick={pulse}
          aria-label="Send a surge up the beacon"
          data-cursor="Surge"
        >
          <BeaconScene />
        </button>
      </div>
    </section>
  );
}
