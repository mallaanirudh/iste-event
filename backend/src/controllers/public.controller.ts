import { eq, asc } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../db/client.js";

import { megaEvents } from "../db/schema/mega-events.js";
import { events } from "../db/schema/events.js";
import { rounds } from "../db/schema/rounds.js";
import { sigs } from "../db/schema/sigs.js";


// ============================================================
// MEGA EVENTS
// ============================================================

export async function getPublicMegaEvents(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const result = await db
    .select()
    .from(megaEvents)
    .orderBy(asc(megaEvents.createdAt));

  return reply.send({
    megaEvents: result,
  });
}


export async function getPublicMegaEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { megaEventId } = request.params as {
    megaEventId: string;
  };

  const megaEvent = await db.query.megaEvents.findFirst({
    where: eq(megaEvents.id, megaEventId),
  });

  if (!megaEvent) {
    return reply.code(404).send({
      message: "Mega event not found",
    });
  }

  return reply.send({
    megaEvent,
  });
}


// ============================================================
// EVENTS
// ============================================================

export async function getPublicEvents(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const result = await db
    .select({
      id: events.id,
      name: events.name,
      description: events.description,

      megaEventId: megaEvents.id,
      megaEventName: megaEvents.name,

      sigId: sigs.id,
      sigName: sigs.name,

      createdAt: events.createdAt,
      updatedAt: events.updatedAt,
    })
    .from(events)
    .innerJoin(
      megaEvents,
      eq(events.megaEventId, megaEvents.id),
    )
    .innerJoin(
      sigs,
      eq(events.sigId, sigs.id),
    )
    .orderBy(asc(events.createdAt));

  return reply.send({
    events: result,
  });
}


export async function getPublicEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { eventId } = request.params as {
    eventId: string;
  };

  const result = await db
    .select({
      id: events.id,
      name: events.name,
      description: events.description,

      megaEventId: megaEvents.id,
      megaEventName: megaEvents.name,

      sigId: sigs.id,
      sigName: sigs.name,

      createdAt: events.createdAt,
      updatedAt: events.updatedAt,
    })
    .from(events)
    .innerJoin(
      megaEvents,
      eq(events.megaEventId, megaEvents.id),
    )
    .innerJoin(
      sigs,
      eq(events.sigId, sigs.id),
    )
    .where(eq(events.id, eventId));

  if (result.length === 0) {
    return reply.code(404).send({
      message: "Event not found",
    });
  }

  return reply.send({
    event: result[0],
  });
}


export async function getPublicEventRounds(
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

  const result = await db
    .select()
    .from(rounds)
    .where(eq(rounds.eventId, eventId))
    .orderBy(asc(rounds.roundNumber));

  return reply.send({
    eventId,
    rounds: result,
  });
}


// ============================================================
// ROUND
// ============================================================

export async function getPublicRound(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { roundId } = request.params as {
    roundId: string;
  };

  const result = await db
    .select({
      id: rounds.id,
      roundNumber: rounds.roundNumber,
      name: rounds.name,
      description: rounds.description,
      maxPoints: rounds.maxPoints,

      eventId: events.id,
      eventName: events.name,

      megaEventId: megaEvents.id,
      megaEventName: megaEvents.name,

      createdAt: rounds.createdAt,
      updatedAt: rounds.updatedAt,
    })
    .from(rounds)
    .innerJoin(
      events,
      eq(rounds.eventId, events.id),
    )
    .innerJoin(
      megaEvents,
      eq(events.megaEventId, megaEvents.id),
    )
    .where(eq(rounds.id, roundId));

  if (result.length === 0) {
    return reply.code(404).send({
      message: "Round not found",
    });
  }

  return reply.send({
    round: result[0],
  });
}