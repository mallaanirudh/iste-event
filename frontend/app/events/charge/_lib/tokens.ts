import type { CSSProperties } from "react";

/** Factory-tower materials plus Wonka. One map feeds data-bg/data-fg and the SSR fallback styles. */
export const C = {
  cocoa: "#1A110E",
  bone: "#F3EADB",
  filament: "#FFB21E",
  enig: "#E9B949",
  copper: "#C9773A",
  plum: "#3B1340",
  night: "#1F1338",
  inkSoft: "#5C4E47",
} as const;

/** The three floors of the tower, top to bottom. */
export type FloorId = "top" | "briefing" | "ground";

/** `btnBg`/`btnFg` colour the nav's buttons while that floor is under the nav. */
export type FloorTheme = { bg: string; fg: string; btnBg: string; btnFg: string; label: string };

export const THEME: Record<FloorId, FloorTheme> = {
  top: { bg: C.night, fg: C.bone, btnBg: C.filament, btnFg: C.cocoa, label: "Roof" },
  briefing: { bg: C.filament, fg: C.cocoa, btnBg: C.cocoa, btnFg: C.bone, label: "Briefing room" },
  ground: { bg: C.plum, fg: C.bone, btnBg: C.filament, btnFg: C.cocoa, label: "Ground floor" },
};

/**
 * Props every floor <section> carries. Each floor owns its colours (background, text and
 * the local --bg/--fg tokens), so its text is always on the right background. The scroll
 * system only repaints the chrome (nav, cursor) from the data attributes.
 */
export function floorProps(id: FloorId, labelledBy: string) {
  const t = THEME[id];
  return {
    id,
    "data-bg": t.bg,
    "data-fg": t.fg,
    "data-btn-bg": t.btnBg,
    "data-btn-fg": t.btnFg,
    "data-label": t.label,
    "aria-labelledby": labelledBy,
    style: { background: t.bg, color: t.fg, "--bg": t.bg, "--fg": t.fg } as CSSProperties,
  } as const;
}
