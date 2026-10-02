import type { FastifyInstance } from "fastify";

import {
  createRound,
  deleteRound,
  getAdminRounds,
  updateRound,
} from "../../controllers/admin/round.admin.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { requireAdmin } from "../../middleware/admin.middleware.js";

import {
  createRoundSchema,
  updateRoundSchema,
} from "../../schemas/admin/round.schema.js";

export async function adminRoundRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  // GET all rounds for an event
  app.get(
    "/events/:eventId/rounds",
    getAdminRounds,
  );

  // CREATE round
  app.post(
    "/events/:eventId/rounds",
    {
      schema: createRoundSchema,
    },
    createRound,
  );

  // UPDATE round
  app.patch(
    "/rounds/:roundId",
    {
      schema: updateRoundSchema,
    },
    updateRound,
  );

  // DELETE round
  app.delete(
    "/rounds/:roundId",
    deleteRound,
  );
}