import type { FastifyInstance } from "fastify";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";

import { getAuditLogs } from "../../controllers/admin/admin.audit-log.controller.js";
import { getAuditLogsSchema } from "../../schemas/admin/admin.audit-log.js";

export async function adminAuditLogRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  app.get(
    "/",
    {
      schema: getAuditLogsSchema,
    },
    getAuditLogs,
  );
}