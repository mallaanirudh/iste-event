"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Ticket, X } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "arena", label: "The Arena" },
  { id: "chambers", label: "The Chambers" },
] as const;

export function FestivalNavbar({
  onLeaderboard,
}: {
  onLeaderboard: () => void;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      headerRef.current?.setAttribute(
        "data-scrolled",
        String(window.scrollY > 50),
      );
      frame = 0;
    };
    const queueUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      window.removeEventListener("scroll", queueUpdate);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (menuOpen && menu && !menu.open) menu.showModal();
    if (!menuOpen && menu?.open) menu.close();
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => {
      if (desktop.matches && menuRef.current?.open) {
        menuRef.current.close();
        headerRef.current
          ?.querySelector<HTMLAnchorElement>(".festival-navbar-links a")
          ?.focus({ preventScroll: true });
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function closeMenu() {
    menuRef.current?.close();
    setMenuOpen(false);
  }

  function showLeaderboard() {
    closeMenu();
    onLeaderboard();
  }

  return (
    <>
      <div className="festival-nav-space" aria-hidden="true" />
      <header ref={headerRef} className="festival-navbar" data-scrolled="false">
        <nav className="festival-navbar-inner" aria-label="Main navigation">
          <a
            className="festival-navbar-brand"
            href="#home"
            aria-label="ISTE FeISTEval home"
          >
            <span className="festival-navbar-wordmark">ISTE</span>
            <span className="festival-navbar-brand-detail">
              <span>FeISTEval</span>
              <span>NITK SURATHKAL</span>
            </span>
          </a>
          <div className="festival-nav-spacer-left" aria-hidden="true" />
          <div className="festival-navbar-links">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
            <button
              className="festival-text-button"
              type="button"
              onClick={onLeaderboard}
              aria-haspopup="dialog"
            >
              Leaderboard
            </button>
            <a className="festival-navbar-ticket" href="#chambers">
              <Ticket size={16} aria-hidden="true" /> Enter Carnival
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="festival-nav-spacer-right" aria-hidden="true" />
          <button
            className="festival-navbar-toggle"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="festival-mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={25} aria-hidden="true" />
          </button>
        </nav>
      </header>
      <dialog
        ref={menuRef}
        id="festival-mobile-menu"
        className="festival-mobile-menu"
        aria-labelledby="festival-menu-title"
        onClose={() => {
          setMenuOpen(false);
        }}
      >
        <div className="festival-mobile-menu-top">
          <p id="festival-menu-title">
            Fe<span>ISTE</span>val
          </p>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            autoFocus
          >
            <X size={25} aria-hidden="true" />
          </button>
        </div>
        <nav
          className="festival-mobile-menu-links"
          aria-label="Mobile navigation"
        >
          {sections.map(({ id, label }, index) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={closeMenu}
              aria-current={activeSection === id ? "location" : undefined}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {label}
            </a>
          ))}
          <button
            className="festival-text-button"
            type="button"
            onClick={showLeaderboard}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">04</span>Leaderboard
          </button>
          <a
            className="festival-mobile-ticket"
            href="#chambers"
            onClick={closeMenu}
          >
            Enter Carnival <ArrowUpRight size={21} aria-hidden="true" />
          </a>
        </nav>
        <p className="festival-mobile-menu-footer">
          SIX CHAMBERS. ONE SHARED CURIOSITY.
        </p>
      </dialog>
    </>
  );
}
