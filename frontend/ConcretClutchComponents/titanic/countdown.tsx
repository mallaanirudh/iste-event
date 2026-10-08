"use client";

import { useScheduleClock } from "@/components/schedule/use-schedule-clock";
import { countdownValues, getEventTiming } from "@/data/festival-schedule";

export function Countdown() {
  const now = useScheduleClock();

  const timing = now === null ? null : getEventTiming("concrete", now);

  const departureTarget = new Date("2026-10-15T00:00:00+05:30").getTime();

  const target =
    timing?.status === "live"
      ? timing.current?.end
      : timing?.status === "complete"
        ? undefined
        : departureTarget;

  const values =
    now === null || target === undefined
      ? null
      : countdownValues(target - now);

  const units: [string, number | undefined][] = [
    ["Days", values?.[0]],
    ["Hours", values?.[1]],
    ["Mins", values?.[2]],
    ["Secs", values?.[3]],
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-balance text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:tracking-[0.3em]">
        {timing?.status === "complete"
          ? "The voyage has finished"
          : timing?.status === "live"
            ? "The voyage is underway · Time left"
            : "Time until departure"}
      </p>

      {timing?.status !== "complete" && (
        <div
          className="flex gap-2 sm:gap-3"
          role="timer"
          aria-live="off"
        >
          {units.map(([label, value]) => (
            <div
              key={label}
              className="ink-border parchment-card flex w-16 flex-col items-center py-2 sm:w-20"
            >
              <span className="font-mono text-2xl tabular-nums text-ink sm:text-3xl">
                {value === undefined
                  ? "--"
                  : String(value).padStart(2, "0")}
              </span>

              <span className="font-serif text-[10px] font-bold uppercase tracking-widest text-crimson sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}