"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { REGISTRATION_URL } from "@/data/registration";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera as Instagram,
  Globe2,
  Search,
  Sparkles,
  Star,
  Ticket,
  Trophy,
  X,
} from "lucide-react";
import { CarnivalArt } from "./carnival-art";
import { ChamberJourney } from "./chamber-journey";
import { Reveal } from "./festival-motion";
import { FestivalNavbar } from "./festival-navbar";
import { FestivalEventCards } from "./festival-events";
import { FestivalCalendar } from "./festival-calendar";
import { FestivalHero } from "./festival-hero";
import { designRefinements, enabledRefinementIds } from "./design-refinements";
import { FestivalScoreboard } from "./festival-scoreboard";
import { FestivalFooter } from "./festival-footer";
import { festivalEvents } from "@/data/festival-schedule";
import { EventScheduleDetails } from "@/components/schedule/event-schedule-details";
import { chambers, leaderboard, type Chamber } from "./chamber-data";
import "./festival.css";
import "./festival-refinements.css";

const buttonClass =
  "festival-button inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border-2 border-[#160b26] px-6 py-3 font-black transition duration-200 active:translate-x-1 active:translate-y-1 active:scale-[.98]";
const cardClass =
  "festival-card festival-noticeboard relative rounded-sm border-2 bg-[#28163e] p-6 sm:p-8";
type Modal = "leaderboard" | "events" | "chamber" | null;

function Linkedin({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="4.5" cy="4.5" r="2" />
      <path d="M3 8h3v13H3Zm6 0h3v1.8C13 8.3 14.3 8 16 8c3.5 0 5 2.1 5 5.5V21h-3v-7c0-2-.6-3-2.3-3-1.8 0-3.7 1-3.7 3v7H9Z" />
    </svg>
  );
}

