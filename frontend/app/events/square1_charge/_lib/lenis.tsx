"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Scrolls with Lenis when it is running, natively otherwise. */
export function scrollToY(lenis: Lenis | null, y: number, duration = 1.2) {
  if (lenis) {
    lenis.scrollTo(y, { duration });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
}
