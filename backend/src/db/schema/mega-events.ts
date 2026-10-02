import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const megaEvents = pgTable("mega_events", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: varchar("name", {
    length: 150,
  }).notNull(),

  description: text("description"),

  registrationOpenAt: timestamp("registration_open_at", {
    withTimezone: true,
  }),

  registrationCloseAt: timestamp("registration_close_at", {
    withTimezone: true,
  }),

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