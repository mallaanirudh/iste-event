import { FastifyInstance } from "fastify";

import {
  getRoundLeaderboard,
  getEventLeaderboard,
} from "../controllers/leaderboard.controller.js";

export async function leaderboardRoutes(
  app: FastifyInstance,
) {
  app.get(
    "/rounds/:roundId/leaderboard",
    getRoundLeaderboard,
  );

  app.get(
    "/events/:eventId/leaderboard",
    getEventLeaderboard,
  );
}