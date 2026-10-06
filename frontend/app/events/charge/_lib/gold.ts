import type { Palette } from "./sprite";

/*
 * The gold block shared by the roof scene and the share card. One unit = one texture
 * pixel; a block is 16 units. Blocks are drawn in an oblique projection: each block step
 * into the distance moves 8 units right and 8 up, so a block shows a lit top face, a front
 * face and a shaded right side.
 */

export const B = 16;

/* d edge, h highlight, b base, s shade */
export const GOLD_TEXTURE = [
  "dddddddddddddddd",
  "dhhhhhhhhhhhhhbd",
  "dhbbbbbhbbbbbbsd",
  "dhbbhbbbbbbsbbsd",
  "dhbbbbbbbbbbbbsd",
  "dhbbbbbsbbbbbbsd",
  "dhbhbbbbbbbbhbsd",
  "dhbbbbbbbbbbbbsd",
  "dhbbbbsbbbhbbbsd",
  "dhbbbbbbbbbbbbsd",
  "dhbbhbbbbbbbbbsd",
  "dhbbbbbbbsbbbbsd",
  "dhbbbbbbbbbbhbsd",
  "dhbsbbbbbbbbbbsd",
  "dbsssssssssssssd",
  "dddddddddddddddd",
];

export const GOLD: Record<"top" | "front" | "side", Palette> = {
  top: { b: "#FCE36B", h: "#FFF4B0", s: "#F2D24A", d: "#D9A520" },
  front: { b: "#F2C230", h: "#FCE36B", s: "#D9A520", d: "#B8860B" },
  side: { b: "#B8860B", h: "#CC9A1E", s: "#9A6F08", d: "#7A5606" },
};

/** Shear matrices: the top face recedes up-right, the side face recedes up-right from the right edge. */
export const TOP = "matrix(1 0 0.5 -0.5 0 0)";
export const SIDE = "matrix(0.5 -0.5 0 1 0 0)";
