import { Bot, Briefcase, Gamepad2, Palette, Terminal, type LucideIcon } from 'lucide-react'
import { cn } from '@/data/utils'
import { events, type Sig, type SigIcon } from '@/data/race-data'

const icons: Record<SigIcon, LucideIcon> = {
  code: Terminal,
  design: Palette,
  robotics: Bot,
  gaming: Gamepad2,
  business: Briefcase,
}

export function SigSelector({
  sigs,
  selectedId,
  onSelect,
}: {
  sigs: Sig[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div role="tablist" aria-label="Special Interest Groups" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:px-0">
      {sigs.map((sig) => {
        const Icon = icons[sig.icon]
        const active = sig.id === selectedId
        const count = events.filter((e) => e.sigId === sig.id).length
        return (
          <button
            key={sig.id}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls="events"
            onClick={() => onSelect(sig.id)}
            className={cn(
              'group relative flex min-w-44 shrink-0 flex-col gap-3 border p-4 text-left transition-colors clip-angle-sm sm:min-w-0',
              active
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-muted-foreground/40 hover:bg-secondary',
            )}
          >
            <div className="flex items-center justify-between">
              <Icon className={cn('size-5', active ? 'text-primary' : 'text-telemetry')} aria-hidden />
              <span className={cn('text-[10px] font-semibold tracking-[0.2em] tabular', active ? 'text-primary' : 'text-muted-foreground')}>
                {sig.code}
              </span>
            </div>
            <div>
              <p className="font-display text-sm uppercase leading-tight">{sig.name}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{sig.tagline}</p>
            </div>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground">
              {String(count).padStart(2, '0')} EVENTS
            </p>
            {active && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" aria-hidden />}
          </button>
        )
      })}
    </div>
  )
}
