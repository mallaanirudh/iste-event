"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Ticket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chambers, type Chamber } from "./chamber-data";
import { ChamberArt } from "./chamber-art";
import { Reveal } from "./festival-motion";
import { designRefinements } from "./design-refinements";
import { festivalEvents } from "@/data/festival-schedule";
import { REGISTRATION_URL } from "@/data/registration";
import { EventScheduleDetails } from "@/components/schedule/event-schedule-details";

type Geometry = {
  path: string;
  width: number;
  height: number;
  cutouts: { x: number; y: number; width: number; height: number }[];
};

export function ChamberJourney({
  onPreview,
}: {
  onPreview: (chamber: Chamber) => void;
}) {
  const networkRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const maskId = useId();

  useEffect(() => {
    const network = networkRef.current;
    if (!network) return;
    let frame = 0;
    let active = true;
    const measure = () => {
      const width = network.clientWidth;
      const height = network.clientHeight;
      const compact = !window.matchMedia("(min-width: 768px)").matches;
      let x = width / 2;
      let y = 44;
      let path = `M ${x} ${y}`;
      const cutouts: Geometry["cutouts"] = [];
      cardRefs.current.forEach((card) => {
        if (!card) return;
        // Offset geometry belongs to the stationary wrappers, so hover and
        // entry transforms never pull the connecting line away from a card.
        const box = card.getBoundingClientRect();
        const base = network.getBoundingClientRect();
        const cardX = compact ? 14 : box.left - base.left + box.width / 2;
        const cardTop = box.top - base.top;
        const cardBottom = cardTop + box.height;
        const paddingY = compact ? 12 : 28;
        // Mask stationary card footprints, including entry/hover movement.
        // On phones, hide the adjacent rail throughout each chamber as well.
        cutouts.push({
          x: compact ? 0 : box.left - base.left - 20,
          y: cardTop - paddingY,
          width: compact ? width : box.width + 40,
          height: box.height + paddingY * 2,
        });
        if (compact) {
          path += ` C ${x} ${y + 45}, ${cardX} ${cardTop - 45}, ${cardX} ${cardTop + 35} L ${cardX} ${cardBottom - 35}`;
        } else {
          const gap = cardTop - y;
          path += ` C ${x} ${y + gap * 0.65}, ${cardX} ${cardTop - gap * 0.65}, ${cardX} ${cardTop} L ${cardX} ${cardBottom}`;
        }
        x = cardX;
        y = compact ? cardBottom - 35 : cardBottom;
      });
      path += ` C ${x} ${y + 60}, ${width / 2} ${height - 90}, ${width / 2} ${height - 28}`;
      setGeometry({ path, width, height, cutouts });
    };
    const queueMeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(queueMeasure);
    observer.observe(network);
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    queueMeasure();
    document.fonts.ready.then(() => {
      if (active) queueMeasure();
    });
    return () => {
      active = false;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const path = glowRef.current;
    const spark = sparkRef.current;
    if (!path || !spark || !geometry) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(spark, { opacity: 0 });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: networkRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.45,
        },
        onUpdate() {
          const progress = this.progress();
          const point = path.getPointAtLength(length * progress);
          spark.setAttribute("cx", String(point.x));
          spark.setAttribute("cy", String(point.y));
          spark.style.opacity = progress > 0 && progress < 1 ? "1" : "0";
        },
      });
    });
    return () => media.revert();
  }, [geometry]);

  return (
    <section
      id="chambers"
      aria-labelledby="chambers-heading"
      className="relative z-10 mx-auto max-w-[1200px] scroll-mt-8 px-5 pb-16 pt-5 sm:px-8"
    >
      <span id="booths" className="absolute top-0" aria-hidden="true" />
      <Reveal>
        <div className="mx-auto mb-10 max-w-xl text-center">
          <p className="festival-kicker mb-3 text-[10px] font-black tracking-[.22em] text-[#00e5ff]">
            {designRefinements[7]
              ? "02 / Six chambers · One FeISTEval"
              : "02 / SIX CHAMBERS · ONE FeISTEval"}
          </p>
          <h2
            id="chambers-heading"
            className="festival-heading text-4xl tracking-wide sm:text-5xl"
          >
            The Inventing Rooms
          </h2>
          <p className="mt-3 text-sm font-bold text-[#ffd700]">
            Where wonders are forged and tested
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#c4acd9]">
            Follow the lights through mysteries, circuits, process puzzles,
            computing, racing, and nautical engineering. Every chamber has a
            different world to explore.
          </p>
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="festival-button mt-6 inline-flex min-h-11 max-w-full items-center justify-center gap-2 border-2 border-[#140a24] bg-[#ffd700] px-6 py-3 text-sm font-extrabold text-[#241037] shadow-[3px_3px_0_#140a24]"
          >
            Register for FeISTEval
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
      <div ref={networkRef} className="festival-network relative pt-36">
        <div
          className="absolute left-1/2 top-0 z-10 flex h-[88px] w-[88px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#ffd700] bg-[#28143e] shadow-[0_0_28px_#ffd7001a]"
          aria-hidden="true"
        >
          <Ticket size={32} className="text-[#ffd700]" />
          <span className="absolute -bottom-7 whitespace-nowrap text-[9px] font-black tracking-[.2em] text-[#c4acd9]">
            YOUR JOURNEY STARTS HERE
          </span>
        </div>
        {geometry && (
          <svg
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={geometry.width}
                height={geometry.height}
                style={{ maskType: "luminance" }}
              >
                <rect
                  width={geometry.width}
                  height={geometry.height}
                  fill="white"
                />
                {geometry.cutouts.map((cutout, index) => (
                  <rect key={index} {...cutout} fill="black" />
                ))}
              </mask>
            </defs>
            <g mask={`url(#${maskId})`}>
              <path
                d={geometry.path}
                fill="none"
                stroke="#140a24"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <path
                d={geometry.path}
                fill="none"
                stroke="#765889"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d={geometry.path}
                fill="none"
                stroke="#e3c66d"
                strokeWidth="2"
                strokeDasharray="2 24"
                strokeLinecap="round"
                opacity=".55"
              />
              <path
                ref={glowRef}
                d={geometry.path}
                fill="none"
                stroke="#ffd700"
                strokeWidth="3"
                strokeLinecap="round"
                className="festival-network-glow"
              />
              <circle
                ref={sparkRef}
                r="5"
                fill="#fff5df"
                opacity="0"
                className="festival-network-spark"
              />
            </g>
          </svg>
        )}
        <ol className="relative space-y-16 md:space-y-36">
          {chambers.map((chamber, index) => (
            <li
              key={chamber.id}
              className={`flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
            >
              <div
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="ml-10 w-[calc(100%_-_2.5rem)] md:ml-0 md:w-[42%] md:max-w-[440px]"
              >
                <Reveal>
                  <article
                    id={`chamber-${chamber.id}`}
                    className="festival-chamber festival-noticeboard group relative overflow-hidden rounded-sm border-[3px] bg-[#28163e] p-4 sm:p-5"
                    style={
                      { "--chamber-color": chamber.color } as CSSProperties
                    }
                  >
                    <div className="mb-4 flex items-center justify-between gap-3 px-1 pt-1">
                      <p className="festival-chamber-index text-[10px] font-black tracking-[.16em] text-[#c4acd9]">
                        {designRefinements[7] ? "Chamber" : "CHAMBER"} 0
                        {index + 1}
                      </p>
                      <span
                        className="festival-chamber-index text-right text-[10px] font-extrabold tracking-[.1em]"
                        style={{ color: chamber.color }}
                      >
                        {chamber.sig === "ISTE"
                          ? designRefinements[7]
                            ? "ISTE event"
                            : "ISTE EVENT"
                          : `SIG: ${designRefinements[7] ? chamber.sig : chamber.sig.toUpperCase()}`}
                      </span>
                    </div>
                    <div className="festival-chamber-sign px-3 py-4 text-center">
                      <p
                        className="festival-chamber-theme mb-2 text-[9px] font-extrabold uppercase tracking-[.16em]"
                        style={{ color: chamber.color }}
                      >
                        {chamber.theme}
                      </p>
                      <h3 className="festival-heading text-3xl tracking-wide sm:text-4xl">
                        {chamber.title}
                      </h3>
                    </div>
                    <div className="festival-chamber-scene relative overflow-hidden px-3 pt-3">
                      <ChamberArt chamber={chamber} />
                    </div>
                    <div className="px-2 pb-3 pt-4 text-center sm:px-3">
                      <p className="festival-chamber-discipline mb-2 text-[10px] font-bold text-[#c4acd9]">
                        {chamber.discipline}
                      </p>
                      <EventScheduleDetails
                        eventId={
                          festivalEvents.find(
                            (event) => event.chamberId === chamber.id,
                          )!.id
                        }
                        className="mb-4 text-xs font-semibold leading-relaxed text-[#e9cb80]"
                      />
                      <p className="festival-description mt-3 text-sm font-medium leading-relaxed text-[#d5c0e4]">
                        {chamber.description}
                      </p>
                      <div className="mt-6 flex items-center justify-center border-t border-dashed border-[#b68a40]/35 pt-5">
                        {chamber.href ? (
                          <Link
                            href={chamber.href}
                            prefetch={false}
                            className="festival-button festival-chamber-link inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[#140a24] bg-[#ffd700] px-5 py-2 text-xs font-black text-[#241037] shadow-[3px_3px_0_#140a24]"
                          >
                            Inspect Chamber <ArrowUpRight size={17} />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onPreview(chamber)}
                            className="festival-button festival-chamber-link inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[#140a24] bg-[#ffd700] px-5 py-2 text-xs font-black text-[#241037] shadow-[3px_3px_0_#140a24]"
                          >
                            Inspect Chamber <ArrowUpRight size={17} />
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
        <div className="relative z-10 mx-auto mt-24 flex min-h-12 w-fit max-w-[calc(100%_-_1rem)] items-center justify-center gap-3 rounded-full border-2 border-[#ffd700]/50 bg-[#28143e] px-6 py-3 text-center text-[10px] font-bold text-[#ffd700] md:mt-32">
          <ArrowDown size={15} className="shrink-0" />
          <span className="min-w-0">
            Six different worlds. One shared curiosity.
          </span>
        </div>
      </div>
    </section>
  );
}
