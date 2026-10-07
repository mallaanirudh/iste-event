"use client";

import { useEffect, useRef, useState } from "react";
import { Flag, Menu, X } from "lucide-react";
import { TALLY_FORM_URL } from "@/data/event";

const LINKS = [
  { href: "/", label: "FeISTEval" },
  { href: "#briefing", label: "Briefing" },
  { href: "#rounds", label: "Rounds" },
  { href: "#register", label: "Register" },
  { href: "#leaderboard", label: "Standings" },
  { href: "#pit-wall", label: "Pit Wall" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    const dismiss = (event: MouseEvent) => {
      if (
        open &&
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (open && event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    desktop.addEventListener("change", resize);
    document.addEventListener("click", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      desktop.removeEventListener("change", resize);
      document.removeEventListener("click", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className="sticky top-0 z-40 border-b-2 border-black bg-asphalt/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="skew-badge flex items-center border-2 border-black bg-crimson px-2 py-1">
            <Flag className="unskew size-4 text-white" aria-hidden="true" />
          </span>
          <span className="font-display text-xs tracking-wide text-white sm:text-sm">
            SIG<span className="text-crimson">:</span>CLUTCH
          </span>
        </a>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={TALLY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="skew-badge comic-shadow-sm inline-flex min-h-11 items-center border-2 border-black bg-comic px-3 py-1.5 transition-transform hover:-translate-y-0.5"
          >
            <span className="unskew block font-display text-xs text-black">
              REGISTER
            </span>
          </a>
          <button
            ref={toggle}
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="clutch-mobile-nav"
            onClick={() => setOpen(!open)}
            className="grid size-11 place-items-center border-2 border-cyan/40 text-cyan lg:hidden"
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="clutch-mobile-nav"
          aria-label="Mobile section navigation"
          className="absolute inset-x-0 top-full max-h-[70dvh] overflow-y-auto border-b-2 border-black bg-asphalt-2 px-4 py-3 shadow-xl lg:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center border-b border-white/10 px-2 font-mono text-sm text-white hover:text-cyan"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
