import { festivalEvents } from "@/data/festival-schedule";
import { EventScheduleDetails } from "@/components/schedule/event-schedule-details";

export function FestivalCalendar() {
  return (
    <section
      id="festival-schedule"
      aria-labelledby="festival-schedule-title"
      className="relative z-10 mx-auto max-w-[1200px] scroll-mt-28 px-5 pb-16 sm:px-8"
    >
      <h2
        id="festival-schedule-title"
        className="festival-heading text-3xl text-[#fff5df]"
      >
        The festival calendar
      </h2>
      <p className="mt-2 text-sm font-semibold text-[#c4acd9]">
        11–16 October 2026 · All times in IST
      </p>
      <ol className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {festivalEvents.map((event) => (
          <li
            key={event.id}
            className="min-w-0 border-t border-[#b68a40]/40 pt-4"
          >
            <p className="text-[10px] font-extrabold tracking-wider text-[#e9cb80]">
              {event.sig === "ISTE"
                ? "ISTE event"
                : `Square One · ${event.sig}`}
            </p>
            <h3 className="festival-heading mt-2 text-xl">{event.name}</h3>
            <EventScheduleDetails
              eventId={event.id}
              className="mt-3 text-xs font-semibold leading-relaxed text-[#cfb9e0]"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
