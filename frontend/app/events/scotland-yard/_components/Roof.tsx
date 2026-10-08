import Image from "next/image";
import type { CSSProperties } from "react";
import logo from "@/public/events/scotland-yard/logo.webp";
import { Clue, LightSwitch } from "./Casebook";
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
        <LightSwitch at={{ right: "5%", top: "58%" }} />
        <div className="hero-copy">
          <p className="presents">ISTE presents, at the Grand Confectionery</p>
          <p>Someone has stolen the factory&apos;s secret recipe. Follow the chocolate trail, crack the wrapper codes and catch Mr. X before he melts away.</p>
          <div className="ctas">
            <a className="btn gold" href="#gate">Claim a golden ticket</a>
            <a className="btn cream" href="#briefing">Take the elevator down</a>
          </div>
        </div>
      </div>

      <div className="rooftop" aria-hidden="true">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet">
          <defs>
            <pattern id="sy-stripe" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="24" height="24" fill="#fdf8ee" /><rect width="12" height="24" fill="#7b3fb8" />
            </pattern>
          </defs>
          {/* candy-striped pipe arches */}
          <path d="M70 300 V140 Q70 90 120 90 H230 Q280 90 280 140 V170" fill="none" stroke="#2b1236" strokeWidth="40" />
          <path d="M70 300 V140 Q70 90 120 90 H230 Q280 90 280 140 V170" fill="none" stroke="url(#sy-stripe)" strokeWidth="32" />
          <path d="M1130 300 V120 Q1130 70 1080 70 H990 Q950 70 950 110 V180" fill="none" stroke="#2b1236" strokeWidth="32" />
          <path d="M1130 300 V120 Q1130 70 1080 70 H990 Q950 70 950 110 V180" fill="none" stroke="#f5c834" strokeWidth="24" />
          <circle cx="280" cy="176" r="22" fill="#fdf8ee" stroke="#2b1236" strokeWidth="4" />
          <path d="M280 176 L292 166" stroke="#e2457a" strokeWidth="3" strokeLinecap="round" />
          {/* chimneys puffing pink candy smoke */}
          <rect x="360" y="150" width="44" height="110" fill="#e2457a" stroke="#2b1236" strokeWidth="4" /><rect x="352" y="140" width="60" height="14" fill="#2b1236" />
          <rect x="820" y="170" width="40" height="90" fill="#c9b2e8" stroke="#2b1236" strokeWidth="4" /><rect x="812" y="160" width="56" height="14" fill="#2b1236" />
          <g opacity=".9">
            <circle className="shard" cx="382" cy="118" r="16" fill="#fbd3e6" /><circle className="shard" cx="368" cy="94" r="12" fill="#f7b6d2" /><circle className="shard" cx="394" cy="74" r="9" fill="#fbd3e6" />
            <circle className="shard" cx="840" cy="138" r="13" fill="#e3d4f7" /><circle className="shard" cx="852" cy="116" r="9" fill="#d6c2f2" />
          </g>
          {/* gears */}
          <g color="#7b3fb8"><use href="#sy-gear" className="spin" x="455" y="190" width="56" height="56" /><use href="#sy-gear" className="spin rev" x="500" y="222" width="36" height="36" /></g>
          {/* chocolate-tiled roof with drips */}
          <path d="M0 300 V250 H1200 V300Z" fill="#5a2a1b" stroke="#2b1236" strokeWidth="5" />
          {Array.from({ length: 30 }, (_, i) => <rect key={i} x={i * 40 + 4} y="256" width="32" height="38" rx="3" fill="#6e3524" />)}
          {[40, 150, 330, 470, 560, 760, 900, 1050, 1150].map((x, i) => (
            <path key={x} d={`M${x - 6} 250 Q${x - 5} ${262 + (i % 3) * 8} ${x} ${270 + (i % 3) * 8} Q${x + 5} ${262 + (i % 3) * 8} ${x + 6} 250Z`} fill="#5a2a1b" />
          ))}
          {/* hole punched by the glass elevator, with shards */}
          <path d="M600 252 L620 238 L660 250 L700 236 L726 252 Z" fill="#2b1236" />
          <g fill="#d9f2f4" stroke="#2b1236" strokeWidth="2">
            <path className="shard" d="M600 200 l14 -18 l6 22z" /><path className="shard" d="M720 190 l18 4 l-10 16z" />
            <path className="shard" d="M640 168 l10 -12 l6 16z" /><path className="shard" d="M690 160 l16 -6 l-4 18z" />
          </g>
          {/* the great glass elevator, with the Chocolatier and a lucky ticket holder */}
          <g className="lift-glass">
            <rect x="618" y="142" width="92" height="100" rx="10" fill="rgba(255,255,255,.65)" stroke="#f5c834" strokeWidth="6" />
            <path d="M664 142 V242 M618 192 H710" stroke="#f5c834" strokeWidth="3" />
            <use href="#sy-choc" x="626" y="178" width="32" height="64" />
            <use href="#sy-kid" x="668" y="196" width="26" height="46" />
            <path d="M630 142 L664 110 L698 142" fill="none" stroke="#2b1236" strokeWidth="4" />
          </g>
          {/* roof garden, the Candy Crew, and the thief making off with the recipe */}
          <use href="#sy-shroom" x="150" y="222" width="36" height="32" /><use href="#sy-shroom" x="190" y="232" width="24" height="22" />
          <use href="#sy-helper" x="226" y="214" width="24" height="40" />
          <use href="#sy-lolly" x="980" y="200" width="22" height="52" /><use href="#sy-lolly" x="1012" y="212" width="18" height="40" />
          <use href="#sy-helper" x="1040" y="210" width="26" height="44" />
          <path d="M1060 222 L1098 206" stroke="#f5c834" strokeWidth="5" strokeLinecap="round" />
          <use href="#sy-mrx" x="890" y="194" width="28" height="58" />
          <rect x="912" y="214" width="20" height="14" rx="2" fill="#fdf8ee" stroke="#2b1236" strokeWidth="2" transform="rotate(12 922 221)" />
          <text x="922" y="224" textAnchor="middle" fontSize="7" fontWeight="700" fill="#7b3fb8" transform="rotate(12 922 221)">RECIPE</text>
        </svg>
      </div>
    </section>
  );
}
