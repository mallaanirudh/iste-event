import { EventNavbar } from "@/components/navigation/event-navbar";
import { REGISTRATION_URL } from "@/data/registration";
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
      <EventNavbar
        event="concrete"
        label="Concrete"
        topHref="#concrete-top"
        homeHref="/#chamber-concrete-sq1"
        items={[
          { label: "Briefing", href: "#briefing" },
          { label: "Rounds", href: "#dispatch" },
          { label: "Standings", href: "#manifest" },
        ]}
        action={{ label: "Register", href: REGISTRATION_URL, external: true }}
      />
      <main id="concrete-top" className="relative">
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
