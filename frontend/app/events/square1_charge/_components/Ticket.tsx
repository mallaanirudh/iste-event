"use client";

import Image from "next/image";
import { useRef } from "react";
import TallyEmbed, { isValidTallyFormId } from "@/components/TallyEmbed";
import { EVENT } from "../_data/content";
import { gsap, MQ, useGSAP } from "../_lib/gsap";
import s from "./ticket.module.css";

export type RegistrationWindow = { state: "open" | "upcoming" | "closed"; label: string } | null;

/** What shows in the form panel until a Tally form ID is configured. The stub already carries the date and venue. */
function Fallback({ closed }: { closed: boolean }) {
  return (
    <div className={s.soon}>
      <p className={s.soonTitle}>{closed ? "Registration has closed." : "The registration form will appear here shortly."}</p>
      <p className={s.soonText}>For any questions, please call a point of contact listed on this page.</p>
    </div>
  );
}

/**
 * The golden ticket: a gold stub and a white form panel holding the Tally embed.
 * `inline` lives on the ground floor; `dialog` is the compact version in the register dialog.
 */
export function Ticket({
  variant,
  registration,
  showForm = true,
}: {
  variant: "inline" | "dialog";
  registration: RegistrationWindow;
  showForm?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closed = registration?.state === "closed";
  // Without a form the fallback states "closed" itself, so the date line would repeat it.
  const hasForm = isValidTallyFormId(process.env.NEXT_PUBLIC_TALLY_FORM_ID?.trim());

  useGSAP(
    () => {
      if (variant !== "inline") return;
      const el = ref.current!;
      const mm = gsap.matchMedia();
      // One shine sweep across the stub when the ticket arrives.
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          el.querySelector("[data-shine]"),
          { xPercent: -120 },
          {
            xPercent: 420,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 75%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`${s.ticket} ${variant === "dialog" ? s.dialogTicket : s.inlineTicket}`}>
      <div className={s.stub}>
        <span className={s.shine} data-shine="" aria-hidden="true" />
        <div className={s.stubText}>
          <p className={s.admit}>Admit one team</p>
          <p className={s.stubName}>{EVENT.name}</p>
          <p className={s.stubMeta}>
            <span>14.10.2026</span>
            <span>LHC A</span>
          </p>
        </div>
        <div className={s.issuer}>
          <Image
            src="/events/square1_charge/nitk-transparent.png"
            alt="National Institute of Technology Karnataka, Surathkal"
            width={183}
            height={179}
            sizes="(min-width: 900px) 64px, 46px"
            className={s.crest}
          />
          <span className={s.hole} aria-hidden="true" />
        </div>
        {closed ? (
          <p className={s.closedStamp} role="note">
            Registration closed
          </p>
        ) : null}
      </div>

      <div className={s.form} data-no-cursor="">
        {registration && !(closed && !hasForm) ? (
          <p className={`${s.window} ${closed ? s.windowClosed : ""}`}>{registration.label}</p>
        ) : null}
        {showForm ? (
          <TallyEmbed
            formId={process.env.NEXT_PUBLIC_TALLY_FORM_ID}
            title="Register for Power the Beacon"
            minHeight={variant === "dialog" ? 440 : 480}
            className={s.tally}
            fallback={<Fallback closed={closed} />}
          />
        ) : null}
      </div>
    </div>
  );
}
