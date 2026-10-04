export type EventStatus = 'PRACTICE' | 'QUALIFYING' | 'RACE DAY'
export type RoundStatus = 'COMPLETED' | 'LIVE' | 'UPCOMING'
export type SigIcon = 'code' | 'design' | 'robotics' | 'gaming' | 'business'

export const TALLY_URL = 'https://tally.so/'

export interface Round {
  id: string
  number: number
  name: string
  description: string
  maxPoints: number
  duration: string
  startsAt: string
  status: RoundStatus
  rules: string[]
}

export interface MegaEvent {
  id: string
  sigId: string
  code: string
  name: string
  venue: string
  summary: string
  status: EventStatus
  rounds: Round[]
}

export interface Sig {
  id: string
  code: string
  name: string
  tagline: string
  icon: SigIcon
}

export interface Team {
  id: string
  code: string
  name: string
  livery: string
}

export interface StandingRow {
  team: Team
  rank: number
  points: number
  delta: number | null
}

export const sigs: Sig[] = [
  { id: 'code', code: 'CDX', name: 'Code Syndicate', tagline: 'Algorithms at 300 km/h', icon: 'code' },
  { id: 'design', code: 'DSN', name: 'Design Garage', tagline: 'Aero for the eyes', icon: 'design' },
  { id: 'robotics', code: 'RBX', name: 'Robotics Lab', tagline: 'Machines on the grid', icon: 'robotics' },
  { id: 'gaming', code: 'GMG', name: 'Gaming Paddock', tagline: 'Frame-perfect overtakes', icon: 'gaming' },
  { id: 'business', code: 'BIZ', name: 'Strategy Wall', tagline: 'Win it on the pit wall', icon: 'business' },
]

export const teams: Team[] = [
  { id: 't1', code: 'VLT', name: 'Volt Dynamics', livery: '#FF1801' },
  { id: 't2', code: 'APX', name: 'Apex Protocol', livery: '#00E5FF' },
  { id: 't3', code: 'NRT', name: 'Nitro Theory', livery: '#FF8A00' },
  { id: 't4', code: 'SLP', name: 'Slipstream Labs', livery: '#22C55E' },
  { id: 't5', code: 'DRS', name: 'DRS Collective', livery: '#A78BFA' },
  { id: 't6', code: 'KRB', name: 'Kerb Runners', livery: '#F472B6' },
  { id: 't7', code: 'PLE', name: 'Pole Position', livery: '#FACC15' },
  { id: 't8', code: 'TRQ', name: 'Torque Unit', livery: '#38BDF8' },
  { id: 't9', code: 'GRD', name: 'Grid Zero', livery: '#E5E7EB' },
  { id: 't10', code: 'HLO', name: 'Halo Systems', livery: '#14B8A6' },
]

const baseRules = [
  'Teams of 2–4 drivers. One registration per team via Tally.',
  'Late arrival beyond 10 minutes results in a drive-through penalty (−10 pts).',
  'Judges’ decisions are final, equivalent to Race Control rulings.',
]

