import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import { createAuditLog } from "../../services/audit-log.js";
import { db } from "../../db/index.js";
import {
  events,
  megaEvents,
  sigs,
} from "../../db/schema/index.js";

type CreateEventBody = {
  megaEventId: string;
  sigId: string;
  name: string;
  description?: string;
};

type UpdateEventBody = {
  megaEventId?: string;
  sigId?: string;
  name?: string;
  description?: string;
};

type EventParams = {
  eventId: string;
};

export async function createEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const {
    megaEventId,
    sigId,
    name,
    description,
  } = request.body as CreateEventBody;

  // Verify Mega Event exists
  const megaEvent = await db.query.megaEvents.findFirst({
    where: eq(megaEvents.id, megaEventId),
  });

  if (!megaEvent) {
    return reply.code(404).send({
      message: "Mega event not found",
    });
  }

  // Verify SIG exists
  const sig = await db.query.sigs.findFirst({
    where: eq(sigs.id, sigId),
  });

  if (!sig) {
    return reply.code(404).send({
      message: "SIG not found",
    });
  }

  const [event] = await db
    .insert(events)
    .values({
      megaEventId,
      sigId,
      name: name.trim(),
      description: description?.trim() || null,
    })
    .returning();
    if (!event) {
  return reply.code(500).send({
    message: "Failed to create event",
  });
}
  await createAuditLog({
  actorId: request.user!.id,
  action: "CREATE",
  entityType: "event",
  entityId: event.id,
  newData: event,
});
  return reply.code(201).send({
    event,
  });
}

export async function updateEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { eventId } = request.params as EventParams;

  const body = request.body as UpdateEventBody;

  const existingEvent = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!existingEvent) {
    return reply.code(404).send({
      message: "Event not found",
    });
  }

  if (body.megaEventId) {
    const megaEvent = await db.query.megaEvents.findFirst({
      where: eq(megaEvents.id, body.megaEventId),
    });

    if (!megaEvent) {
      return reply.code(404).send({
        message: "Mega event not found",
      });
    }
  }

  if (body.sigId) {
    const sig = await db.query.sigs.findFirst({
      where: eq(sigs.id, body.sigId),
    });

    if (!sig) {
      return reply.code(404).send({
        message: "SIG not found",
      });
    }
  }

  const [event] = await db
    .update(events)
    .set({
      ...(body.megaEventId !== undefined && {
        megaEventId: body.megaEventId,
      }),

      ...(body.sigId !== undefined && {
        sigId: body.sigId,
      }),

      ...(body.name !== undefined && {
        name: body.name.trim(),
      }),

      ...(body.description !== undefined && {
        description: body.description.trim() || null,
      }),

      updatedAt: new Date(),
    })
    .where(eq(events.id, eventId))
    .returning();
  if (!event) {
  return reply.code(500).send({
    message: "Failed to update event",
  });
}

await createAuditLog({
  actorId: request.user!.id,
  action: "UPDATE",
  entityType: "event",
  entityId: eventId,
  oldData: existingEvent,
  newData: event,
});
  return reply.send({
    event,
  });
}

export async function deleteEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { eventId } = request.params as EventParams;

  const existingEvent = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!existingEvent) {
    return reply.code(404).send({
      message: "Event not found",
    });
  }

  await db
    .delete(events)
    .where(eq(events.id, eventId));

  return reply.send({
    message: "Event deleted successfully",
  });
}

export async function getAdminEvents(
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
    );

  return reply.send({
    events: result,
  });
}