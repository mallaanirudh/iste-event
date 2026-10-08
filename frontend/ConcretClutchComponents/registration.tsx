import { ArrowUpRight, CheckSquare, Crown, UserRound } from 'lucide-react'
import { SectionHeading } from '@/ConcretClutchComponents/section-heading'
import { REGISTRATION_URL } from '@/data/registration'

const GROUPS = [
  {
    title: 'TEAM & CAPTAIN',
    icon: Crown,
    color: 'text-comic',
    fields: ['Team Name', 'Captain Name', 'Roll No', 'Phone Number', 'EDU Email'],
  },
  { title: 'MEMBER 2', icon: UserRound, color: 'text-cyan', fields: ['Name', 'Roll No'] },
  { title: 'MEMBER 3', icon: UserRound, color: 'text-cyan', fields: ['Name', 'Roll No'] },
]

export function Registration() {
  return (
    <section id="register" aria-labelledby="register-title" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading id="register-title" kicker="03 // PARTICIPANT REQUIREMENTS" title="REGISTRATION" />

      <div className="comic-shadow border-[3px] border-black bg-asphalt-2/95">
        <div className="relative flex flex-col gap-3 overflow-hidden border-b-[3px] border-black bg-comic p-6 sm:flex-row sm:items-center sm:justify-between">
          <div aria-hidden="true" className="halftone absolute inset-0 text-black/15" />
          <div className="relative">
            <p className="font-display text-2xl text-black sm:text-3xl">ONLY THE CAPTAIN REGISTERS</p>
            <p className="mt-1 font-mono text-sm font-bold text-black/75">
              One submission covers all 3 members. Duplicate entries from members will be discarded.
            </p>
          </div>
          <span className="skew-badge relative inline-flex w-fit shrink-0 border-2 border-black bg-black px-3 py-1.5">
            <span className="unskew font-display text-xs text-comic">1 FORM = 1 TEAM</span>
          </span>
        </div>

        <div className="grid gap-px bg-black md:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title} className="flex flex-col gap-4 bg-asphalt-2 p-6">
              <h3 className="flex items-center gap-2 font-display text-base text-white">
                <g.icon className={`size-5 ${g.color}`} aria-hidden="true" />
                {g.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {g.fields.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 font-mono text-sm text-white/90">
                    <CheckSquare className="size-4 shrink-0 text-crimson" aria-hidden="true" />
                    {f}
                    <span className="ml-auto text-[10px] tracking-widest text-muted-foreground">REQ</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 border-t-[3px] border-black p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-wider text-muted-foreground">
            {'ALL FIELDS COMPULSORY // USE YOUR COLLEGE .EDU EMAIL'}
          </p>
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="skew-badge comic-shadow-sm inline-flex border-2 border-black bg-crimson px-5 py-3 transition-transform hover:-translate-y-0.5"
          >
            <span className="unskew flex items-center gap-2 font-display text-sm text-white">
              OPEN REGISTRATION <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
