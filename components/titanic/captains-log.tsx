import { Anchor, Radio } from 'lucide-react'
import { POCS } from '@/lib/event-data'

export function CaptainsLog() {
  return (
    <footer aria-labelledby="log-title" className="mx-auto max-w-5xl px-4 pb-40 pt-16">
      <div className="ink-border parchment-card p-6 md:p-10">
        <div className="flex flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-crimson">{'Ship Captain\u2019s Log'}</p>
          <h2 id="log-title" className="mt-2 font-serif text-3xl font-bold uppercase text-ink">
            Emergency Contacts
          </h2>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {POCS.map((poc) => (
            <li key={poc.name} className="ink-border-soft flex items-center gap-4 bg-parchment p-5">
              <div className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-ocean font-serif text-2xl font-black text-parchment">
                {poc.name[0]}
              </div>
              <div className="min-w-0">
                <p className="font-serif text-xl font-bold text-ink">{poc.name}</p>
                <p className="text-sm text-sepia">{poc.role}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs uppercase text-crimson">
                  <Radio className="size-3.5" aria-hidden="true" />
                  {poc.callsign}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-2 border-t-2 border-dashed border-ink/40 pt-6 text-center">
          <p className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-ink">
            <Anchor className="size-4" aria-hidden="true" />
            Eligibility: Restricted to B.Tech 1st Year Students
          </p>
          <p className="font-mono text-xs uppercase text-muted-foreground">
            {'SIG: Concrete · Titanic: Float it for Jack'}
          </p>
        </div>
      </div>
    </footer>
  )
}
