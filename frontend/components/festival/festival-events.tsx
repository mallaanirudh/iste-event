"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import {
  countdownValues,
  formatEventDate,
  formatSessionTime,
  getFestivalSnapshot,
  type FestivalSlot,
} from "@/data/festival-schedule";
import { useScheduleClock } from "@/components/schedule/use-schedule-clock";
import { chambers, type Chamber } from "./chamber-data";
import { Reveal } from "./festival-motion";

const cardClass =
  "festival-card festival-noticeboard relative h-full rounded-sm border-2 border-[#b68a40] bg-[#28163e] p-6 sm:p-8";

function EventAction({
  slot,
  onPreview,
}: {
  slot: FestivalSlot;
  onPreview: (chamber: Chamber) => void;
}) {
  const className =
    "festival-text-button mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-extrabold text-[#00e5ff]";
  return slot.event.href ? (
    <Link href={slot.event.href} prefetch={false} className={className}>
      Event details <ArrowUpRight size={15} aria-hidden="true" />
    </Link>
  ) : (
    <button
      type="button"
      className={className}
      onClick={() =>
        onPreview(
          chambers.find((chamber) => chamber.id === slot.event.chamberId)!,
        )
      }
    >
      Event details <ArrowUpRight size={15} aria-hidden="true" />
    </button>
  );
}

function SessionDetails({ slot }: { slot: FestivalSlot }) {
  return (
    <div className="mt-4 space-y-2 text-xs font-semibold leading-relaxed text-[#cfb9e0]">
      {slot.event.sessions.length > 1 && (
        <p className="font-bold text-[#e9cb80]">{slot.session.label}</p>
      )}
      <p className="flex items-start gap-2">
        <CalendarDays
          size={14}
          className="mt-0.5 shrink-0 text-[#00e5ff]"
          aria-hidden="true"
        />
        <time dateTime={slot.session.startsAt}>
          {formatEventDate(slot.event)}
        </time>
      </p>
      <p className="flex items-start gap-2">
        <Clock3
          size={14}
          className="mt-0.5 shrink-0 text-[#00e5ff]"
          aria-hidden="true"
        />
        <span>{formatSessionTime(slot.session)}</span>
      </p>
    </div>
  );
}

export function FestivalEventCards({
  onPreview,
}: {
  onPreview: (chamber: Chamber) => void;
}) {
  const now = useScheduleClock();
  const snapshot = now === null ? null : getFestivalSnapshot(now);
  const next = snapshot?.next;
  const values =
    now !== null && next
      ? countdownValues(next.start - now)
      : [null, null, null, null];

  return (
    <>
      <Reveal className="h-full md:col-start-1 md:row-start-1">
        <article className={cardClass} aria-labelledby="current-event-title">
          <p className="festival-card-label mb-5 flex items-center gap-2 text-[10px] font-black tracking-[.16em] text-[#ff79bc]">
            <span
              className={`h-2 w-2 rounded-full ${snapshot?.current.length ? "bg-[#65f0b5]" : "bg-[#c4acd9]"}`}
              aria-hidden="true"
            />{" "}
            Current event
            {!!snapshot?.current.length && (
              <span className="ml-auto text-[#65f0b5]">Live now</span>
            )}
          </p>
          {snapshot?.current.length ? (
            snapshot.current.map((slot, index) => (
              <div
                key={slot.session.startsAt}
                className={
                  index ? "mt-6 border-t border-[#b68a40]/30 pt-5" : ""
                }
              >
                <h3
                  id={index === 0 ? "current-event-title" : undefined}
                  className="festival-heading text-[2rem] sm:text-4xl"
                >
                  {slot.event.name}
                </h3>
                <p className="festival-description mt-3 text-sm font-semibold leading-relaxed text-[#cfb9e0]">
                  {slot.event.description}
                </p>
                <SessionDetails slot={slot} />
                <EventAction slot={slot} onPreview={onPreview} />
              </div>
            ))
          ) : (
            <>
              <h3
                id="current-event-title"
                className="festival-heading text-[2rem] sm:text-4xl"
              >
                {!snapshot
                  ? "Checking the schedule…"
                  : snapshot.phase === "complete"
                    ? "That’s a wrap!"
                    : snapshot.phase === "before"
                      ? "The carnival opens soon"
                      : "No event live right now"}
              </h3>
              <p className="festival-description mt-3 text-sm font-semibold leading-relaxed text-[#cfb9e0]">
                {snapshot?.phase === "complete"
                  ? "All scheduled FeISTEval events have finished. Explore the chambers and check the standings."
                  : "The next scheduled session is shown below. Breaks between rounds are part of the programme."}
              </p>
              <p className="mt-5 text-xs font-bold text-[#c4acd9]">
                All times are in IST · 11–16 October 2026
              </p>
            </>
          )}
        </article>
      </Reveal>
      <Reveal delay={100} className="h-full md:col-start-1 md:row-start-2">
        <article className={cardClass} aria-labelledby="upcoming-event-title">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="festival-card-label flex items-center gap-2 text-[10px] font-black tracking-[.16em] text-[#00e5ff]">
              <Clock3 size={14} aria-hidden="true" /> Upcoming event
            </p>
            {next && (
              <span className="festival-card-label text-[10px] font-bold text-[#c4acd9]">
                {next.event.sig === "ISTE"
                  ? "ISTE event"
                  : `SIG: ${next.event.sig}`}
              </span>
            )}
          </div>
          <h3
            id="upcoming-event-title"
            className="festival-heading text-[1.9rem] sm:text-4xl"
          >
            {next
              ? next.event.name
              : snapshot?.current.length
                ? "Final event underway"
                : snapshot
                  ? "All events completed"
                  : "Checking the next session…"}
          </h3>
          {next ? (
            <>
              <p className="festival-description mt-2 text-sm font-semibold text-[#cfb9e0]">
                {next.event.description}
              </p>
              <SessionDetails slot={next} />
              <div
                className="mt-5 grid max-w-sm grid-cols-4 gap-2"
                role="timer"
                aria-live="off"
                aria-label={`Time until ${next.event.name}, ${next.session.label}`}
              >
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="festival-countdown-cell festival-heading rounded-lg border-2 border-[#00e5ff]/40 bg-[#1c0d30] py-2 text-3xl tracking-[.08em] text-[#00e5ff] sm:text-4xl">
                      {value === null ? "--" : String(value).padStart(2, "0")}
                    </div>
                    <p className="mt-2 text-[9px] font-black tracking-[.16em] text-[#c4acd9]">
                      {["DAYS", "HOURS", "MINS", "SECS"][index]}
                    </p>
                  </div>
                ))}
              </div>
              <EventAction slot={next} onPreview={onPreview} />
            </>
          ) : (
            <p className="mt-3 text-sm text-[#cfb9e0]">
              {snapshot?.current.length
                ? "This is the final scheduled session of FeISTEval."
                : snapshot
                  ? "There are no more sessions in the published schedule."
                  : "Dates and round timings are listed in the festival calendar."}
            </p>
          )}
        </article>
      </Reveal>
    </>
  );
}
