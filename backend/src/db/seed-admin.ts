import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

import { eq } from "drizzle-orm";

import { db } from "./index.js";
import { users } from "./schema/index.js";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");

  const derivedKey = (await scryptAsync(
    password,
    salt,
    64,
  )) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
}

async function seedAdmin() {
  const username = "admin";
  const password = "admin123";

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    if (existingUser.role !== "admin") {
      await db
        .update(users)
        .set({
          role: "admin",
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser.id));

      console.log(`User "${username}" promoted to admin.`);
    } else {
      console.log(`User "${username}" is already an admin.`);
    }

    return;
  }

  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    username,
    passwordHash,
    role: "admin",
  });

  console.log(`Admin user "${username}" created.`);
}

seedAdmin()
  .catch((error) => {
    console.error("Failed to seed admin:", error);
    process.exit(1);
  });