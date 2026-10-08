"use client";
import { EventNavbar } from "@/components/navigation/event-navbar";
import { REGISTRATION_URL } from "@/data/registration";
export function SiteNav() {
  return (
    <EventNavbar
      event="clutch"
      label="Clutch"
      topHref="#top"
      homeHref="/#chamber-clutch-sq1"
      items={[
        { label: "Briefing", href: "#briefing" },
        { label: "Rounds", href: "#rounds" },
        { label: "Standings", href: "#leaderboard" },
        { label: "Pit Wall", href: "#pit-wall" },
      ]}
      action={{ label: "Register", href: REGISTRATION_URL, external: true }}
    />
  );
}
