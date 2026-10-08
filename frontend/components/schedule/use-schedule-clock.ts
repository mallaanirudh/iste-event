"use client";
import { useEffect, useState } from "react";

/** Hydration-safe clock, paused in hidden tabs and refreshed immediately on return. */
export function useScheduleClock() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const update = () => setNow(Date.now());
    const resume = () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
      if (document.hidden) return;
      frame = requestAnimationFrame(update);
      timer = setInterval(update, 1000);
    };
    resume();
    document.addEventListener("visibilitychange", resume);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);
  return now;
}
