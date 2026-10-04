"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface FlashlightIntroProps {
  onComplete: () => void;
}

export default function FlashlightIntro({ onComplete }: FlashlightIntroProps) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isDegaussing, setIsDegaussing] = useState(false);
  const [pos, setPos] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    setPos({
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`,
    });
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const handleHandshakeClick = () => {
    setIsDegaussing(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const flashlightStyle: React.CSSProperties = {
    background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(5,5,5,0.95) 40%, #050505 100%)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center font-mono overflow-hidden ${
        isDegaussing ? "degauss" : ""
      }`}
      style={{ backgroundColor: "#050505" }}
      onPointerMove={handlePointerMove}
    >
      {/* Faint background grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: 'linear-gradient(#00FF41 1px, transparent 1px), linear-gradient(90deg, #00FF41 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 z-0 opacity-10 flex flex-wrap content-start break-all overflow-hidden text-[#00FF41] text-[10px] leading-tight select-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={i}>
            01001001 01010011 01010100 01000101 01011111 01000011 01010010 01011001 01010000 01010100 
            01010011 01010001 00110001 01010100 01010010 01010101 01010011 01010100 01001110 01001111 
            01001100 01001001 01001110 01001011 
          </span>
        ))}
      </div>

      {/* Center pulsing text */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <span className="text-[#00FF41] opacity-30 text-lg tracking-[0.3em] uppercase animate-pulse">
          Search the grid...
        </span>
      </div>

      {/* The hidden target */}
      <div
        className="absolute z-20"
        style={{
          top: pos.top,
          left: pos.left,
          transform: "translate(-50%, -50%)",
        }}
      >
        <button
          onClick={handleHandshakeClick}
          className="text-[#00FF41] hover:text-[#00F0FF] p-4 focus:outline-none select-none transition-colors duration-200 hover:scale-110 flex flex-col items-center gap-2 group"
          style={{ animation: "flicker 3s infinite" }}
        >
          <Terminal size={48} className="drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]" />
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">ACCESS</span>
        </button>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-[#00FF41] opacity-50 hover:opacity-100 focus:outline-none text-sm tracking-wider z-[120] select-none transition-opacity duration-200 border border-[#00FF41]/30 px-3 py-1 bg-[#050505]/50"
      >
        [Skip Intro]
      </button>

      {/* The Flashlight Mask */}
      <div
        className="pointer-events-none absolute inset-0 z-40"
        style={flashlightStyle}
      />

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
          25%, 75% { opacity: 0.9; }
          30% { opacity: 0.3; }
          80% { opacity: 0.8; }
        }
      `}</style>
    </motion.div>
  );
}
