import { Bot, CircleSlash, Magnet } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

export function Briefing() {
  return (
    <section id="briefing" aria-labelledby="briefing-title" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading id="briefing-title" kicker="01 // EVENT BRIEFING" title="CAR MECHANICS" />

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="comic-shadow relative overflow-hidden border-[3px] border-black bg-crimson p-6 lg:col-span-2">
          <div aria-hidden="true" className="halftone absolute inset-0 text-black/20" />
          <div className="relative flex h-full flex-col gap-4">
            <span className="skew-badge inline-flex w-fit border-2 border-black bg-black px-3 py-1">
              <span className="unskew flex items-center gap-2 font-mono text-xs tracking-widest text-comic">
                <Magnet className="size-4" aria-hidden="true" /> OBJECTIVE
              </span>
            </span>
            <h3 className="text-balance font-display text-3xl leading-tight text-white sm:text-4xl">
              ENGINEER YOUR OWN MAGNETIC SPEEDSTER!!
             </h3>
            <p className="max-w-lg font-mono text-sm leading-relaxed text-white/90">
  Engineer your own magnetic speedster. Master the laws of magnetism to build a balanced, high-velocity car built to conquer the Grand Prix track.
</p>
          </div>
        </article>

        <div className="flex flex-col gap-6">
          <article className="comic-shadow relative border-[3px] border-black bg-comic p-5">
            <span
              aria-hidden="true"
              className="absolute -right-3 -top-4 rotate-6 border-2 border-black bg-crimson px-2 py-0.5 font-display text-xs text-white"
            >
              ALERT!
            </span>
            <CircleSlash className="mb-3 size-7 text-black" aria-hidden="true" />
            <h3 className="font-display text-lg leading-snug text-black">
              NO YOUTUBE ALLOWED DURING IDEATION
            </h3>
            <p className="mt-2 font-mono text-xs font-bold tracking-wider text-black/70">
              {'CONSTRAINT // 30 MINS — ORIGINAL IDEAS ONLY'}
            </p>
          </article>

          <article className="comic-shadow relative -rotate-1 border-[3px] border-black bg-cyan p-5">
            <Bot className="mb-3 size-7 text-black" aria-hidden="true" />
            <h3 className="font-display text-lg leading-snug text-black">
              AUTOMATIC NON-HUMAN DRIVING DESIGNS GET BONUS POINTS!
            </h3>
            <p className="mt-2 font-mono text-xs font-bold tracking-wider text-black/70">
              {'BONUS // HANDS-OFF PROPULSION'}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}