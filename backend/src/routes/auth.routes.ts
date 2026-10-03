import type { FastifyInstance } from "fastify";

import {
  login,
  logout,
  me,
  register,
} from "../controllers/auth.controllers.js";

import { authenticate } from "../middleware/auth.middleware.js";

import {
  loginSchema,
  registerSchema,
} from "../schemas/auth.schemas.js";

export async function authRoutes(
  app: FastifyInstance,
) {
  app.post(
    "/register",
    {
      schema: registerSchema,
    },
    register,
  );

  app.post(
    "/login",
    {
      schema: loginSchema,
    },
    login,
  );

  app.post(
    "/logout",
    {
      preHandler: authenticate,
    },
    logout,
  );

  app.get(
    "/me",
    {
      preHandler: authenticate,
    },
    me,
  );
}