import { ArrowUpRight, Activity, Gauge, Radio, Users } from 'lucide-react'
import { TALLY_URL, getRaceMetrics } from '@/lib/race-data'
import { Countdown } from './countdown'

export function RaceHero() {
  const metrics = getRaceMetrics()
  const nextStart = metrics.nextRound
    ? new Date(metrics.nextRound.startsAt).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
      })
    : null

  const stats = [
    { label: 'TOTAL SIGS', value: String(metrics.totalSigs).padStart(2, '0'), icon: Gauge },
    { label: 'ACTIVE EVENTS', value: `${metrics.activeEvents}/${metrics.totalEvents}`, icon: Activity },
    { label: 'TEAMS ON GRID', value: String(metrics.totalTeams).padStart(2, '0'), icon: Users },
    { label: 'LEADERBOARD', value: metrics.liveRounds > 0 ? 'LIVE' : 'SYNCED', icon: Radio, live: metrics.liveRounds > 0 },
  ]

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-border">
      <div className="absolute -right-24 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-l from-primary/10 to-transparent" aria-hidden />
      <div className="absolute bottom-0 left-0 h-1 w-full bg-[repeating-linear-gradient(90deg,var(--primary)_0_24px,var(--foreground)_24px_48px)] opacity-80" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold tracking-[0.2em]">
          <span className="border border-telemetry/40 bg-telemetry/10 px-2 py-1 text-telemetry">SEASON 2026</span>
          <span className="border border-border px-2 py-1 text-muted-foreground">
            ROUNDS {metrics.completedRounds}/{metrics.totalRounds} COMPLETE
          </span>
        </div>

        <h1 id="hero-title" className="mt-5 font-dela text-4xl uppercase leading-[0.95] text-balance sm:text-6xl lg:text-7xl">
          Mega Event 2026
          <span className="mt-2 block text-2xl text-primary sm:text-4xl lg:text-5xl">
            {'// Grand Prix Edition'}
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {'Five SIGs. One championship. Track every round, every point and every overtake from the pit wall — live.'}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[11px] tracking-[0.25em] text-muted-foreground">
              NEXT LIGHTS OUT
              {metrics.nextEvent && metrics.nextRound && (
                <>
                  {' — '}
                  <span className="text-foreground">
                    {metrics.nextEvent.name.toUpperCase()} R{metrics.nextRound.number}
                  </span>
                  <span className="text-telemetry"> {'//'} {nextStart} IST</span>
                </>
              )}
            </p>
            <div className="mt-3">
              {metrics.nextRound ? (
                <Countdown target={metrics.nextRound.startsAt} />
              ) : (
                <p className="font-dela text-3xl text-primary">CHEQUERED FLAG</p>
              )}
            </div>
          </div>

          <a
            href={TALLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 font-dela text-sm uppercase tracking-wide text-primary-foreground transition-colors clip-angle hover:bg-[#ff3b26] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telemetry"
          >
            Register via Tally
            <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>

        <dl className="mt-10 grid grid-cols-2 border border-border bg-card/80 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center gap-3 px-4 py-4 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''} border-border`}
            >
              <stat.icon className={`size-4 shrink-0 ${stat.live ? 'text-primary' : 'text-telemetry'}`} aria-hidden />
              <div>
                <dt className="text-[10px] tracking-[0.2em] text-muted-foreground">{stat.label}</dt>
                <dd className={`mt-0.5 font-dela text-xl leading-none tabular ${stat.live ? 'text-primary' : ''}`}>
                  {stat.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
