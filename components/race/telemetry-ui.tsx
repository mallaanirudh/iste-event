import { cn } from '@/lib/utils'
import type { EventStatus, RoundStatus } from '@/lib/race-data'

export function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string
  label: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] tracking-[0.25em] text-telemetry">
          {index} {'//'} {label}
        </p>
        <h2 className="mt-1 font-dela text-2xl uppercase leading-none text-balance sm:text-3xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

const eventStatusStyles: Record<EventStatus, string> = {
  PRACTICE: 'border-border bg-secondary text-muted-foreground',
  QUALIFYING: 'border-telemetry/40 bg-telemetry/10 text-telemetry',
  'RACE DAY': 'border-primary/50 bg-primary/15 text-primary',
}

export function EventStatusChip({ status }: { status: EventStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em]',
        eventStatusStyles[status],
      )}
    >
      {status === 'RACE DAY' && <span className="size-1.5 animate-pulse rounded-full bg-primary" aria-hidden />}
      {status}
    </span>
  )
}

const roundStatusStyles: Record<RoundStatus, string> = {
  COMPLETED: 'border-telemetry/40 text-telemetry',
  LIVE: 'border-primary bg-primary text-primary-foreground',
  UPCOMING: 'border-border text-muted-foreground',
}

export function RoundStatusChip({ status }: { status: RoundStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.15em]',
        roundStatusStyles[status],
      )}
    >
      {status === 'LIVE' && <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground" aria-hidden />}
      {status === 'COMPLETED' ? 'FINAL' : status}
    </span>
  )
}

const sectorStyles: Record<RoundStatus, string> = {
  COMPLETED: 'bg-telemetry/15 text-telemetry border-telemetry/30',
  LIVE: 'bg-primary/20 text-primary border-primary/50 animate-pulse',
  UPCOMING: 'bg-transparent text-muted-foreground border-border',
}

export function SectorChip({ number, status }: { number: number; status: RoundStatus }) {
  return (
    <span
      className={cn(
        'inline-flex min-w-9 items-center justify-center border px-1.5 py-0.5 text-[10px] font-semibold tabular',
        sectorStyles[status],
      )}
      title={`Round ${number}: ${status.toLowerCase()}`}
    >
      R{number}
    </span>
  )
}

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('relative border border-border bg-card', className)}>
      <span className="absolute left-0 top-0 h-px w-12 bg-primary" aria-hidden />
      <span className="absolute left-0 top-0 h-12 w-px bg-primary" aria-hidden />
      {children}
    </div>
  )
}
