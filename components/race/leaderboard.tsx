'use client'

import { useState } from 'react'
import { Timer } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getOverallStandings,
  getRoundStandings,
  type MegaEvent,
  type Round,
  type StandingRow,
} from '@/lib/race-data'
import { Panel, RoundStatusChip } from './telemetry-ui'

type Mode = 'round' | 'overall'

const podium: Record<number, { text: string; bar: string; edge: string }> = {
  1: { text: 'text-podium-gold', bar: 'bg-podium-gold', edge: 'border-l-podium-gold bg-podium-gold/[0.06]' },
  2: { text: 'text-podium-silver', bar: 'bg-podium-silver', edge: 'border-l-podium-silver bg-podium-silver/[0.05]' },
  3: { text: 'text-podium-bronze', bar: 'bg-podium-bronze', edge: 'border-l-podium-bronze bg-podium-bronze/[0.06]' },
}

function Delta({ value }: { value: number | null }) {
  if (value === null || value === 0) {
    return <span className="text-muted-foreground">--</span>
  }
  const up = value > 0
  return (
    <span className={up ? 'text-track-green' : 'text-primary'}>
      <span aria-hidden>{up ? '▲' : '▼'}</span>
      <span className="sr-only">{up ? 'Up' : 'Down'}</span>
      {Math.abs(value)}
    </span>
  )
}

function TimingTower({ rows, scale }: { rows: StandingRow[]; scale: number }) {
  const leader = rows[0]?.points ?? 0
  return (
    <div role="table" aria-label="Standings" className="text-sm">
      <div role="row" className="grid grid-cols-[2.5rem_3.75rem_1fr_4rem_2.75rem] items-center gap-2 border-b border-border px-4 py-2 text-[10px] tracking-[0.2em] text-muted-foreground">
        <span role="columnheader">POS</span>
        <span role="columnheader">CODE</span>
        <span role="columnheader">TEAM</span>
        <span role="columnheader" className="text-right">PTS</span>
        <span role="columnheader" className="text-right">+/-</span>
      </div>
      {rows.map((row) => {
        const style = podium[row.rank]
        const gap = leader - row.points
        return (
          <div
            role="row"
            key={row.team.id}
            className={cn(
              'grid grid-cols-[2.5rem_3.75rem_1fr_4rem_2.75rem] items-center gap-2 border-b border-l-2 border-b-border px-4 py-2.5 transition-colors last:border-b-0 hover:bg-secondary/60',
              style ? style.edge : 'border-l-transparent',
            )}
          >
            <span role="cell" className={cn('font-display text-lg leading-none tabular', style?.text)}>
              {String(row.rank).padStart(2, '0')}
            </span>
            <span role="cell" className="flex items-center gap-2">
              <span className="h-5 w-1" style={{ backgroundColor: row.team.livery }} aria-hidden />
              <span className="font-semibold tracking-wider">{row.team.code}</span>
            </span>
            <span role="cell" className="min-w-0">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-xs">{row.team.name}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground tabular">
                  {row.rank === 1 ? 'LEADER' : `−${gap}`}
                </span>
              </span>
              <span className="mt-1.5 block h-1 w-full bg-background" aria-hidden>
                <span
                  className={cn('block h-full transition-[width] duration-700', style ? style.bar : 'bg-telemetry/70')}
                  style={{ width: `${scale > 0 ? (row.points / scale) * 100 : 0}%` }}
                />
              </span>
            </span>
            <span role="cell" className="text-right font-display text-base tabular">
              {row.points}
            </span>
            <span role="cell" className="text-right text-xs font-semibold tabular">
              <Delta value={row.delta} />
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function Leaderboard({
  event,
  round,
  onSelectRound,
}: {
  event: MegaEvent
  round: Round
  onSelectRound: (id: string) => void
}) {
  const [mode, setMode] = useState<Mode>('round')
  const roundRows = getRoundStandings(event, round)
  const overallRows = getOverallStandings()
  const rows = mode === 'round' ? roundRows : overallRows
  const scale = mode === 'round' ? round.maxPoints : (overallRows[0]?.points ?? 0)

  return (
    <Panel className="h-full">
      <div className="flex flex-col gap-4 border-b border-border px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground">TIMING TOWER</p>
            <h3 className="mt-1 font-display text-lg uppercase leading-tight">
              {mode === 'round' ? `${event.name} — R${round.number}` : 'Constructors’ Championship'}
            </h3>
          </div>
          {mode === 'round' ? (
            <RoundStatusChip status={round.status} />
          ) : (
            <span className="border border-telemetry/40 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.15em] text-telemetry">
              ALL EVENTS
            </span>
          )}
        </div>

        <div role="tablist" aria-label="Leaderboard view" className="grid grid-cols-2 border border-border bg-background p-1">
          {(
            [
              ['round', 'Round Leaderboard'],
              ['overall', 'Overall Mega Event'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={mode === value}
              onClick={() => setMode(value)}
              className={cn(
                'px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors',
                mode === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === 'round' && event.rounds.length > 1 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Select round">
            {event.rounds.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={r.id === round.id}
                onClick={() => onSelectRound(r.id)}
                className={cn(
                  'border px-2.5 py-1 text-[11px] font-semibold tabular transition-colors',
                  r.id === round.id
                    ? 'border-telemetry bg-telemetry text-telemetry-foreground'
                    : 'border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground',
                )}
              >
                R{r.number}
                {r.status === 'LIVE' && <span className="ml-1 text-primary">●</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {rows ? (
        <TimingTower rows={rows} scale={scale} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="flex gap-1.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="size-4 rounded-full border-2 border-primary/60 bg-primary/20" />
            ))}
          </div>
          <p className="font-display text-xl uppercase">Awaiting lights out</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Timer className="size-3.5" aria-hidden />
            Timing data publishes once R{round.number} goes green.
          </p>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[10px] tracking-[0.2em] text-muted-foreground">
        <span>{mode === 'round' ? `MAX ${round.maxPoints} PTS` : 'Δ VS. LAST COMPLETED ROUNDS'}</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-telemetry" aria-hidden />
          LIVE FEED
        </span>
      </div>
    </Panel>
  )
}
