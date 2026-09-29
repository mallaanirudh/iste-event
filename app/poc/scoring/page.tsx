import { db } from "@/db";
import { eventsSig, teams } from "@/db/schema";
import PocScoringPage from "./PocScoringPage";

export const revalidate = 0;

export default async function Page() {
  const events = await db.select().from(eventsSig);
  const teamsList = await db.select().from(teams);

  return <PocScoringPage events={events} teamsList={teamsList} />;
}
