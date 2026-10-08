import { B, GOLD, GOLD_TEXTURE, SIDE, TOP } from "../_lib/gold";
import { KIT, SpriteRects, type Palette } from "../_lib/sprite";
import s from "./roof.module.css";

/*
 * The roof scene: a beacon on a two-tier pyramid of gold blocks, with the beacon
 * keeper (the original blocky character in the amber ISTE Charge hoodie) standing
 * beside it. One unit = one texture pixel; a block is 16 units.
 *
 * The blocks are drawn in an oblique projection (see _lib/gold.ts): each block
 * shows a lit top face, a front face and a shaded right side, like the game seen
 * from slightly above. The origin (0, 0) is the front-left-bottom corner of the pyramid.
 */

/** A stack of `w` blocks wide, `d` deep and `h` high, whose front-top-left corner is (x, y). */
function GoldTier({ x, y, w, d, h }: { x: number; y: number; w: number; d: number; h: number }) {
  return (
    <g>
      <g transform={`translate(${x} ${y}) ${TOP}`}>
        <rect width={w * B} height={d * B} fill="url(#ptb-gold-top)" />
      </g>
      <g transform={`translate(${x} ${y})`}>
        <rect width={w * B} height={h * B} fill="url(#ptb-gold-front)" />
      </g>
      <g transform={`translate(${x + w * B} ${y}) ${SIDE}`}>
        <rect width={d * B} height={h * B} fill="url(#ptb-gold-side)" />
      </g>
    </g>
  );
}

/* ---------- the beacon block (one block, glass with obsidian and the core inside) ---------- */

const BX = 48;
const BY = -64;

function BeaconBlock() {
  return (
    <g>
      {/* Top face */}
      <g transform={`translate(${BX} ${BY}) ${TOP}`}>
        <rect width={B} height={B} fill="#CFF6F8" fillOpacity="0.5" />
        <rect className={s.coreTop} x="4" y="4" width="8" height="8" />
        <rect width={B} height="1" fill="#F4FFFF" />
        <rect width="1" height={B} fill="#F4FFFF" />
        <rect y={B - 1} width={B} height="1" fill="#BDEBEF" />
        <rect x={B - 1} width="1" height={B} fill="#BDEBEF" />
      </g>

      {/* Front face */}
      <g transform={`translate(${BX} ${BY})`}>
        <rect width={B} height={B} fill="#A9E2E8" fillOpacity="0.32" />
        {/* obsidian base */}
        <rect x="2" y="11" width="12" height="4" fill="#1E1430" />
        <rect x="4" y="12" width="1" height="1" fill="#4A3270" />
        <rect x="9" y="13" width="2" height="1" fill="#4A3270" />
        <rect x="12" y="11" width="1" height="1" fill="#3A2758" />
        {/* the core */}
        <rect className={s.core} x="3" y="2" width="10" height="9" />
        <rect className={s.coreMid} x="5" y="4" width="6" height="5" />
        <rect className={s.coreHot} x="6" y="5" width="4" height="3" />
        {/* glass frame and glints */}
        <rect width={B} height="1" fill="#F4FFFF" />
        <rect width="1" height={B} fill="#F4FFFF" />
        <rect y={B - 1} width={B} height="1" fill="#8FCBD2" />
        <rect x={B - 1} width="1" height={B} fill="#8FCBD2" />
        <rect x="2" y="1" width="3" height="1" fill="#FFFFFF" fillOpacity="0.8" />
        <rect x="1" y="2" width="1" height="2" fill="#FFFFFF" fillOpacity="0.8" />
        <rect x="12" y="13" width="2" height="1" fill="#FFFFFF" fillOpacity="0.35" />
      </g>

      {/* Right side face */}
      <g transform={`translate(${BX + B} ${BY}) ${SIDE}`}>
        <rect width={B} height={B} fill="#7FBFC8" fillOpacity="0.38" />
        <rect x="2" y="11" width="12" height="4" fill="#150E22" />
        <rect className={s.coreSide} x="3" y="2" width="10" height="9" />
        <rect width={B} height="1" fill="#D8F6F8" />
        <rect x={B - 1} width="1" height={B} fill="#6FAAB2" />
        <rect y={B - 1} width={B} height="1" fill="#6FAAB2" />
      </g>
    </g>
  );
}

/* ---------- the keeper: standing beside the pyramid, arms at its sides ---------- */

export const BODY: Palette = {
  ...KIT,
  A: "#FFB21E",
  a: "#E0960F",
  d: "#B66F08",
  B: "#1A110E",
  W: "#FFF3E6",
  T: "#3B2A4A",
  t: "#2A1D36",
  O: "#1A110E",
  o: "#5C4E47",
};

