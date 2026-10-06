"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Shared matchMedia conditions so every effect reverts the same way. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (pointer: fine)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;

export const isFinePointer = () => typeof window !== "undefined" && window.matchMedia(MQ.fine).matches;

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
