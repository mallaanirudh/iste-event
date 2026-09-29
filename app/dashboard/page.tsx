import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { participants, teams, roundScoresAndAttendance, eventsSig } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function ParticipantDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch participant details
  const [participant] = await db
    .select()
    .from(participants)
    .where(eq(participants.id, user.id));

  let teamInfo = null;
  let teammates: any[] = [];
  let roundScores: any[] = [];

  if (participant?.teamId) {
    [teamInfo] = await db
      .select()
      .from(teams)
      .where(eq(teams.id, participant.teamId));

    teammates = await db
      .select()
      .from(participants)
      .where(eq(participants.teamId, participant.teamId));

    roundScores = await db
      .select({
        id: roundScoresAndAttendance.id,
        eventName: eventsSig.name,
        attendanceMode: roundScoresAndAttendance.attendanceMode,
        syPoints: roundScoresAndAttendance.syPoints,
        sqPoints: roundScoresAndAttendance.sqPoints,
        bonusPoints: roundScoresAndAttendance.bonusPoints,
        penalties: roundScoresAndAttendance.penalties,
        isMisconductFlagged: roundScoresAndAttendance.isMisconductFlagged,
      })
      .from(roundScoresAndAttendance)
      .leftJoin(eventsSig, eq(roundScoresAndAttendance.eventId, eventsSig.id))
      .where(eq(roundScoresAndAttendance.teamId, participant.teamId));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              ME
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Participant Dashboard</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-400 font-medium">{user.email}</span>
            <form action="/login/actions" method="post">
              <Link href="/login" className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700">
                Log Out
              </Link>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Status / Team Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl md:col-span-2">
            <h2 className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-1">Team Overview</h2>
            {teamInfo ? (
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-extrabold text-white">{teamInfo.teamCode}</span>
                  {teamInfo.isAutoGrouped && (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-violet-950 border border-violet-800 text-violet-300 rounded-full">
                      Auto-Grouped Team
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">Teammates:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {teammates.map((member) => (
                      <div key={member.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                        <p className="font-bold text-white mb-0.5">{member.name}</p>
                        <p className="text-slate-400 truncate">{member.email}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">Unassigned Solo Registrant</h3>
                <p className="text-slate-400 text-sm">
                  You are currently in the unassigned registrant pool. Event coordinators will auto-group you into a 3-member team shortly before Round 1 starts!
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2">Participant Info</h2>
              <p className="text-lg font-bold text-white">{participant?.name || "Participant"}</p>
              <p className="text-sm text-slate-400">{participant?.email}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Registration Type</span>
              <span className="font-bold text-slate-200">{participant?.isIndividualRegistration ? "Solo / Individual" : "3-Member Team"}</span>
            </div>
          </div>
        </div>

        {/* Round Scores Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Round Score Breakdown</h2>
          {!roundScores || roundScores.length === 0 ? (
            <p className="text-slate-400 text-sm">No round scores have been recorded for your team yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-xs">
                    <th className="py-3 px-4">Event</th>
                    <th className="py-3 px-4">Attendance</th>
                    <th className="py-3 px-4">Scotland Yard</th>
                    <th className="py-3 px-4">Square One</th>
                    <th className="py-3 px-4">Bonus</th>
                    <th className="py-3 px-4">Penalties</th>
                    <th className="py-3 px-4">Misconduct</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {roundScores.map((score) => (
                    <tr key={score.id} className="hover:bg-slate-800/40">
                      <td className="py-3.5 px-4 font-semibold text-white">{score.eventName || "General Round"}</td>
                      <td className="py-3.5 px-4 text-xs">
                        <span className={`px-2 py-1 rounded-md font-semibold ${
                          score.attendanceMode === "full_3"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : score.attendanceMode === "duo_2_bonus"
                            ? "bg-amber-950 text-amber-300 border border-amber-800"
                            : "bg-red-950 text-red-300 border border-red-800"
                        }`}>
                          {score.attendanceMode === "full_3" ? "Full 3" : score.attendanceMode === "duo_2_bonus" ? "Duo (+2 Bonus)" : "Absent"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{score.syPoints} pts</td>
                      <td className="py-3.5 px-4 text-slate-300">{score.sqPoints} pts</td>
                      <td className="py-3.5 px-4 text-slate-300">+{score.bonusPoints} pts</td>
                      <td className="py-3.5 px-4 text-red-400">-{score.penalties} pts</td>
                      <td className="py-3.5 px-4">
                        {score.isMisconductFlagged ? (
                          <span className="px-2 py-1 text-xs font-bold bg-red-900 text-white rounded">FLAGGED (0 Pts)</span>
                        ) : (
                          <span className="text-xs text-slate-500">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
