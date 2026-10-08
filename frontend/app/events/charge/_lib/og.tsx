import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { EVENT, HERO } from "../_data/content";
import { B, GOLD, GOLD_TEXTURE, SIDE, TOP } from "./gold";
import { ICONS, spriteRects } from "./sprite";
import { C } from "./tokens";

/**
 * The link-preview card (Open Graph and Twitter): the night roof with the glass beacon on its
 * oblique gold pyramid, beam into the sky, and the event name, date and venue. Rendered with
 * next/og at build time. Tanker ships as WOFF2 for the page; Satori needs TTF, so a TTF
 * copy of the same font sits next to it in _fonts.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_ALT = `${EVENT.name}: ${HERO.kicker}. ${EVENT.dateLabel}, ${EVENT.timeLabel}, ${EVENT.venue}, ${EVENT.campus}.`;

/**
 * Pyramid tiers, bottom to top, in blocks per side: the roof scene's two tiers. Each tier is set
 * back one block. Two tiers at double scale keep the beacon about 20 px wide in a 300 px thumbnail.
 */
const TIERS = [5, 3];
/** Px per texture unit: whole pixels keep the texture crisp. */
const K = 4;

/** One face's pattern: the gold texture drawn as plain rects (Satori serialises SVG as-is). */
function goldPattern(face: keyof typeof GOLD) {
  return (
    <pattern key={face} id={`og-gold-${face}`} width={B} height={B} patternUnits="userSpaceOnUse">
      {spriteRects(GOLD_TEXTURE, GOLD[face]).map((r) => (
        <rect key={r.key} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </pattern>
  );
}

/** A tier `n` blocks wide and deep, one block high, whose front-top-left corner is (x, y). */
function goldTier(x: number, y: number, n: number) {
  return (
    <g key={`${x}-${y}`}>
      <g transform={`translate(${x} ${y}) ${TOP}`}>
        <rect width={n * B} height={n * B} fill="url(#og-gold-top)" />
      </g>
      <g transform={`translate(${x} ${y})`}>
        <rect width={n * B} height={B} fill="url(#og-gold-front)" />
      </g>
      <g transform={`translate(${x + n * B} ${y}) ${SIDE}`}>
        <rect width={n * B} height={B} fill="url(#og-gold-side)" />
      </g>
    </g>
  );
}

/**
 * The scene, drawn in a 480 x 630 box: the same oblique gold pyramid as the roof scene
 * (lit top, front, shaded side), the glass beacon on top and its beam into the sky.
 * Scene units match BeaconScene; the origin is the pyramid's front-left-bottom corner.
 */
function Scene() {
  const w = 500;
  const h = 630;
  const span = TIERS[0] * B + TIERS[0] * (B / 2); // front width plus depth shift
  const ox = (w - span * K) / 2;
  const oy = h - 40; // the parapet top
  const tiers = TIERS.map((n, i) => ({ n, x: i * (B + B / 2), y: -(i + 1) * B - i * (B / 2) }));
  const top = tiers[tiers.length - 1];
  // The beacon sits on the centre block of the top tier.
  const bx = top.x + B + B / 2;
  const by = top.y - B / 2 - B;
  const beamX = bx + B / 2 + 4;
  const beamY = by - 4;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges">
      <defs>
        {goldPattern("top")}
        {goldPattern("front")}
        {goldPattern("side")}
        <radialGradient id="og-halo" cx={beamX} cy={beamY + 6} r="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B8F6FF" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#6FF2F0" stopOpacity="0.14" />
          <stop offset="1" stopColor="#6FF2F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(${ox} ${oy}) scale(${K})`}>
        {/* light thrown on the gold and the sky */}
        <circle cx={beamX} cy={beamY + 6} r="56" fill="url(#og-halo)" />
        {/* ground shadow */}
        <rect x={-2} y={-1} width={span + 4} height={2} fill="#000" fillOpacity="0.28" />
        {tiers.map((t) => goldTier(t.x, t.y, t.n))}

        {/* beacon: top face */}
        <g transform={`translate(${bx} ${by}) ${TOP}`}>
          <rect width={B} height={B} fill="#CFF6F8" fillOpacity="0.5" />
          <rect x="4" y="4" width="8" height="8" fill="#A8F6F4" />
          <rect width={B} height="1" fill="#F4FFFF" />
          <rect width="1" height={B} fill="#F4FFFF" />
        </g>
        {/* beacon: front face, obsidian base and the lit core */}
        <g transform={`translate(${bx} ${by})`}>
          <rect width={B} height={B} fill="#A9E2E8" fillOpacity="0.32" />
          <rect x="2" y="11" width="12" height="4" fill="#1E1430" />
          <rect x="3" y="2" width="10" height="9" fill="#6FF2F0" />
          <rect x="5" y="4" width="6" height="5" fill="#C8FBFB" />
          <rect x="6" y="5" width="4" height="3" fill="#FFFFFF" />
          <rect width={B} height="1" fill="#F4FFFF" />
          <rect width="1" height={B} fill="#F4FFFF" />
          <rect y={B - 1} width={B} height="1" fill="#8FCBD2" />
          <rect x={B - 1} width="1" height={B} fill="#8FCBD2" />
        </g>
        {/* beacon: right side face */}
        <g transform={`translate(${bx + B} ${by}) ${SIDE}`}>
          <rect width={B} height={B} fill="#7FBFC8" fillOpacity="0.38" />
          <rect x="2" y="11" width="12" height="4" fill="#150E22" />
          <rect x="3" y="2" width="10" height="9" fill="#3FB8B6" />
          <rect x={B - 1} width="1" height={B} fill="#6FAAB2" />
        </g>

        {/* beam: glow, sheath, core */}
        <rect x={beamX - 9} y={beamY - 400} width={18} height={400} fill="rgba(127,230,255,0.16)" />
        <rect x={beamX - 3} y={beamY - 400} width={6} height={400} fill="rgba(191,244,255,0.55)" />
        <rect x={beamX - 1} y={beamY - 400} width={2} height={400} fill="#FFFFFF" />
      </g>
    </svg>
  );
}

const STARS: [number, number, number][] = [
  [72, 64, 6], [250, 30, 4], [356, 58, 6], [520, 92, 4], [640, 36, 4], [670, 250, 6], [300, 572, 4],
  [560, 560, 4], [690, 160, 4], [36, 560, 4], [620, 420, 4],
];

export async function renderOgImage() {
  const tanker = await readFile(join(process.cwd(), "app/events/charge/_fonts/Tanker-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: `linear-gradient(180deg, #120A24 0%, ${C.night} 70%)`,
          color: C.bone,
          fontFamily: "Tanker",
        }}
      >
        {STARS.map(([x, y, s]) => (
          <div key={`${x}-${y}`} style={{ position: "absolute", left: x, top: y, width: s, height: s, background: "#FFF6D8" }} />
        ))}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 720,
            padding: "0 0 0 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 1, color: C.filament }}>
            {HERO.kicker.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              fontSize: 132,
              lineHeight: 0.86,
              textTransform: "uppercase",
            }}
          >
            <span>Power the</span>
            <span>Beacon</span>
          </div>
          <div style={{ display: "flex", marginTop: 34, fontSize: 34, color: C.bone }}>
            WED 14 OCTOBER 2026, 6 TO 10:30 PM
          </div>
          <div style={{ display: "flex", marginTop: 8, fontSize: 34, color: "#CFC3D9" }}>
            {`${EVENT.venue}, ${EVENT.campus}`.toUpperCase()}
          </div>
        </div>
        {/* the roof parapet, full width, that the pyramid stands on */}
        <div style={{ display: "flex", position: "absolute", left: 0, right: 0, bottom: 0, height: 40, background: "#514A58", borderTop: "8px solid #C8BFB2" }} />
        <div style={{ display: "flex", position: "absolute", right: 24, top: 0 }}>
          <Scene />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: "Tanker", data: tanker, style: "normal", weight: 400 }],
    },
  );
}

/** The route icon: the pixel beacon block, crisp at any size. */
export function renderIcon(size: number) {
  const rects = spriteRects(ICONS.beacon.rows, ICONS.beacon.palette);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: size > 64 ? C.night : "transparent" }}>
        <svg
          width={size}
          height={size}
          viewBox={size > 64 ? "-2 -2 16 16" : "0 0 12 12"}
          shapeRendering="crispEdges"
        >
          {rects.map((r) => (
            <rect key={r.key} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
          ))}
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
