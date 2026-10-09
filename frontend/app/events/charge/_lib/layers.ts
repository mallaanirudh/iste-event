"use client";

import { gsap, ScrollTrigger } from "./gsap";

/**
 * Stacked floors: each floor holds still while the next one (led by its brick slab)
 * slides up over it, and the covered floor sinks back and dims. A floor taller than
 * the screen holds once its bottom reaches the bottom of the screen, so nothing is
 * skipped. Any screen size with motion allowed; call inside a gsap.matchMedia() branch.
 *
 * The sink is driven through the --cover custom property (charge.module.css turns it
 * into `scale` and `filter`), so it never fights the transform the pin may set.
 */
export function stackFloors(scope: HTMLElement) {
  const floors = gsap.utils.toArray<HTMLElement>("[data-bg]", scope);
  floors.slice(0, -1).forEach((floor, i) => {
    const next = floors[i + 1];
    ScrollTrigger.create({
      trigger: floor,
      start: () => (floor.offsetHeight > window.innerHeight ? "bottom bottom" : "top top"),
      endTrigger: next,
      end: "top top",
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });
    gsap.fromTo(
      floor,
      { "--cover": 0 },
      {
        "--cover": 1,
        ease: "none",
        scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true, invalidateOnRefresh: true },
      },
    );
  });
}

/**
 * Content blocks marked [data-reveal] rise and fade in, a few at a time, as they
 * enter the screen. Call inside a gsap.matchMedia() motion branch.
 */
export function revealBlocks(scope: HTMLElement) {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);
  if (!items.length) return;
  gsap.set(items, { y: 36, autoAlpha: 0 });
  ScrollTrigger.batch(items, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.09, overwrite: true }),
  });
}

/**
 * Rows marked [data-slide] slide in from the left tied to the scroll, so they move as
 * the reader does. Call inside a gsap.matchMedia() motion branch.
 */
export function slideRows(scope: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-slide]", scope).forEach((row) => {
    gsap.fromTo(
      row,
      { xPercent: -14, autoAlpha: 0 },
      {
        xPercent: 0,
        autoAlpha: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: row, start: "top 96%", end: "top 70%", scrub: 0.6 },
      },
    );
  });
}
