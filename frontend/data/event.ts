export { REGISTRATION_URL } from './registration'

import { getFestivalEvent } from './festival-schedule'

const clutchEvent = getFestivalEvent('clutch')
export const EVENT_START_ISO = clutchEvent?.sessions?.[0]?.startsAt ?? '2026-10-14T18:00:00+05:30'

export const ORGANIZERS = [
  { name: 'Gamana Shenthar', phone: '+91 83174 31152', tel: '+918317431152' },
  { name: 'Sreenadh', phone: '+91 79029 36054', tel: '+917902936054' },
] as const

export type TeamStatus = 'ON GRID' | 'QUALIFIED' | 'ELIMINATED' | 'CHAMPION'

export type LeaderboardEntry = {
  team: string
  captain: string
  // Organizers: fill these in after evaluation. Leave null while pending.
  round1Score: number | null
  // Lap time string, e.g. "00:12.48". Leave null while pending.
  round2Timing: string | null
  status: TeamStatus
}

// Organizers update this list manually. Order here is the displayed rank.
export const LEADERBOARD: LeaderboardEntry[] = [
  { team: 'TEAM SLOT 01', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
  { team: 'TEAM SLOT 02', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
  { team: 'TEAM SLOT 03', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
  { team: 'TEAM SLOT 04', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
  { team: 'TEAM SLOT 05', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
  { team: 'TEAM SLOT 06', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
  { team: 'TEAM SLOT 07', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
  { team: 'TEAM SLOT 08', captain: '—', round1Score: null, round2Timing: null, status: 'ON GRID' },
]