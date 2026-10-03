import { and, eq, inArray } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../db/client.js";
import {
  roundLeaderboardEntries,
  overallLeaderboardEntries,
} from "../../db/schema/leaderboards.js";
import { rounds } from "../../db/schema/rounds.js";
import { teams } from "../../db/schema/teams.js";
import { megaEvents } from "../../db/schema/mega-events.js";
import { events } from "../../db/schema/events.js";

type LeaderboardEntry = {
  teamId: string;
  rank?: number;
  points: number;
};

type LeaderboardBody = {
  entries: LeaderboardEntry[];
};

/**
 * Update a round leaderboard.
 */
export async function updateRoundLeaderboard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { roundId } = request.params as { roundId: string };

  const { entries } = request.body as LeaderboardBody;

  // Check round exists
  const round = await db.query.rounds.findFirst({
    where: eq(rounds.id, roundId),
  });

  if (!round) {
    return reply.code(404).send({
      message: "Round not found",
    });
  }

  // Get event to determine the mega event
  const event = await db.query.events.findFirst({
    where: eq(events.id, round.eventId),
  });

  if (!event) {
    return reply.code(404).send({
      message: "Event not found",
    });
  }

  // Validate team IDs
  const teamIds = entries.map((entry) => entry.teamId);

  if (new Set(teamIds).size !== teamIds.length) {
    return reply.code(400).send({
      message: "Duplicate team IDs are not allowed",
    });
  }

  if (teamIds.length > 0) {
    const validTeams = await db
      .select({
        id: teams.id,
      })
      .from(teams)
      .where(
        and(
          inArray(teams.id, teamIds),
          eq(teams.megaEventId, event.megaEventId),
        ),
      );

    const validTeamIds = new Set(validTeams.map((team) => team.id));

    const invalidTeamIds = teamIds.filter(
      (teamId) => !validTeamIds.has(teamId),
    );

    if (invalidTeamIds.length > 0) {
      return reply.code(400).send({
        message: "One or more teams do not belong to this event",
        invalidTeamIds,
      });
    }
  }

  const updatedBy = request.user!.id;

  await db.transaction(async (tx) => {
    await tx
      .delete(roundLeaderboardEntries)
      .where(eq(roundLeaderboardEntries.roundId, roundId));

    if (entries.length > 0) {
      await tx.insert(roundLeaderboardEntries).values(
        entries.map((entry) => ({
          roundId,
          teamId: entry.teamId,
          rank: entry.rank ?? null,
          points: entry.points,
          updatedBy,
        })),
      );
    }
  });

  return reply.send({
    message: "Round leaderboard updated successfully",
  });
}

/**
 * Update the overall mega-event leaderboard.
 */
export async function updateOverallLeaderboard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { megaEventId } = request.params as {
    megaEventId: string;
  };

  const { entries } = request.body as LeaderboardBody;

  // Check mega event exists
  const megaEvent = await db.query.megaEvents.findFirst({
    where: eq(megaEvents.id, megaEventId),
  });

  if (!megaEvent) {
    return reply.code(404).send({
      message: "Mega event not found",
    });
  }

  const teamIds = entries.map((entry) => entry.teamId);

  if (new Set(teamIds).size !== teamIds.length) {
    return reply.code(400).send({
      message: "Duplicate team IDs are not allowed",
    });
  }

  // Verify all teams belong to this mega event
  if (teamIds.length > 0) {
    const validTeams = await db
      .select({
        id: teams.id,
      })
      .from(teams)
      .where(
        and(
          inArray(teams.id, teamIds),
          eq(teams.megaEventId, megaEventId),
        ),
      );

    const validTeamIds = new Set(validTeams.map((team) => team.id));

    const invalidTeamIds = teamIds.filter(
      (teamId) => !validTeamIds.has(teamId),
    );

    if (invalidTeamIds.length > 0) {
      return reply.code(400).send({
        message: "One or more teams do not belong to this mega event",
        invalidTeamIds,
      });
    }
  }

  const updatedBy = request.user!.id;

  await db.transaction(async (tx) => {
    await tx
      .delete(overallLeaderboardEntries)
      .where(
        eq(overallLeaderboardEntries.megaEventId, megaEventId),
      );

    if (entries.length > 0) {
      await tx.insert(overallLeaderboardEntries).values(
        entries.map((entry) => ({
          megaEventId,
          teamId: entry.teamId,
          rank: entry.rank ?? null,
          points: entry.points,
          updatedBy,
        })),
      );
    }
  });

  return reply.send({
    message: "Overall leaderboard updated successfully",
  });
}