"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════════════
   SVG DECORATIVE ELEMENTS
   ════════════════════════════════════════════════════ */

/* ── Ornate gate flourish (corner curlicue) ──────── */
function GateFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main swirl */}
      <path
        d="M10 110 C10 60, 30 30, 60 20 C75 15, 90 20, 95 35 C100 50, 85 60, 75 55 C65 50, 70 40, 78 38"
        stroke="#E5A93B"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Secondary curl */}
      <path
        d="M10 110 C20 80, 40 55, 55 45 C65 38, 72 42, 68 50 C64 58, 55 55, 58 48"
        stroke="#C68A27"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Small leaf/petal accent */}
      <ellipse cx="60" cy="18" rx="5" ry="8" fill="#E5A93B" opacity="0.4" transform="rotate(-20 60 18)" />
      <ellipse cx="95" cy="38" rx="4" ry="7" fill="#C68A27" opacity="0.3" transform="rotate(30 95 38)" />
      {/* Dots */}
      <circle cx="35" cy="65" r="2" fill="#E5A93B" opacity="0.5" />
      <circle cx="45" cy="48" r="1.5" fill="#C68A27" opacity="0.5" />
    </svg>
  );
}

/* ── Brass rivet circle ──────────────────────────── */
function BrassRivet({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" fill="url(#rivetGrad)" stroke="#8B6914" strokeWidth="1" />
      <circle cx="4.5" cy="4.5" r="1.5" fill="rgba(255,255,255,0.25)" />
      <defs>
        <radialGradient id="rivetGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#F5D77A" />
          <stop offset="60%" stopColor="#E5A93B" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Large decorative brass gear ──────────────────── */
function LargeGear({
  size = 80,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="18" stroke="#C68A27" strokeWidth="3" fill="none" />
      <circle cx="40" cy="40" r="10" stroke="#E5A93B" strokeWidth="2" fill="#C68A27" opacity="0.3" />
      <circle cx="40" cy="40" r="4" fill="#E5A93B" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
        (angle) => (
          <rect
            key={angle}
            x="37"
            y="2"
            width="6"
            height="12"
            rx="2"
            fill="#C68A27"
            transform={`rotate(${angle} 40 40)`}
          />
        )
      )}
    </svg>
  );
}

/* ── Factory pipe SVG (decorative side element) ──── */
function FactoryPipe({ side }: { side: "left" | "right" }) {
  const flip = side === "right" ? "scaleX(-1)" : "";
  return (
    <div className="hidden lg:block" style={{ transform: flip }}>
      <svg
        width="60"
        height="300"
        viewBox="0 0 60 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main pipe body */}
        <rect x="18" y="0" width="24" height="300" rx="4" fill="#C68A27" opacity="0.25" />
        <rect x="20" y="0" width="20" height="300" rx="3" fill="#E5A93B" opacity="0.15" />
        {/* Pipe joints */}
        {[40, 100, 160, 220].map((y) => (
          <g key={y}>
            <rect x="12" y={y} width="36" height="16" rx="3" fill="#C68A27" opacity="0.3" />
            <rect x="14" y={y + 2} width="32" height="12" rx="2" fill="#E5A93B" opacity="0.15" />
            <circle cx="30" cy={y + 8} r="3" fill="#E5A93B" opacity="0.25" />
          </g>
        ))}
        {/* Steam wisps */}
        <path
          d="M30 0 C35 -10, 40 -15, 38 -25 C36 -35, 28 -30, 30 -40"
          stroke="#E5A93B"
          strokeWidth="1"
          opacity="0.15"
          fill="none"
        />
      </svg>
    </div>
  );
}

/* ── Vertical iron bars for a single gate ─────────── */
function GateBars() {
  return (
    <div className="absolute inset-0 flex justify-evenly items-stretch px-4 pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="gate-bar flex-shrink-0" />
      ))}
    </div>
  );
}

/* ── Gate hinge rivets (column along the hinge edge) */
function HingeRivets({ side }: { side: "left" | "right" }) {
  const posClass = side === "left" ? "left-2" : "right-2";
  return (
    <div
      className={`absolute top-0 ${posClass} h-full flex flex-col justify-evenly items-center py-8 pointer-events-none`}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <BrassRivet key={i} size={14} />
      ))}
    </div>
  );
}

