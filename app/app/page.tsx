import { Briefing } from '@/components/briefing'
import { Hero } from '@/components/hero'
import { Leaderboard } from '@/components/leaderboard'
import { PitWall, PitWallBar } from '@/components/pit-wall'
import { Registration } from '@/components/registration'
import { Rounds } from '@/components/rounds'
import { SectionHeading } from '@/components/section-heading'
import { SiteNav } from '@/components/site-nav'
import { SpeedCanvas } from '@/components/speed-canvas'

export default function Page() {
  return (
    <>
      <SpeedCanvas />
      <SiteNav />
      <main>
        <Hero />
        <Briefing />
        <Rounds />
        <Registration />
        <section id="leaderboard" aria-labelledby="leaderboard-title" className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading id="leaderboard-title" kicker="04 // LIVE STANDINGS" title="LEADERBOARD" />
          <Leaderboard />
        </section>
      </main>
      <PitWall />
      <PitWallBar />
    </>
  )
}
