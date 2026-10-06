"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import s from "./live.module.css";

/** How often an open page re-asks the server for fresh scores. */
const INTERVAL_MS = 30_000;

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

/**
 * Keeps the leaderboard live during the event. Every 30 seconds, while the tab is
 * visible, it calls router.refresh(): the server re-renders this route (its fetches
 * are cached for at most 15 seconds) and React merges the new scores in place,
 * keeping scroll position and client state. Hidden tabs stop polling and catch up
 * as soon as they are shown again.
 */
export function LiveRefresh({ className }: { className?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [updated, setUpdated] = useState<number | null>(null);
  const lastRefresh = useRef(0);
  const wasPending = useRef(false);

  // The page itself was rendered with fresh data, so mount counts as the first update.
  useEffect(() => {
    lastRefresh.current = Date.now();
    setUpdated(lastRefresh.current);
  }, []);

  // A refresh has finished once its transition settles.
  useEffect(() => {
    if (wasPending.current && !pending) {
      setUpdated(Date.now());
    }
    wasPending.current = pending;
  }, [pending]);

  useEffect(() => {
    let timer = 0;

    const refresh = () => {
      lastRefresh.current = Date.now();
      startTransition(() => router.refresh());
    };

    const schedule = () => {
      window.clearTimeout(timer);
      if (document.visibilityState !== "visible") return;
      const wait = Math.max(0, INTERVAL_MS - (Date.now() - lastRefresh.current));
      timer = window.setTimeout(() => {
        refresh();
        schedule();
      }, wait);
    };

    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [router]);

  return (
    <p className={`${s.live} ${className ?? ""}`}>
      <span className={`${s.dot} ${pending ? s.busy : ""}`} aria-hidden="true" />
      {updated === null ? "Live" : `Live, updated ${timeFmt.format(updated)}`}
    </p>
  );
}
