"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EVENTS = [
  {
    id: "scotland-yard",
    title: "Scotland Yard",
    desc: "A mystery awaits. Grab your magnifying glass and uncover the hidden truths within the fog.",
    theme: "Mystery",
  },
  {
    id: "charge-sq1",
    title: "Power The Beacon",
    desc: "Break the blocks, find the diamonds. An 8-bit adventure of epic mechanical proportions.",
    theme: "8-bit",
  },
  {
    id: "catalyst-sq1",
    title: "Lablock",
    desc: "Infinite doors, infinite choices. Can you navigate the labyrinth of the backrooms?",
    theme: "Escape Room",
  },
  {
    id: "crypt-sq1",
    title: "Trust No link",
    desc: "The internet is lying. Hack the glitching terminals and find the core mainframe.",
    theme: "Glitch",
  },
  {
    id: "clutch-sq1",
    title: "Magnetic Grand Prix",
    desc: "Checkered flags and burning rubber. Only the fastest survive this high-octane circuit.",
    theme: "Formula 1",
  },
  {
    id: "concrete-sq1",
    title: "Titanic",
    desc: "Float it for Jack. A nautical engineering marvel hidden in the depths of the factory.",
    theme: "Nautical",
  },
];

/* ════════════════════════════════════════════════════
   DECORATIVE ELEMENTS
   ════════════════════════════════════════════════════ */

function CornerRivet({
  top,
  bottom,
  left,
  right,
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}) {
  let classes = "absolute w-4 h-4";
  if (top) classes += " top-2";
  if (bottom) classes += " bottom-2";
  if (left) classes += " left-2";
  if (right) classes += " right-2";

  return (
    <div className={classes}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" fill="url(#chamberRivet)" stroke="#8B6914" strokeWidth="1.5" />
        <circle cx="6" cy="6" r="2" fill="rgba(255,255,255,0.3)" />
        <defs>
          <radialGradient id="chamberRivet" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#F5D77A" />
            <stop offset="60%" stopColor="#E5A93B" />
            <stop offset="100%" stopColor="#8B6914" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

const MainValve = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="relative w-32 h-32 mx-auto z-20 mt-8 mb-8 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[6px_6px_0px_#1D120C]">
      {/* Outer rim */}
      <circle cx="50" cy="50" r="45" fill="#1D120C" />
      <circle cx="50" cy="50" r="40" fill="url(#valveGradient)" stroke="#1D120C" strokeWidth="3" />
      
      {/* Bubbling liquid inside */}
      <circle cx="50" cy="50" r="25" fill="#1D120C" />
      <circle cx="50" cy="50" r="22" fill="#FF4B6E" />
      <circle cx="45" cy="45" r="4" fill="#FDF8EE" opacity="0.8" />
      <circle cx="58" cy="52" r="3" fill="#FDF8EE" opacity="0.6" />
      <circle cx="48" cy="58" r="2" fill="#FDF8EE" opacity="0.5" />
      
      {/* Rivets */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
         <circle key={angle} cx="50" cy="12" r="3" fill="#1D120C" transform={`rotate(${angle} 50 50)`} />
      ))}
      
      <defs>
        <radialGradient id="valveGradient" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#F5D77A" />
          <stop offset="50%" stopColor="#E5A93B" />
          <stop offset="100%" stopColor="#C68A27" />
        </radialGradient>
      </defs>
    </svg>
  </div>
));
MainValve.displayName = "MainValve";

const TerminusGrate = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="relative w-48 h-20 mx-auto z-20 mt-16 flex items-center justify-center">
    <svg viewBox="0 0 200 60" className="w-full h-full drop-shadow-[6px_6px_0px_#1D120C]">
      <rect x="10" y="10" width="180" height="40" rx="4" fill="#1D120C" />
      <rect x="15" y="15" width="170" height="30" rx="2" fill="#3a2a1e" stroke="#1D120C" strokeWidth="2" />
      
      {/* Grate slots */}
      {[...Array(10)].map((_, i) => (
         <rect key={i} x={25 + i * 15} y="20" width="6" height="20" rx="3" fill="#1D120C" />
      ))}
      
      {/* Liquid pooling (hidden slightly behind grate) */}
      <path d="M 90 20 Q 100 15 110 20 L 110 40 L 90 40 Z" fill="#FF4B6E" opacity="0.9" />
    </svg>
  </div>
));
TerminusGrate.displayName = "TerminusGrate";

/* ════════════════════════════════════════════════════
   CHAMBER CARD COMPONENT
   ════════════════════════════════════════════════════ */

