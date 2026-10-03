"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

/* ════════════════════════════════════════════════════
   SVG DECORATIVE ELEMENTS
   ════════════════════════════════════════════════════ */

function CornerRivet() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" fill="url(#cornerRivetG)" stroke="#8B6914" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="2" fill="rgba(255,255,255,0.3)" />
      <defs>
        <radialGradient id="cornerRivetG" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#F5D77A" />
          <stop offset="60%" stopColor="#E5A93B" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function GearBullet() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="4" stroke="#C68A27" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="9" r="2" fill="#E5A93B" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <rect
          key={angle}
          x="8"
          y="1"
          width="2"
          height="4"
          rx="0.5"
          fill="#C68A27"
          transform={`rotate(${angle} 9 9)`}
        />
      ))}
    </svg>
  );
}

function FloatingGear({
  size = 60,
  className = "",
  duration = 20,
}: {
  size?: number;
  className?: string;
  duration?: number;
}) {
  return (
    <svg
      className={`${className} pointer-events-none`}
      style={{ animation: `spin ${duration}s linear infinite` }}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
    >
      <circle cx="30" cy="30" r="14" stroke="#C68A27" strokeWidth="2" fill="none" opacity="0.3" />
      <circle cx="30" cy="30" r="7" stroke="#E5A93B" strokeWidth="1.5" fill="none" opacity="0.2" />
      <circle cx="30" cy="30" r="3" fill="#C68A27" opacity="0.25" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <rect
          key={angle}
          x="28"
          y="2"
          width="4"
          height="8"
          rx="1.5"
          fill="#C68A27"
          opacity="0.25"
          transform={`rotate(${angle} 30 30)`}
        />
      ))}
    </svg>
  );
}

function VerticalPipe({ side }: { side: "left" | "right" }) {
  const posClass = side === "left" ? "left-4 md:left-8" : "right-4 md:right-8";
  return (
    <div className={`absolute ${posClass} top-0 h-full hidden lg:flex flex-col items-center pointer-events-none`}>
      {/* Pipe body */}
      <div className="w-[6px] h-full rounded-full" style={{
        background: "linear-gradient(180deg, transparent, #C68A27 5%, #E5A93B 50%, #C68A27 95%, transparent)",
        opacity: 0.2,
      }} />
      {/* Pipe joints */}
      {[20, 40, 60, 80].map((pct) => (
        <div
          key={pct}
          className="absolute w-[18px] h-[10px] rounded-sm"
          style={{
            top: `${pct}%`,
            background: "linear-gradient(180deg, #E5A93B, #C68A27)",
            opacity: 0.2,
          }}
        />
      ))}
    </div>
  );
}

/* Corner flourish for the manifesto frame */
function FrameFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
    >
      <path
        d="M5 75 C5 45, 15 20, 35 12 C45 8, 55 12, 58 22 C61 32, 52 38, 46 34 C40 30, 44 22, 50 21"
        stroke="#C68A27"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M5 75 C12 55, 25 38, 35 30 C42 25, 47 28, 44 34 C41 40, 34 37, 36 32"
        stroke="#E5A93B"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="25" cy="45" r="1.5" fill="#E5A93B" opacity="0.4" />
      <circle cx="38" cy="28" r="1" fill="#C68A27" opacity="0.4" />
    </svg>
  );
}


/* ════════════════════════════════════════════════════
   GOLDEN TICKET — 3D Interactive Centerpiece
   ════════════════════════════════════════════════════ */

