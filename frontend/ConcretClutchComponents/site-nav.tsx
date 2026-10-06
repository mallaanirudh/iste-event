import { Flag } from 'lucide-react'
import { TALLY_FORM_URL } from '@/data/event'

const LINKS = [
  { href: '#briefing', label: 'Briefing' },
  { href: '#rounds', label: 'Rounds' },
  { href: '#register', label: 'Register' },
  { href: '#leaderboard', label: 'Standings' },
  { href: '#pit-wall', label: 'Pit Wall' },
]

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-black bg-asphalt/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="skew-badge flex items-center border-2 border-black bg-crimson px-2 py-1">
            <Flag className="unskew size-4 text-white" aria-hidden="true" />
          </span>
          <span className="font-display text-sm tracking-wide text-white">
            SIG<span className="text-crimson">:</span>CLUTCH
          </span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-cyan"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={TALLY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="skew-badge comic-shadow-sm border-2 border-black bg-comic px-3 py-1.5 transition-transform hover:-translate-y-0.5"
        >
          <span className="unskew block font-display text-xs text-black">REGISTER</span>
        </a>
      </div>
    </header>
  )
}