function ChamberCard({ event }: { event: (typeof EVENTS)[0]; index: number }) {
  return (
    <motion.div
      whileHover={{ x: -4, y: -4, boxShadow: "10px 10px 0px #1D120C" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative bg-[#FDF8EE] border-[3px] border-[#1D120C] p-6 sm:p-8 z-10 w-full max-w-md flex flex-col items-center text-center"
      style={{ boxShadow: "6px 6px 0px #1D120C" }}
    >
      <CornerRivet top left />
      <CornerRivet top right />
      <CornerRivet bottom left />
      <CornerRivet bottom right />

      <div className="w-full bg-[#1D120C] py-4 px-4 border-[2px] border-[#C68A27] mb-6 relative shadow-[inset_0px_0px_10px_rgba(0,0,0,0.8)]">
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#E5A93B]" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E5A93B]" />
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#E5A93B]" />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E5A93B]" />

        <p className="font-[family-name:var(--font-cinzel)] text-[#C68A27] text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase mb-1">
          {event.theme}
        </p>
        <h3
          className="font-[family-name:var(--font-berkshire)] text-[#FDF8EE] text-2xl sm:text-3xl"
          style={{ textShadow: "2px 2px 0px #4A1235" }}
        >
          {event.title}
        </h3>
      </div>

      <p className="font-[family-name:var(--font-outfit)] text-[#1D120C] opacity-90 mb-8 leading-relaxed font-medium">
        {event.desc}
      </p>

      <motion.button
        whileHover={{ y: -2, boxShadow: "6px 6px 0px #1D120C" }}
        whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #1D120C" }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="bg-[#E5A93B] border-[3px] border-[#1D120C] px-8 py-3 font-[family-name:var(--font-cinzel)] font-bold tracking-widest text-[#1D120C] text-sm uppercase"
        style={{ boxShadow: "4px 4px 0px #1D120C" }}
      >
        Inspect Chamber
      </motion.button>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════
   MAIN SECTION EXPORT
   ════════════════════════════════════════════════════ */

export default function InventingRoomsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const valveRef = useRef<HTMLDivElement>(null);
  const terminusRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowPipeRef = useRef<SVGPathElement>(null);

  const [pathD, setPathD] = useState("");
  const [svgHeight, setSvgHeight] = useState(2000);
  const [junctions, setJunctions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !valveRef.current || !terminusRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const valveRect = valveRef.current.getBoundingClientRect();
      const terminusRect = terminusRef.current.getBoundingClientRect();
      
      const isMobile = window.innerWidth < 768;
      setSvgHeight(containerRect.height);

      // Start position (bottom of the Main Valve)
      const startX = valveRect.left - containerRect.left + valveRect.width / 2;
      const startY = valveRect.bottom - containerRect.top - 10; // slightly inside the valve
      
      // On mobile, force the pipe to simply drop straight down the middle.
      const mobileX = startX;
      let currentX = startX;
      let currentY = startY;
      
      let d = `M ${startX} ${startY} `;
      const newJunctions: { x: number; y: number }[] = [];

      cardsRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardY = rect.top - containerRect.top + rect.height / 2;
        const cardX = isMobile
          ? mobileX
          : rect.left - containerRect.left + rect.width / 2;

        const deltaY = cardY - currentY;

        if (isMobile) {
          // Simple straight vertical line for mobile
          d += `L ${mobileX} ${cardY} `;
        } else {
          // Exaggerated U/S-curves for desktop
          const cp1Y = currentY + deltaY * 0.85;
          const cp2Y = cardY - deltaY * 0.85;
          d += `C ${currentX} ${cp1Y}, ${cardX} ${cp2Y}, ${cardX} ${cardY} `;
        }

        newJunctions.push({ x: cardX, y: cardY });
        currentY = cardY;
        currentX = cardX;
      });

      // Terminate at the Floor Grate
      const termX = terminusRect.left - containerRect.left + terminusRect.width / 2;
      const termY = terminusRect.top - containerRect.top + 30; // into the grate
      const finalDeltaY = termY - currentY;

      if (isMobile) {
        d += `L ${termX} ${termY} `;
      } else {
        // Exaggerated curve into the terminus on desktop
        d += `C ${currentX} ${currentY + finalDeltaY * 0.8}, ${termX} ${termY - finalDeltaY * 0.8}, ${termX} ${termY} `;
      }

      setPathD(d);
      setJunctions(newJunctions);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    const timeoutId = setTimeout(updatePath, 500);

    return () => {
      window.removeEventListener("resize", updatePath);
      clearTimeout(timeoutId);
    };
  }, []);

  // GSAP ScrollTrigger for the glowing liquid pipe
  useEffect(() => {
    if (!pathD || !glowPipeRef.current) return;

    const pathElement = glowPipeRef.current;
    const length = pathElement.getTotalLength();

    pathElement.style.strokeDasharray = `${length}`;
    pathElement.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(pathElement, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%", 
          end: "bottom 80%", 
          scrub: 1, 
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [pathD]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FDF8EE] py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[#1D120C]" />

      {/* Background SVG Pipe Network */}
      <svg
        className="absolute inset-0 w-full pointer-events-none z-0"
        style={{ height: svgHeight }}
      >
        <path d={pathD} stroke="#1D120C" strokeWidth="24" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathD} stroke="#3a2a1e" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path
          ref={glowPipeRef}
          d={pathD}
          stroke="#FF4B6E" // Cherry Pop Liquid
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 10px #FF4B6E)" }}
        />

        {junctions.map((j, i) => (
          <g key={i}>
            <circle cx={j.x} cy={j.y} r="16" fill="#1D120C" />
            <circle cx={j.x} cy={j.y} r="10" fill="#E5A93B" />
            <circle cx={j.x} cy={j.y} r="4" fill="#C68A27" />
          </g>
        ))}
      </svg>

      {/* Section Header */}
      <div className="relative z-20 text-center px-4">
        <h2
          className="font-[family-name:var(--font-berkshire)] text-5xl md:text-6xl mb-4"
          style={{ color: "#2B0C3D", textShadow: "3px 3px 0px rgba(29,18,12,0.15)" }}
        >
          The Inventing Rooms
        </h2>
        <p className="font-[family-name:var(--font-cinzel)] text-[#1D120C] uppercase tracking-[0.2em] text-xs sm:text-sm">
          Where wonders are forged and tested
        </p>
      </div>

      {/* Origin Valve */}
      <MainValve ref={valveRef} />

      {/* Staggered Event Cards */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10 mt-8">
        <div className="flex flex-col gap-32 md:gap-48">
          {EVENTS.map((event, i) => (
            <div
              key={event.id}
              className={`flex w-full justify-center ${
                i % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div
                ref={(el) => {
                  if (el) cardsRefs.current[i] = el;
                }}
                className="w-full max-w-md"
              >
                <ChamberCard event={event} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floor Grate Terminus */}
      <TerminusGrate ref={terminusRef} />

    </section>
  );
}
