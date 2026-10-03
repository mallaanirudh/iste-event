import {
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  actorId: uuid("actor_id")
    .references(() => users.id),

  action: varchar("action", {
    length: 50,
  }).notNull(),

  entityType: varchar("entity_type", {
    length: 50,
  }).notNull(),

  entityId: uuid("entity_id"),

  oldData: jsonb("old_data"),

  newData: jsonb("new_data"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});