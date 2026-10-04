'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Briefing', href: '#briefing' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Operatives', href: '#contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 font-mono bg-[#050505]/80 backdrop-blur-md border-b border-[#00FF4115]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <span className="text-[#00FF41] font-bold text-sm md:text-base tracking-wider">
            ISTE_CRYPT <span className="text-[#00FF41] opacity-40">//</span> SQ1
          </span>
          <div className="hidden sm:flex items-center gap-2 ml-3 px-2 py-0.5 border border-[#00FF4120] bg-[#00FF4108]">
            <div className="w-2 h-2 rounded-full bg-[#00FF41] pulse-dot" />
            <span className="text-[10px] text-[#00FF41] opacity-60 tracking-widest uppercase">
              STATUS: ENCRYPTED
            </span>
          </div>
        </div>

        {/* Right: Nav */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#00FF41] opacity-60 hover:opacity-100 text-xs px-3 py-1.5
                         hover:bg-[#00FF4110] transition-all duration-200 uppercase tracking-widest"
              >
                [{link.label}]
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#00FF41] p-1 opacity-80 hover:opacity-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-b border-[#00FF4115] px-4 pb-4"
        >
          <nav className="flex flex-col gap-2 mt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#00FF41] opacity-80 hover:opacity-100 text-sm px-4 py-3
                         hover:bg-[#00FF4110] border border-transparent hover:border-[#00FF4120] transition-all duration-200 uppercase tracking-widest"
              >
                [{link.label}]
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
