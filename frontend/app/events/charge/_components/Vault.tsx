"use client";

import Image from "next/image";
import { useRef } from "react";
import { EVENT, VAULT } from "../_data/content";
import { gsap, MQ, useGSAP } from "../_lib/gsap";
import { ItemIcon } from "../_lib/sprite";
import { floorProps } from "../_lib/tokens";
import c from "../charge.module.css";
import s from "./vault.module.css";

/**
 * Floor 4: the vault at the base of the tower, holding a golden ticket (Square One is
 * the Wonka mega-event). Registration lives on the Square One page, so the ticket is a
 * keepsake with the essentials, not a form.
 *
 * Motion: the ticket tilts up out of the floor as it scrolls into view (scrubbed), a
 * shine sweeps across it once, and on a mouse it follows the pointer in 3D with a foil
 * glare. The scroll tilt and the pointer tilt live on separate wrappers so they compose.
 */
export function Vault() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const rise = el.querySelector<HTMLElement>("[data-rise]")!;
      const tilt = el.querySelector<HTMLElement>("[data-tilt]")!;
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.fromTo(
          rise,
          { rotationX: 58, yPercent: 30, scale: 0.86, autoAlpha: 0.2 },
          {
            rotationX: 0,
            yPercent: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "power2.out",
            // Ends where the floor meets the bottom of the screen, so it always lands flat.
            scrollTrigger: { trigger: rise, start: "top 98%", endTrigger: el, end: "bottom bottom", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          el.querySelector("[data-shine]"),
          { xPercent: -140 },
          {
            xPercent: 520,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: rise, start: "center 70%", once: true },
          },
        );
      });

      mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
        const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry((px - 0.5) * 14);
          rx((0.5 - py) * 10);
          tilt.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
          tilt.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        tilt.addEventListener("pointermove", onMove);
        tilt.addEventListener("pointerleave", onLeave);
        return () => {
          tilt.removeEventListener("pointermove", onMove);
          tilt.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} {...floorProps("vault", "vault-title")} className={`${c.floor} ${s.vault}`}>
      <div className={`${c.wrap} ${s.head}`}>
        <p className={s.kicker} data-reveal="">
          {VAULT.kicker}
        </p>
        <h2 id="vault-title" className={s.title} data-title="">
          {VAULT.title}
        </h2>
        <p className={s.lede} data-reveal="">
          {VAULT.lede}
        </p>
      </div>

      <div className={`${c.wrap} ${s.stage}`}>
        <div className={s.rise} data-rise="">
          <div className={s.tilt} data-tilt="" data-cursor="Golden ticket">
            <article className={s.ticket}>
              <span className={s.glare} aria-hidden="true" />
              <span className={s.shine} data-shine="" aria-hidden="true" />

              <div className={s.main}>
                <p className={s.band}>
                  <span>{VAULT.band}</span>
                  <span className={s.serial}>{VAULT.serial}</span>
                </p>
                <p className={s.presents}>{VAULT.presents}</p>
                <p className={s.name}>{EVENT.name}</p>
                <dl className={s.details}>
                  {VAULT.details.map((d) => (
                    <div key={d.label}>
                      <dt>{d.label}</dt>
                      <dd>{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className={s.fine}>{VAULT.fine}</p>
              </div>

              <div className={s.stub}>
                <ItemIcon name="beacon" className={s.beacon} />
                <p className={s.admit}>{VAULT.admit}</p>
                <Image
                  src="/events/square1_charge/nitk-transparent.png"
                  alt="National Institute of Technology Karnataka, Surathkal"
                  width={183}
                  height={179}
                  sizes="56px"
                  className={s.crest}
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
