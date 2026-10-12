
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

const featuredUpcomingEvents = [
  { sig: "CRYPT", name: "Trust No Link" },
  { sig: "CONCRETE", name: "Titanic" },
  { sig: "CLUTCH", name: "Magnetic Grand Prix" },
  { sig: "CHARGE", name: "Power the Beacon" },
];

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
      {/* Current Event */}
      <Reveal className="h-full md:col-start-1 md:row-start-1">
        <article className={cardClass} aria-labelledby="current-event-title">
          <p className="festival-card-label mb-5 flex items-center gap-2 text-[10px] font-black tracking-[.16em] text-[#ff79bc]">
            <span
              className={`h-2 w-2 rounded-full ${
                snapshot?.current.length
                  ? "bg-[#65f0b5]"
                  : "bg-[#c4acd9]"
              }`}
              aria-hidden="true"
            />{" "}
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
                      ? "The carnival has opened"
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

      {/* Upcoming Events */}
      <Reveal delay={100} className="h-full md:col-start-1 md:row-start-2">
        <article className={cardClass} aria-labelledby="upcoming-event-title">
          <p className="festival-card-label mb-5 flex items-center gap-2 text-[10px] font-black tracking-[.16em] text-[#00e5ff]">
            <Clock3 size={14} aria-hidden="true" />
            Upcoming events
          </p>

          <h3
            id="upcoming-event-title"
            className="festival-heading text-[1.9rem] sm:text-4xl"
          >
            What’s happening at FeISTEval
          </h3>

          <div className="mt-5 space-y-3">
            {featuredUpcomingEvents.map((event, index) => (
              <div
                key={event.sig}
                className="flex items-center gap-4 border-t border-[#b68a40]/30 pt-4"
              >
                <span className="festival-heading w-8 shrink-0 text-xl text-[#00e5ff]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="festival-card-label text-[9px] font-black tracking-[.16em] text-[#ff79bc]">
                    {event.sig}
                  </p>

                  <h4 className="festival-heading mt-1 text-xl sm:text-2xl">
                    {event.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs font-bold text-[#c4acd9]">
            11–16 October 2026 · All times in IST
          </p>
        </article>
      </Reveal>
    </>
  );
}
