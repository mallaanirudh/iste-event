"use client";

import { gsap, SplitText } from "./gsap";

/**
 * The one title system on the page: masked lines rise into place once.
 * Call inside a gsap.matchMedia() motion branch so reduced motion skips it.
 */
export function revealTitles(scope: HTMLElement) {
  const titles = scope.querySelectorAll<HTMLElement>("[data-title]");
  titles.forEach((el) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        // Tanker's glyphs are taller than the tight line-height, so a mask exactly one
        // line tall shaves the bottom off letters. Give each mask some room, cancelled by
        // a negative margin so line spacing is unchanged.
        gsap.set(self.masks, { paddingBottom: "0.12em", marginBottom: "-0.12em" });
        return gsap.from(self.lines, {
          yPercent: 100,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      },
    });
  });
}
