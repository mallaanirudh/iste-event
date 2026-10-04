import { FastifyInstance } from "fastify";

import {
  updateRoundLeaderboard,
  updateOverallLeaderboard,
} from "../../controllers/admin/admin.leaderboard.controller.js";

import {authenticate} from "../../middleware/auth.middleware.js";
import {requireAdmin} from "../../middleware/admin.middleware.js"

import { updateLeaderboardSchema } from "../../schemas/leaderboard.schema.js";

export async function adminLeaderboardRoutes(
  app: FastifyInstance,
) {
  app.addHook("preHandler", authenticate);
  app.addHook("preHandler", requireAdmin);

  app.put(
    "/rounds/:roundId/leaderboard",
    {
      schema: updateLeaderboardSchema,
    },
    updateRoundLeaderboard,
  );

  app.put(
    "/mega-events/:megaEventId/leaderboard",
    {
      schema: updateLeaderboardSchema,
    },
    updateOverallLeaderboard,
  );
}