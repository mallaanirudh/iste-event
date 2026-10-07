import { briefing, clues } from "../content";
import Floor from "./Floor";
import { Clue } from "./Casebook";

export default function Briefing() {
  return (
    <Floor id="briefing" label="5" name="Inventing Room" wall="#fbd3e6" labelledBy="h-briefing">
      <div className="split">
        <div>
          <p className="kicker" data-pop>The case file</p>
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
            {/* the candy machine */}
            <rect x="20" y="40" width="190" height="230" rx="18" fill="#7b3fb8" stroke="#2b1236" strokeWidth="6" />
            <rect x="40" y="62" width="150" height="70" rx="10" fill="#e3d4f7" stroke="#2b1236" strokeWidth="4" />
            <g fill="#fdf8ee" stroke="#2b1236" strokeWidth="3"><circle cx="72" cy="97" r="20" /><circle cx="158" cy="97" r="20" /></g>
            <path d="M72 97 L82 86 M158 97 L146 90" stroke="#e2457a" strokeWidth="3" strokeLinecap="round" />
            <g fill="#f5c834" stroke="#2b1236" strokeWidth="2"><circle cx="58" cy="160" r="9" /><circle cx="88" cy="160" r="9" /><circle cx="118" cy="160" r="9" /></g>
            <rect x="150" y="150" width="40" height="20" rx="4" fill="#3fb34f" stroke="#2b1236" strokeWidth="2" />
            <path d="M115 40 V14 H250 V60" fill="none" stroke="#f5c834" strokeWidth="12" />
            <path d="M210 230 H250 V250" fill="none" stroke="#2b1236" strokeWidth="14" /><path d="M210 230 H250 V250" fill="none" stroke="#c9b2e8" strokeWidth="8" />
            <circle cx="250" cy="262" r="10" fill="#e2457a" stroke="#2b1236" strokeWidth="2" />
            <path d="M232 60 Q250 40 268 60 L276 108 Q250 124 224 108Z" fill="rgba(255,255,255,.6)" stroke="#2b1236" strokeWidth="4" />
            <path d="M228 92 Q250 104 272 92 L274 106 Q250 120 226 106Z" fill="#3fb34f" />
            <circle className="shard" cx="244" cy="80" r="4" fill="#3fb34f" /><circle className="shard" cx="258" cy="70" r="3" fill="#3fb34f" />
            {/* wanted poster */}
            <rect x="300" y="26" width="120" height="150" rx="4" fill="#fff1c4" stroke="#2b1236" strokeWidth="4" transform="rotate(-3 360 100)" />
            <text x="360" y="58" textAnchor="middle" fontSize="22" fill="#e2457a" style={{ fontFamily: "var(--font-berkshire), serif" }} transform="rotate(-3 360 100)">Wanted</text>
            <use href="#sy-mrx" x="340" y="64" width="40" height="80" />
            <text x="360" y="164" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2b1236" transform="rotate(-3 360 100)">MR. X · RECIPE THIEF</text>
            {/* the empty recipe case under a cracked glass dome */}
            <rect x="460" y="190" width="90" height="80" fill="#7a3b26" stroke="#2b1236" strokeWidth="4" />
            <path d="M462 190 Q505 110 548 190Z" fill="rgba(217,242,244,.55)" stroke="#2b1236" strokeWidth="4" />
            <path d="M500 140 L510 160 L498 172 L512 188" stroke="#2b1236" strokeWidth="2" fill="none" />
            <text x="505" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f5c834">RECIPE</text>
            <text x="505" y="250" textAnchor="middle" fontSize="11" fill="#fdf8ee">(gone)</text>
            {/* chocolate floor puddle and the squad */}
            <ellipse cx="300" cy="352" rx="120" ry="10" fill="#5a2a1b" opacity=".35" />
            <use href="#sy-choc" x="268" y="230" width="62" height="124" />
            <use href="#sy-helper" x="40" y="280" width="44" height="76" />
            <use href="#sy-helper" x="100" y="290" width="38" height="66" />
            <use href="#sy-kid" x="370" y="270" width="46" height="88" />
            <use href="#sy-kid" x="420" y="282" width="40" height="76" />
            <use href="#sy-lolly" x="560" y="300" width="26" height="56" />
            <use href="#sy-shroom" x="190" y="322" width="44" height="36" />
          </svg>
        </div>
      </div>
      <Clue at={{ right: "4%", bottom: "9%" }} note={clues.briefing} />
    </Floor>
  );
}
