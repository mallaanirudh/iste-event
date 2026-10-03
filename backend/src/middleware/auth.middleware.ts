import { createHash } from "node:crypto";

import { eq, gt } from "drizzle-orm";
import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { db } from "../db/index.js";
import { sessions, users } from "../db/schema/index.js";

const SESSION_COOKIE = "session";

function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const token = request.cookies[SESSION_COOKIE];

  if (!token) {
    return reply.code(401).send({
      message: "Authentication required",
    });
  }

  const tokenHash = hashSessionToken(token);

  const result = await db
    .select({
      userId: users.id,
      username: users.username,
      role: users.role,
      expiresAt: sessions.expiresAt,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.tokenHash, tokenHash))
    .limit(1);

  const session = result[0];

  if (!session) {
    return reply.code(401).send({
      message: "Invalid session",
    });
  }

  if (session.expiresAt <= new Date()) {
    await db
      .delete(sessions)
      .where(eq(sessions.tokenHash, tokenHash));

    return reply.code(401).send({
      message: "Session expired",
    });
  }

  request.user = {
    id: session.userId,
    username: session.username,
    role: session.role,
  };
}