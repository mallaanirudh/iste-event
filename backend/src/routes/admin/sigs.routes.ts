import type { FastifyInstance } from "fastify";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";

import {
  getAdminSigs,
  createSig,
  updateSig,
  deleteSig,
} from "../../controllers/admin/admin.sig.controller.js";

import {
  createSigSchema,
  updateSigSchema,
} from "../../schemas/admin/sig.schema.js";

export async function adminSigRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  app.get(
    "/",
    getAdminSigs,
  );

  app.post(
    "/",
    {
      schema: createSigSchema,
    },
    createSig,
  );

  app.patch(
    "/:sigId",
    {
      schema: updateSigSchema,
    },
    updateSig,
  );

  app.delete(
    "/:sigId",
    deleteSig,
  );
}