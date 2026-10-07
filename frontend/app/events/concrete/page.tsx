import Link from "next/link";
import { ArrowLeft, Anchor } from "lucide-react";
import { Hero } from "@/ConcretClutchComponents/titanic/hero";
import { Storyline } from "@/ConcretClutchComponents/titanic/storyline";
import { Rounds } from "@/ConcretClutchComponents/titanic/rounds";
import { Registration } from "@/ConcretClutchComponents/titanic/registration";
import { Leaderboard } from "@/ConcretClutchComponents/titanic/leaderboard";
import { CaptainsLog } from "@/ConcretClutchComponents/titanic/captains-log";
import { OceanBackground } from "@/ConcretClutchComponents/titanic/ocean-background";

export default function Page() {
  return (
    <>
      <OceanBackground />
      <nav
        aria-label="Concrete event navigation"
        className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 text-xs font-bold text-ink"
      >
        <Link
          href="/#chamber-concrete-sq1"
          className="inline-flex min-h-11 items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to FeISTEval
        </Link>
        <div className="flex flex-wrap items-center gap-5">
          <a className="inline-flex min-h-11 items-center" href="#briefing">Briefing</a>
          <a className="inline-flex min-h-11 items-center" href="#dispatch">Rounds</a>
          <a className="inline-flex min-h-11 items-center" href="#register">Boarding pass</a>
          <span className="inline-flex items-center gap-2 text-crimson">
            <Anchor size={15} /> SIG: Concrete
          </span>
        </div>
      </nav>
      <main className="relative">
        <Hero />
        <Storyline />
        <Rounds />
        <Registration />
        <Leaderboard />
      </main>
      <CaptainsLog />
    </>
  );
}
