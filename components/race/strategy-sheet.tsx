import { ChevronDown, Clock, ListChecks, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { MegaEvent } from '@/lib/race-data'
import { Panel, RoundStatusChip } from './telemetry-ui'

function formatStart(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  })
}

export function StrategySheet({
  event,
  selectedRoundId,
  onSelectRound,
}: {
  event: MegaEvent
  selectedRoundId: string
  onSelectRound: (id: string) => void
}) {
  return (
    <Panel className="h-full">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground">PIT-WALL STRATEGY SHEET</p>
          <h3 className="mt-1 font-display text-lg uppercase leading-tight">{event.name}</h3>
        </div>
        <span className="font-display text-3xl leading-none text-border tabular" aria-hidden>
          {event.code}
        </span>
      </div>

      <ol className="divide-y divide-border">
        {event.rounds.map((round) => {
          const open = round.id === selectedRoundId
          const panelId = `round-panel-${round.id}`
          return (
            <li key={round.id}>
              <h4>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => onSelectRound(round.id)}
                  className={cn(
                    'flex w-full items-center gap-4 px-5 py-4 text-left transition-colors',
                    open ? 'bg-secondary' : 'hover:bg-secondary/60',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center font-display text-base clip-angle-sm',
                      open ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground',
                    )}
                  >
                    R{round.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-sm uppercase">{round.name}</span>
                    <span className="mt-1 block text-[11px] text-muted-foreground tabular">
                      {formatStart(round.startsAt)} IST
                    </span>
                  </span>
                  <RoundStatusChip status={round.status} />
                  <ChevronDown
                    className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180 text-telemetry')}
                    aria-hidden
                  />
                </button>
              </h4>

              {open && (
                <div id={panelId} className="space-y-4 border-l-2 border-primary bg-background/40 px-5 py-5">
                  <p className="text-sm leading-relaxed text-pretty">{round.description}</p>

                  <dl className="grid grid-cols-2 gap-2">
                    <div className="border border-border bg-card px-3 py-2">
                      <dt className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-muted-foreground">
                        <Trophy className="size-3 text-telemetry" aria-hidden /> MAX POINTS
                      </dt>
                      <dd className="mt-1 font-display text-xl tabular">{round.maxPoints}</dd>
                    </div>
                    <div className="border border-border bg-card px-3 py-2">
                      <dt className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-muted-foreground">
                        <Clock className="size-3 text-telemetry" aria-hidden /> STINT
                      </dt>
                      <dd className="mt-1 font-display text-xl tabular">{round.duration}</dd>
                    </div>
                  </dl>

                  <div>
                    <p className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-muted-foreground">
                      <ListChecks className="size-3 text-primary" aria-hidden /> REGULATIONS
                    </p>
                    <ol className="mt-2 space-y-2">
                      {round.rules.map((rule, i) => (
                        <li key={rule} className="flex gap-3 text-xs leading-relaxed">
                          <span className="shrink-0 text-telemetry tabular">
                            {round.number}.{String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-muted-foreground">{rule}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ol>
    </Panel>
  )
}
