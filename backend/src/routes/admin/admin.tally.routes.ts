import type { FastifyInstance } from "fastify";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";

import { getTallySubmissions } from "../../controllers/admin/admin.tally.controller.js";
import { getTallySubmissionsSchema } from "../../schemas/tally.schemas.js";

export async function adminTallyRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  app.get(
    "/registrations",
    {
      schema: getTallySubmissionsSchema,
    },
    getTallySubmissions,
  );
}