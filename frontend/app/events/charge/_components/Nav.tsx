"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACTS, EVENT, GROUND, HERO } from "../_data/content";
import { gsap, MQ } from "../_lib/gsap";
import s from "./nav.module.css";

const LINKS = [
  { href: "#briefing", label: "Briefing" },
  { href: "#workbench", label: "Workbench" },
  { href: "#contacts", label: "Contacts" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

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
                src="/events/square1_charge/iste-nitk-official.png"
                alt="ISTE NITK"
                width={372}
                height={328}
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

