"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACTS, EVENT, GROUND, HERO } from "../_data/content";
import { useGame } from "../_lib/game";
import { gsap, MQ } from "../_lib/gsap";
import { useMagnet } from "../_lib/useMagnet";
import s from "./nav.module.css";

const LINKS = [
  { href: "#briefing", label: "Briefing" },
  { href: "#workbench", label: "Workbench" },
  { href: "#contacts", label: "Contacts" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const soundBtn = useRef<HTMLButtonElement>(null);
  const { sound, toggleSound } = useGame();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  useMagnet(soundBtn, { radius: 80, strength: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    // The browser may restore the scroll position after mount without firing a scroll event.
    const late = window.setTimeout(onScroll, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(late);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = useCallback(() => {
    const el = sheet.current;
    const btn = menuBtn.current;
    const done = () => {
      setOpen(false);
      btn?.focus();
    };
    if (!el || !btn || window.matchMedia(MQ.reduce).matches) return done();
    const r = btn.getBoundingClientRect();
    const at = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    gsap.to(el, { clipPath: `circle(24px at ${at})`, duration: 0.4, ease: "expo.in", onComplete: done });
  }, []);

  // Open: expand the sheet from the button, trap focus, close on Esc.
  useEffect(() => {
    if (!open) return;
    const el = sheet.current!;
    const btn = menuBtn.current!;
    const r = btn.getBoundingClientRect();
    const at = `${r.left + r.width / 2}px ${r.top + r.height / 2}px`;
    if (!window.matchMedia(MQ.reduce).matches) {
      gsap.fromTo(
        el,
        { clipPath: `circle(24px at ${at})` },
        { clipPath: `circle(150% at ${at})`, duration: 0.6, ease: "expo.out" },
      );
    }
    const focusables = () => Array.from(el.querySelectorAll<HTMLElement>("a, button"));
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Page scroll is locked by CSS while the sheet is in the DOM (nav.module.css).
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <header className={`${s.nav} ${scrolled ? s.scrolled : ""}`}>
        <div className={s.inner}>
          <a href="#top" className={s.brand} aria-label="ISTE Charge at Square One, back to the top">
            <span className={s.plaque}>
              <Image
                src="/events/square1_charge/iste-nitk-transparent.png"
                alt="ISTE NITK"
                width={359}
                height={320}
                sizes="44px"
                className={s.logo}
                loading="eager"
              />
            </span>
            <span className={s.wordmark}>{HERO.kicker}</span>
          </a>

          <nav className={s.links} aria-label="Sections">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className={s.link}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={s.actions}>
            <button
              ref={soundBtn}
              type="button"
              className={s.sound}
              aria-pressed={sound}
              onClick={toggleSound}
              data-cursor={sound ? "Mute" : "Sound"}
            >
              <SpeakerIcon on={sound} />
              <span className={s.soundLabel}>{sound ? "Sound on" : "Sound off"}</span>
            </button>
            <button
              ref={menuBtn}
              type="button"
              className={s.menuBtn}
              aria-expanded={open}
              aria-controls="ptb-menu"
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Outside the header: its backdrop-filter would trap a fixed child. */}
      {open ? (
        <div ref={sheet} id="ptb-menu" className={s.sheet} role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className={s.closeBtn} onClick={() => close()}>
            Close
          </button>
          <ul className={s.sheetLinks}>
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={s.sheetLink}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={s.sheetFoot}>
            <p className={s.sheetWhen}>
              {EVENT.dateLabel}, {EVENT.timeLabel}, {EVENT.venue}.
            </p>
            <ul className={s.sheetContacts} aria-label={GROUND.contactsTitle}>
              {CONTACTS.map((p) => (
                <li key={p.tel}>
                  <span>{p.name}</span>
                  <a className={s.sheetPhone} href={`tel:${p.tel}`}>
                    {p.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** A pixel speaker, with sound waves when on and a cross when muted. */
function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg className={s.speaker} viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true" fill="currentColor">
      <path d="M1 4h2v4H1zM3 4h1v4H3zM4 3h1v6H4zM5 2h1v8H5z" />
      {on ? (
        <path d="M7 5h1v2H7zM8 3h1v1H8zM9 4h1v4H9zM8 8h1v1H8z" />
      ) : (
        <path d="M7 4h1v1H7zM10 4h1v1h-1zM8 5h2v2H8zM7 7h1v1H7zM10 7h1v1h-1z" />
      )}
    </svg>
  );
}
