import type { FastifyInstance } from "fastify";

import {
  createEvent,
  deleteEvent,
  getAdminEvents,
  updateEvent,
} from "../../controllers/admin/event.admin.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";

import {
  createEventSchema,
  updateEventSchema,
} from "../../schemas/admin/admin.event.schema.js";

export async function adminEventRoutes(
  app: FastifyInstance,
) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  app.get("/", getAdminEvents);

  app.post(
    "/",
    {
      schema: createEventSchema,
    },
    createEvent,
  );

  app.patch(
    "/:eventId",
    {
      schema: updateEventSchema,
    },
    updateEvent,
  );

  app.delete(
    "/:eventId",
    deleteEvent,
  );
}