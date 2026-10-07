import { Flag } from 'lucide-react'

export function RaceHeader({ liveRounds }: { liveRounds: number }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center bg-primary clip-angle-sm">
            <Flag className="size-4 text-primary-foreground" aria-hidden />
          </span>
          <span className="font-dela text-sm leading-none tracking-wide">
  RACE<span className="text-primary">CONTROL</span>
</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-6 text-[11px] tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#sigs" className="transition-colors hover:text-foreground">SIGS</a>
          <a href="#events" className="transition-colors hover:text-foreground">EVENTS</a>
          <a href="#strategy" className="transition-colors hover:text-foreground">STRATEGY</a>
          <a href="#standings" className="transition-colors hover:text-foreground">STANDINGS</a>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 border border-track-green/40 bg-track-green/10 px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-track-green sm:inline-flex">
            <span className="size-1.5 rounded-full bg-track-green" aria-hidden />
            TRACK STATUS: GREEN
          </span>
          {liveRounds > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-primary px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-primary-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground" aria-hidden />
              QUALIFYING LIVE
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