/* ── Gate edge ornament (attached to each gate's inner edge) ── */
function GateEdgeOrnament({ side }: { side: "left" | "right" }) {
  const posClass = side === "left" ? "right-0" : "left-0";
  const flip = side === "right" ? "scaleX(-1)" : "";
  return (
    <div
      className={`absolute top-0 ${posClass} h-full pointer-events-none z-10 flex flex-col items-center`}
      style={{ transform: flip }}
    >
      <svg
        width="24"
        height="100%"
        viewBox="0 0 24 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
      >
        {/* Vertical ornate bar running the full height */}
        <rect x="0" y="0" width="6" height="400" fill="#C68A27" />
        <rect x="1" y="0" width="4" height="400" fill="#E5A93B" opacity="0.5" />

        {/* Diamond studs along the bar */}
        {[40, 100, 160, 200, 240, 300, 360].map((y) => (
          <rect
            key={y}
            x="3"
            y={y}
            width="8"
            height="8"
            rx="1"
            fill="#E5A93B"
            transform={`rotate(45 7 ${y + 4})`}
          />
        ))}

        {/* Central medallion (half-circle flush with the edge) */}
        <circle cx="0" cy="200" r="14" fill="#C68A27" stroke="#E5A93B" strokeWidth="2" />
        <circle cx="0" cy="200" r="8" fill="#E5A93B" />
        <circle cx="0" cy="200" r="4" fill="#C68A27" />

        {/* Small rivet dots */}
        {[20, 70, 130, 270, 330, 380].map((y) => (
          <circle key={y} cx="3" cy={y} r="2.5" fill="#E5A93B" opacity="0.4" />
        ))}
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   GOLDEN TICKET CTA
   ════════════════════════════════════════════════════ */
function GoldenTicket() {
  return (
    <a
      href="#tickets"
      className="group relative inline-block cursor-pointer float-animation"
    >
      {/* Ticket shape */}
      <div
        className="relative px-10 py-5 transition-all duration-200"
        style={{
          background: "linear-gradient(135deg, #F5D77A 0%, #E5A93B 30%, #C68A27 70%, #E5A93B 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s ease-in-out infinite",
          border: "3px solid #1D120C",
          boxShadow: "6px 6px 0px #1D120C",
          clipPath:
            "polygon(0% 0%, 4% 50%, 0% 100%, 100% 100%, 96% 50%, 100% 0%)",
        }}
      >
        {/* Perforated edge dots (left) */}
        <div className="absolute left-3 top-2 bottom-2 flex flex-col justify-evenly">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[4px] h-[4px] rounded-full bg-[#1D120C] opacity-30"
            />
          ))}
        </div>
        {/* Perforated edge dots (right) */}
        <div className="absolute right-3 top-2 bottom-2 flex flex-col justify-evenly">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[4px] h-[4px] rounded-full bg-[#1D120C] opacity-30"
            />
          ))}
        </div>

        {/* Ticket text */}
        <div className="text-center">
          <p
            className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.25em] uppercase mb-1"
            style={{ color: "#4A1235" }}
          >
            Admit One
          </p>
          <p
            className="font-[family-name:var(--font-berkshire)] text-xl md:text-2xl"
            style={{ color: "#1D120C" }}
          >
            Claim Your Golden Ticket
          </p>
          <p
            className="font-[family-name:var(--font-cinzel)] text-[8px] tracking-[0.2em] uppercase mt-1"
            style={{ color: "#4A1235" }}
          >
            Limited Availability
          </p>
        </div>
      </div>

      {/* Hover expand shadow */}
      <style jsx>{`
        .group:hover > div {
          transform: translateY(-3px);
          box-shadow: 9px 9px 0px #1D120C !important;
        }
      `}</style>
    </a>
  );
}

