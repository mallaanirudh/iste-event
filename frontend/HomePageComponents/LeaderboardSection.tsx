"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type LeaderboardEntry = {
  rank: number;
  teamName: string;
  division: string;
  totalScore: number;
  badge: string;
};

const MOCK_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    teamName: "The Gobstopper Guild",
    division: "Catalyst Sq1",
    totalScore: 14500,
    badge: "Golden Gobstopper",
  },
  {
    rank: 2,
    teamName: "Oompa Loompa Ops",
    division: "Charge Sq1",
    totalScore: 13200,
    badge: "Silver Ticket",
  },
  {
    rank: 3,
    teamName: "Fizzy Lifting Flyers",
    division: "Concrete Sq1",
    totalScore: 12850,
    badge: "Bronze Gears",
  },
  {
    rank: 4,
    teamName: "Slugworth's Saboteurs",
    division: "Scotland Yard",
    totalScore: 11400,
    badge: "Magnifying Glass",
  },
  {
    rank: 5,
    teamName: "Wonkavisionaries",
    division: "Crypt Sq1",
    totalScore: 10900,
    badge: "Glitch Core",
  },
];

function Rivet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`w-5 h-5 sm:w-6 sm:h-6 ${className}`}>
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="#C68A27"
        stroke="#1D120C"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="8" r="5" fill="#E5A93B" />
      <path
        d="M4 8H12 M8 4V12"
        stroke="#1D120C"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

