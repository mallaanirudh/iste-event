import { getFestivalEvent } from './festival-schedule'
export const EVENT_DATE_ISO = getFestivalEvent('concrete').sessions[0].startsAt

export { REGISTRATION_URL } from './registration'

export type MiniGame = {
  id: number
  name: string
  brief: string
}

export const MINI_GAMES: MiniGame[] = [
  { id: 1, name: 'Measure the Mystery', brief: 'Estimate object lengths without rulers. Closest guess wins the purse.' },
  { id: 2, name: 'Blind Strike', brief: 'Bowling pyramid challenge — one blindfolded, one mute, one deaf. Communicate or capsize.' },
  { id: 3, name: 'Cuplift', brief: 'Lift and stack cups using nothing but balloon air pressure.' },
  { id: 4, name: 'SWINGardium Leviosa', brief: 'Pendulum precision — release at the right angle to strike the target.' },
  { id: 5, name: 'Stack Attack', brief: 'Build the tallest freestanding card tower in 5 minutes flat.' },
  { id: 6, name: 'NestQuest', brief: 'Weave a thread nest between sticks and load it with as many coins as it holds.' },
  { id: 7, name: 'Structure Sleuth', brief: '90-second rapid-fire trivia on architectural & structural marvels.' },
]

export type VoyageStatus = 'FLOATING' | 'SUNK' | 'ON DECK'

export type TeamEntry = {
  teamName: string
  captain: string
  /** Round 1 virtual cash earned. null = pending evaluation */
  cash: number | null
  /** Round 2 market entry position (1 = first in). null = pending */
  marketEntry: number | null
  /** Round 3 max coin load. null = pending */
  maxLoad: number | null
  status: VoyageStatus
}

/**
 * Organizers: update this manifest manually after each round.
 * Leave a score as null to show it as pending.
 */
export const LEADERBOARD: TeamEntry[] = []

export const PLACEHOLDER_BERTHS = 6

export const POCS = [
  { name: 'Molly', role: 'Event Organizer · Point of Contact', callsign: 'BRIDGE-01' },
  { name: 'Vineesh', role: 'Event Organizer · Point of Contact', callsign: 'BRIDGE-02' },
]
