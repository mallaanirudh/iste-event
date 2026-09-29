import Link from "next/link";
import { getPublishedLeaderboard } from "@/app/actions/scoring";

export const revalidate = 0;

export default async function HomePage() {
  const { data: leaderboard = [] } = await getPublishedLeaderboard();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              ME
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Mega Event Portal</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/register" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Register Team
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors">
              Portal Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-950/60 border border-indigo-800/50 rounded-full">
            Annual Flagship Championship
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Compete. Conquer. Claim Victory.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Join 3-member teams or register as a solo warrior. Battle through Scotland Yard & Square One rounds for the ultimate leaderboard glory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 rounded-xl shadow-lg shadow-indigo-500/25 transition-all">
              Register Now (Team / Solo)
            </Link>
            <Link href="#schedule" className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white rounded-xl transition-all">
              View Schedule & Rules
            </Link>
          </div>
        </div>
      </section>

      {/* Live Published Leaderboard */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Official Leaderboard Snapshot</h2>
            <p className="text-slate-400">Published official standings verified by Event Coordinators.</p>
          </div>
        </div>

        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          {!leaderboard || leaderboard.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No official leaderboard snapshot published yet. Check back after Round 1!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-xs tracking-wider">
                    <th className="py-4 px-6 font-semibold">Rank</th>
                    <th className="py-4 px-6 font-semibold">Team Code</th>
                    <th className="py-4 px-6 font-semibold">Scotland Yard Score</th>
                    <th className="py-4 px-6 font-semibold text-right">Total Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leaderboard.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-white">
                        {item.rank === 1 && <span className="mr-2">🥇</span>}
                        {item.rank === 2 && <span className="mr-2">🥈</span>}
                        {item.rank === 3 && <span className="mr-2">🥉</span>}
                        #{item.rank}
                      </td>
                      <td className="py-4 px-6 font-semibold text-indigo-400">{item.teamCode}</td>
                      <td className="py-4 px-6 text-slate-300">{item.syScore} pts</td>
                      <td className="py-4 px-6 text-right font-extrabold text-white text-base">{item.totalScore} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Schedule, Venues & Dispute Flow */}
      <section id="schedule" className="py-16 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Interactive Dispute Flow */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Grievance & Dispute Flow</h3>
            <p className="text-slate-400 text-sm mb-6">Structured escalation protocol for score verifications and rule clarifications:</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="h-8 w-8 rounded-full bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center text-xs">1</div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Point of Contact (POC)</h4>
                  <p className="text-xs text-slate-400">First-level score entry & misconduct reporting at venue.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="h-8 w-8 rounded-full bg-violet-950 text-violet-400 font-bold flex items-center justify-center text-xs">2</div>
                <div>
                  <h4 className="text-sm font-semibold text-white">SIG Head Review</h4>
                  <p className="text-xs text-slate-400">Verification of duo bonuses and disputed round points.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="h-8 w-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-xs">3</div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Events Coordinator Ruling</h4>
                  <p className="text-xs text-slate-400">Final binding decision and leaderboard manual override.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule & Venues */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">Event Schedule & Venues</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white">Round 1: Square One</span>
                  <span className="text-xs text-indigo-400 font-semibold">10:00 AM - 12:00 PM</span>
                </div>
                <p className="text-xs text-slate-400">Venue: Main Auditorium | Max Points: 60 (Bonus: 10)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white">Round 2: Scotland Yard</span>
                  <span className="text-xs text-indigo-400 font-semibold">02:00 PM - 05:00 PM</span>
                </div>
                <p className="text-xs text-slate-400">Venue: Campus Grounds | Max Points: 20 (Tiebreaker Multiplier)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
