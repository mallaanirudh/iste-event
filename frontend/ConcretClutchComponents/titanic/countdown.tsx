'use client'

import { useEffect, useState } from 'react'
import { EVENT_DATE_ISO } from '@/data/event-data'

const TARGET = new Date(EVENT_DATE_ISO).getTime()

function split(ms: number) {
  const clamped = Math.max(0, ms)
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped / 3_600_000) % 24),
    minutes: Math.floor((clamped / 60_000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  }
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = now === null ? null : split(TARGET - now)
  const departed = now !== null && TARGET - now <= 0
  const units: [string, number | undefined][] = [
    ['Days', parts?.days],
    ['Hours', parts?.hours],
    ['Mins', parts?.minutes],
    ['Secs', parts?.seconds],
  ]

  const dateLabel = new Date(EVENT_DATE_ISO).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-balance text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:tracking-[0.3em]">
        {departed ? 'The voyage is underway' : `Time until departure · ${dateLabel}`}
      </p>
      <div className="flex gap-2 sm:gap-3" role="timer" aria-live="off">
        {units.map(([label, value]) => (
          <div key={label} className="ink-border parchment-card flex w-16 flex-col items-center py-2 sm:w-20">
            <span className="font-mono text-2xl tabular-nums text-ink sm:text-3xl">
              {value === undefined ? '--' : String(value).padStart(2, '0')}
            </span>
            <span className="font-serif text-[10px] font-bold uppercase tracking-widest text-crimson sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
