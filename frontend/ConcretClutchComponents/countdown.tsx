'use client'

import { useEffect, useState } from 'react'
import { EVENT_START_ISO } from '@/data/event'

const TARGET = new Date(EVENT_START_ISO).getTime()

function getRemaining(now: number) {
  const diff = Math.max(TARGET - now, 0)
  return {
    done: diff === 0,
    units: [
      { label: 'DAYS', value: Math.floor(diff / 86_400_000) },
      { label: 'HRS', value: Math.floor((diff / 3_600_000) % 24) },
      { label: 'MIN', value: Math.floor((diff / 60_000) % 60) },
      { label: 'SEC', value: Math.floor((diff / 1000) % 60) },
    ],
  }
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = now === null ? null : getRemaining(now)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-crimson opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2.5 rounded-full bg-crimson" />
        </span>
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
          {remaining?.done ? 'LIGHTS OUT — RACE DAY IS LIVE' : 'LIGHTS OUT IN'}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-live="off">
        {(remaining?.units ?? [
          { label: 'DAYS', value: null },
          { label: 'HRS', value: null },
          { label: 'MIN', value: null },
          { label: 'SEC', value: null },
        ]).map((u) => (
          <div
            key={u.label}
            className="comic-shadow-sm flex flex-col items-center border-2 border-black bg-asphalt-2 px-2 py-3 sm:px-4"
          >
            <span className="font-mono text-3xl font-bold tabular-nums text-cyan sm:text-5xl">
              {u.value === null ? '--' : String(u.value).padStart(2, '0')}
            </span>
            <span className="mt-1 font-display text-[10px] tracking-widest text-comic sm:text-xs">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
