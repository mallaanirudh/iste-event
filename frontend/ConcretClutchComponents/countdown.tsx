"use client";

import { useScheduleClock } from "@/components/schedule/use-schedule-clock";
import { countdownValues, getEventTiming } from "@/data/festival-schedule";

export function Countdown() {
  const now = useScheduleClock();
  const timing = now === null ? null : getEventTiming("clutch", now);
  const target = timing?.current?.end ?? timing?.next?.start;
  const values =
    now === null || target === undefined ? null : countdownValues(target - now);
  const remaining = values
    ? {
        units: values.map((value, index) => ({
          label: ["DAYS", "HRS", "MIN", "SEC"][index],
          value,
        })),
      }
    : null;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span
            className={
              timing?.status === "live"
                ? "absolute inline-flex size-full animate-ping rounded-full bg-crimson opacity-75 motion-reduce:animate-none"
                : "hidden"
            }
          />
          <span className="relative inline-flex size-2.5 rounded-full bg-crimson" />
        </span>
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
          {timing?.status === "complete"
            ? "THE GRAND PRIX HAS FINISHED"
            : timing?.status === "live"
              ? "RACE DAY IS LIVE · TIME LEFT"
              : "LIGHTS OUT IN"}
        </p>
      </div>
      {timing?.status !== "complete" && (
        <div
          className="grid grid-cols-4 gap-2 sm:gap-3"
          role="timer"
          aria-live="off"
        >
          {(
            remaining?.units ?? [
              { label: "DAYS", value: null },
              { label: "HRS", value: null },
              { label: "MIN", value: null },
              { label: "SEC", value: null },
            ]
          ).map((u) => (
            <div
              key={u.label}
              className="comic-shadow-sm flex flex-col items-center border-2 border-black bg-asphalt-2 px-2 py-3 sm:px-4"
            >
              <span className="font-mono text-[clamp(1.25rem,6vw,1.875rem)] font-bold tabular-nums text-cyan sm:text-4xl">
                {u.value === null ? "--" : String(u.value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-display text-[10px] tracking-widest text-comic sm:text-xs">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
