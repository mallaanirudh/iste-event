import type { FastifyInstance } from "fastify";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";

import {
  getAdminMegaEvents,
  createMegaEvent,
  updateMegaEvent,
  deleteMegaEvent,
} from "../../controllers/admin/admin.mega-event.controller.js";

import {
  createMegaEventSchema,
  updateMegaEventSchema,
} from "../../schemas/admin/mega-event.schemas.js";

export async function adminMegaEventRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  app.get("/", getAdminMegaEvents);

  app.post(
    "/",
    {
      schema: createMegaEventSchema,
    },
    createMegaEvent,
  );

  app.patch(
    "/:megaEventId",
    {
      schema: updateMegaEventSchema,
    },
    updateMegaEvent,
  );

  app.delete(
    "/:megaEventId",
    deleteMegaEvent,
  );
}