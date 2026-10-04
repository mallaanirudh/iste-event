import {
  pgEnum,
  pgTable,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

import { rounds } from "./rounds.js";
import { teams } from "./teams.js";
import { users } from "./users.js";

export const attendanceStatusEnum = pgEnum(
  "attendance_status",
  [
    "present",
    "absent",
    "late",
    "disqualified",
  ],
);

export const attendance = pgTable(
  "attendance",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    roundId: uuid("round_id")
      .notNull()
      .references(() => rounds.id, {
        onDelete: "cascade",
      }),

    teamId: uuid("team_id")
      .notNull()
      .references(() => teams.id, {
        onDelete: "cascade",
      }),

    status: attendanceStatusEnum("status")
      .notNull(),

    recordedBy: uuid("recorded_by")
      .references(() => users.id),

    recordedAt: timestamp("recorded_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },

  (table) => [
    unique("round_team_attendance_unique").on(
      table.roundId,
      table.teamId,
    ),
  ],
);