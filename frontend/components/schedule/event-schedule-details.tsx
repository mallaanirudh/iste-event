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
  const sessions = event?.sessions ?? [];

  if (!sessions.length) {
    return (
      <div className={className}>
        <p className="mt-1 text-sm text-neutral-400">Schedule to be announced</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ul className="mt-1 space-y-1">
        {sessions.map((session) => (
          <li key={session.startsAt}>
            {sessions.length > 1 && <span>{session.label}: </span>}
            <time dateTime={session.startsAt}>
              {formatSessionTime(session)}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}