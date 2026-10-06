"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { BRIEFING } from "../_data/content";
import { useLenis } from "../_lib/lenis";
import { Ticket, type RegistrationWindow } from "./Ticket";
import s from "./dialog.module.css";

/** Class on <html> that locks page scroll while the dialog is open. */
const LOCK = "ptb-dialog-open";

const FOCUSABLE = "a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex='-1'])";

/**
 * The register dialog. Any link marked `data-register-open` opens it instead of
 * jumping to #register; without JavaScript those links still land on the ground-floor ticket.
 */
export function RegisterDialog({ registration }: { registration: RegistrationWindow }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;

    const onClick = (e: globalThis.MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-register-open]");
      if (!link || typeof d.showModal !== "function" || d.open) return;
      e.preventDefault();
      trigger.current = link;
      setMounted(true);
      d.showModal();
      // Scroll lock (see dialog.module.css): set here, cleared only by the close event below.
      document.documentElement.classList.add(LOCK);
      lenis?.stop();
    };

    const onClose = () => {
      document.documentElement.classList.remove(LOCK);
      lenis?.start();
      const back = trigger.current;
      // The trigger may have gone (the mobile menu closes behind the dialog).
      const target =
        back && back.isConnected && back.offsetParent !== null
          ? back
          : document.querySelector<HTMLElement>("[data-register-fallback]");
      target?.focus({ preventScroll: true });
    };

    // Capture phase, so this runs before the page's smooth-scroll anchor handler.
    document.addEventListener("click", onClick, true);
    d.addEventListener("close", onClose);
    return () => {
      document.removeEventListener("click", onClick, true);
      d.removeEventListener("close", onClose);
      // Re-run (Lenis arriving) while open keeps the lock; on unmount :has(.dialog) stops matching.
      if (!d.open) document.documentElement.classList.remove(LOCK);
    };
  }, [lenis]);

  const close = () => dialog.current?.close();

  // A click on the backdrop lands on the <dialog> itself, outside the panel.
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  // showModal() already makes the page inert; this keeps Tab cycling inside the panel.
  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
      (el) => el.offsetParent !== null,
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      ref={dialog}
      className={s.dialog}
      aria-labelledby="register-dialog-title"
      onClick={onBackdrop}
      onKeyDown={onKeyDown}
    >
      <div className={s.panel}>
        <div className={s.head}>
          <h2 id="register-dialog-title" className={s.title}>
            Register your team
          </h2>
          <button type="button" className={s.close} onClick={close}>
            Close
          </button>
        </div>
        <p className={s.lede}>{BRIEFING.signupNote}</p>
        <Ticket variant="dialog" registration={registration} showForm={mounted} />
      </div>
    </dialog>
  );
}
