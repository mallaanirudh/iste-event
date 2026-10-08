"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import styles from "./event-navbar.module.css";

type Item = { label: string; href?: string; onSelect?: () => void };
type Action = Item & { external?: boolean; registrationDialog?: boolean };
type Props = {
  event: "charge" | "clutch" | "concrete" | "scotland-yard" | "catalyst";
  label: string;
  topHref: string;
  homeHref: string;
  items: Item[];
  action: Action;
  reserveSpace?: boolean;
  menuFooter?: ReactNode;
  onMenuChange?: (open: boolean) => void;
};

export function EventNavbar({
  event,
  label,
  topHref,
  homeHref,
  items,
  action,
  reserveSpace = true,
  menuFooter,
  onMenuChange,
}: Props) {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const callback = useRef(onMenuChange);
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    callback.current = onMenuChange;
  }, [onMenuChange]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      header.current?.setAttribute(
        "data-scrolled",
        String(window.scrollY > 50),
      );
      frame = 0;
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    queue();
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      window.removeEventListener("scroll", queue);
      cancelAnimationFrame(frame);
    };
  }, []);

  const sectionIds = items
    .filter((item) => item.href?.startsWith("#"))
    .map((item) => item.href!.slice(1))
    .join(" ");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    for (const id of sectionIds.split(" ").filter(Boolean)) {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const dismiss = () => {
      if (desktop.matches) menu.current?.close();
    };
    desktop.addEventListener("change", dismiss);
    return () => {
      desktop.removeEventListener("change", dismiss);
      callback.current?.(false);
    };
  }, []);

  const closeMenu = () => {
    if (!menu.current?.open) return;
    menu.current.close();
    setOpen(false);
    callback.current?.(false);
  };
  function openMenu() {
    if (!menu.current || menu.current.open) return;
    menu.current.showModal();
    setOpen(true);
    callback.current?.(true);
  }
  function renderItem(item: Item, mobile = false) {
    const classes = mobile ? styles.menuLink : styles.link;
    const select = () => {
      if (mobile) closeMenu();
      item.onSelect?.();
    };
    return item.href ? (
      <a
        key={item.label}
        className={classes}
        href={item.href}
        aria-current={item.href === `#${active}` ? "location" : undefined}
        onClick={select}
      >
        {item.label}
      </a>
    ) : (
      <button
        key={item.label}
        type="button"
        className={classes}
        onClick={select}
      >
        {item.label}
      </button>
    );
  }
  function renderAction(mobile = false) {
    const select = () => {
      if (mobile) closeMenu();
      action.onSelect?.();
    };
    const children = (
      <>
        {action.label}
        <ArrowUpRight size={16} aria-hidden="true" />
      </>
    );
    return action.href ? (
      <a
        className={styles.action}
        href={action.href}
        onClick={select}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noopener noreferrer" : undefined}
        data-register-open={action.registrationDialog ? "" : undefined}
        data-register-fallback={
          action.registrationDialog && !mobile ? "" : undefined
        }
        aria-haspopup={action.registrationDialog ? "dialog" : undefined}
      >
        {children}
      </a>
    ) : (
      <button className={styles.action} type="button" onClick={select}>
        {children}
      </button>
    );
  }

  return (
    <div className={styles.host} data-event-nav={event}>
      {reserveSpace && <div className={styles.space} aria-hidden="true" />}
      <header ref={header} className={styles.navbar} data-scrolled="false">
        <nav className={styles.inner} aria-label={`${label} navigation`}>
          <a
            href={topHref}
            className={styles.brand}
            aria-label={`ISTE ${label} back to top`}
          >
            <span className={styles.wordmark}>ISTE</span>
            <span className={styles.brandDetail}>
              <span title={label}>{label}</span>
              <span>FeISTEval · NITK</span>
            </span>
          </a>
          <div className={styles.links}>
            <a href={homeHref} className={styles.link}>
              FeISTEval
            </a>
            {items.map((item) => renderItem(item))}
          </div>
          <div className={styles.actions}>
            {renderAction()}
            <button
              className={styles.toggle}
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="dialog"
              onClick={openMenu}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>
      <dialog
        ref={menu}
        id={menuId}
        data-event-menu=""
        className={styles.menu}
        aria-labelledby={`${menuId}-title`}
        onClose={() => {
          setOpen(false);
          callback.current?.(false);
        }}
      >
        <div className={styles.menuTop}>
          <p id={`${menuId}-title`}>{label}</p>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            autoFocus
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav
          className={styles.menuLinks}
          aria-label={`${label} mobile navigation`}
        >
          <a href={homeHref} className={styles.menuLink} onClick={closeMenu}>
            Back to FeISTEval
          </a>
          {items.map((item) => renderItem(item, true))}
          {renderAction(true)}
        </nav>
        {menuFooter && <div className={styles.menuFooter}>{menuFooter}</div>}
      </dialog>
    </div>
  );
}