export const HEAD = ["HHHHHHHH", "HLgGGLgH", "HggGGggH", "HSSSSSSH", "SEPSSPES", "SSSssSSS", "SSsMMsSS", "SsSSSSsS"];
export const TORSO = [
  "addddddA",
  "AAWAAWAA",
  "AAWAAWAA",
  "AAAAABBA",
  "AAAABBAA",
  "AAABBBBA",
  "AAAABBAA",
  "AAABBAAA",
  "AABAAAAA",
  "AaaaaaaA",
  "AaAAAAaA",
  "dddddddd",
];
export const LEFT_ARM = ["aAAd", "aAAd", "aAAd", "aAAd", "aAAd", "aAAd", "aAAd", "aAAd", "SSSs", "sSSs"];
export const RIGHT_ARM = ["dAAa", "dAAa", "dAAa", "dAAa", "dAAa", "dAAa", "dAAa", "dAAa", "sSSS", "sSSs"];
export const LEGS = ["TTTttTTT", "TTTttTTT", "TTTttTTT", "TTTttTTT", "TTTttTTT", "TTTttTTT", "TTTttTTT", "TTTttTTT", "OOOOOOOO", "oooo.ooo"];

const KEEPER: string[] = [
  ...HEAD.map((h) => `....${h}....`),
  ...TORSO.map((t, i) => (LEFT_ARM[i] ?? "....") + t + (RIGHT_ARM[i] ?? "....")),
  ...LEGS.map((l) => `....${l}....`),
];

const KX = -24;
const KY = -KEEPER.length;

/* ---------- the scene ---------- */

/** Beam origin: the centre of the beacon's top face. */
const BEAM_X = BX + B / 2 + 4;
const BEAM_Y = BY - 4;

export const SCENE_VIEWBOX = "-30 -80 154 82";

export function BeaconScene() {
  return (
    <svg className={s.scene} viewBox={SCENE_VIEWBOX} shapeRendering="crispEdges" aria-hidden="true" overflow="visible">
      <defs>
        {(["top", "front", "side"] as const).map((face) => (
          <pattern key={face} id={`ptb-gold-${face}`} width={B} height={B} patternUnits="userSpaceOnUse">
            <SpriteRects rows={GOLD_TEXTURE} palette={GOLD[face]} />
          </pattern>
        ))}
        <linearGradient id="ptb-beam-core" x1="0" y1={BEAM_Y} x2="0" y2={BEAM_Y - 900} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="ptb-beam-sheath" x1="0" y1={BEAM_Y} x2="0" y2={BEAM_Y - 900} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#BFF4FF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#8FD8FF" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="ptb-beam-glow" x1="0" y1={BEAM_Y} x2="0" y2={BEAM_Y - 900} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FE6FF" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7FE6FF" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="ptb-halo" cx={BEAM_X} cy={BEAM_Y + 6} r="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B8F6FF" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#6FF2F0" stopOpacity="0.14" />
          <stop offset="1" stopColor="#6FF2F0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Light the beacon throws on the gold and the sky around it */}
      <circle className={s.halo} data-halo="" cx={BEAM_X} cy={BEAM_Y + 6} r="46" fill="url(#ptb-halo)" />

      {/* Ground shadows */}
      <rect x="-2" y="-1" width="124" height="2" fill="#000" fillOpacity="0.28" />
      <rect x={KX + 3} y="-1" width="14" height="2" fill="#000" fillOpacity="0.35" />

      {/* Pyramid: a 5 x 5 base, then a 3 x 3 tier set back one block */}
      <GoldTier x={0} y={-B} w={5} d={5} h={1} />
      <GoldTier x={24} y={-40} w={3} d={3} h={1} />

      <BeaconBlock />

      {/* The beam: a soft glow, a translucent sheath and a white core, plus rising sparks */}
      <g data-pulse="">
        <g className={s.beam}>
          <rect className={s.beamGlow} x={BEAM_X - 9} y={BEAM_Y - 1400} width="18" height="1400" fill="url(#ptb-beam-glow)" />
          <rect x={BEAM_X - 3} y={BEAM_Y - 1400} width="6" height="1400" fill="url(#ptb-beam-sheath)" />
          <rect x={BEAM_X - 1} y={BEAM_Y - 1400} width="2" height="1400" fill="url(#ptb-beam-core)" />
          <g className={s.sparks}>
            <rect className={s.spark} x={BEAM_X - 4} y={BEAM_Y - 6} width="1" height="1" fill="#E6FDFF" />
            <rect className={s.spark} x={BEAM_X + 3} y={BEAM_Y - 14} width="1" height="1" fill="#FFFFFF" />
            <rect className={s.spark} x={BEAM_X - 3} y={BEAM_Y - 24} width="1" height="1" fill="#BFF4FF" />
            <rect className={s.spark} x={BEAM_X + 4} y={BEAM_Y - 34} width="1" height="1" fill="#FFFFFF" />
            <rect className={s.spark} x={BEAM_X - 5} y={BEAM_Y - 44} width="1" height="1" fill="#E6FDFF" />
          </g>
        </g>
      </g>
      <rect data-ring="" x={BX - 2} y={BY - 10} width={B + 12} height={B + 12} fill="none" stroke="#DFFBFF" strokeWidth="0.75" opacity="0" />

      <SpriteRects rows={KEEPER} palette={BODY} x={KX} y={KY} />
    </svg>
  );
}
