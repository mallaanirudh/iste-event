"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bunting, CarnivalArt } from "./carnival-art";
import { designRefinements } from "./design-refinements";

function EntranceGate({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`festival-entrance-gate festival-entrance-gate-${side}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 180 640"
        fill="none"
        preserveAspectRatio="xMinYMax meet"
      >
        <path
          d="M8 636V114C8 65 71 24 172 8v628Z"
          fill="#231034"
          stroke="#b68a40"
          strokeWidth={designRefinements[5] ? 2 : 3}
        />
        <path
          d="M20 619V117C20 78 77 43 159 25v594Z"
          stroke="#ffd700"
          strokeOpacity=".45"
        />
        <path
          d="M26 166C62 133 100 114 152 103M26 537h126"
          stroke="#b68a40"
          strokeWidth="3"
        />
        {[43, 76, 109, 142].map((x, index) => (
          <g key={x}>
            <path
              d={`M${x} ${151 - index * 16}V589`}
              stroke="#725073"
              strokeWidth={designRefinements[5] ? 3 : 5}
            />
            <path
              d={`m${x} ${178 - index * 8} 7 12-7 12-7-12Z`}
              fill="#e6bc62"
            />
            <circle
              cx={x}
              cy="564"
              r="5"
              fill={index % 2 ? "#00e5ff" : "#ff007f"}
            />
          </g>
        ))}
        <g
          transform={
            designRefinements[5]
              ? "translate(93 390) scale(.78) translate(-93 -390)"
              : undefined
          }
        >
          <path
            d="M29 390c0-35 29-59 64-59s59 24 59 59c0 35-24 59-59 59s-64-24-64-59Z"
            fill="#1a0b29"
            stroke="#b68a40"
            strokeWidth="3"
          />
          <path
            d="m93 351 10 24 26 2-20 17 6 26-22-14-23 14 6-26-19-17 26-2Z"
            fill="#ffd700"
          />
        </g>
        <path d="M14 612h151M14 626h151" stroke="#b68a40" strokeWidth="3" />
        <circle cx="165" cy="279" r="5" fill="#ffd700" />
      </svg>
    </div>
  );
}

export function FestivalHero() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let mounted = true;

    // The original entrance opens with the scroll. Keep that gesture brief,
    // and leave touch devices and reduced-motion visitors on native scrolling.
    media.add(
      "(min-width: 1024px) and (min-height: 800px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        if (root.offsetHeight > window.innerHeight - 85) return;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 85px",
            end: () => `+=${Math.min(window.innerHeight * 0.4, 320)}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(
            root.querySelector(".festival-entrance-gate-left"),
            { xPercent: -110, ease: "power2.inOut" },
            0,
          )
          .to(
            root.querySelector(".festival-entrance-gate-right"),
            { xPercent: 110, ease: "power2.inOut" },
            0,
          )
          .fromTo(
            stageRef.current,
            { scale: 0.97 },
            { scale: 1, ease: "power1.out" },
            0,
          );
      },
    );
    document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });
    return () => {
      mounted = false;
      media.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="festival-entrance"
      aria-labelledby="festival-title"
    >
      <div className="festival-entrance-bunting" aria-hidden="true">
        <Bunting />
      </div>
      <div className="festival-entrance-scene">
        <EntranceGate side="left" />
        <EntranceGate side="right" />
        <div ref={stageRef} className="festival-entrance-stage">
          <div className="festival-hero-enter festival-entrance-copy">
            <p className="festival-entrance-label">
              ISTE NITK · FLAGSHIP FESTIVAL
            </p>
            <h1 id="festival-title" className="festival-heading festival-title">
              <span>Fe</span>
              <span className="text-[#ffd700]">ISTE</span>
              <span>val</span>
            </h1>
            <p className="festival-entrance-intro">
              Explore six chambers of mystery, engineering, and discovery.
            </p>
            <a
              href="https://Feisteval-2026.vercel.app"
              className="festival-button festival-ticket-button inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3 text-sm font-extrabold"
            >
              Enter Carnival <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="festival-entrance-art" aria-hidden="true">
            <CarnivalArt />
          </div>
        </div>
      </div>
      <div className="festival-programme-strip relative border-y border-[#ffd700]/30 bg-[#231034] py-4 text-[#e9cb80]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 text-xs font-black tracking-[.13em] sm:text-sm">
          <span>INVENT. EXPLORE. CELEBRATE.</span>
          <Star size={16} fill="currentColor" aria-hidden="true" />
          <span>ISTE NITK · FeISTEval 2026</span>
          <Star
            size={16}
            className="hidden sm:block"
            fill="currentColor"
            aria-hidden="true"
          />
          <span className="hidden md:block">
            MYSTERIES · EXPERIMENTS · ENGINEERING
          </span>
        </div>
      </div>
    </section>
  );
}
