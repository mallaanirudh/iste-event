import {
  formatEventDate,
  formatSessionTime,
  getFestivalEvent,
  type FestivalEventId,
} from "@/data/festival-schedule";

export function EventScheduleDetails({
  eventId,
  className = "",
}: {
  eventId: FestivalEventId;
  className?: string;
}) {
  const event = getFestivalEvent(eventId);
  return (
    <div className={className}>
      <ul className="mt-1 space-y-1">
        {event.sessions.map((session) => (
          <li key={session.startsAt}>
            {event.sessions.length > 1 && <span>{session.label}: </span>}
            <time dateTime={session.startsAt}>
              {formatSessionTime(session)}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
