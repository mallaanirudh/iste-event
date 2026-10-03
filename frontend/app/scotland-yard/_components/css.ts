import type { CSSProperties } from "react";

/** Inline style helper that also accepts CSS custom properties (e.g. "--i"). */
export const css = (o: Record<string, string | number>) => o as CSSProperties;
