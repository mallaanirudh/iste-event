import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { megaEvents } from "./mega-events.js";

export const teams = pgTable("teams", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  megaEventId: uuid("mega_event_id")
    .notNull()
    .references(() => megaEvents.id, {
      onDelete: "cascade",
    }),

  teamCode: varchar("team_code", {
    length: 30,
  })
    .notNull()
    .unique(),

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