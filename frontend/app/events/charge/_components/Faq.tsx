"use client";

import { useId, useRef, useState } from "react";
import { FAQ } from "../_data/content";
import { gsap, MQ, ScrollTrigger, useGSAP } from "../_lib/gsap";
import { floorProps } from "../_lib/tokens";
import c from "../charge.module.css";
import s from "./faq.module.css";

/** A pixel plus that turns into a cross when its answer is open. */
function PlusIcon() {
  return (
    <svg className={s.plus} viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="currentColor" d="M3 0h1v3h3v1H4v3H3V4H0V3h3z" />
    </svg>
  );
}

/**
 * Floor 3: questions. A strip of numbers that count up as they arrive, then short
 * questions that open one at a time (modelled on the HackMIT, TreeHacks and
 * HackHarvard FAQs), styled as Minecraft stone buttons.
 */
export function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      // The numbers are rendered final on the server; with motion allowed they count up once.
      mm.add(MQ.motion, () => {
        el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
          const target = Number(n.dataset.count);
          const v = { x: 0 };
          n.textContent = "0";
          gsap.to(v, {
            x: target,
            duration: target > 10 ? 1.6 : 0.9,
            ease: "power2.out",
            snap: { x: 1 },
            onUpdate: () => {
              n.textContent = String(v.x);
            },
            scrollTrigger: { trigger: n, start: "top 88%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const toggle = (i: number) => {
    setOpen((cur) => (cur === i ? null : i));
    // The floor changes height as an answer opens, so the scroll positions below it move.
    window.setTimeout(() => ScrollTrigger.refresh(), 380);
  };

  return (
    <section ref={ref} {...floorProps("faq", "faq-title")} className={`${c.floor} ${s.faq}`} data-nopin="">
      <div className={`${c.wrap} ${s.grid}`}>
        <div className={s.head}>
          <p className={s.kicker} data-reveal="">
            {FAQ.kicker}
          </p>
          <h2 id="faq-title" className={s.title} data-title="">
            {FAQ.title}
          </h2>
          <p className={s.lede} data-reveal="">
            {FAQ.lede}
          </p>
          <ul className={s.stats}>
            {FAQ.stats.map((st) => (
              <li key={st.label} className={s.stat} data-reveal="">
                <span className={s.num} data-count={st.value}>
                  {st.value}
                </span>
                <span className={s.statLabel}>{st.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className={s.list}>
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            const qid = `${base}-q${i}`;
            const aid = `${base}-a${i}`;
            return (
              <li key={item.q} className={s.item} data-open={isOpen ? "" : undefined} data-reveal="">
                <h3 className={s.qWrap}>
                  <button
                    id={qid}
                    type="button"
                    className={s.q}
                    aria-expanded={isOpen}
                    aria-controls={aid}
                    onClick={() => toggle(i)}
                    data-cursor={isOpen ? "Close" : "Open"}
                  >
                    <span>{item.q}</span>
                    <PlusIcon />
                  </button>
                </h3>
                <div id={aid} role="region" aria-labelledby={qid} className={s.a} inert={!isOpen}>
                  <div className={s.aInner}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
