"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "The Factory", href: "#hero" },
  { label: "Chambers", href: "#events" },
  { label: "Secure Entry", href: "https://Feisteval-2026.vercel.app" },
  { label: "Inventor Tally", href: "#leaderboard" },
];

/* ── Decorative brass gear SVG ────────────────────── */
function BrassGear({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="6" stroke="#C68A27" strokeWidth="2" fill="#E5A93B" />
      <circle cx="14" cy="14" r="3" fill="#C68A27" />
      {/* Gear teeth */}
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(0 14 14)"
      />
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(45 14 14)"
      />
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(90 14 14)"
      />
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(135 14 14)"
      />
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(180 14 14)"
      />
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(225 14 14)"
      />
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(270 14 14)"
      />
      <path
        d="M14 2L15 4H13L14 2Z"
        fill="#E5A93B"
        transform="rotate(315 14 14)"
      />
    </svg>
  );
}

/* ── Decorative Filigree SVG ──────────────────────── */
function Filigree() {
  return (
    <div className="flex items-center justify-center gap-1">
      <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
        <path
          d="M0 6C10 6 15 1 20 1C25 1 30 6 40 6"
          stroke="#C68A27"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0 6C10 6 15 11 20 11C25 11 30 6 40 6"
          stroke="#C68A27"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #F5D77A, #C68A27 60%, #8B6914)",
            boxShadow: "0 1px 0 rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Thematic Brass Pipe Mobile Icon ───────────────── */
function BrassPipeMenuIcon({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative w-8 h-6 flex flex-col justify-between z-[60] focus:outline-none md:hidden">
      <motion.div
        animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
        className="w-full h-1.5 bg-gradient-to-b from-[#F5D77A] via-[#E5A93B] to-[#C68A27] border-[1px] border-[#1D120C] rounded-sm shadow-[1px_1px_0px_#1D120C]"
      />
      <motion.div
        animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
        className="w-full h-1.5 bg-gradient-to-b from-[#F5D77A] via-[#E5A93B] to-[#C68A27] border-[1px] border-[#1D120C] rounded-sm shadow-[1px_1px_0px_#1D120C]"
      />
      <motion.div
        animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
        className="w-full h-1.5 bg-gradient-to-b from-[#F5D77A] via-[#E5A93B] to-[#C68A27] border-[1px] border-[#1D120C] rounded-sm shadow-[1px_1px_0px_#1D120C]"
      />
    </button>
  );
}

export default function Navbar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: "linear-gradient(180deg, #2a1a0e 0%, #1D120C 100%)",
        borderBottom: "4px solid #1D120C",
      }}
    >
      {/* Top decorative brass strip */}
      <div
        className="w-full h-[3px]"
        style={{
          background: "linear-gradient(90deg, #8B6914, #E5A93B 30%, #F5D77A 50%, #E5A93B 70%, #8B6914)",
        }}
      />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 z-[60]">
          <BrassGear className="animate-[spin_8s_linear_infinite]" />
          <div>
            <h1
              className="font-[family-name:var(--font-berkshire)] text-lg sm:text-xl leading-tight"
              style={{
                background: "linear-gradient(180deg, #F5D77A, #E5A93B 40%, #C68A27)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Grand Confectionery
            </h1>
            <p
              className="font-[family-name:var(--font-cinzel)] text-[8px] sm:text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "#C68A27" }}
            >
              Est. 1897
            </p>
          </div>
        </div>

        {/* Center filigree (Desktop) */}
        <div className="hidden lg:flex items-center z-[60]">
          <Filigree />
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 z-[60]">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.15em] uppercase px-4 py-2 transition-all duration-150 select-none"
              style={{
                color: hoveredIdx === idx ? "#F5D77A" : "#C68A27",
                transform: hoveredIdx === idx ? "translateY(-2px)" : "translateY(0)",
                textShadow: hoveredIdx === idx ? "0 0 8px rgba(229,169,59,0.4)" : "none",
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {link.label}

              {/* Tooltip-style hover dots */}
              <div
                className="absolute left-1/2 -bottom-2 -translate-x-1/2 transition-opacity duration-150"
                style={{
                  opacity: hoveredIdx === idx ? 1 : 0,
                }}
              >
                <div className="w-1 h-1 rounded-full bg-[#F5D77A]" />
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Icon */}
        <BrassPipeMenuIcon isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      </div>

      {/* Bottom decorative border */}
      <div
        className="absolute bottom-[-6px] left-0 w-full h-[2px] z-[60]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(229,169,59,0.5), transparent)",
        }}
      />

      {/* Heavy Iron Hatch Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-[#1D120C] border-b-[8px] border-[#C68A27] md:hidden"
            style={{
              backgroundImage: `radial-gradient(circle at center, #2B1810 0%, #1D120C 100%)`,
              boxShadow: "0 10px 40px rgba(29, 18, 12, 0.9)",
            }}
          >
            {/* Iron Hatch Rivets */}
            <div className="absolute top-24 left-6 w-5 h-5 rounded-full bg-[#E5A93B] border-[2px] border-[#1D120C] shadow-[2px_2px_0px_#8B6914]" />
            <div className="absolute top-24 right-6 w-5 h-5 rounded-full bg-[#E5A93B] border-[2px] border-[#1D120C] shadow-[2px_2px_0px_#8B6914]" />
            <div className="absolute bottom-12 left-6 w-5 h-5 rounded-full bg-[#E5A93B] border-[2px] border-[#1D120C] shadow-[2px_2px_0px_#8B6914]" />
            <div className="absolute bottom-12 right-6 w-5 h-5 rounded-full bg-[#E5A93B] border-[2px] border-[#1D120C] shadow-[2px_2px_0px_#8B6914]" />

            {/* Menu Links */}
            <div className="flex flex-col items-center gap-12 mt-12 z-20">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-[family-name:var(--font-cinzel)] text-3xl text-[#E5A93B] hover:text-[#F5D77A] tracking-[0.2em] uppercase transition-colors"
                  style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.5)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Faded Background Gear */}
            <div className="absolute bottom-16 opacity-10 pointer-events-none z-10">
              <BrassGear size={160} className="animate-[spin_12s_linear_infinite]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
