import { Hammer, ShoppingCart, Sparkles } from 'lucide-react'
import { SectionHeading } from './section-heading'
import { FortuneWheel } from './fortune-wheel'

export function Rounds() {
  return (
    <section aria-labelledby="dispatch" className="mx-auto max-w-5xl px-4 py-16">
      <SectionHeading kicker="Voyage Dispatch" title="Three Rounds to Rescue" id="dispatch" />

      <ol className="flex flex-col gap-10">
        <li className="ink-border parchment-card p-6 md:p-8">
          <RoundHeader number="I" icon={Sparkles} title="The Fortune Hunt" tag="Earn Virtual Cash" />
          <p className="mt-4 max-w-prose text-pretty text-sepia">
            Teams spin the wheel and play one civil-themed mini-game. Your performance decides how much virtual cash you
            carry into the marketplace.
          </p>
          <FortuneWheel />
        </li>

        <li className="ink-border parchment-card p-6 md:p-8">
          <RoundHeader number="II" icon={ShoppingCart} title="The Marketplace" tag="Buy Raw Materials" />
          <p className="mt-4 max-w-prose text-pretty text-sepia">
            Budget and spend your earned cash on strategic materials. You get a{' '}
            <strong className="text-crimson">5-minute strategy window</strong> — and higher Round 1 scores enter the
            market first.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {['Foam', 'Wooden Sticks', 'Tape', 'String'].map((item) => (
              <li
                key={item}
                className="ink-border-soft hatch flex items-center justify-center bg-parchment px-3 py-4 font-mono text-sm uppercase text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>

        <li className="ink-border parchment-card p-6 md:p-8">
          <RoundHeader number="III" icon={Hammer} title="Float It" tag="Build & Rescue Jack" />
          <p className="mt-4 max-w-prose text-pretty text-sepia">
            Assemble your floating structure and lower it into the water. Coins are loaded one by one — the raft that
            carries the most without tipping or sinking saves Jack.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs uppercase">
            <span className="ink-border-soft bg-ocean px-3 py-1.5 text-parchment">Must stay afloat</span>
            <span className="ink-border-soft bg-ocean px-3 py-1.5 text-parchment">No tipping</span>
            <span className="ink-border-soft bg-crimson px-3 py-1.5 text-parchment">Max coin load wins</span>
          </div>
        </li>
      </ol>
    </section>
  )
}

function RoundHeader({
  number,
  icon: Icon,
  title,
  tag,
}: {
  number: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  title: string
  tag: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-ink font-serif text-xl font-black text-parchment">
        {number}
      </span>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-crimson">Round {number}</p>
        <h3 className="font-serif text-2xl font-bold uppercase text-ink md:text-3xl">{title}</h3>
      </div>
      <span className="ml-auto inline-flex items-center gap-2 border-2 border-dashed border-ocean px-3 py-1 font-mono text-xs uppercase text-ocean">
        <Icon className="size-4" aria-hidden={true} />
        {tag}
      </span>
    </div>
  )
}