function GoldenTicket3D() {
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Motion values for 3D tilt ─────────────────── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 200,
    damping: 30,
  });

  /* Glare position follows the mouse */
  const glareX = useTransform(mouseX, [0, 1], [10, 90]);
  const glareY = useTransform(mouseY, [0, 1], [10, 90]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <div style={{ perspective: 1000 }} className="flex justify-center">
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-2xl cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* ── Ticket body ──────────────────────────── */}
        <div
          className="relative px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #F5D77A 0%, #E5A93B 20%, #C68A27 40%, #B07820 55%, #E5A93B 70%, #F5D77A 85%, #C68A27 100%)",
            border: "3px solid #1D120C",
            boxShadow: "8px 8px 0px #1D120C",
            /* Inverted semi-circle cutouts on corners */
            clipPath: `polygon(
              0% 12px, 6px 12px, 6px 6px, 12px 6px, 12px 0%,
              calc(100% - 12px) 0%, calc(100% - 12px) 6px, calc(100% - 6px) 6px, calc(100% - 6px) 12px, 100% 12px,
              100% calc(100% - 12px), calc(100% - 6px) calc(100% - 12px), calc(100% - 6px) calc(100% - 6px), calc(100% - 12px) calc(100% - 6px), calc(100% - 12px) 100%,
              12px 100%, 12px calc(100% - 6px), 6px calc(100% - 6px), 6px calc(100% - 12px), 0% calc(100% - 12px)
            )`,
          }}
        >
          {/* Inner perforation border */}
          <div
            className="absolute inset-[10px] sm:inset-[14px] pointer-events-none rounded-sm"
            style={{
              border: "2px dashed rgba(29,18,12,0.25)",
            }}
          />

          {/* Shimmer glare overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-sm"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]: number[]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)`
              ),
            }}
          />

          {/* Left perforation dots */}
          <div className="absolute left-[18px] sm:left-[22px] top-[18px] bottom-[18px] flex flex-col justify-evenly pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-[5px] h-[5px] rounded-full"
                style={{ background: "rgba(29,18,12,0.2)" }}
              />
            ))}
          </div>

          {/* Right perforation dots */}
          <div className="absolute right-[18px] sm:right-[22px] top-[18px] bottom-[18px] flex flex-col justify-evenly pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-[5px] h-[5px] rounded-full"
                style={{ background: "rgba(29,18,12,0.2)" }}
              />
            ))}
          </div>

          {/* ── Ticket content ───────────────────── */}
          <div className="relative z-10 text-center">
            {/* Top ornamental line */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 sm:w-16 h-[1.5px] bg-[#1D120C] opacity-20" />
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="10" y="2" width="8" height="8" rx="1" fill="#1D120C" opacity="0.2" transform="rotate(45 14 6)" />
              </svg>
              <div className="w-8 sm:w-16 h-[1.5px] bg-[#1D120C] opacity-20" />
            </div>

            <p
              className="font-[family-name:var(--font-cinzel)] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: "#4A1235" }}
            >
              — Admit One —
            </p>

            <h2
              className="font-[family-name:var(--font-berkshire)] text-3xl sm:text-4xl md:text-5xl leading-tight mb-2"
              style={{
                color: "#2B0C3D",
                textShadow: "2px 2px 0px rgba(29,18,12,0.1)",
              }}
            >
              The Grand Confectionery
            </h2>
            <h3
              className="font-[family-name:var(--font-berkshire)] text-xl sm:text-2xl md:text-3xl mb-4"
              style={{ color: "#4A1235" }}
            >
              Mega Event 2026
            </h3>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 sm:w-16 h-[1px] bg-[#4A1235] opacity-30" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4" fill="#4A1235" opacity="0.3" />
                <circle cx="6" cy="6" r="2" fill="#4A1235" opacity="0.5" />
              </svg>
              <div className="w-10 sm:w-16 h-[1px] bg-[#4A1235] opacity-30" />
            </div>

            <p
              className="font-[family-name:var(--font-cinzel)] text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-1"
              style={{ color: "#1D120C" }}
            >
              December 24th, 1897
            </p>
            <p
              className="font-[family-name:var(--font-outfit)] text-sm sm:text-base mb-6"
              style={{ color: "#1D120C", opacity: 0.7 }}
            >
              The Enchanted Halls &bull; Grand Ballroom &bull; 7:00 PM Onwards
            </p>

            {/* CTA Button */}
            <motion.a
              href="#tickets"
              className="inline-block font-[family-name:var(--font-cinzel)] text-xs sm:text-sm tracking-[0.15em] uppercase px-8 sm:px-10 py-3 sm:py-4 cursor-pointer select-none"
              style={{
                background: "#2B0C3D",
                color: "#F5D77A",
                border: "3px solid #1D120C",
                boxShadow: "4px 4px 0px #1D120C",
              }}
              whileHover={{
                y: -3,
                boxShadow: "7px 7px 0px #1D120C",
              }}
              whileTap={{
                y: 0,
                boxShadow: "2px 2px 0px #1D120C",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              Secure Your Entry
            </motion.a>

            {/* Bottom ornamental line */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="w-8 sm:w-16 h-[1.5px] bg-[#1D120C] opacity-20" />
              <p
                className="font-[family-name:var(--font-cinzel)] text-[8px] tracking-[0.2em] uppercase"
                style={{ color: "#4A1235" }}
              >
                Non-Transferable &bull; Limited Availability
              </p>
              <div className="w-8 sm:w-16 h-[1.5px] bg-[#1D120C] opacity-20" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


/* ════════════════════════════════════════════════════
   FACTORY MANIFESTO — Event Information
   ════════════════════════════════════════════════════ */

function FactoryManifesto() {
  const details = [
    { label: "Venue", value: "The Enchanted Halls, Grand Ballroom Wing" },
    { label: "Time", value: "7:00 PM — Late into the Midnight Hour" },
    { label: "Dress Code", value: "Victorian Formal / Steampunk Encouraged" },
    { label: "SIG: Alchemy", value: "Interactive potion-brewing workshops" },
    { label: "SIG: Clockwork", value: "Automaton building & gear-tinkering" },
    { label: "SIG: Confections", value: "Chocolate sculpting masterclass" },
  ];

  return (
    <div className="relative">
      {/* Parchment noticeboard container */}
      <div
        className="relative mx-auto max-w-5xl"
        style={{
          background:
            "linear-gradient(180deg, #FDF8EE 0%, #F5EBDA 40%, #EDE0C8 100%)",
          border: "3px solid #1D120C",
          boxShadow: "8px 8px 0px #1D120C",
        }}
      >
        {/* Corner rivets */}
        <div className="absolute top-2 left-2"><CornerRivet /></div>
        <div className="absolute top-2 right-2"><CornerRivet /></div>
        <div className="absolute bottom-2 left-2"><CornerRivet /></div>
        <div className="absolute bottom-2 right-2"><CornerRivet /></div>

        {/* Frame flourishes */}
        <FrameFlourish className="absolute top-0 left-0 opacity-50" />
        <FrameFlourish className="absolute top-0 right-0 opacity-50 -scale-x-100" />
        <FrameFlourish className="absolute bottom-0 left-0 opacity-50 -scale-y-100" />
        <FrameFlourish className="absolute bottom-0 right-0 opacity-50 scale-[-1]" />

        {/* Inner brass frame line */}
        <div
          className="absolute inset-[12px] pointer-events-none"
          style={{
            border: "1.5px solid #C68A27",
            opacity: 0.3,
          }}
        />

        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-8 sm:p-10 md:p-14">
          {/* ── Column 1: The Grand Tour (About) ──── */}
          <div>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#C68A27]" />
              <h3
                className="font-[family-name:var(--font-cinzel)] text-sm sm:text-base tracking-[0.2em] uppercase"
                style={{ color: "#4A1235" }}
              >
                The Grand Tour
              </h3>
              <div className="flex-1 h-[2px] bg-[#C68A27] opacity-30" />
            </div>

            <p
              className="font-[family-name:var(--font-outfit)] text-base sm:text-lg leading-relaxed mb-4"
              style={{ color: "#1D120C" }}
            >
              Step through the iron gates and into a world where chocolate rivers
              wind through halls of brass and velvet, where automata play waltzes
              on candy-glass pianos, and where every confection is a marvel of
              engineering and whimsy.
            </p>
            <p
              className="font-[family-name:var(--font-outfit)] text-base sm:text-lg leading-relaxed mb-4"
              style={{ color: "#1D120C", opacity: 0.8 }}
            >
              The Grand Confectionery Mega Event is an invitation to the most
              extraordinary gathering of inventors, dreamers, and sweet-toothed
              adventurers this side of the 19th century. Prepare to have your
              senses dazzled and your imagination ignited.
            </p>

            {/* Decorative separator */}
            <div className="flex items-center gap-2 mt-6">
              <div className="w-full h-[1px] bg-[#C68A27] opacity-25" />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                <rect x="8" y="1" width="7" height="7" rx="1" fill="#C68A27" opacity="0.3" transform="rotate(45 11.5 4.5)" />
              </svg>
              <div className="w-full h-[1px] bg-[#C68A27] opacity-25" />
            </div>

            {/* Whimsical signature */}
            <p
              className="font-[family-name:var(--font-berkshire)] text-lg mt-4 text-right"
              style={{ color: "#C68A27", opacity: 0.6 }}
            >
              — The Chocolatier
            </p>
          </div>

          {/* ── Column 2: The Blueprint (Details) ── */}
          <div>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#C68A27]" />
              <h3
                className="font-[family-name:var(--font-cinzel)] text-sm sm:text-base tracking-[0.2em] uppercase"
                style={{ color: "#4A1235" }}
              >
                The Blueprint
              </h3>
              <div className="flex-1 h-[2px] bg-[#C68A27] opacity-30" />
            </div>

            <ul className="space-y-4">
              {details.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <GearBullet />
                  <div>
                    <p
                      className="font-[family-name:var(--font-cinzel)] text-[11px] sm:text-xs tracking-[0.15em] uppercase"
                      style={{ color: "#4A1235" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-[family-name:var(--font-outfit)] text-sm sm:text-base"
                      style={{ color: "#1D120C", opacity: 0.85 }}
                    >
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Bottom stamped seal */}
            <div className="mt-8 flex justify-center">
              <div
                className="flex flex-col items-center px-6 py-3"
                style={{
                  border: "2px solid #C68A27",
                  borderRadius: "50%",
                  opacity: 0.4,
                }}
              >
                <p className="font-[family-name:var(--font-cinzel)] text-[8px] tracking-[0.3em] uppercase" style={{ color: "#C68A27" }}>
                  Certified
                </p>
                <p className="font-[family-name:var(--font-berkshire)] text-sm" style={{ color: "#C68A27" }}>
                  Authentic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════
   MAIN SECTION EXPORT
   ════════════════════════════════════════════════════ */

export default function EventIntroSection() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden" style={{ background: "#FDF8EE" }}>
      {/* Vertical connecting pipes */}
      <VerticalPipe side="left" />
      <VerticalPipe side="right" />

      {/* Scattered floating gears */}
      <FloatingGear size={80} className="absolute top-[8%] left-[3%] opacity-20" duration={25} />
      <FloatingGear size={50} className="absolute top-[15%] right-[5%] opacity-15" duration={18} />
      <FloatingGear size={65} className="absolute top-[55%] left-[2%] opacity-15" duration={22} />
      <FloatingGear size={45} className="absolute top-[70%] right-[4%] opacity-20" duration={30} />
      <FloatingGear size={35} className="absolute top-[40%] right-[8%] opacity-10" duration={15} />
      <FloatingGear size={55} className="absolute top-[85%] left-[6%] opacity-10" duration={28} />

      {/* Section header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p
            className="font-[family-name:var(--font-cinzel)] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#C68A27" }}
          >
            Your Invitation Awaits
          </p>
          <h2
            className="font-[family-name:var(--font-berkshire)] text-4xl sm:text-5xl md:text-6xl mb-4"
            style={{
              color: "#2B0C3D",
              textShadow: "3px 3px 0px rgba(74,18,53,0.1)",
            }}
          >
            The Golden Ticket
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 sm:w-20 h-[2px] bg-[#C68A27] opacity-50" />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="6" stroke="#C68A27" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="10" cy="10" r="3" fill="#C68A27" opacity="0.3" />
            </svg>
            <div className="w-12 sm:w-20 h-[2px] bg-[#C68A27] opacity-50" />
          </div>
        </motion.div>
      </div>

      {/* Golden Ticket 3D */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 mb-20 sm:mb-28 md:mb-36">
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <GoldenTicket3D />
        </motion.div>
      </div>

      {/* Transition divider */}
      <div className="relative z-10 flex items-center justify-center gap-4 mb-12 sm:mb-16 md:mb-20 px-4">
        <div className="w-16 sm:w-24 md:w-32 h-[2px] bg-[#C68A27] opacity-30" />
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <FloatingGear size={40} className="opacity-40" duration={12} />
        </motion.div>
        <div className="w-16 sm:w-24 md:w-32 h-[2px] bg-[#C68A27] opacity-30" />
      </div>

      {/* Factory Manifesto */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <FactoryManifesto />
        </motion.div>
      </div>

      {/* Bottom section connector */}
      <div className="relative z-10 flex justify-center mt-16 sm:mt-20">
        <div className="w-[2px] h-24 bg-gradient-to-b from-[#C68A27] to-transparent opacity-30" />
      </div>
    </section>
  );
}
