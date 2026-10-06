import { LifeBuoy, Target } from 'lucide-react'
import { SectionHeading } from './section-heading'

export function Storyline() {
  return (
    <section aria-labelledby="briefing" className="mx-auto max-w-4xl px-4 py-16">
      <SectionHeading kicker="Telegram · 15 April 1912 · 02:17" title="Event Briefing" id="briefing" />

      <article className="ink-border parchment-card relative overflow-hidden p-6 md:p-10">
        <div aria-hidden="true" className="hatch absolute inset-y-0 right-0 w-24 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-crimson">{'CQD · SOS · All ships respond'}</p>
        <p className="mt-4 text-pretty font-serif text-2xl font-bold leading-snug text-ink md:text-3xl">
          {'The Titanic is sinking in the icy Atlantic! Jack is stranded, and Rose\u2019s raft has no room.'}
        </p>
        <p className="mt-5 max-w-prose text-pretty leading-relaxed text-sepia md:text-lg">
          {
            'Test your civil engineering skills, earn virtual cash, buy materials, and construct a floating structure capable of carrying the maximum load to save Jack. Every coin your raft holds is another second he stays above water.'
          }
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t-2 border-dashed border-ink/40 pt-6 sm:flex-row sm:items-center">
          <div className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-ocean text-parchment">
            <Target className="size-7" aria-hidden="true" />
          </div>
          <div>
            <p className="font-serif text-sm font-bold uppercase tracking-widest text-ocean">Key Objective</p>
            <p className="mt-1 text-pretty text-sepia">
              Build a floating raft or boat from marketplace materials that withstands the{' '}
              <strong className="text-crimson">maximum weight</strong> during the coin load test.
            </p>
          </div>
          <LifeBuoy className="ml-auto hidden size-12 text-crimson/80 sm:block" strokeWidth={1.25} aria-hidden="true" />
        </div>
      </article>
    </section>
  )
}