function RankingRows({
  full = false,
  query = "",
}: {
  full?: boolean;
  query?: string;
}) {
  const entries = (full ? leaderboard : leaderboard.slice(0, 5))
    .map((team, index) => ({ ...team, rank: index + 1 }))
    .filter((team) =>
      `${team.name} ${team.domain}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );
  if (designRefinements[8]) {
    return <FestivalScoreboard entries={entries} full={full} />;
  }
  return (
    <>
      <div className="flex items-center justify-between px-4 pb-3 text-[10px] font-black tracking-[.18em] text-[#c4acd9]">
        <span>RANK / TEAM</span>
        <span>POINTS</span>
      </div>
      <ol
        className="space-y-2"
        aria-label={full ? "Full sample leaderboard" : "Top five sample teams"}
      >
        {entries.map((team) => (
          <li
            key={team.name}
            className={`flex min-h-[70px] items-center gap-3 border-b border-[#b68a40]/20 px-3 sm:px-4 ${team.rank % 2 ? "bg-[#42225b]/40" : "bg-[#211035]/65"}`}
          >
            <span className="flex w-6 shrink-0 items-center justify-center text-sm font-black text-[#c4acd9]">
              {team.rank <= 3 ? (
                <Star
                  aria-label={`Rank ${team.rank}`}
                  size={23}
                  fill={["#ffd700", "#d6def0", "#dfa078"][team.rank - 1]}
                  stroke={["#ffd700", "#d6def0", "#dfa078"][team.rank - 1]}
                />
              ) : (
                String(team.rank).padStart(2, "0")
              )}
            </span>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border text-xs font-black"
              style={{
                borderColor: `${team.color}70`,
                backgroundColor: `${team.color}15`,
                color: team.color,
              }}
            >
              {team.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-[#fff5df]">
                {team.name}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-[#c4acd9]">
                {team.domain}
              </p>
            </div>
            <span className="font-black tabular-nums text-[#ffd700]">
              {team.points.toLocaleString("en-US")}
            </span>
          </li>
        ))}
      </ol>
      {entries.length === 0 && (
        <p className="rounded-xl bg-white/5 px-4 py-8 text-center text-[#c4acd9]">
          No teams found. Try another name or chamber.
        </p>
      )}
    </>
  );
}

export default function FestivalHome() {
  const [modal, setModal] = useState<Modal>(null);
  const [selectedChamber, setSelectedChamber] = useState<Chamber>(chambers[3]);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (modal && dialog && !dialog.open) dialog.showModal();
    if (!modal && dialog?.open) dialog.close();
  }, [modal]);
  function openLeaderboard() {
    setQuery("");
    setModal("leaderboard");
  }
  function openChamber(chamber: Chamber) {
    setSelectedChamber(chamber);
    setModal("chamber");
  }

  return (
    <div
      data-ui-refinements={enabledRefinementIds}
      className="festival relative isolate overflow-x-clip bg-[linear-gradient(180deg,#1e0b2d_0%,#2d1b4e_65%,#211030_100%)] text-[#fff5df]"
    >
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-[100] -translate-y-32 rounded-lg bg-[#ffd700] px-4 py-3 font-bold text-[#1e0b2d] focus:translate-y-0"
      >
        Skip to content
      </a>
      <div
        className="festival-stars pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <FestivalNavbar onLeaderboard={openLeaderboard} />

      <main id="main-content">
        <FestivalHero />

        <section
          id="arena"
          aria-labelledby="arena-heading"
          className="relative z-10 mx-auto max-w-[1200px] scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20"
        >
          <Reveal>
            <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="min-w-0">
                <p className="festival-kicker mb-2 text-[10px] font-black tracking-[.25em] text-[#ff74b8]">
                  {designRefinements[7]
                    ? "01 / The main attraction"
                    : "01 / THE MAIN ATTRACTION"}
                </p>
                <h2
                  id="arena-heading"
                  className="festival-heading text-4xl tracking-wide sm:text-5xl"
                >
                  {designRefinements[7] ? "The festival " : "THE FESTIVAL "}
                  <span className="text-[#ffd700]">
                    {designRefinements[7] ? "noticeboard." : "NOTICEBOARD."}
                  </span>
                </h2>
              </div>
              <p className="max-w-[290px] text-sm font-semibold leading-relaxed text-[#c4acd9]">
                Pick your challenge. Make your move.
                <br />A little friendly rivalry never hurt.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-[auto_auto]">
            <FestivalEventCards onPreview={openChamber} />
            <Reveal
              delay={150}
              className="h-full md:col-start-2 md:row-span-2 md:row-start-1"
            >
              <article
                id="leaderboard"
                className={`${cardClass} flex h-full flex-col border-[#b68a40]`}
              >
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <p className="festival-kicker mb-1 text-[10px] font-black tracking-[.18em] text-[#ffd700]">
                      {designRefinements[7]
                        ? "The hall of fame"
                        : "THE HALL OF FAME"}
                    </p>
                    <h3 className="festival-heading text-4xl tracking-wide">
                      Grand Inventor Tally
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-[#c4acd9]">
                      Teams from across the chambers.
                    </p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-[#b68a40] bg-[#1e0b2d] text-[#ffd700]">
                    <Trophy size={25} />
                  </span>
                </div>
                <RankingRows />
                <div className="mt-auto pt-6">
                  <p className="festival-sample-note mb-4 flex items-center justify-center gap-2 text-[10px] font-bold text-[#bda4d1]">
                    <Sparkles size={13} className="shrink-0 text-[#ffd700]" />
                    {designRefinements[7]
                      ? "Sample standings · Not live results"
                      : "Sample standings from the original homepage"}
                  </p>
                  <button
                    onClick={openLeaderboard}
                    className={`${buttonClass} w-full bg-[#ffd700] text-sm text-[#241037] shadow-[4px_4px_0_#140a24]`}
                  >
                    View Full Leaderboard <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <FestivalCalendar />
        <ChamberJourney onPreview={openChamber} />
      </main>

      {designRefinements[10] ? (
        <FestivalFooter onDirectory={() => setModal("events")} />
      ) : (
        <footer className="relative overflow-hidden border-t border-[#b69cff]/15 bg-[#28163e]/60">
          <div
            className="pointer-events-none absolute -bottom-6 -left-14 w-[420px] opacity-70 sm:w-[520px]"
            aria-hidden="true"
          >
            <CarnivalArt silhouette />
          </div>
          <div
            className="pointer-events-none absolute -bottom-6 -right-36 hidden w-[470px] -scale-x-100 opacity-60 lg:block"
            aria-hidden="true"
          >
            <CarnivalArt silhouette />
          </div>
          <div className="relative z-10 mx-auto max-w-[1200px] px-5 pb-6 pt-14 text-center sm:px-8">
            <p className="text-[10px] font-black tracking-[.25em] text-[#ff74b8]">
              THE LIGHTS ARE ON. THE POSSIBILITIES ARE LIMITLESS.
            </p>
            <h2 className="festival-heading mt-3 text-4xl tracking-wide sm:text-5xl">
              BRING YOUR CURIOSITY.
              <br />
              <span className="text-[#ffd700]">STAY FOR THE CARNIVAL.</span>
            </h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass} bg-[#ffd700] text-sm text-[#241037] shadow-[4px_4px_0_#140a24]`}
              >
                <Ticket size={18} /> Your Golden Ticket
              </a>
              <button
                onClick={() => setModal("events")}
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 text-sm font-extrabold text-[#d9c8e9] hover:text-[#ffd700]"
              >
                Chamber directory <ArrowRight size={17} />
              </button>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
              <a
                href="https://www.instagram.com/iste_nitk/"
                target="_blank"
                rel="noopener noreferrer"
                className="festival-social inline-flex min-h-12 items-center gap-2 border border-[#b68a40] bg-[#211032] px-4 py-2 text-xs font-bold text-[#ff83bf] shadow-[3px_3px_0_#140a24] hover:-translate-y-1"
              >
                <Instagram size={18} /> Instagram <ArrowUpRight size={13} />
              </a>
              <a
                href="https://www.linkedin.com/company/istenitk/"
                target="_blank"
                rel="noopener noreferrer"
                className="festival-social inline-flex min-h-12 items-center gap-2 border border-[#b68a40] bg-[#211032] px-4 py-2 text-xs font-bold text-[#00e5ff] shadow-[3px_3px_0_#140a24] hover:-translate-y-1"
              >
                <Linkedin size={18} /> LinkedIn <ArrowUpRight size={13} />
              </a>
              <a
                href="#chambers"
                onClick={() => setModal(null)}
                className="festival-social inline-flex min-h-12 items-center gap-2 border border-[#b68a40] bg-[#211032] px-4 py-2 text-xs font-bold text-[#ffd700] shadow-[3px_3px_0_#140a24] hover:-translate-y-1"
              >
                <Globe2 size={18} /> ISTE NITK <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#c4acd9]/15 pt-6 text-[10px] font-bold text-[#c4acd9] sm:flex-row">
              <p>© 2026 ISTE. Let the festivities begin.</p>
              <p className="flex items-center gap-2">
                MADE OF CURIOSITY{" "}
                <Star size={10} fill="#ffd700" stroke="#ffd700" /> NITK
                SURATHKAL
              </p>
              <a
                href="#home"
                className="inline-flex items-center gap-2 text-[#ffd700]"
              >
                Back to the big top{" "}
                <ArrowDown size={13} className="rotate-180" />
              </a>
            </div>
          </div>
        </footer>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="festival-dialog-title"
        className="festival-dialog m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-xl overflow-y-auto rounded-sm border-2 border-[#b68a40] bg-[#28143e] p-5 text-[#fff5df] shadow-[6px_6px_0_#140a24] sm:p-7"
        onClose={() => setModal(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              setModal(null);
          }
        }}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-black tracking-[.2em] text-[#ff74b8]">
              WELCOME TO THE BIG TOP
            </p>
            <h2
              id="festival-dialog-title"
              className="festival-heading text-3xl tracking-wide sm:text-4xl"
            >
              {modal === "leaderboard"
                ? "The Full Leaderboard"
                : modal === "chamber"
                  ? selectedChamber.title
                  : "The Event Lineup"}
            </h2>
          </div>
          <button
            autoFocus
            type="button"
            onClick={() => setModal(null)}
            aria-label="Close dialog"
            className="shrink-0 rounded-lg border-2 border-[#ffd700]/40 p-2 text-[#ffd700] hover:bg-[#ffd700]/10"
          >
            <X size={20} />
          </button>
        </div>
        {modal === "leaderboard" && (
          <>
            <p className="mb-5 text-sm text-[#c4acd9]">
              The original homepage&apos;s sample standings. Search by team or
              chamber.
            </p>
            <label className="mb-6 flex items-center gap-3 rounded-xl border-2 border-[#b69cff]/40 bg-[#1b0c2c] px-4 py-3">
              <Search size={18} className="shrink-0 text-[#b69cff]" />
              <span className="sr-only">Search teams or chambers</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find your team…"
                className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#bda4d1]"
              />
            </label>
            <RankingRows full query={query} />
          </>
        )}
        {modal === "chamber" && (
          <>
            <EventScheduleDetails
              eventId={
                festivalEvents.find(
                  (event) => event.chamberId === selectedChamber.id,
                )!.id
              }
              className="mb-5 text-sm font-semibold leading-relaxed text-[#e9cb80]"
            />
            <p className="text-base font-semibold leading-relaxed text-[#d9c8e9]">
              {selectedChamber.description}
            </p>
            <div className="my-6 flex flex-wrap gap-2">
              {[selectedChamber.theme, selectedChamber.discipline].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3 py-1.5 text-xs font-bold"
                    style={{
                      color: selectedChamber.color,
                      borderColor: `${selectedChamber.color}60`,
                    }}
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
            <p className="mb-6 text-sm text-[#c4acd9]">
              Register through the shared FeISTEval form and check this
              chamber&apos;s scheduled date and time above.
            </p>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} w-full bg-[#ffd700] text-[#241037] shadow-[4px_4px_0_#ff007f]`}
            >
              Open Registration <ArrowUpRight size={17} />
            </a>
          </>
        )}
        {modal === "events" && (
          <>
            <p className="mb-5 text-sm text-[#c4acd9]">
              Step into an event and discover the challenge.
            </p>
            <div className="space-y-3">
              {chambers.map((chamber) =>
                chamber.href ? (
                  <Link
                    key={chamber.id}
                    href={chamber.href}
                    prefetch={false}
                    className="festival-event-link"
                    onClick={() => setModal(null)}
                  >
                    <span>
                      <span className="block text-[10px] font-bold text-[#c4acd9]">
                        {chamber.title}
                      </span>
                      <span className="mt-1 block font-extrabold">
                        {chamber.eventName}
                      </span>
                    </span>
                    <ArrowUpRight size={20} className="text-[#ffd700]" />
                  </Link>
                ) : (
                  <button
                    key={chamber.id}
                    onClick={() => openChamber(chamber)}
                    className="festival-event-link w-full text-left"
                  >
                    <span>
                      <span className="block text-[10px] font-bold text-[#c4acd9]">
                        {chamber.title}
                      </span>
                      <span className="mt-1 block font-extrabold">
                        {chamber.eventName}
                      </span>
                    </span>
                    <ArrowUpRight size={20} className="text-[#ffd700]" />
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