function TitlePlaque() {
  return (
    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#E5A93B] border-[3px] border-[#1D120C] px-6 sm:px-10 py-3 flex items-center justify-center shadow-[6px_6px_0px_#1D120C] whitespace-nowrap z-20">
      <Rivet className="mr-4" />
      <h3 className="font-[family-name:var(--font-cinzel)] text-[#1D120C] text-lg sm:text-2xl font-bold tracking-[0.1em]">
        GRAND INVENTOR TALLY
      </h3>
      <Rivet className="ml-4" />
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  let bg = "bg-[#1D120C] text-[#FDF8EE]";
  let border = "border-[#1D120C]";

  if (rank === 1) {
    bg = "bg-gradient-to-br from-[#F5D77A] to-[#C68A27] text-[#1D120C]";
    border = "border-[#1D120C] shadow-[inset_0_0_8px_rgba(255,255,255,0.8)]";
  } else if (rank === 2) {
    bg = "bg-gradient-to-br from-[#E2E8F0] to-[#94A3B8] text-[#1D120C]";
    border = "border-[#1D120C] shadow-[inset_0_0_8px_rgba(255,255,255,0.9)]";
  } else if (rank === 3) {
    bg = "bg-gradient-to-br from-[#D97757] to-[#A0522D] text-[#1D120C]";
    border = "border-[#1D120C] shadow-[inset_0_0_8px_rgba(255,255,255,0.5)]";
  }

  return (
    <div
      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-[2px] rounded-sm font-[family-name:var(--font-cinzel)] font-bold text-lg sm:text-xl shrink-0 ${bg} ${border}`}
    >
      {rank}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex w-full items-center animate-pulse border-b-[2px] border-[#1D120C]/20 bg-[#1D120C]/5 p-3 sm:p-4 rounded-sm mb-2">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1D120C]/20 mr-4 shrink-0" />
      <div className="flex-1 space-y-2 mr-4">
        <div className="h-5 w-32 sm:w-48 bg-[#1D120C]/20" />
        <div className="h-3 w-20 bg-[#1D120C]/10" />
      </div>
      <div className="w-32 h-6 bg-[#1D120C]/20 mr-4 hidden sm:block" />
      <div className="w-16 h-8 bg-[#1D120C]/20" />
    </div>
  );
}

export default function LeaderboardSection() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        if (!res.ok) throw new Error("API not found or failed");
        const json = await res.json();
        setData(json);
      } catch {
        console.warn("Using fallback mock data for leaderboard.");
        setError(true);
        setData(MOCK_DATA);
      } finally {
        setLoading(false);
      }
    };

    // Simulate network delay for mechanical suspense
    const timer = setTimeout(fetchLeaderboard, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-[#FDF8EE] py-32 px-4 sm:px-8 flex justify-center">
      <div className="w-full max-w-5xl relative z-10 mt-12">
        {/* Outer Heavy Chocolate Frame */}
        <div
          className="relative bg-[#1D120C] p-3 sm:p-6 border-[3px] border-[#1D120C] rounded-sm"
          style={{ boxShadow: "12px 12px 0px #1D120C" }}
        >
          <TitlePlaque />

          {/* Corner Frame Rivets */}
          <Rivet className="absolute top-2 left-2" />
          <Rivet className="absolute top-2 right-2" />
          <Rivet className="absolute bottom-2 left-2" />
          <Rivet className="absolute bottom-2 right-2" />

          {/* Inner Parchment Board */}
          <div className="bg-[#FDF8EE] border-[3px] border-[#C68A27] p-2 sm:p-4 h-full relative overflow-hidden mt-6 sm:mt-4">
            
            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[600px] sm:min-w-[700px] pr-2 pb-2 pt-1 pl-1">
                {/* Table Header (Stamped Brass) */}
                <div
                  className="flex items-center bg-[#E5A93B] border-[3px] border-[#1D120C] p-3 sm:p-4 mb-4"
                  style={{ boxShadow: "4px 4px 0px rgba(29,18,12,0.8)" }}
                >
                  <div className="w-16 sm:w-20 font-[family-name:var(--font-cinzel)] font-bold text-[#1D120C] text-xs sm:text-sm tracking-widest uppercase">
                    Rank
                  </div>
                  <div className="flex-1 font-[family-name:var(--font-cinzel)] font-bold text-[#1D120C] text-xs sm:text-sm tracking-widest uppercase">
                    Contender
                  </div>
                  <div className="w-40 sm:w-48 font-[family-name:var(--font-cinzel)] font-bold text-[#1D120C] text-xs sm:text-sm tracking-widest uppercase">
                    Division
                  </div>
                  <div className="w-24 sm:w-32 text-right font-[family-name:var(--font-cinzel)] font-bold text-[#1D120C] text-xs sm:text-sm tracking-widest uppercase pr-4">
                    Score
                  </div>
                </div>

                {/* Data Rows */}
                {loading ? (
                  <div className="space-y-2">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data.map((entry) => (
                      <motion.div
                        key={entry.rank}
                        whileHover={{ x: 4, backgroundColor: "rgba(229, 169, 59, 0.15)" }}
                        className="flex items-center w-full bg-[#FDF8EE] border-[2px] border-[#1D120C] p-2 sm:p-3 transition-colors cursor-pointer"
                        style={{ boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.05), 2px 2px 0px rgba(29,18,12,0.5)" }}
                      >
                        <div className="w-16 sm:w-20 pl-1">
                          <RankBadge rank={entry.rank} />
                        </div>
                        <div className="flex-1 pr-4">
                          <h4 className="font-[family-name:var(--font-outfit)] font-bold text-[#1D120C] text-base sm:text-lg mb-0.5">
                            {entry.teamName}
                          </h4>
                          <span className="inline-block bg-[#1D120C] text-[#E5A93B] font-[family-name:var(--font-cinzel)] text-[9px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm">
                            Badge: {entry.badge}
                          </span>
                        </div>
                        <div className="w-40 sm:w-48 font-[family-name:var(--font-outfit)] text-[#4A1235] font-medium text-sm sm:text-base opacity-90">
                          {entry.division}
                        </div>
                        <div className="w-24 sm:w-32 text-right pr-4 font-[family-name:var(--font-outfit)] font-black text-xl sm:text-2xl text-[#1D120C]">
                          {entry.totalScore.toLocaleString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Error boundary note (visually integrated) */}
            {error && !loading && (
              <div className="mt-4 p-2 border-l-[3px] border-[#4A1235] bg-[#4A1235]/10 text-[#4A1235] font-[family-name:var(--font-outfit)] text-xs font-semibold uppercase tracking-wider flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#4A1235] mr-2" />
                Live API connection severed. Displaying emergency analog backup data.
              </div>
            )}
          </div>
        </div>

        {/* Full Leaderboard Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="/leaderboard"
            className="group relative inline-flex items-center gap-3 bg-[#E5A93B] border-[3px] border-[#1D120C] px-8 py-3 font-[family-name:var(--font-cinzel)] font-bold tracking-widest text-[#1D120C] text-sm uppercase transition-transform hover:-translate-y-1 active:translate-y-1 active:shadow-none"
            style={{ boxShadow: "6px 6px 0px #1D120C" }}
          >
            Access Full Records
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="#1D120C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
