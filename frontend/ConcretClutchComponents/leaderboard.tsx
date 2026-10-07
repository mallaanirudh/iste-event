'use client'

import { useState } from 'react'
import { Medal } from 'lucide-react'
import { LEADERBOARD, type TeamStatus } from '@/data/event'

const TABS = [
  { id: 'r1', label: 'ROUND 1: DESIGN EVALUATION' },
  { id: 'r2', label: 'ROUND 2: RACE TIMINGS' },
] as const

type TabId = (typeof TABS)[number]['id']

const CREST = [
  { bg: 'bg-gold', label: 'P1' },
  { bg: 'bg-silver', label: 'P2' },
  { bg: 'bg-bronze', label: 'P3' },
]

const STATUS_STYLES: Record<TeamStatus, string> = {
  'ON GRID': 'bg-asphalt-3 text-white',
  QUALIFIED: 'bg-cyan text-black',
  ELIMINATED: 'bg-crimson text-white',
  CHAMPION: 'bg-comic text-black',
}

function BlankCell({ value }: { value: string | number | null }) {
  if (value !== null) {
    return <span className="font-mono text-sm font-bold tabular-nums text-cyan">{value}</span>
  }
  return (
    <span
      aria-label="Pending"
      className="block h-7 w-24 border-2 border-dashed border-white/25 bg-white/[0.03]"
    />
  )
}

export function Leaderboard() {
  const [tab, setTab] = useState<TabId>('r1')
  const allPending = LEADERBOARD.every((e) => e.round1Score === null && e.round2Timing === null)

  return (
    <div className="comic-shadow border-[3px] border-black bg-asphalt-2/95">
      <div role="tablist" aria-label="Leaderboard rounds" className="flex flex-col border-b-[3px] border-black sm:flex-row">
        {TABS.map((t, i) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={active}
              aria-controls="leaderboard-panel"
              onClick={() => setTab(t.id)}
              className={`flex-1 px-4 py-3.5 font-display text-xs transition-colors sm:text-sm ${
                i > 0 ? 'border-t-2 border-black sm:border-l-[3px] sm:border-t-0' : ''
              } ${active ? 'bg-crimson text-white' : 'bg-asphalt-3 text-muted-foreground hover:text-white'}`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {allPending && (
        <div className="flex items-center gap-3 border-b-2 border-black bg-comic px-4 py-2.5">
          <span aria-hidden="true" className="size-2 animate-pulse rounded-full bg-black motion-reduce:animate-none" />
          <p className="font-display text-xs text-black sm:text-sm">SCORES PENDING ORGANIZER EVALUATION</p>
        </div>
      )}

      <div id="leaderboard-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-black font-mono text-[11px] tracking-widest text-muted-foreground">
              <th scope="col" className="px-4 py-3">RANK</th>
              <th scope="col" className="px-4 py-3">TEAM NAME</th>
              <th scope="col" className="px-4 py-3">CAPTAIN</th>
              <th scope="col" className={`px-4 py-3 ${tab === 'r1' ? 'text-comic' : ''}`}>R1 SCORE</th>
              <th scope="col" className={`px-4 py-3 ${tab === 'r2' ? 'text-comic' : ''}`}>R2 TIMING</th>
              <th scope="col" className="px-4 py-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD.map((e, i) => {
              const crest = CREST[i]
              return (
                <tr
                  key={e.team}
                  className={`border-b border-white/10 transition-colors hover:bg-white/[0.03] ${crest ? 'bg-white/[0.02]' : ''}`}
                >
                  <td className="px-4 py-3">
                    {crest ? (
                      <span
                        className={`skew-badge comic-shadow-sm inline-flex items-center gap-1 border-2 border-black px-2 py-1 ${crest.bg}`}
                      >
                        <span className="unskew flex items-center gap-1 font-display text-xs text-black">
                          <Medal className="size-3.5" aria-hidden="true" />
                          {crest.label}
                        </span>
                      </span>
                    ) : (
                      <span className="pl-2 font-mono text-sm font-bold text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-display text-sm text-white">{e.team}</td>
                  <td className="px-4 py-3 font-mono text-sm text-white/80">{e.captain}</td>
                  <td className={`px-4 py-3 ${tab === 'r2' ? 'opacity-50' : ''}`}>
                    <BlankCell value={e.round1Score} />
                  </td>
                  <td className={`px-4 py-3 ${tab === 'r1' ? 'opacity-50' : ''}`}>
                    <BlankCell value={e.round2Timing} />
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block border-2 border-black px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider ${STATUS_STYLES[e.status]}`}
                    >
                      {e.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
