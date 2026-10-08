import {
  ArrowUpRight,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Countdown } from "@/ConcretClutchComponents/countdown";
import { REGISTRATION_URL } from "@/data/registration";
import {
  formatEventDate,
  formatEventTime,
  getFestivalEvent,
} from "@/data/festival-schedule";

const STATS = [
  { value: "30", label: "TEAMS TARGET", color: "text-crimson" },
  { value: "3", label: "MEMBERS / TEAM", color: "text-cyan" },
  { value: "2", label: "ACTION ROUNDS", color: "text-comic" },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="speed-stripes animate-stripes absolute -right-20 top-10 h-24 w-[60%] rotate-[-8deg] text-crimson/25"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-12 md:pt-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="skew-badge comic-shadow-sm inline-flex border-2 border-black bg-cyan px-3 py-1.5">
            <span className="unskew inline-flex items-center gap-2 font-display text-xs text-black">
              <GraduationCap className="size-4" aria-hidden="true" />
              EXCLUSIVELY FOR B.TECH 1ST YEARS
            </span>
          </span>
          <span className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border-2 border-white/20 bg-asphalt-2/80 px-4 py-2 font-mono text-xs tracking-wider text-white">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-comic" aria-hidden="true" />
              {formatEventDate(getFestivalEvent("clutch"))}
            </span>
            <span className="hidden text-muted-foreground sm:inline">|</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-crimson" aria-hidden="true" />
              LHC A (2 ROOMS)
            </span>
            <span className="basis-full text-comic">
              {formatEventTime(getFestivalEvent("clutch"))}
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-display text-xl text-comic sm:text-2xl">
            SIG: CLUTCH <span className="text-crimson">{"//"}</span>
          </p>
          <h1
            id="hero-title"
            className="text-outline font-display text-[clamp(1.875rem,8.3vw,3rem)] leading-[1.1] text-white sm:text-6xl lg:text-8xl"
          >
            MAGNETIC
            <br />
            <span className="relative inline-block text-crimson">
              GRAND PRIX
              <span
                aria-hidden="true"
                className="absolute -right-4 -top-6 rotate-12 border-2 border-black bg-comic px-2 py-1 font-display text-xs text-black [-webkit-text-stroke:0] sm:-right-10 sm:text-sm"
              >
                ZOOM!
              </span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground font-mono">
            Build. Race. Defy the pull! - Design and build your own magnetic
            powered car and compete for the win in the Magnetic grand prix!!
          </p>
        </div>

        <ul className="grid grid-cols-3 border-2 border-black bg-asphalt-2/90 comic-shadow">
          {STATS.map((s, i) => (
            <li
              key={s.label}
              className={`flex flex-col gap-1 px-3 py-4 sm:px-6 ${i > 0 ? "border-l-2 border-black" : ""}`}
            >
              <span className={`font-display text-3xl sm:text-5xl ${s.color}`}>
                {s.value}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground sm:text-xs">
                {s.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Countdown />
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group skew-badge comic-shadow flex min-w-0 items-center justify-center border-[3px] border-black bg-crimson px-4 py-5 text-center transition-transform hover:-translate-y-1 active:translate-y-0 sm:px-6"
          >
            <span className="unskew flex min-w-0 items-center gap-3 font-display text-sm text-white sm:text-lg">
              REGISTER TEAM (CAPTAIN ONLY)
              <ArrowUpRight
                className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
