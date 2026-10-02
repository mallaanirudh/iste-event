import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";

import { db } from "../../db/index.js";
import { megaEvents } from "../../db/schema/index.js";

type CreateMegaEventBody = {
  name: string;
  description?: string;
  registrationOpenAt?: string;
  registrationCloseAt?: string;
};

type UpdateMegaEventBody = {
  name?: string;
  description?: string;
  registrationOpenAt?: string;
  registrationCloseAt?: string;
};

type MegaEventParams = {
  megaEventId: string;
};

export async function getAdminMegaEvents(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const result = await db
    .select()
    .from(megaEvents);

  return reply.send({
    megaEvents: result,
  });
}

export async function createMegaEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body as CreateMegaEventBody;

  if (
    body.registrationOpenAt &&
    body.registrationCloseAt &&
    new Date(body.registrationOpenAt) >= new Date(body.registrationCloseAt)
  ) {
    return reply.code(400).send({
      message: "Registration open time must be before registration close time",
    });
  }

  const [megaEvent] = await db
    .insert(megaEvents)
    .values({
      name: body.name.trim(),
      description: body.description?.trim() || null,
      registrationOpenAt: body.registrationOpenAt
        ? new Date(body.registrationOpenAt)
        : null,
      registrationCloseAt: body.registrationCloseAt
        ? new Date(body.registrationCloseAt)
        : null,
    })
    .returning();

  if (!megaEvent) {
    return reply.code(500).send({
      message: "Failed to create mega event",
    });
  }

  return reply.code(201).send({
    megaEvent,
  });
}

export async function updateMegaEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { megaEventId } = request.params as MegaEventParams;
  const body = request.body as UpdateMegaEventBody;

  const existingMegaEvent = await db.query.megaEvents.findFirst({
    where: eq(megaEvents.id, megaEventId),
  });

  if (!existingMegaEvent) {
    return reply.code(404).send({
      message: "Mega event not found",
    });
  }

  const openAt =
    body.registrationOpenAt !== undefined
      ? body.registrationOpenAt
        ? new Date(body.registrationOpenAt)
        : null
      : existingMegaEvent.registrationOpenAt;

  const closeAt =
    body.registrationCloseAt !== undefined
      ? body.registrationCloseAt
        ? new Date(body.registrationCloseAt)
        : null
      : existingMegaEvent.registrationCloseAt;

  if (openAt && closeAt && openAt >= closeAt) {
    return reply.code(400).send({
      message: "Registration open time must be before registration close time",
    });
  }

  const [megaEvent] = await db
    .update(megaEvents)
    .set({
      ...(body.name !== undefined && {
        name: body.name.trim(),
      }),

      ...(body.description !== undefined && {
        description: body.description.trim() || null,
      }),

      ...(body.registrationOpenAt !== undefined && {
        registrationOpenAt: body.registrationOpenAt
          ? new Date(body.registrationOpenAt)
          : null,
      }),

      ...(body.registrationCloseAt !== undefined && {
        registrationCloseAt: body.registrationCloseAt
          ? new Date(body.registrationCloseAt)
          : null,
      }),

      updatedAt: new Date(),
    })
    .where(eq(megaEvents.id, megaEventId))
    .returning();

  if (!megaEvent) {
    return reply.code(500).send({
      message: "Failed to update mega event",
    });
  }

  return reply.send({
    megaEvent,
  });
}

export async function deleteMegaEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { megaEventId } = request.params as MegaEventParams;

  const existingMegaEvent = await db.query.megaEvents.findFirst({
    where: eq(megaEvents.id, megaEventId),
  });

  if (!existingMegaEvent) {
    return reply.code(404).send({
      message: "Mega event not found",
    });
  }

  await db
    .delete(megaEvents)
    .where(eq(megaEvents.id, megaEventId));

  return reply.send({
    message: "Mega event deleted successfully",
  });
}