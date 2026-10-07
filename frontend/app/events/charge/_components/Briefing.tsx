"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BRIEFING, CRAFT, END_ISO, EVENT, KSS, RESULTS, START_ISO } from "../_data/content";
import { gsap, MQ, prefersReducedMotion, useGSAP } from "../_lib/gsap";
import { HEADS, ItemIcon, Sprite, type IconName } from "../_lib/sprite";
import { floorProps } from "../_lib/tokens";
import { Part } from "./Part";
import c from "../charge.module.css";
import s from "./briefing.module.css";

export type RoundView = {
  key: string;
  roundNumber: number;
  name: string;
  description: string;
  time: string | null;
  maxPoints: number | null;
};

const START = new Date(START_ISO).getTime();
const END = new Date(END_ISO).getTime();

/* ---------- countdown (odometer reels) ---------- */

function Reel({ value }: { value: number }) {
  const digits = String(value).padStart(2, "0").split("").map(Number);
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    ref.current?.querySelectorAll<HTMLElement>("[data-reel]").forEach((reel, i) => {
      const y = -10 * digits[i];
      if (prefersReducedMotion()) gsap.set(reel, { yPercent: y });
      else gsap.to(reel, { yPercent: y, duration: 0.8, ease: "power3.out", overwrite: "auto" });
    });
  });
  return (
    <span ref={ref} className={s.reelGroup} aria-hidden="true">
      {digits.map((_, i) => (
        <span key={i} className={s.window}>
          <span className={s.reel} data-reel="">
            {Array.from({ length: 10 }, (_, n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the clock only exists after mount
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  if (now !== null && now >= END) return <p className={s.countDone}>That&apos;s a wrap. Winners are announced in the hall.</p>;
  if (now !== null && now >= START) return <p className={s.countDone}>Happening now</p>;

  // Before mount, a same-size placeholder so nothing shifts.
  const mins = now === null ? 0 : Math.floor((START - now) / 60_000);
  const d = Math.min(99, Math.floor(mins / 1440));
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  return (
    <p className={s.countRow}>
      {now === null ? (
        <>
          <span className={s.placeholder}>00</span>
          <span className={s.unit}>d</span>
          <span className={s.placeholder}>00</span>
          <span className={s.unit}>h</span>
          <span className={s.placeholder}>00</span>
          <span className={s.unit}>m</span>
        </>
      ) : (
        <>
          <Reel value={d} />
          <span className={s.unit}>d</span>
          <Reel value={h} />
          <span className={s.unit}>h</span>
          <Reel value={m} />
          <span className={s.unit}>m</span>
          <span className={c.vh}>
            {d} days, {h} hours and {m} minutes until doors open
          </span>
        </>
      )}
    </p>
  );
}

/* ---------- the crafting table GUI ---------- */

type Item = {
  id: string;
  name: string;
  lines: string[];
  /** Tooltip title colour, as in the game: white for plain items, gold for the result. */
  tone?: "plain" | "gold";
  art: ReactNode;
  count?: number;
};

const ARROW_ROWS = [
  "..........A.....",
  "..........AA....",
  "..........AAA...",
  "AAAAAAAAAAAAAA..",
  "AAAAAAAAAAAAAAA.",
  "AAAAAAAAAAAAAAAA",
  "AAAAAAAAAAAAAAA.",
  "AAAAAAAAAAAAAA..",
  "..........AAA...",
  "..........AA....",
  "..........A.....",
];

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden="true">
      <Sprite rows={ARROW_ROWS} palette={{ A: "#8B8B8B" }} className={s.arrowBase} />
      <span className={s.arrowFill} data-arrow="">
        <Sprite rows={ARROW_ROWS} palette={{ A: "#FFFFFF" }} className={s.arrowBase} />
      </span>
    </span>
  );
}

function icon(name: IconName) {
  return <ItemIcon name={name} className={s.itemArt} />;
}

function head(i: number) {
  return <Sprite rows={HEADS[i].rows} palette={HEADS[i].palette} className={s.itemArt} />;
}

function Slot({
  item,
  active,
  result = false,
  onShow,
  onHide,
}: {
  item: Item | null;
  active: boolean;
  result?: boolean;
  onShow: (id: string) => void;
  onHide: (id: string) => void;
}) {
  const tipId = useId();
  const tip = useRef<HTMLSpanElement>(null);

  // Like the game, the tooltip opens to the upper right of the slot; it flips left
  // when there is no room, and is nudged back inside the screen on narrow phones.
  useLayoutEffect(() => {
    const el = tip.current;
    if (!active || !el) return;
    el.removeAttribute("data-flip");
    el.style.translate = "";
    const vw = document.documentElement.clientWidth;
    if (el.getBoundingClientRect().right > vw - 8) el.setAttribute("data-flip", "");
    const r = el.getBoundingClientRect();
    const shift = r.left < 8 ? 8 - r.left : r.right > vw - 8 ? vw - 8 - r.right : 0;
    if (shift) el.style.translate = `${shift}px 0`;
  }, [active]);

  if (!item) return <span className={`${s.slot} ${result ? s.result : ""}`} aria-hidden="true" />;

  return (
    <span className={s.slotWrap}>
      <button
        type="button"
        className={`${s.slot} ${result ? s.result : ""}`}
        aria-label={item.name}
        aria-describedby={tipId}
        onMouseEnter={() => onShow(item.id)}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.currentTarget) onHide(item.id);
        }}
        onFocus={() => onShow(item.id)}
        onBlur={() => onHide(item.id)}
        onClick={() => onShow(item.id)}
      >
        <span className={s.item} data-item={result ? undefined : ""} data-result={result ? "" : undefined}>
          {item.art}
          {item.count ? <span className={s.count}>{item.count}</span> : null}
        </span>
        {result ? (
          <span className={s.sparkles} aria-hidden="true">
            <i data-sparkle="" />
            <i data-sparkle="" />
            <i data-sparkle="" />
            <i data-sparkle="" />
          </span>
        ) : null}
      </button>
      <span ref={tip} id={tipId} role="tooltip" className={s.tooltip} hidden={!active}>
        <span className={`${s.tipName} ${item.tone === "gold" ? s.tipGold : ""}`}>{item.name}</span>
        {item.lines.map((l) => (
          <span key={l} className={s.tipLine}>
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}

type Step = { key: string; time: string; title: string; detail: string; meta: string | null };

export function Briefing({ rounds }: { rounds: RoundView[] }) {
  const ref = useRef<HTMLElement>(null);
  const gui = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  const r1 = rounds.find((r) => r.roundNumber === 1) ?? rounds[0];
  const r2 = rounds.find((r) => r.roundNumber === 2) ?? rounds[1];
  const roundItem = (r: RoundView | undefined, id: string, art: ReactNode): Item | null =>
    r
      ? {
          id,
          name: `Round ${r.roundNumber}: ${r.name}`,
          lines: [
            r.time ?? "",
            r.maxPoints ? `Up to ${r.maxPoints} points` : "",
          ].filter(Boolean),
          art,
        }
      : null;

  const grid: (Item | null)[] = [
    ...CRAFT.teammates.map((t, i) => ({ id: `mate-${i}`, name: t.name, lines: [...t.lines], art: head(i) })),
    roundItem(r1, "round-1", icon("bookQuill")),
    roundItem(r2, "round-2", icon("ingot")),
    null,
    null,
    null,
    null,
  ];

  const winner: Item = {
    id: "winner",
    name: CRAFT.winner.name,
    lines: [...CRAFT.winner.lines],
    tone: "gold",
    art: icon("beacon"),
  };

  // `wide` cells repeat the hero hotbar, so phones (under 640px) skip them.
  const inventory: { item: Item; caption: ReactNode; wide?: boolean }[] = [
    {
      item: { id: "inv-date", name: "Date", lines: [EVENT.dateLabel], art: icon("calendar") },
      caption: "Wed 14 October",
      wide: true,
    },
    {
      item: { id: "inv-time", name: "Time", lines: [`${EVENT.timeLabel}, IST`], art: icon("clock") },
      caption: EVENT.timeLabel,
      wide: true,
    },
    {
      item: { id: "inv-venue", name: "Venue", lines: [EVENT.venue, EVENT.campus], art: icon("compass") },
      caption: EVENT.venue,
      wide: true,
    },
    {
      item: { id: "inv-who", name: "Who can join", lines: [EVENT.eligibility], art: icon("book") },
      caption: EVENT.eligibility,
    },
    {
      item: {
        id: "inv-team",
        name: "Team",
        lines: [EVENT.teamSize, EVENT.expected],
        art: icon("head"),
        count: EVENT.teamMax,
      },
      caption: EVENT.teamSize,
    },
    {
      item: {
        id: "inv-doors",
        name: "Doors open",
        lines: ["6 PM, Wednesday 14 October", "Knowledge session first"],
        art: icon("lamp"),
      },
      caption: <Countdown />,
    },
  ];

  const show = (id: string) => setActive(id);
  const hide = (id: string) => setActive((cur) => (cur === id ? null : cur));

  // Tap outside the GUI or press Escape to close a tooltip.
  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      if (!gui.current?.contains(e.target as Node)) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const steps: Step[] = [
    ...rounds.map((r) => ({
      key: r.key,
      time: r.time ?? "",
      title: r.roundNumber === 1 ? `${KSS} and Round 1: ${r.name}` : `Round ${r.roundNumber}: ${r.name}`,
      detail: r.description,
      meta: null,
    })),
    { key: "results", time: RESULTS.time, title: RESULTS.title, detail: RESULTS.detail, meta: null },
  ];

  // Items drop into the grid one by one, the arrow fills, and the winner appears.
  useGSAP(
    () => {
      const el = gui.current!;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true } })
          .from(el.querySelectorAll("[data-item]"), { y: -28, opacity: 0, duration: 0.3, ease: "bounce.out", stagger: 0.15 })
          .fromTo(
            el.querySelector("[data-arrow]"),
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.3, ease: "steps(8)" },
          )
          .from(el.querySelector("[data-result]"), { scale: 0.3, opacity: 0, duration: 0.3, ease: "back.out(2.2)" })
          .fromTo(
            el.querySelectorAll("[data-sparkle]"),
            { scale: 0, opacity: 1 },
            { scale: 1.2, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.06 },
            "<0.1",
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} {...floorProps("briefing", "briefing-title")} className={`${c.floor} ${s.briefing}`}>
      <div className={`${c.wrap} ${s.grid}`}>
        <div ref={gui} className={s.gui}>
          <p className={s.guiLabel}>{BRIEFING.craftingLabel}</p>
          <div className={s.craftRow}>
            <div className={s.craftGrid} role="group" aria-label={BRIEFING.recipeLabel}>
              {grid.map((item, i) => (
                <Slot key={item?.id ?? `empty-${i}`} item={item} active={active === item?.id} onShow={show} onHide={hide} />
              ))}
            </div>
            <Arrow />
            <Slot item={winner} result active={active === winner.id} onShow={show} onHide={hide} />
          </div>

          <p className={s.guiLabel}>{BRIEFING.inventoryLabel}</p>
          <ul className={s.inventory}>
            {inventory.map(({ item, caption, wide }) => (
              <li key={item.id} className={wide ? `${s.invCell} ${s.invCellWide}` : s.invCell}>
                <Slot item={item} active={active === item.id} onShow={show} onHide={hide} />
                <span className={s.caption}>{caption}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.text}>
          <div className={s.textHead}>
            <div className={s.heads} aria-hidden="true">
              {HEADS.map((h) => (
                <Sprite key={h.name} rows={h.rows} palette={h.palette} className={s.head} />
              ))}
            </div>
            <h2 id="briefing-title" className={s.title} data-title="">
              {BRIEFING.title}
            </h2>
          </div>
          <h3 className={c.vh}>{BRIEFING.circuitLabel}</h3>
          <ol className={s.steps}>
            {steps.map((st) => (
              <li key={st.key} className={s.step}>
                <p className={s.time}>{st.time}</p>
                <p className={s.stepTitle}>{st.title}</p>
                <p className={s.detail}>{st.detail}</p>
                {st.meta ? <p className={s.meta}>{st.meta}</p> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Part id="capacitor" className={s.partCapacitor} />
      <Part id="resistor" className={s.partResistor} />
    </section>
  );
}
