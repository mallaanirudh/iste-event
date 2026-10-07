import { CheckSquare, Crown, User } from 'lucide-react'
import { REGISTRATION_URL } from '@/data/event-data'
import { SectionHeading, WaxSealButton } from './section-heading'

const CREW = [
  {
    icon: Crown,
    role: 'Team',
    fields: ['Team Name'],
  },
  {
    icon: Crown,
    role: 'Captain',
    fields: ['Name', 'Roll No.', 'Phone', 'EDU Email'],
  },
  {
    icon: User,
    role: 'Member 2',
    fields: ['Name', 'Roll No.'],
  },
  {
    icon: User,
    role: 'Member 3',
    fields: ['Name', 'Roll No.'],
  },
]

export function Registration() {
  return (
    <section id="register" aria-labelledby="register-title" className="mx-auto max-w-4xl scroll-mt-8 px-4 py-16">
      <SectionHeading kicker="Boarding Pass" title="Registration Guidelines" id="register-title" />

      <div className="ink-border parchment-card p-6 md:p-10">
        <div className="flex flex-col gap-3 border-b-2 border-dashed border-ink/40 pb-6">
          <p className="inline-flex w-fit items-center gap-2 bg-crimson px-3 py-1 font-mono text-xs uppercase tracking-widest text-parchment">
            Important
          </p>
          <p className="text-pretty font-serif text-xl font-bold text-ink md:text-2xl">
            Only the Team Captain registers — on behalf of all 3 crew members.
          </p>
          <p className="text-pretty text-sepia">
            Teams are exactly three. Duplicate registrations from members will be discarded. Keep these details ready
            before you open the form:
          </p>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {CREW.map(({ icon: Icon, role, fields }) => (
            <li key={role} className="ink-border-soft bg-parchment p-4">
              <p className="flex items-center gap-2 font-serif text-sm font-bold uppercase tracking-widest text-ocean">
                <Icon className="size-4" aria-hidden="true" />
                {role}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {fields.map((field) => (
                  <li key={field} className="flex items-center gap-2 font-mono text-sm text-ink">
                    <CheckSquare className="size-4 text-crimson" aria-hidden="true" />
                    {field}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          {REGISTRATION_URL ? (
            <WaxSealButton href={REGISTRATION_URL} external>
              Open Captain&apos;s Form
            </WaxSealButton>
          ) : (
            <p className="ink-border-soft hatch bg-parchment px-5 py-3 font-mono text-sm uppercase tracking-widest text-ink">
              {'Registration form link dropping soon — watch this space'}
            </p>
          )}
          <p className="font-mono text-xs uppercase text-muted-foreground">Restricted to B.Tech 1st Year students</p>
        </div>
      </div>
    </section>
  )
}
