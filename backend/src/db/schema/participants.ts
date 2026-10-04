import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const participants = pgTable("participants", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  name: varchar("name", {
    length: 100,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  }).notNull().unique(),

  phone: varchar("phone", {
    length: 20,
  }),

  rollNumber: varchar("roll_number", {
    length: 50,
  }).unique(),

  branch: varchar("branch", {
    length: 100,
  }),

  year: varchar("year", {
    length: 20,
  }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});