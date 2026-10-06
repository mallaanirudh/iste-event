import { Clock, PencilRuler, Trophy, Users } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const ROUNDS = [
  {
    number: '01',
    title: 'IDEATION & DESIGNING',
    icon: PencilRuler,
    accent: 'bg-cyan',
    meta: [
      { icon: Clock, text: '30 MINS' },
      { icon: Users, text: '30 TEAMS' },
    ],
    points: ['Car stability on the track', 'No tilt — stays level under force', 'Magnetic propulsion setup'],
  },
  {
    number: '02',
    title: 'THE GRAND PRIX',
    icon: Trophy,
    accent: 'bg-crimson',
    meta: [
      { icon: Clock, text: '1 HOUR' },
      { icon: Trophy, text: 'KNOCKOUT' },
    ],
    points: ['Head-to-head elimination races', 'Fastest cars advance each heat', 'Final Lap decides the champion'],
  },
]

export function Rounds() {
  return (
    <section id="rounds" aria-labelledby="rounds-title" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading id="rounds-title" kicker="02 // ROUND-BY-ROUND DISPATCH" title="RACE WEEKEND" />
      <ol className="grid gap-6 md:grid-cols-2">
        {ROUNDS.map((r) => (
          <li
            key={r.number}
            className="comic-shadow relative flex flex-col overflow-hidden border-[3px] border-black bg-asphalt-2/95"
          >
            <div className={`relative flex items-center justify-between border-b-[3px] border-black px-5 py-4 ${r.accent}`}>
              <div aria-hidden="true" className="halftone absolute inset-0 text-black/20" />
              <span className="relative font-display text-sm text-black">ROUND {r.number}</span>
              <r.icon className="relative size-6 text-black" aria-hidden="true" />
            </div>
            <div className="flex flex-1 flex-col gap-5 p-6">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="font-display text-6xl leading-none text-transparent [-webkit-text-stroke:2px_#FFD000]"
                >
                  {r.number}
                </span>
                <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">{r.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {r.meta.map((m) => (
                  <span
                    key={m.text}
                    className="inline-flex items-center gap-1.5 border-2 border-black bg-asphalt-3 px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-comic"
                  >
                    <m.icon className="size-3.5" aria-hidden="true" />
                    {m.text}
                  </span>
                ))}
              </div>
              <ul className="flex flex-col gap-2.5">
                {r.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-mono text-sm text-white/90">
                    <span aria-hidden="true" className="h-0.5 w-5 shrink-0 bg-cyan" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
