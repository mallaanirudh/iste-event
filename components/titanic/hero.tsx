import { Anchor, Coins, Ship, Waves } from 'lucide-react'
import { PlankSign } from './plank-sign'
import { Countdown } from './countdown'
import { WaxSealButton } from './section-heading'

const QUICK_INFO = [
  { icon: Ship, label: '3 Action-Packed Rounds' },
  { icon: Coins, label: 'Virtual Cash Economy' },
  { icon: Waves, label: 'Floating Load Test' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center px-4 pb-16">
      <PlankSign />

      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-ink md:text-base">
          {'SIG: Concrete // Maiden Voyage Challenge'}
        </p>
        <p className="ink-border-soft inline-flex items-center gap-2 bg-crimson px-4 py-1.5 font-serif text-xs font-bold uppercase tracking-widest text-parchment md:text-sm">
          <Anchor className="size-4" aria-hidden="true" />
          Exclusively for B.Tech 1st Years
        </p>
      </div>

      <ul className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {QUICK_INFO.map(({ icon: Icon, label }) => (
          <li key={label} className="ink-border parchment-card flex items-center justify-center gap-2 px-4 py-3">
            <Icon className="size-5 text-ocean" aria-hidden="true" />
            <span className="font-mono text-sm uppercase text-ink">{label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Countdown />
      </div>

      <div className="mt-10">
        <WaxSealButton href="#register">Register Team (Captain Only)</WaxSealButton>
      </div>
    </section>
  )
}