export const events: MegaEvent[] = [
  {
    id: 'code-sprint',
    sigId: 'code',
    code: 'CSP',
    name: 'Code Sprint GP',
    venue: 'Lab 3 // Pit Lane A',
    summary: 'Competitive programming across three escalating stints.',
    status: 'RACE DAY',
    rounds: [
      { id: 'csp-r1', number: 1, name: 'Formation Lap', description: 'Warm-up MCQ on data structures and complexity.', maxPoints: 50, duration: '30 MIN', startsAt: '2026-11-14T10:00:00+05:30', status: 'COMPLETED', rules: ['Individual attempts, team average counts.', 'No internet access.', ...baseRules.slice(1)] },
      { id: 'csp-r2', number: 2, name: 'Qualifying Hot Lap', description: 'Five algorithmic problems, scored on correctness and time.', maxPoints: 100, duration: '90 MIN', startsAt: '2026-11-14T13:00:00+05:30', status: 'COMPLETED', rules: ['Any language on the judge is allowed.', 'Wrong submissions add a 5-minute time penalty.', ...baseRules] },
      { id: 'csp-r3', number: 3, name: 'Grand Prix Final', description: 'Head-to-head live contest with a frozen scoreboard in the final 20 minutes.', maxPoints: 150, duration: '120 MIN', startsAt: '2026-11-15T11:00:00+05:30', status: 'LIVE', rules: ['Scoreboard freezes at T−20.', 'Plagiarism results in disqualification (black flag).', ...baseRules] },
    ],
  },
  {
    id: 'hack-endurance',
    sigId: 'code',
    code: 'HKE',
    name: '24H Hack Endurance',
    venue: 'Main Hall // Paddock',
    summary: 'A 24-hour endurance build — ship a working product before the chequered flag.',
    status: 'QUALIFYING',
    rounds: [
      { id: 'hke-r1', number: 1, name: 'Idea Pitch', description: 'Two-minute pitch of problem, solution and stack.', maxPoints: 40, duration: '2 MIN / TEAM', startsAt: '2026-11-14T09:00:00+05:30', status: 'COMPLETED', rules: ['Slides optional, max 3.', ...baseRules] },
      { id: 'hke-r2', number: 2, name: 'Mid-Race Checkpoint', description: 'Mentors review progress, architecture and repo hygiene.', maxPoints: 60, duration: '10 MIN / TEAM', startsAt: '2026-11-14T21:00:00+05:30', status: 'COMPLETED', rules: ['Public repo link required.', ...baseRules] },
      { id: 'hke-r3', number: 3, name: 'Chequered Flag Demo', description: 'Final live demo to the jury panel.', maxPoints: 200, duration: '5 MIN / TEAM', startsAt: '2026-11-15T09:00:00+05:30', status: 'UPCOMING', rules: ['Demo must run live — no recorded videos.', ...baseRules] },
    ],
  },
  {
    id: 'ui-livery',
    sigId: 'design',
    code: 'UIL',
    name: 'UI Livery Challenge',
    venue: 'Studio 2 // Garage 4',
    summary: 'Design a complete app interface against a surprise brief.',
    status: 'QUALIFYING',
    rounds: [
      { id: 'uil-r1', number: 1, name: 'Brief Decode', description: 'Wireframes and user flow based on the revealed brief.', maxPoints: 60, duration: '60 MIN', startsAt: '2026-11-14T10:30:00+05:30', status: 'COMPLETED', rules: ['Figma or pen & paper allowed.', ...baseRules] },
      { id: 'uil-r2', number: 2, name: 'High-Fidelity Stint', description: 'Polished hi-fi screens and a clickable prototype.', maxPoints: 120, duration: '120 MIN', startsAt: '2026-11-15T10:00:00+05:30', status: 'LIVE', rules: ['Original assets only; licensed icons permitted.', ...baseRules] },
    ],
  },
  {
    id: 'poster-sprint',
    sigId: 'design',
    code: 'PST',
    name: 'Poster Sprint',
    venue: 'Studio 1 // Garage 2',
    summary: 'Single-round speed design on a motorsport theme.',
    status: 'PRACTICE',
    rounds: [
      { id: 'pst-r1', number: 1, name: 'Speed Poster', description: 'Create an A3 race poster in 45 minutes.', maxPoints: 80, duration: '45 MIN', startsAt: '2026-11-16T11:00:00+05:30', status: 'UPCOMING', rules: ['Any tool allowed. Export as PDF.', ...baseRules] },
    ],
  },
  {
    id: 'line-follower',
    sigId: 'robotics',
    code: 'LNF',
    name: 'Line Follower GP',
    venue: 'Arena // Circuit 1',
    summary: 'Autonomous bots race a twisting black-line circuit.',
    status: 'RACE DAY',
    rounds: [
      { id: 'lnf-r1', number: 1, name: 'Time Trial', description: 'Single timed lap on the practice circuit.', maxPoints: 70, duration: '3 MIN / BOT', startsAt: '2026-11-14T12:00:00+05:30', status: 'COMPLETED', rules: ['Bot dimensions max 25×25 cm.', ...baseRules] },
      { id: 'lnf-r2', number: 2, name: 'Grand Prix Circuit', description: 'Best of two laps on the full circuit with chicanes.', maxPoints: 130, duration: '5 MIN / BOT', startsAt: '2026-11-15T14:00:00+05:30', status: 'COMPLETED', rules: ['Touching the bot mid-run voids the lap.', ...baseRules] },
    ],
  },
  {
    id: 'robo-sumo',
    sigId: 'robotics',
    code: 'SMO',
    name: 'Robo Sumo',
    venue: 'Arena // Dohyo',
    summary: 'Push your rival out of the ring. Knockout format.',
    status: 'PRACTICE',
    rounds: [
      { id: 'smo-r1', number: 1, name: 'Group Stage', description: 'Round-robin bouts within groups of four.', maxPoints: 90, duration: '3 MIN / BOUT', startsAt: '2026-11-16T10:00:00+05:30', status: 'UPCOMING', rules: ['Max weight 3 kg.', ...baseRules] },
      { id: 'smo-r2', number: 2, name: 'Knockout', description: 'Single elimination to the final.', maxPoints: 160, duration: '3 MIN / BOUT', startsAt: '2026-11-16T15:00:00+05:30', status: 'UPCOMING', rules: ['Best of three bouts.', ...baseRules] },
    ],
  },
  {
    id: 'sim-racing',
    sigId: 'gaming',
    code: 'SIM',
    name: 'Sim Racing Cup',
    venue: 'eSports Bay // Rigs 1–8',
    summary: 'Wheel-and-pedal sim racing on a real-world circuit.',
    status: 'RACE DAY',
    rounds: [
      { id: 'sim-r1', number: 1, name: 'Qualifying', description: 'Best single lap sets the grid.', maxPoints: 60, duration: '15 MIN', startsAt: '2026-11-14T15:00:00+05:30', status: 'COMPLETED', rules: ['Assists off except ABS.', ...baseRules] },
      { id: 'sim-r2', number: 2, name: 'Feature Race', description: '12-lap race with mandatory pit stop.', maxPoints: 140, duration: '30 MIN', startsAt: '2026-11-15T16:00:00+05:30', status: 'LIVE', rules: ['Track limits enforced: 3 strikes = +5s.', ...baseRules] },
    ],
  },
  {
    id: 'case-strategy',
    sigId: 'business',
    code: 'CSE',
    name: 'Pit-Wall Case Study',
    venue: 'Seminar Hall // Briefing Room',
    summary: 'Solve a real business case under race-day pressure.',
    status: 'QUALIFYING',
    rounds: [
      { id: 'cse-r1', number: 1, name: 'Data Debrief', description: 'Analyse the dataset and submit a one-page memo.', maxPoints: 50, duration: '60 MIN', startsAt: '2026-11-14T11:00:00+05:30', status: 'COMPLETED', rules: ['Spreadsheets allowed; no AI tools.', ...baseRules] },
      { id: 'cse-r2', number: 2, name: 'Board Pitch', description: 'Present the strategy to a panel of judges.', maxPoints: 110, duration: '8 MIN / TEAM', startsAt: '2026-11-16T14:00:00+05:30', status: 'UPCOMING', rules: ['Q&A counts for 30% of the score.', ...baseRules] },
    ],
  },
]

