import { MapPin, Phone, Radio } from 'lucide-react'
import { ORGANIZERS } from '@/data/event'

export function PitWall() {
  return (
    <footer id="pit-wall" aria-labelledby="pit-wall-title" className="border-t-[3px] border-black bg-asphalt-2/95 pb-24 md:pb-0">
      <div aria-hidden="true" className="speed-stripes animate-stripes h-3 bg-comic text-black" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs tracking-[0.35em] text-cyan">05 // PIT WALL</p>
          <h2 id="pit-wall-title" className="text-outline font-display text-3xl text-white sm:text-4xl">
            ORGANIZER CONTACTS
          </h2>
          <p className="flex items-start gap-2 font-mono text-sm text-white/85">
            <MapPin className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden="true" />
            LHC A — 2 Rooms Reserved
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2">
          {ORGANIZERS.map((o) => (
            <li key={o.tel}>
              <a
                href={`tel:${o.tel}`}
                className="comic-shadow group flex h-full flex-col gap-4 border-[3px] border-black bg-asphalt-3 p-5 transition-transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-between">
                  <span className="skew-badge inline-flex border-2 border-black bg-crimson px-2 py-0.5">
                    <span className="unskew flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-white">
                      <Radio className="size-3" aria-hidden="true" /> EMERGENCY POC
                    </span>
                  </span>
                  <Phone className="size-5 text-cyan transition-transform group-hover:rotate-12" aria-hidden="true" />
                </span>
                <span className="font-display text-xl text-white">{o.name}</span>
                <span className="font-mono text-lg font-bold tracking-wider text-comic">{o.phone}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t-2 border-black">
        <p className="mx-auto max-w-6xl px-4 py-4 font-mono text-[11px] tracking-widest text-muted-foreground">
          {'SIG: CLUTCH // MAGNETIC GRAND PRIX — 13.10.2026'}
        </p>
      </div>
    </footer>
  )
}

export function PitWallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-black bg-asphalt/95 backdrop-blur-md md:hidden">
      <p className="sr-only">Quick call organizers</p>
      <ul className="grid grid-cols-2">
        {ORGANIZERS.map((o, i) => (
          <li key={o.tel} className={i > 0 ? 'border-l-2 border-black' : ''}>
            <a href={`tel:${o.tel}`} className="flex items-center gap-2 px-3 py-3">
              <Phone className="size-4 shrink-0 text-crimson" aria-hidden="true" />
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-display text-[11px] text-white">{o.name}</span>
                <span className="truncate font-mono text-[11px] text-comic">{o.phone}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
