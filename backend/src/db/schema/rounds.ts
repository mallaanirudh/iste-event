import {
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { events } from "./events.js";

export const rounds = pgTable(
  "rounds",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, {
        onDelete: "cascade",
      }),

    roundNumber: integer("round_number")
      .notNull(),

    name: varchar("name", {
      length: 150,
    }).notNull(),

    description: text("description"),

    maxPoints: integer("max_points"),

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
  },

  (table) => [
    unique("event_round_number_unique").on(
      table.eventId,
      table.roundNumber,
    ),
  ],
);