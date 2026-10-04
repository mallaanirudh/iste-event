import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { megaEvents } from "./mega-events.js";
import { sigs } from "./sigs.js";

export const events = pgTable("events", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  megaEventId: uuid("mega_event_id")
    .notNull()
    .references(() => megaEvents.id, {
      onDelete: "cascade",
    }),

  sigId: uuid("sig_id")
    .notNull()
    .references(() => sigs.id),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  description: text("description"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});