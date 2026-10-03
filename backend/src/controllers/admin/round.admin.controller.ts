import { eq, and } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../db/index.js";
import { events, rounds } from "../../db/schema/index.js";

type CreateRoundBody = {
  eventId: string;
  roundNumber: number;
  name: string;
  description?: string;
  maxPoints?: number;
};

type UpdateRoundBody = {
  roundNumber?: number;
  name?: string;
  description?: string;
  maxPoints?: number;
};

type RoundParams = {
  roundId: string;
};

type EventParams = {
  eventId: string;
};

export async function getAdminRounds(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { eventId } = request.params as EventParams;

  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!event) {
    return reply.code(404).send({
      message: "Event not found",
    });
  }

  const result = await db
    .select()
    .from(rounds)
    .where(eq(rounds.eventId, eventId))
    .orderBy(rounds.roundNumber);

  return reply.send({
    rounds: result,
  });
}

export async function createRound(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { eventId } = request.params as {
    eventId: string;
  };

  const {
    roundNumber,
    name,
    description,
    maxPoints,
  } = request.body as {
    roundNumber: number;
    name: string;
    description?: string;
    maxPoints?: number;
  };

  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!event) {
    return reply.code(404).send({
      message: "Event not found",
    });
  }

  const existingRound = await db.query.rounds.findFirst({
    where: and(
      eq(rounds.eventId, eventId),
      eq(rounds.roundNumber, roundNumber),
    ),
  });

  if (existingRound) {
    return reply.code(409).send({
      message: "Round number already exists for this event",
    });
  }

  const [round] = await db
    .insert(rounds)
    .values({
      eventId,
      roundNumber,
      name: name.trim(),
      description: description?.trim() || null,
      maxPoints: maxPoints ?? null,
    })
    .returning();

  return reply.code(201).send({
    round,
  });
}
export async function updateRound(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { roundId } = request.params as RoundParams;
  const body = request.body as UpdateRoundBody;

  const existingRound = await db.query.rounds.findFirst({
    where: eq(rounds.id, roundId),
  });

  if (!existingRound) {
    return reply.code(404).send({
      message: "Round not found",
    });
  }

  if (body.roundNumber !== undefined) {
    const duplicate = await db.query.rounds.findFirst({
      where: and(
        eq(rounds.eventId, existingRound.eventId),
        eq(rounds.roundNumber, body.roundNumber),
      ),
    });

    if (duplicate && duplicate.id !== roundId) {
      return reply.code(409).send({
        message: "Round number already exists for this event",
      });
    }
  }

  const [round] = await db
    .update(rounds)
    .set({
      ...(body.roundNumber !== undefined && {
        roundNumber: body.roundNumber,
      }),
      ...(body.name !== undefined && {
        name: body.name.trim(),
      }),
      ...(body.description !== undefined && {
        description: body.description.trim() || null,
      }),
      ...(body.maxPoints !== undefined && {
        maxPoints: body.maxPoints,
      }),
      updatedAt: new Date(),
    })
    .where(eq(rounds.id, roundId))
    .returning();

  return reply.send({
    round,
  });
}

export async function deleteRound(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { roundId } = request.params as RoundParams;

  const existingRound = await db.query.rounds.findFirst({
    where: eq(rounds.id, roundId),
  });

  if (!existingRound) {
    return reply.code(404).send({
      message: "Round not found",
    });
  }

  await db
    .delete(rounds)
    .where(eq(rounds.id, roundId));

  return reply.send({
    message: "Round deleted successfully",
  });
}