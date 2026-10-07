import { briefing } from "../content";
import Floor from "./Floor";

export default function Briefing() {
  return (
    <Floor id="briefing" label="5" name="Briefing Room" wall="#eab3a0" labelledBy="h-briefing">
      <div className="split">
        <div>
          <p className="kicker" data-pop>The dossier</p>
          <h2 id="h-briefing" className="title" data-pop style={{ "--d": 1 } as React.CSSProperties}>{briefing.title}</h2>
          <p className="lede" data-pop style={{ "--d": 2 } as React.CSSProperties}>{briefing.body}</p>
          <div className="facts" data-pop style={{ "--d": 3 } as React.CSSProperties}>
            {briefing.facts.map((f) => (
              <div className="fact" key={f.k}><b>{f.k}</b><span>{f.v}</span></div>
            ))}
          </div>
        </div>

        <div className="scene" data-pop style={{ "--d": 2 } as React.CSSProperties} aria-hidden="true">
          <svg viewBox="0 0 600 380">
            {/* window to the city */}
            <rect x="24" y="28" width="120" height="150" rx="60" fill="#9fd3d6" stroke="#2d1210" strokeWidth="6" />
            <path d="M84 28 V178 M24 112 H144" stroke="#2d1210" strokeWidth="4" />
            <path d="M34 160 V130 H50 V150 H64 V120 H80 V160 M96 160 V138 H112 V160" fill="#2f8f9d" />
            {/* chalkboard with the case */}
            <rect x="180" y="24" width="300" height="170" rx="6" fill="#2f3a32" stroke="#6b3423" strokeWidth="10" />
            <text x="330" y="72" textAnchor="middle" fill="#fdf8ee" fontSize="34" style={{ fontFamily: "var(--font-berkshire), serif" }}>Where is Mr. X?</text>
            <g fill="#fdf8ee"><rect x="206" y="96" width="54" height="66" transform="rotate(-4 233 129)" /><rect x="396" y="98" width="58" height="62" transform="rotate(5 425 129)" /></g>
            <use href="#sy-mrx" x="216" y="104" width="30" height="56" />
            <rect x="300" y="112" width="60" height="44" fill="#f5c834" transform="rotate(-3 330 134)" />
            <path d="M233 120 L330 130 L425 124 M330 130 L332 160" stroke="#f0484c" strokeWidth="3" fill="none" />
            <g fill="#f0484c"><circle cx="233" cy="120" r="6" /><circle cx="330" cy="130" r="6" /><circle cx="425" cy="124" r="6" /></g>
            <text x="418" y="140" fontSize="12" fill="#2d1210" fontWeight="700">MAP</text>
            {/* candy jar and lamp */}
            <rect x="510" y="120" width="56" height="70" rx="12" fill="rgba(255,255,255,.55)" stroke="#2d1210" strokeWidth="4" />
            <g><circle cx="526" cy="170" r="8" fill="#f0484c" /><circle cx="546" cy="174" r="8" fill="#f5c834" /><circle cx="536" cy="156" r="8" fill="#2f8f9d" /><circle cx="552" cy="152" r="7" fill="#e0552b" /></g>
            {/* briefing table */}
            <rect x="150" y="268" width="360" height="16" rx="4" fill="#6b3423" stroke="#2d1210" strokeWidth="3" />
            <rect x="168" y="284" width="12" height="70" fill="#4a2219" /><rect x="480" y="284" width="12" height="70" fill="#4a2219" />
            <g transform="rotate(-5 300 258)"><rect x="262" y="246" width="80" height="22" fill="#e5a93b" stroke="#6b3423" strokeWidth="2" /><rect x="286" y="250" width="32" height="10" fill="#f0484c" /></g>
            <use href="#sy-phone" x="200" y="236" width="20" height="34" />
            <path d="M460 268 V236 L446 222" stroke="#2d1210" strokeWidth="3" fill="none" /><path d="M428 214 L458 214 L452 228 L434 228Z" fill="#2f8f9d" transform="rotate(-18 444 220)" />
            {/* squad */}
            <use href="#sy-det" x="90" y="246" width="56" height="112" />
            <use href="#sy-hand" x="196" y="270" width="44" height="88" />
            <use href="#sy-det" x="372" y="264" width="46" height="94" />
            <use href="#sy-cop" x="520" y="250" width="54" height="108" />
            <use href="#sy-shroom" x="20" y="320" width="48" height="40" />
          </svg>
        </div>
      </div>
    </Floor>
  );
}
