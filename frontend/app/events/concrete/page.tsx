import { Briefing } from '../../../ConcretClutchComponents/briefing'
import { Hero } from '../../../ConcretClutchComponents/hero'
import { Leaderboard } from '../../../ConcretClutchComponents/leaderboard'
import { PitWall, PitWallBar } from '../../../ConcretClutchComponents/pit-wall'
import { Registration } from '../../../ConcretClutchComponents/registration'
import { Rounds } from '../../../ConcretClutchComponents/rounds'
import { SectionHeading } from '../../../ConcretClutchComponents/section-heading'
import { SiteNav } from '../../../ConcretClutchComponents/site-nav'
import { SpeedCanvas } from '../../../ConcretClutchComponents/speed-canvas'

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