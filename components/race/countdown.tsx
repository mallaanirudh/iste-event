'use client'

import { useEffect, useState } from 'react'

function getParts(target: number, now: number) {
  const diff = Math.max(0, target - now)
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

export function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const { done, units } = getParts(targetMs, now ?? targetMs)

  if (now !== null && done) {
    return (
      <p className="font-display text-3xl text-primary" role="status">
        LIGHTS OUT
      </p>
    )
  }

  return (
    <div className="flex items-stretch gap-1.5 sm:gap-2" role="timer" aria-live="off">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-stretch gap-1.5 sm:gap-2">
          <div className="flex min-w-14 flex-col items-center border border-border bg-background px-2 py-2 sm:min-w-18 sm:px-3">
            <span className="font-display text-2xl leading-none tabular sm:text-4xl">
              {now === null ? '--' : String(unit.value).padStart(2, '0')}
            </span>
            <span className="mt-1.5 text-[9px] tracking-[0.25em] text-muted-foreground">{unit.label}</span>
          </div>
          {i < units.length - 1 && (
            <span className="self-center font-display text-xl text-primary" aria-hidden>
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
