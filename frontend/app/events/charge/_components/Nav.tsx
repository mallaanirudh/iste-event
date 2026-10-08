"use client";
import { EventNavbar } from "@/components/navigation/event-navbar";
import { CONTACTS, EVENT, GROUND } from "../_data/content";
import { useLenis } from "../_lib/lenis";
export function Nav() {
  const lenis = useLenis();
  return (
    <EventNavbar
      event="charge"
      label="Charge"
      topHref="#top"
      homeHref="/#chamber-charge-sq1"
      reserveSpace={false}
      items={[
        { label: "Briefing", href: "#briefing" },
        { label: "Leaderboard", href: "#leaderboard" },
      ]}
      action={{
        label: "Register",
        href: EVENT.registerHref,
        external: true,
      }}
      onMenuChange={(open) => {
        if (open) lenis?.stop();
        else if (
          !document.documentElement.classList.contains("ptb-dialog-open")
        )
          lenis?.start();
      }}
      menuFooter={
        <>
          <p>
            {EVENT.dateLabel}, {EVENT.timeLabel}, {EVENT.venue}.
          </p>
          <ul aria-label={GROUND.contactsTitle}>
            {CONTACTS.map((person) => (
              <li key={person.tel}>
                {person.name}
                <a href={"tel:" + person.tel}>{person.phone}</a>
              </li>
            ))}
          </ul>
        </>
      }
    />
  );
}
