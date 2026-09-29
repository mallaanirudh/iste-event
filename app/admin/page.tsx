import { db } from "@/db";
import { participants, teams } from "@/db/schema";
import { eq, isNull, and } from "drizzle-orm";
import AdminConsoleClient from "./AdminConsoleClient";

export const revalidate = 0;

export default async function AdminPage() {
  const unassignedSolos = await db
    .select()
    .from(participants)
    .where(and(eq(participants.isIndividualRegistration, true), isNull(participants.teamId)));

  const allTeams = await db.select().from(teams);

  return <AdminConsoleClient unassignedSolos={unassignedSolos} allTeams={allTeams} />;
}
