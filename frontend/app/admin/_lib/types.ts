/** Shapes returned by the Fastify backend (see backend/src/controllers). */

export type Role = "participant" | "admin";
export type User = { id: string; username: string; role: Role };

export type MegaEvent = {
  id: string;
  name: string;
  description: string | null;
  registrationOpenAt: string | null;
  registrationCloseAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Sig = { id: string; name: string; description: string | null; createdAt: string };

export type AdminEvent = {
  id: string;
  name: string;
  description: string | null;
  megaEventId: string;
  megaEventName: string;
  sigId: string;
  sigName: string;
  createdAt: string;
  updatedAt: string;
};

export type Round = {
  id: string;
  eventId: string;
  roundNumber: number;
  name: string;
  description: string | null;
  maxPoints: number | null;
  createdAt: string;
  updatedAt: string;
};

export type Team = {
  id: string;
  teamCode: string;
  megaEventId: string;
  megaEventName: string;
  createdAt: string;
  updatedAt: string;
};

export type TeamMember = {
  teamMemberId: string;
  participantId: string;
  joinedAt: string;
  leftAt: string | null;
};

export type LeaderboardRow = {
  id: string;
  teamId: string;
  teamCode: string;
  rank: number | null;
  points: number;
  updatedAt: string;
};

/** Body for PUT .../leaderboard (replaces the whole board). */
export type LeaderboardEntryInput = { teamId: string; points: number; rank?: number };

export type AuditLog = {
  id: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string | null;
  oldData: unknown;
  newData: unknown;
  createdAt: string;
};

/** Tally's submissions API response, passed through unchanged by the backend. */
export type TallyQuestion = { id: string; type?: string; title?: string | null };
export type TallyResponse = { questionId: string; answer: unknown };
export type TallySubmission = {
  id: string;
  submittedAt?: string;
  isCompleted?: boolean;
  responses?: TallyResponse[];
};
export type TallyPage = {
  page?: number;
  limit?: number;
  hasMore?: boolean;
  totalNumberOfSubmissionsPerFilter?: Record<string, number>;
  questions?: TallyQuestion[];
  submissions?: TallySubmission[];
};