/* ════════════════════════════════════════════════════
   HERO SECTION (Main Component)
   ════════════════════════════════════════════════════ */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftGateRef = useRef<HTMLDivElement>(null);
  const rightGateRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Open the gates
      tl.to(
        leftGateRef.current,
        {
          xPercent: -100,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      tl.to(
        rightGateRef.current,
        {
          xPercent: 100,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      );

      // Fade-in and scale-up the content behind
      tl.fromTo(
        contentRef.current,
        { opacity: 0.3, scale: 0.92 },
        { opacity: 1, scale: 1, ease: "power1.out", duration: 1 },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── BACKGROUND REVEAL CONTENT ───────────────── */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-24 sm:pt-32"
        style={{ background: "#FDF8EE" }}
      >
        {/* Corner flourishes */}
        <GateFlourish className="flourish-tl" />
        <GateFlourish className="flourish-tr" />
        <GateFlourish className="flourish-bl" />
        <GateFlourish className="flourish-br" />

        {/* Main content area with pipes */}
        <div className="flex items-center gap-4 md:gap-12">
          <FactoryPipe side="left" />

          <div className="text-center max-w-3xl flex flex-col items-center">
            {/* Top decorative line (Moved into flow) */}
            <div className="flex items-center justify-center gap-4 mb-6 w-full">
              <div className="w-16 md:w-32 h-[2px] bg-[#C68A27] opacity-40" />
              <LargeGear size={40} className="opacity-30" />
              <div className="w-16 md:w-32 h-[2px] bg-[#C68A27] opacity-40" />
            </div>

            {/* Sub-heading */}
            <p
              className="font-[family-name:var(--font-cinzel)] text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
              style={{ color: "#4A1235" }}
            >
              — The Most Whimsical Spectacle of the Century —
            </p>

            {/* Main title */}
            <h1
              className="font-[family-name:var(--font-berkshire)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-2"
              style={{
                color: "#2B0C3D",
                textShadow: "4px 4px 0px rgba(74,18,53,0.15)",
              }}
            >
              The Grand
            </h1>
            <h1
              className="font-[family-name:var(--font-berkshire)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6"
              style={{
                background: "linear-gradient(180deg, #E5A93B, #C68A27)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(3px 3px 0px rgba(29,18,12,0.2))",
              }}
            >
              Confectionery
            </h1>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 md:w-20 h-[2px] bg-[#C68A27]" />
              <LargeGear size={30} />
              <div className="w-12 md:w-20 h-[2px] bg-[#C68A27]" />
            </div>

            {/* Date / Event info */}
            <p
              className="font-[family-name:var(--font-cinzel)] text-sm md:text-base tracking-[0.15em] uppercase mb-8"
              style={{ color: "#1D120C" }}
            >
              December 24th, 1897 &bull; The Enchanted Halls
            </p>

            {/* Golden Ticket CTA */}
            <GoldenTicket />

            {/* Bottom decorative line (Moved into flow) */}
            <div className="flex items-center justify-center gap-4 mt-12 w-full hidden sm:flex">
              <div className="w-16 md:w-32 h-[2px] bg-[#C68A27] opacity-40" />
              <LargeGear size={40} className="opacity-30" />
              <div className="w-16 md:w-32 h-[2px] bg-[#C68A27] opacity-40" />
            </div>
          </div>

          <FactoryPipe side="right" />
        </div>
      </div>

      {/* ── LEFT GATE ───────────────────────────────── */}
      <div
        ref={leftGateRef}
        className="absolute top-0 left-0 w-1/2 h-full gate-surface z-20"
      >
        <GateBars />
        <HingeRivets side="left" />
        <GateEdgeOrnament side="left" />

        {/* Inner gate flourish (bottom-right corner) */}
        <GateFlourish className="absolute bottom-4 right-4 rotate-180 opacity-70" />
        <GateFlourish className="absolute top-4 right-4 -scale-y-100 opacity-70" />

        {/* Large decorative gear on gate */}
        <LargeGear
          size={100}
          className="absolute top-1/2 left-4 -translate-y-1/2 opacity-20 animate-[spin_20s_linear_infinite]"
        />

        {/* Horizontal crossbars */}
        <div className="absolute top-[30%] left-0 w-full h-[4px] bg-[#C68A27] opacity-30" />
        <div className="absolute top-[70%] left-0 w-full h-[4px] bg-[#C68A27] opacity-30" />
      </div>

      {/* ── RIGHT GATE ──────────────────────────────── */}
      <div
        ref={rightGateRef}
        className="absolute top-0 right-0 w-1/2 h-full gate-surface z-20"
      >
        <GateBars />
        <HingeRivets side="right" />
        <GateEdgeOrnament side="right" />

        {/* Inner gate flourish (bottom-left corner) */}
        <GateFlourish className="absolute bottom-4 left-4 -scale-x-100 rotate-180 opacity-70" />
        <GateFlourish className="absolute top-4 left-4 scale-y-[-1] scale-x-[-1] opacity-70" />

        {/* Large decorative gear on gate */}
        <LargeGear
          size={100}
          className="absolute top-1/2 right-4 -translate-y-1/2 opacity-20 animate-[spin_20s_linear_infinite_reverse]"
        />

        {/* Horizontal crossbars */}
        <div className="absolute top-[30%] left-0 w-full h-[4px] bg-[#C68A27] opacity-30" />
        <div className="absolute top-[70%] left-0 w-full h-[4px] bg-[#C68A27] opacity-30" />
      </div>

    </section>
  );
}
