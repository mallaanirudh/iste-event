'use client'

import { useState } from 'react'
import { events, sigs, type MegaEvent } from '@/data/race-data'
import { SigSelector } from './sig-selector'
import { EventGrid } from './event-grid'
import { StrategySheet } from './strategy-sheet'
import { Leaderboard } from './leaderboard'
import { SectionHeading } from './telemetry-ui'

function defaultRoundId(event: MegaEvent) {
  const live = event.rounds.find((r) => r.status === 'LIVE')
  const lastCompleted = event.rounds.filter((r) => r.status === 'COMPLETED').at(-1)
  return (live ?? lastCompleted ?? event.rounds[0]).id
}

export function RaceDashboard() {
  const [sigId, setSigId] = useState(sigs[0].id)
  const sigEvents = events.filter((e) => e.sigId === sigId)
  const [eventId, setEventId] = useState(sigEvents[0].id)
  const event = events.find((e) => e.id === eventId) ?? sigEvents[0]
  const [roundId, setRoundId] = useState(() => defaultRoundId(event))
  const round = event.rounds.find((r) => r.id === roundId) ?? event.rounds[0]

  const selectEvent = (id: string) => {
    const next = events.find((e) => e.id === id)
    if (!next) return
    setEventId(id)
    setRoundId(defaultRoundId(next))
  }

  const selectSig = (id: string) => {
    setSigId(id)
    const first = events.find((e) => e.sigId === id)
    if (first) selectEvent(first.id)
  }

  const activeSig = sigs.find((s) => s.id === sigId)!

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6">
      <section id="sigs" aria-labelledby="sigs-title" className="scroll-mt-20 space-y-5">
        <div id="sigs-title">
          <SectionHeading index="01" label="CONSTRUCTORS" title="Choose your SIG" />
        </div>
        <SigSelector sigs={sigs} selectedId={sigId} onSelect={selectSig} />
      </section>

      <section id="events" aria-label={`${activeSig.name} events`} className="scroll-mt-20 space-y-5">
        <SectionHeading index="02" label={`${activeSig.code} PADDOCK`} title={`${activeSig.name} Events`}>
          <p className="text-[11px] tracking-[0.15em] text-muted-foreground">
            {String(sigEvents.length).padStart(2, '0')} ON THE CALENDAR
          </p>
        </SectionHeading>
        <EventGrid events={sigEvents} selectedId={event.id} onSelect={selectEvent} />
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <section id="strategy" aria-label="Round details" className="scroll-mt-20 space-y-5 lg:col-span-5">
          <SectionHeading index="03" label="ROUND BRIEFING" title="Strategy" />
          <StrategySheet event={event} selectedRoundId={round.id} onSelectRound={setRoundId} />
        </section>
        <section id="standings" aria-label="Standings" className="scroll-mt-20 space-y-5 lg:col-span-7">
          <SectionHeading index="04" label="LIVE TIMING" title="Standings" />
          <Leaderboard event={event} round={round} onSelectRound={setRoundId} />
        </section>
      </div>
    </div>
  )
}
