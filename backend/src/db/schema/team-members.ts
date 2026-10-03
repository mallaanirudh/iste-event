import {
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { participants } from "./participants.js";
import { teams } from "./teams.js";

export const teamMembers = pgTable(
  "team_members",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, {
        onDelete: "cascade",
      }),

    participantId: uuid("participant_id")
      .notNull()
      .references(() => participants.id),

    joinedAt: timestamp("joined_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    leftAt: timestamp("left_at", {
      withTimezone: true,
    }),
  },

  (table) => [
    unique("team_participant_unique").on(
      table.teamId,
      table.participantId,
    ),
  ],
);