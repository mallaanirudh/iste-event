import { OceanBackground } from '@/components/titanic/ocean-background'
import { Hero } from '@/components/titanic/hero'
import { Storyline } from '@/components/titanic/storyline'
import { Rounds } from '@/components/titanic/rounds'
import { Registration } from '@/components/titanic/registration'
import { Leaderboard } from '@/components/titanic/leaderboard'
import { CaptainsLog } from '@/components/titanic/captains-log'

export default function Page() {
  return (
    <>
      <OceanBackground />
      <main className="relative">
        <Hero />
        <Storyline />
        <Rounds />
        <Registration />
        <Leaderboard />
      </main>
      <CaptainsLog />
    </>
  )
}
