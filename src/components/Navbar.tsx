"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "The Factory", href: "#factory" },
  { label: "Exhibits", href: "#exhibits" },
  { label: "Golden Tickets", href: "#tickets" },
  { label: "The Chocolatier", href: "#about" },
];

/* ── Decorative brass gear SVG ────────────────────── */
function BrassGear({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="6" stroke="#C68A27" strokeWidth="2" fill="#E5A93B" />
      <circle cx="14" cy="14" r="3" fill="#C68A27" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="12.5"
          y="1"
          width="3"
          height="5"
          rx="1"
          fill="#C68A27"
          transform={`rotate(${angle} 14 14)`}
        />
      ))}
    </svg>
  );
}

/* ── Ornate filigree divider ──────────────────────── */
function Filigree() {
  return (
    <svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-60"
    >
      <path
        d="M0 8 C4 2, 8 2, 10 8 C12 14, 16 14, 16 8 C16 2, 20 2, 22 8 C24 14, 28 14, 32 8"
        stroke="#C68A27"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

/* ── Brass rivet row ──────────────────────────────── */
function RivetRow() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[6px] flex items-center justify-between px-2 pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
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

export default function Navbar() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

      <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <BrassGear className="animate-[spin_8s_linear_infinite]" />
          <div>
            <h1
              className="font-[family-name:var(--font-berkshire)] text-xl leading-tight"
              style={{
                background: "linear-gradient(180deg, #F5D77A, #E5A93B 40%, #C68A27)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The Grand Confectionery
            </h1>
            <p
              className="font-[family-name:var(--font-cinzel)] text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "#C68A27" }}
            >
              Est. 1897
            </p>
          </div>
        </div>

        {/* Center filigree */}
        <div className="hidden lg:flex items-center">
          <Filigree />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className="relative font-[family-name:var(--font-cinzel)] text-[11px] tracking-[0.15em] uppercase px-4 py-2 transition-all duration-150 select-none"
              style={{
                color: hoveredIdx === idx ? "#F5D77A" : "#C68A27",
                transform:
                  hoveredIdx === idx ? "translateY(-2px)" : "translateY(0)",
                textShadow:
                  hoveredIdx === idx ? "0 0 8px rgba(229,169,59,0.4)" : "none",
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Hover backing plate */}
              <span
                className="absolute inset-0 rounded-sm transition-all duration-150"
                style={{
                  background:
                    hoveredIdx === idx
                      ? "rgba(229,169,59,0.08)"
                      : "transparent",
                  border:
                    hoveredIdx === idx
                      ? "1px solid rgba(229,169,59,0.2)"
                      : "1px solid transparent",
                  boxShadow:
                    hoveredIdx === idx
                      ? "3px 3px 0px rgba(29,18,12,0.6)"
                      : "0px 0px 0px transparent",
                }}
              />
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#tickets"
          className="hidden sm:block font-[family-name:var(--font-cinzel)] text-[10px] tracking-[0.15em] uppercase px-5 py-2 transition-all duration-150 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #E5A93B, #C68A27)",
            color: "#1D120C",
            border: "2px solid #1D120C",
            boxShadow: "3px 3px 0px #1D120C",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "5px 5px 0px #1D120C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "3px 3px 0px #1D120C";
          }}
        >
          Get Your Ticket
        </a>
      </div>

      {/* Bottom rivet row */}
      <div className="relative h-[6px]">
        <RivetRow />
      </div>

      {/* Bottom brass strip */}
      <div
        className="w-full h-[2px]"
        style={{
          background: "linear-gradient(90deg, #8B6914, #E5A93B 30%, #F5D77A 50%, #E5A93B 70%, #8B6914)",
        }}
      />
    </nav>
  );
}
