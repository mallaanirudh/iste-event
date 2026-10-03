import type { FastifyInstance } from "fastify";

import {
  getPublicMegaEvents,
  getPublicMegaEvent,
  getPublicEvents,
  getPublicEvent,
  getPublicEventRounds,
  getPublicRound,
} from "../controllers/public.controller.js";

import {
  megaEventParamsSchema,
  eventParamsSchema,
  roundParamsSchema,
} from "../schemas/public.schema.js";

export async function publicRoutes(app: FastifyInstance) {

  // ==========================================================
  // MEGA EVENTS
  // ==========================================================

  app.get(
    "/mega-events",
    getPublicMegaEvents,
  );

  app.get(
    "/mega-events/:megaEventId",
    {
      schema: megaEventParamsSchema,
    },
    getPublicMegaEvent,
  );


  // ==========================================================
  // EVENTS
  // ==========================================================

  app.get(
    "/events",
    getPublicEvents,
  );

  app.get(
    "/events/:eventId",
    {
      schema: eventParamsSchema,
    },
    getPublicEvent,
  );

  app.get(
    "/events/:eventId/rounds",
    {
      schema: eventParamsSchema,
    },
    getPublicEventRounds,
  );


  // ==========================================================
  // ROUNDS
  // ==========================================================

  app.get(
    "/rounds/:roundId",
    {
      schema: roundParamsSchema,
    },
    getPublicRound,
  );
}