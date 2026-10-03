import { eq, asc } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../db/client.js";
import {
  roundLeaderboardEntries,
  overallLeaderboardEntries,
} from "../db/schema/leaderboards.js";
import { rounds } from "../db/schema/rounds.js";
import { events } from "../db/schema/events.js";
import { teams } from "../db/schema/teams.js";

/**
 * Get leaderboard for a round.
 */
export async function getRoundLeaderboard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { roundId } = request.params as {
    roundId: string;
  };

  const round = await db.query.rounds.findFirst({
    where: eq(rounds.id, roundId),
  });

  if (!round) {
    return reply.code(404).send({
      message: "Round not found",
    });
  }

  const leaderboard = await db
    .select({
      id: roundLeaderboardEntries.id,
      teamId: roundLeaderboardEntries.teamId,
      teamCode: teams.teamCode,
      rank: roundLeaderboardEntries.rank,
      points: roundLeaderboardEntries.points,
      updatedAt: roundLeaderboardEntries.updatedAt,
    })
    .from(roundLeaderboardEntries)
    .innerJoin(
      teams,
      eq(roundLeaderboardEntries.teamId, teams.id),
    )
    .where(eq(roundLeaderboardEntries.roundId, roundId))
    .orderBy(
      asc(roundLeaderboardEntries.rank),
      asc(roundLeaderboardEntries.id),
    );

  return reply.send({
    roundId,
    leaderboard,
  });
}

/**
 * Get overall leaderboard for an event.
 */
export async function getEventLeaderboard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { eventId } = request.params as {
    eventId: string;
  };

  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!event) {
    return reply.code(404).send({
      message: "Event not found",
    });
  }

  const leaderboard = await db
    .select({
      id: overallLeaderboardEntries.id,
      teamId: overallLeaderboardEntries.teamId,
      teamCode: teams.teamCode,
      rank: overallLeaderboardEntries.rank,
      points: overallLeaderboardEntries.points,
      updatedAt: overallLeaderboardEntries.updatedAt,
    })
    .from(overallLeaderboardEntries)
    .innerJoin(
      teams,
      eq(overallLeaderboardEntries.teamId, teams.id),
    )
    .where(
      eq(
        overallLeaderboardEntries.megaEventId,
        event.megaEventId,
      ),
    )
    .orderBy(
      asc(overallLeaderboardEntries.rank),
      asc(overallLeaderboardEntries.id),
    );

  return reply.send({
    eventId,
    megaEventId: event.megaEventId,
    leaderboard,
  });
}