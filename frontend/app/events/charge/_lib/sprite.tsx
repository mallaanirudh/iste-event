import type { SVGProps } from "react";

/**
 * Pixel sprites drawn from rows of characters, one character per block.
 * "." is empty. Horizontal runs of one colour merge into a single <rect>,
 * so even the full character stays at a few hundred nodes.
 */
export type Palette = Record<string, string>;

export function spriteRects(rows: readonly string[], palette: Palette, ox = 0, oy = 0) {
  const out: { x: number; y: number; w: number; fill: string; key: string }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || ch === " " || !palette[ch]) {
        x++;
        continue;
      }
      let w = 1;
      while (row[x + w] === ch) w++;
      out.push({ x: ox + x, y: oy + y, w, fill: palette[ch], key: `${ox + x}-${oy + y}` });
      x += w;
    }
  });
  return out;
}

export function SpriteRects({
  rows,
  palette,
  x = 0,
  y = 0,
}: {
  rows: readonly string[];
  palette: Palette;
  x?: number;
  y?: number;
}) {
  return (
    <>
      {spriteRects(rows, palette, x, y).map((r) => (
        <rect key={r.key} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </>
  );
}

/** A standalone sprite: an <svg> sized in blocks, crisp at any scale. */
export function Sprite({
  rows,
  palette,
  title,
  ...rest
}: { rows: readonly string[]; palette: Palette; title?: string } & SVGProps<SVGSVGElement>) {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      <SpriteRects rows={rows} palette={palette} />
    </svg>
  );
}

/* ---------- shared sprites ---------- */

/** Shared skin, hair and kit colours so every figure belongs to the same world. */
export const KIT: Palette = {
  H: "#2B1B14",
  h: "#4A2F22",
  S: "#B97A4E",
  s: "#9A6139",
  E: "#F3EADB",
  P: "#2B1B14",
  M: "#7A3E2A",
  G: "#C9773A",
  g: "#FFD36E",
  L: "#FFF6D8",
};

/** The team heads on the briefing floor. The first is the roof character. */
export const HEADS: { rows: string[]; palette: Palette; name: string }[] = [
  {
    name: "Goggles",
    palette: KIT,
    rows: ["HHHHHHHH", "HLgGGLgH", "HggGGggH", "HSSSSSSH", "SEPSSPES", "SSSssSSS", "SSsMMsSS", "SSSSSSSS"],
  },
  {
    name: "Long hair",
    palette: { ...KIT, S: "#D29A6A", s: "#B57E50", M: "#9A4A36" },
    rows: ["HHHHHHHH", "HHHHHHHH", "HhSSSShH", "HEPSSPEH", "HSSssSSH", "HSsMMsSH", "HSSSSSSH", "HH....HH"],
  },
  {
    name: "Cap",
    palette: { ...KIT, S: "#8A5634", s: "#6E4227", R: "#3B1340", r: "#26092A", M: "#5A2A1C" },
    rows: ["RRRRRRRR", "RRRRRRRR", "rrrrrrrr", "SSSSSSSS", "SEPSSPES", "SSSssSSS", "SSsMMsSS", "SSSSSSSS"],
  },
];

/* ---------- item icons (12 x 12) for the roof facts and the crafting GUI ---------- */

export type Icon = { rows: readonly string[]; palette: Palette };

export const ICONS = {
  calendar: {
    palette: { k: "#3A3A3A", R: "#D83A2E", r: "#A82820", W: "#F3EADB", d: "#5C4E47", s: "#B7A99A" },
    rows: [
      "...k....k...",
      ".RRkRRRRkRR.",
      ".RrrrrrrrrR.",
      ".WWWWWWWWWW.",
      ".WdWWdWWdWW.",
      ".WWWWWWWWWW.",
      ".WdWWdWWRRW.",
      ".WWWWWWWRRW.",
      ".WdWWdWWWWW.",
      ".WWWWWWWWWW.",
      ".ssssssssss.",
      "............",
    ],
  },
  clock: {
    palette: { o: "#5A3A10", Y: "#F2C230", W: "#FFF6D8", k: "#1A110E" },
    rows: [
      "....oooo....",
      "..ooYYYYoo..",
      ".oYYWWWWYYo.",
      ".oYWWWkWWYo.",
      "oYWWWWkWWWYo",
      "oYWWWWkWWWYo",
      "oYWWWWkkkWYo",
      "oYWWWWWWWWYo",
      ".oYWWWWWWYo.",
      ".oYYWWWWYYo.",
      "..ooYYYYoo..",
      "....oooo....",
    ],
  },
  compass: {
    palette: { o: "#2B2B2B", s: "#8B8B8B", S: "#D6D6D6", R: "#E0281F", W: "#5C6B7A" },
    rows: [
      "....oooo....",
      "..oossssoo..",
      ".osSSSSSSso.",
      ".osSSSSSRso.",
      "osSSSSSRRSso",
      "osSSSSRRSSso",
      "osSSSWWSSSso",
      "osSSWWSSSSso",
      ".osWWSSSSso.",
      ".osSSSSSSso.",
      "..oossssoo..",
      "....oooo....",
    ],
  },
  book: {
    palette: { b: "#4A2A12", B: "#8B5A2B", G: "#E9B949", W: "#F3EADB" },
    rows: [
      "............",
      ".bbbbbbbbb..",
      ".bBBBBBBBBW.",
      ".bBBBBBBBBW.",
      ".bBBGGGGBBW.",
      ".bBBBBBBBBW.",
      ".bBBBBBBBBW.",
      ".bBBBBBBBBW.",
      ".bBBBBBBBBW.",
      ".bBBBBBBBBW.",
      ".bbbbbbbbbW.",
      "..WWWWWWWWW.",
    ],
  },
  bookQuill: {
    palette: { W: "#F7F1E6", d: "#8A7A6A", B: "#8B5A2B", k: "#1A110E", s: "#BDB3A6" },
    rows: [
      "........kWW.",
      ".......kWWs.",
      "......kWWs..",
      ".....kWWs...",
      "....kWWs....",
      "...kks......",
      "WWWkWBWWWWW.",
      "WddWWBWddWW.",
      "WWWWWBWWWWW.",
      "WddWWBWddWW.",
      "WWWWWBWWWWW.",
      "BBBBBBBBBBB.",
    ],
  },
  ingot: {
    palette: { h: "#FFF6B0", L: "#FCE36B", Y: "#F2C230", o: "#B8860B" },
    rows: [
      "............",
      "............",
      "....hhhhhhh.",
      "...hLLLLLLLo",
      "..hLLLLLLLoo",
      ".hYYYYYYYYoo",
      "hYYYYYYYYYo.",
      "hYYYYYYYYo..",
      "ooooooooo...",
      "............",
      "............",
      "............",
    ],
  },
  beacon: {
    palette: { w: "#E8FBFB", q: "#9ED8DC", C: "#6FF2F0", W: "#FFFFFF", X: "#1E1430", x: "#4A3270" },
    rows: [
      "wwwwwwwwwwww",
      "wqqqqqqqqqqw",
      "wqqCCCCCCqqw",
      "wqCCWWWWCCqw",
      "wqCWWWWWWCqw",
      "wqCWWWWWWCqw",
      "wqCCWWWWCCqw",
      "wqqCCCCCCqqw",
      "wXXXXXXXXXXw",
      "wXxXXXXXxXXw",
      "wXXXXxXXXXXw",
      "wwwwwwwwwwww",
    ],
  },
  lamp: {
    palette: { F: "#7A3E14", f: "#FFD36E", g: "#FFF6D8", G: "#FFB21E" },
    rows: ["FFFFFFFF", "FffGGffF", "FfgffgfF", "FGfggfGF", "FGfggfGF", "FfgffgfF", "FffGGffF", "FFFFFFFF"],
  },
  head: { palette: HEADS[0].palette, rows: HEADS[0].rows },
  /* The five hidden parts (see PARTS in _data/content.ts). */
  resistor: {
    palette: { t: "#EBD3A8", T: "#D9B98A", s: "#A8865A", R: "#C0392B", O: "#E67E22", Y: "#F1C40F", G: "#C9A227", l: "#9AA0A6" },
    rows: [
      "............",
      "............",
      "............",
      "...tttttt...",
      "..TTTTTTTT..",
      "llTRTOTYTGll",
      "llTRTOTYTGll",
      "llTRTOTYTGll",
      "..TTTTTTTT..",
      "...ssssss...",
      "............",
      "............",
    ],
  },
  capacitor: {
    palette: { c: "#9FB3C8", B: "#2F5DA8", b: "#4C7BD0", W: "#DDE6F0", d: "#1E3A6B", l: "#9AA0A6" },
    rows: [
      "...cccccc...",
      "..cBBBBBWc..",
      "..BbBBBBWB..",
      "..BbBBBBWB..",
      "..BbBBBBWB..",
      "..BbBBBBWB..",
      "..BBBBBBWB..",
      "..BBBBBBWB..",
      "..dddddddd..",
      "....l..l....",
      "....l..l....",
      "....l..l....",
    ],
  },
  led: {
    palette: { r: "#8E1B14", R: "#E0281F", W: "#FFB3AA", p: "#B81F18", l: "#9AA0A6" },
    rows: [
      "....rrrr....",
      "...rRRRRr...",
      "..rRWRRRRr..",
      "..rRWRRRRr..",
      "..rRRRRRRr..",
      "..rRRRRRRr..",
      "..pppppppp..",
      "...l....l...",
      "...l....l...",
      "...l....l...",
      "...l....l...",
      "...l....l...",
    ],
  },
  transistor: {
    palette: { k: "#111111", K: "#2B2B2B", g: "#6B6B6B", l: "#9AA0A6" },
    rows: [
      "............",
      "...kkkkkk...",
      "..kKKKKKKk..",
      "..kKggKKKk..",
      "..kKKKKKKk..",
      "..kKKKKKKk..",
      "..kkkkkkkk..",
      "...l..l..l..",
      "...l..l..l..",
      "...l..l..l..",
      "...l..l..l..",
      "...l..l..l..",
    ],
  },
  battery: {
    palette: { n: "#C0C0C0", G: "#D4A017", g: "#F2C94C", K: "#2B2B2B", k: "#4A4A4A" },
    rows: [
      "............",
      ".....nn.....",
      "...GGGGGG...",
      "...GgGGGG...",
      "...GgGGGG...",
      "...GgGGGG...",
      "...KKKKKK...",
      "...KkKKKK...",
      "...KkKKKK...",
      "...KkKKKK...",
      "...KKKKKK...",
      "............",
    ],
  },
} satisfies Record<string, Icon>;

export type IconName = keyof typeof ICONS;

/** One icon as a crisp standalone <svg>. Decorative unless given a title. */
export function ItemIcon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const icon = ICONS[name];
  return <Sprite rows={icon.rows} palette={icon.palette} {...rest} />;
}
