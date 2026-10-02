import {
  createHash,
  randomBytes,
  randomUUID,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyCookie from '@fastify/cookie';
import { db } from "../db/index.js";
import { sessions, users } from "../db/schema/index.js";
const scryptAsync = promisify(scrypt);

const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

type AuthBody = {
  username: string;
  password: string;
};

function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");

  const derivedKey = (await scryptAsync(
    password,
    salt,
    64,
  )) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
}

async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  const derivedKey = (await scryptAsync(
    password,
    salt,
    64,
  )) as Buffer;

  const storedKey = Buffer.from(key, "hex");

  if (derivedKey.length !== storedKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, storedKey);
}

async function createSession(
  userId: string,
  reply: FastifyReply,
): Promise<void> {
  const token = randomUUID() + randomBytes(32).toString("hex");

  const tokenHash = hashSessionToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_MS,
  );

  await db.insert(sessions).values({
    tokenHash,
    userId,
    expiresAt,
  });

  reply.setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function register(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { username, password } = request.body as AuthBody;

  const normalizedUsername = username.trim().toLowerCase();

  if (!normalizedUsername || !password) {
    return reply.code(400).send({
      message: "Username and password are required",
    });
  }

  if (normalizedUsername.length > 50) {
    return reply.code(400).send({
      message: "Username must be at most 50 characters",
    });
  }

  if (password.length < 8) {
    return reply.code(400).send({
      message: "Password must be at least 8 characters",
    });
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, normalizedUsername),
  });

  if (existingUser) {
    return reply.code(409).send({
      message: "Username already exists",
    });
  }

  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values({
      username: normalizedUsername,
      passwordHash,
    })
    .returning({
      id: users.id,
      username: users.username,
      role: users.role,
    });

  if (!user) {
    return reply.code(500).send({
      message: "Failed to create user",
    });
  }

  await createSession(user.id, reply);

  return reply.code(201).send({
    user,
  });
}

export async function login(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { username, password } = request.body as AuthBody;

  const normalizedUsername = username.trim().toLowerCase();

  const user = await db.query.users.findFirst({
    where: eq(users.username, normalizedUsername),
  });

  if (!user) {
    return reply.code(401).send({
      message: "Invalid username or password",
    });
  }

  const validPassword = await verifyPassword(
    password,
    user.passwordHash,
  );

  if (!validPassword) {
    return reply.code(401).send({
      message: "Invalid username or password",
    });
  }

  await createSession(user.id, reply);

  return reply.send({
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
}

export async function logout(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const token = request.cookies[SESSION_COOKIE];

  if (token) {
    const tokenHash = hashSessionToken(token);

    await db
      .delete(sessions)
      .where(eq(sessions.tokenHash, tokenHash));
  }

  reply.clearCookie(SESSION_COOKIE, {
    path: "/",
  });

  return reply.send({
    message: "Logged out successfully",
  });
}

export async function me(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = (request as FastifyRequest & {
    user: {
      id: string;
      username: string;
      role: "participant" | "admin";
    };
  }).user;

  return reply.send({
    user,
  });
}