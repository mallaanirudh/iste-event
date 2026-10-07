import Image from "next/image";
import type { CSSProperties } from "react";
import logo from "@/public/events/scotland-yard/logo.webp";
import { Clue } from "./Casebook";
import { clues } from "../content";

/** Marquee bulbs around the sign: [left %, top %] along the edges. */
const BULBS: [number, number][] = [
  ...Array.from({ length: 18 }, (_, i): [number, number] => [(i / 17) * 100, 0]),
  ...Array.from({ length: 4 }, (_, i): [number, number] => [100, ((i + 1) / 5) * 100]),
  ...Array.from({ length: 18 }, (_, i): [number, number] => [100 - (i / 17) * 100, 100]),
  ...Array.from({ length: 4 }, (_, i): [number, number] => [0, 100 - ((i + 1) / 5) * 100]),
];

export default function Roof() {
  return (
    <section id="roof" className="floor roof" data-floor="roof" aria-labelledby="sy-title">
      <div className="sky">
        <div className="sign-wrap">
          <div className="sign">
            <h1 id="sy-title" className="sr-only">Scotland Yard 2026</h1>
            <Image src={logo} alt="" priority sizes="(max-width: 900px) 92vw, 860px" />
            {BULBS.map(([x, y], i) => (
              <span
                key={i}
                className="bulb"
                aria-hidden="true"
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 2) * 0.7}s` } as CSSProperties}
              />
            ))}
          </div>
          <div className="legs" aria-hidden="true"><i /><i /><i /></div>
        </div>

        <Clue at={{ left: "8%", top: "62%" }} note={clues.roof} />
        <div className="hero-copy">
          <p className="presents">ISTE presents, at the Grand Confectionery</p>
          <p>The ultimate mystery challenge. Crack the ciphers, ride the chase and corner Mr. X before he slips away.</p>
          <div className="ctas">
            <a className="btn gold" href="#gate">Claim a golden ticket</a>
            <a className="btn cream" href="#briefing">Take the elevator down</a>
          </div>
        </div>
      </div>

      <div className="rooftop" aria-hidden="true">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet">
          {/* pipe arches */}
          <path d="M70 300 V140 Q70 90 120 90 H230 Q280 90 280 140 V170" fill="none" stroke="#9a958c" strokeWidth="34" />
          <path d="M70 300 V140 Q70 90 120 90 H230 Q280 90 280 140 V170" fill="none" stroke="#c9c4b8" strokeWidth="10" strokeDasharray="2 30" />
          <path d="M1130 300 V120 Q1130 70 1080 70 H990 Q950 70 950 110 V180" fill="none" stroke="#e5a93b" strokeWidth="26" />
          <circle cx="280" cy="176" r="22" fill="#fdf8ee" stroke="#2d1210" strokeWidth="4" />
          <path d="M280 176 L292 166" stroke="#f0484c" strokeWidth="3" strokeLinecap="round" />
          {/* chimneys with steam */}
          <rect x="360" y="150" width="44" height="110" fill="#f0484c" stroke="#2d1210" strokeWidth="4" /><rect x="352" y="140" width="60" height="14" fill="#2d1210" />
          <rect x="820" y="170" width="40" height="90" fill="#eab3a0" stroke="#2d1210" strokeWidth="4" /><rect x="812" y="160" width="56" height="14" fill="#2d1210" />
          <g fill="#fdf8ee" opacity=".85">
            <circle className="shard" cx="382" cy="118" r="16" /><circle className="shard" cx="370" cy="96" r="12" /><circle className="shard" cx="392" cy="76" r="9" />
            <circle className="shard" cx="840" cy="138" r="13" /><circle className="shard" cx="852" cy="116" r="9" />
          </g>
          {/* gears */}
          <g color="#6b3423"><use href="#sy-gear" className="spin" x="455" y="190" width="56" height="56" /><use href="#sy-gear" className="spin rev" x="500" y="222" width="36" height="36" /></g>
          {/* corrugated roof */}
          <path d="M0 300 V250 H1200 V300Z" fill="#9a958c" stroke="#2d1210" strokeWidth="5" />
          <path d="M0 250 H1200" stroke="#2d1210" strokeWidth="5" />
          {Array.from({ length: 60 }, (_, i) => <path key={i} d={`M${i * 20 + 6} 252 V300`} stroke="#7e7a72" strokeWidth="6" />)}
          {/* hole punched by the elevator, with glass shards */}
          <path d="M600 252 L620 238 L660 250 L700 236 L726 252 Z" fill="#2d1210" />
          <g fill="#9fd3d6" stroke="#2d1210" strokeWidth="2">
            <path className="shard" d="M600 200 l14 -18 l6 22z" /><path className="shard" d="M720 190 l18 4 l-10 16z" />
            <path className="shard" d="M640 168 l10 -12 l6 16z" /><path className="shard" d="M690 160 l16 -6 l-4 18z" />
          </g>
          {/* the glass elevator */}
          <g className="lift-glass">
            <rect x="622" y="150" width="84" height="92" rx="10" fill="rgba(255,255,255,.7)" stroke="#e5a93b" strokeWidth="6" />
            <path d="M664 150 V242 M622 196 H706" stroke="#e5a93b" strokeWidth="3" />
            <use href="#sy-det" x="632" y="186" width="26" height="52" />
            <use href="#sy-hand" x="672" y="188" width="24" height="50" />
            <path d="M634 150 L664 120 L694 150" fill="none" stroke="#2d1210" strokeWidth="4" />
          </g>
          {/* roof garden and lookouts */}
          <use href="#sy-shroom" x="150" y="222" width="36" height="32" /><use href="#sy-shroom" x="190" y="232" width="24" height="22" />
          <use href="#sy-lolly" x="980" y="200" width="22" height="52" /><use href="#sy-lolly" x="1012" y="212" width="18" height="40" />
          <use href="#sy-det" x="1040" y="196" width="28" height="56" />
          <path d="M1062 214 L1100 200" stroke="#e5a93b" strokeWidth="5" strokeLinecap="round" />
          <use href="#sy-mrx" x="890" y="194" width="28" height="58" />
        </svg>
      </div>
    </section>
  );
}
