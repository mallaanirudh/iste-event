import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MegaEvent } from '@/lib/race-data'
import { EventStatusChip, SectorChip } from './telemetry-ui'

export function EventGrid({
  events,
  selectedId,
  onSelect,
}: {
  events: MegaEvent[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        const active = event.id === selectedId
        const maxPoints = event.rounds.reduce((sum, r) => sum + r.maxPoints, 0)
        return (
          <li key={event.id}>
            <button
              type="button"
              onClick={() => onSelect(event.id)}
              aria-pressed={active}
              className={cn(
                'relative flex h-full w-full flex-col gap-4 border p-5 text-left transition-colors clip-angle',
                active
                  ? 'border-telemetry bg-telemetry/5'
                  : 'border-border bg-card hover:border-muted-foreground/40',
              )}
            >
              <span
                className={cn('absolute right-0 top-0 h-6 w-6 origin-top-right', active ? 'bg-telemetry' : 'bg-border')}
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                aria-hidden
              />
              <div className="flex items-start justify-between gap-3 pr-4">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground">{event.code}</span>
                <EventStatusChip status={event.status} />
              </div>
              <div>
                <h3 className="font-display text-lg uppercase leading-tight">{event.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{event.summary}</p>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                <div className="flex gap-1" aria-label="Round progress">
                  {event.rounds.map((round) => (
                    <SectorChip key={round.id} number={round.number} status={round.status} />
                  ))}
                </div>
                <span className="text-[11px] tabular text-muted-foreground">
                  MAX <span className="text-foreground">{maxPoints}</span> PTS
                </span>
              </div>
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <MapPin className="size-3 text-primary" aria-hidden />
                {event.venue}
              </p>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
