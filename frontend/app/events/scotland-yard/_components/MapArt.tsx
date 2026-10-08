import type { ReactNode } from "react";

/**
 * Hand-drawn factory map for the chase board: a mustard ground, the purple chocolate
 * island and one small landmark per station. Coordinates match `board.stations`.
 */

const INK = "#2b1236";
const S = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const };

/** Landmark art in local coordinates (station at 0,0) plus where its label sits. */
export const landmarks: Record<number, { art: ReactNode; lx: number; ly: number; anchor?: "start" | "middle" | "end" }> = {
  1: {
    lx: 0, ly: -62,
    art: (
      <g>
        <path d="M-30 -8 V-40 Q0 -64 30 -40 V-8" fill="none" stroke="#e5a93b" strokeWidth="7" />
        <path d="M-30 -8 V-40 Q0 -64 30 -40 V-8" fill="none" stroke={INK} strokeWidth="2" />
        <path d="M-18 -10 V-40 M-6 -10 V-46 M6 -10 V-46 M18 -10 V-40" stroke="#e5a93b" strokeWidth="3" />
        <circle cx="0" cy="-52" r="5" fill="#f5c834" stroke={INK} strokeWidth="2" />
      </g>
    ),
  },
  2: {
    lx: -22, ly: 30, anchor: "end",
    art: (
      <g fill="#f7a8cf" {...S}>
        <circle cx="-26" cy="-26" r="14" /><circle cx="-8" cy="-36" r="18" /><circle cx="14" cy="-28" r="15" /><circle cx="30" cy="-20" r="10" />
        <path d="M-6 -20 V-4 M12 -16 V-4" stroke={INK} strokeWidth="2" />
      </g>
    ),
  },
  3: {
    lx: 0, ly: 48, anchor: "middle",
    art: (
      <g>
        {/* the island with lollipop trees and a chocolate waterfall */}
        <path d="M-96 -44 Q-70 -86 -10 -78 Q50 -96 96 -60 Q124 -28 100 6 Q60 30 0 22 Q-70 30 -104 4 Q-120 -18 -96 -44Z" fill="#7b3fb8" {...S} />
        <path d="M96 -40 Q112 -10 104 34 L120 34 Q126 -8 110 -46Z" fill="#6b3423" {...S} />
        {[[-70, -36], [-44, -56], [-16, -40], [20, -60], [48, -44], [70, -22]].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x} ${y} V${y + 16}`} stroke="#fdf8ee" strokeWidth="2.5" />
            <circle cx={x} cy={y} r="8" fill={i % 2 ? "#f7a8cf" : "#f5c834"} stroke={INK} strokeWidth="2" />
          </g>
        ))}
        <path d="M-60 -6 Q-20 -18 20 -4 Q60 8 92 -10" fill="none" stroke="#6b3423" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
  },
  4: {
    lx: 0, ly: 36,
    art: (
      <g>
        <rect x="-26" y="-50" width="52" height="38" rx="6" fill="#e2457a" {...S} />
        <circle cx="-12" cy="-32" r="7" fill="#fdf8ee" stroke={INK} strokeWidth="2" /><circle cx="12" cy="-32" r="7" fill="#fdf8ee" stroke={INK} strokeWidth="2" />
        <path d="M26 -40 H40 V-58" fill="none" stroke={INK} strokeWidth="4" />
        <path d="M34 -58 L46 -58 L52 -40 L28 -40Z" fill="#9be0b8" {...S} />
        <circle cx="40" cy="-66" r="3" fill="#9be0b8" /><circle cx="46" cy="-74" r="2" fill="#9be0b8" />
      </g>
    ),
  },
  5: {
    lx: 0, ly: 38,
    art: (
      <g {...S} strokeWidth={2}>
        <circle cx="-18" cy="-44" r="12" fill="#c9b2e8" /><circle cx="6" cy="-56" r="15" fill="#f7a8cf" /><circle cx="24" cy="-34" r="10" fill="#9be0b8" />
        <path d="M-18 -32 Q-14 -18 -4 -10 M6 -41 V-10 M24 -24 Q18 -14 8 -10" fill="none" />
      </g>
    ),
  },
  6: {
    lx: -24, ly: 32, anchor: "end",
    art: (
      <g>
        <ellipse cx="0" cy="-48" rx="44" ry="18" fill="#e04848" {...S} />
        <g fill="#8a5a2b" stroke={INK} strokeWidth="1.5"><ellipse cx="-30" cy="-6" rx="6" ry="8" /><ellipse cx="30" cy="-8" rx="6" ry="8" /><ellipse cx="22" cy="10" rx="5" ry="7" /></g>
      </g>
    ),
  },
  7: {
    lx: 0, ly: 42,
    art: (
      <g>
        <ellipse cx="0" cy="-22" rx="46" ry="22" fill="#fff6b0" {...S} />
        <ellipse cx="0" cy="-22" rx="34" ry="14" fill="none" stroke="#f5c834" strokeWidth="3" strokeDasharray="6 6" />
        <circle cx="26" cy="-30" r="9" fill="#f5c834" stroke={INK} strokeWidth="2" />
        <path d="M26 -39 V-21 M17 -30 H35 M20 -36 L32 -24 M32 -36 L20 -24" stroke="#fff6b0" strokeWidth="1.5" />
      </g>
    ),
  },
  8: {
    lx: 0, ly: 40,
    art: (
      <g>
        <rect x="-30" y="-54" width="60" height="44" rx="22" fill="#5b2a86" {...S} />
        <circle cx="0" cy="-32" r="12" fill="#fdf8ee" stroke={INK} strokeWidth="2" />
        <circle cx="0" cy="-32" r="7" fill="#e2457a" /><circle cx="0" cy="-32" r="3" fill="#f5c834" />
        <g stroke={INK} strokeWidth="1.5"><circle cx="40" cy="-14" r="6" fill="#e2457a" /><circle cx="-40" cy="-18" r="5" fill="#9be0b8" /></g>
      </g>
    ),
  },
  9: {
    lx: 0, ly: 40,
    art: (
      <g>
        <rect x="-44" y="-30" width="88" height="12" rx="6" fill="#9a958c" {...S} />
        {[-30, -6, 18].map((x) => (
          <g key={x}><rect x={x} y="-46" width="20" height="14" fill="#6b3423" stroke={INK} strokeWidth="2" /><rect x={x + 9} y="-46" width="11" height="14" fill="#7b3fb8" /></g>
        ))}
        <circle cx="-38" cy="-24" r="3" fill={INK} /><circle cx="38" cy="-24" r="3" fill={INK} />
      </g>
    ),
  },
  10: {
    lx: 0, ly: -62,
    art: (
      <g>
        <path d="M-30 -6 V-34 Q0 -60 30 -34 V-6Z" fill="#9a958c" {...S} />
        <path d="M-16 -6 V-28 Q0 -42 16 -28 V-6Z" fill={INK} />
        <path d="M-8 -8 Q-10 -20 0 -30 Q4 -20 10 -24 Q12 -14 8 -8Z" fill="#f08a2e" />
        <path d="M-2 -10 Q-2 -18 2 -22 Q6 -16 4 -10Z" fill="#f5c834" />
      </g>
    ),
  },
  11: {
    lx: 0, ly: 34,
    art: (
      <g>
        <path d="M-50 -6 L-6 -76 L8 -76 L52 -6Z" fill="#4a2219" {...S} />
        <path d="M-17 -58 L-6 -76 L8 -76 L20 -56 L10 -50 L2 -60 L-8 -50Z" fill="#f7a8cf" stroke={INK} strokeWidth="2" />
        <text x="0" y="-22" textAnchor="middle" fontSize="11" fill="#f5c834" style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 700 }}>FUDGE</text>
      </g>
    ),
  },
  12: {
    lx: 0, ly: 40,
    art: (
      <g>
        <path d="M-38 -26 Q-20 -50 0 -26 Q20 -2 38 -26" fill="none" stroke={INK} strokeWidth="13" strokeLinecap="round" />
        <path d="M-38 -26 Q-20 -50 0 -26 Q20 -2 38 -26" fill="none" stroke="#f7a8cf" strokeWidth="8" strokeLinecap="round" />
        <path d="M-38 -26 Q-20 -50 0 -26 Q20 -2 38 -26" fill="none" stroke="#fdf8ee" strokeWidth="3" strokeDasharray="5 7" />
      </g>
    ),
  },
  13: {
    lx: 0, ly: 40,
    art: (
      <g>
        <rect x="-28" y="-52" width="56" height="40" rx="6" fill="#e04848" {...S} />
        <rect x="-20" y="-46" width="34" height="28" rx="4" fill="#c8ecd9" stroke={INK} strokeWidth="2" />
        <path d="M-8 -52 L-18 -66 M8 -52 L18 -66" stroke={INK} strokeWidth="2.5" />
        <circle cx="21" cy="-40" r="2.5" fill="#f5c834" /><circle cx="21" cy="-30" r="2.5" fill="#f5c834" />
      </g>
    ),
  },
  14: {
    lx: 0, ly: 40,
    art: (
      <g>
        <rect x="-22" y="-62" width="44" height="48" rx="6" fill="rgba(255,255,255,.75)" stroke="#e5a93b" strokeWidth="5" />
        <path d="M0 -62 V-14 M-22 -38 H22" stroke="#e5a93b" strokeWidth="2.5" />
        <path d="M-14 -62 L0 -76 L14 -62" fill="none" stroke={INK} strokeWidth="3" />
      </g>
    ),
  },
};

/** Ground, speckles and the corner title. */
export function MapGround() {
  return (
    <g>
      <rect width="840" height="470" fill="#f7d53a" />
      {Array.from({ length: 70 }, (_, i) => (
        <circle key={i} cx={(i * 137) % 840} cy={(i * 89) % 470} r={1.4 + (i % 3) * 0.6} fill="#e9bf1f" />
      ))}
      <text x="826" y="456" textAnchor="end" fontSize="26" fill="#2b1236" style={{ fontFamily: "var(--font-berkshire), serif" }}>The Factory</text>
    </g>
  );
}