function seededRandom(seed: string) {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return ((hash >>> 0) % 10000) / 10000
}

export function getRoundPoints(round: Round): Map<string, number> | null {
  if (round.status === 'UPCOMING') return null
  const progress = round.status === 'LIVE' ? 0.62 : 1
  return new Map(
    teams.map((team, index) => {
      const strength = 1 - index * 0.035
      const variance = seededRandom(`${team.id}:${round.id}`)
      const score = round.maxPoints * (0.3 + 0.45 * strength + 0.25 * variance) * progress
      return [team.id, Math.min(round.maxPoints, Math.round(score))]
    }),
  )
}

function rank(points: Map<string, number>): Map<string, number> {
  const ordered = [...teams].sort(
    (a, b) => (points.get(b.id) ?? 0) - (points.get(a.id) ?? 0) || a.code.localeCompare(b.code),
  )
  return new Map(ordered.map((team, index) => [team.id, index + 1]))
}

function toRows(points: Map<string, number>, previous: Map<string, number> | null): StandingRow[] {
  const ranks = rank(points)
  const prevRanks = previous ? rank(previous) : null
  return teams
    .map((team) => {
      const current = ranks.get(team.id)!
      const prior = prevRanks?.get(team.id)
      return {
        team,
        rank: current,
        points: points.get(team.id) ?? 0,
        delta: prior === undefined ? null : prior - current,
      }
    })
    .sort((a, b) => a.rank - b.rank)
}

export function getRoundStandings(event: MegaEvent, round: Round): StandingRow[] | null {
  const points = getRoundPoints(round)
  if (!points) return null
  const previousRound = event.rounds.find((r) => r.number === round.number - 1)
  const previous = previousRound ? getRoundPoints(previousRound) : null
  return toRows(points, previous)
}

export function getOverallStandings(): StandingRow[] {
  const total = new Map<string, number>()
  const beforeLive = new Map<string, number>()
  for (const event of events) {
    for (const round of event.rounds) {
      const points = getRoundPoints(round)
      if (!points) continue
      for (const [teamId, value] of points) {
        total.set(teamId, (total.get(teamId) ?? 0) + value)
        if (round.status === 'COMPLETED') {
          beforeLive.set(teamId, (beforeLive.get(teamId) ?? 0) + value)
        }
      }
    }
  }
  return toRows(total, beforeLive)
}

export function getRaceMetrics() {
  const allRounds = events.flatMap((e) => e.rounds)
  const upcoming = allRounds
    .filter((r) => r.status === 'UPCOMING')
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  const nextRound = upcoming[0]
  const nextEvent = events.find((e) => e.rounds.some((r) => r.id === nextRound?.id))
  return {
    totalSigs: sigs.length,
    totalEvents: events.length,
    activeEvents: events.filter((e) => e.status !== 'PRACTICE').length,
    liveRounds: allRounds.filter((r) => r.status === 'LIVE').length,
    completedRounds: allRounds.filter((r) => r.status === 'COMPLETED').length,
    totalRounds: allRounds.length,
    totalTeams: teams.length,
    nextRound,
    nextEvent,
  }
}
