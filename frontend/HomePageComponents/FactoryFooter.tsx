"use client";

import { motion } from "framer-motion";

function Silhouette() {
  return (
    <div className="w-full text-[#1D120C] bg-[#FDF8EE] -mb-[1px]">
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="w-full h-20 sm:h-28 md:h-36 block"
      >
        {/* Main Chimney Silhouette (Extended to x=1000) */}
        <path
          fill="currentColor"
          d="M0,120 L0,70 L20,70 L20,40 L40,40 L40,90 L80,90 L80,50 L110,50 L110,20 L130,20 L130,80 L180,80 L180,50 L210,50 L210,30 L240,30 L240,100 L300,100 L300,20 L330,20 L330,90 L400,90 L400,50 L430,50 L430,40 L450,40 L450,70 L500,70 L500,20 L530,20 L530,110 L600,110 L600,60 L630,60 L630,40 L660,40 L660,80 L720,80 L720,30 L750,30 L750,20 L770,20 L770,70 L830,70 L830,50 L860,50 L860,30 L890,30 L890,100 L940,100 L940,40 L1000,40 L1000,120 Z"
        />
      </svg>
    </div>
  );
}

function WaxSeal() {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
      {/* Outer uneven edge */}
      <path d="M 50 5 C 65 2, 85 10, 92 25 C 98 40, 95 60, 85 75 C 75 90, 55 98, 40 95 C 20 90, 5 75, 5 55 C 2 35, 15 15, 30 8 C 38 4, 45 6, 50 5 Z" fill="#4A1235" />
      {/* Inner stamped ring */}
      <circle cx="50" cy="50" r="32" fill="#6A1B4B" stroke="#2B0C3D" strokeWidth="2" />
      <circle cx="50" cy="50" r="28" stroke="#E5A93B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      {/* M symbol */}
      <text x="50" y="62" textAnchor="middle" fill="#E5A93B" className="font-[family-name:var(--font-berkshire)] text-[38px] drop-shadow-[1px_1px_0px_#1D120C]">M</text>
    </svg>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1D120C] border-[2px] border-[#C68A27] text-[#C68A27] hover:bg-[#C68A27] hover:text-[#1D120C] transition-all duration-200 hover:-translate-y-1 active:translate-y-1 active:shadow-none"
      style={{ boxShadow: "0px 4px 0px #8B6914" }}
    >
      {icon}
    </a>
  );
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function FactoryFooter() {
  return (
    <footer className="w-full relative bg-[#1D120C] text-[#FDF8EE] overflow-hidden">
      
      {/* Silhouette Transition */}
      <Silhouette />

      <div className="relative border-t-[4px] border-[#C68A27] pt-16 sm:pt-20 pb-8 px-6 sm:px-12 z-10">
        
        {/* Main 4-Column Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-16 mb-16">
          
          {/* Column 1: Trademark */}
          <div>
            <h3 className="font-[family-name:var(--font-berkshire)] text-3xl sm:text-4xl text-[#E5A93B] mb-4">
              Mega Event
            </h3>
            <p className="font-[family-name:var(--font-outfit)] opacity-70 text-sm mb-6 leading-relaxed">
              Invented & Engineered by the Mega Event Committee. All wonders strictly regulated and tested for maximum confectionary delight.
            </p>
            <WaxSeal />
          </div>

          {/* Column 2: Directory */}
          <div>
            <h4 className="font-[family-name:var(--font-cinzel)] text-[#F5D77A] text-base sm:text-lg font-bold tracking-widest mb-6">
              Chambers
            </h4>
            <ul className="space-y-3 font-[family-name:var(--font-outfit)] text-sm opacity-80">
              <li>
                <a href="/events/scotland-yard" className="hover:text-[#E5A93B] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C68A27]" /> Scotland Yard
                </a>
              </li>
              <li>
                <a href="/events/charge-sq1" className="hover:text-[#E5A93B] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C68A27]" /> Charge Sq1
                </a>
              </li>
              <li>
                <a href="/events/catalyst-sq1" className="hover:text-[#E5A93B] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C68A27]" /> Catalyst Sq1
                </a>
              </li>
              <li>
                <a href="/events/crypt-sq1" className="hover:text-[#E5A93B] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C68A27]" /> Crypt Sq1
                </a>
              </li>
              <li>
                <a href="/events/clutch-sq1" className="hover:text-[#E5A93B] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C68A27]" /> Clutch Sq1
                </a>
              </li>
              <li>
                <a href="/events/concrete-sq1" className="hover:text-[#E5A93B] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C68A27]" /> Concrete Sq1
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Dispatch */}
          <div>
            <h4 className="font-[family-name:var(--font-cinzel)] text-[#F5D77A] text-base sm:text-lg font-bold tracking-widest mb-6">
              Dispatch
            </h4>
            <a
              href="#register"
              className="inline-block bg-[#E5A93B] text-[#1D120C] font-[family-name:var(--font-cinzel)] font-bold text-xs sm:text-sm px-5 py-2.5 mb-6 transition-transform hover:-translate-y-1 active:translate-y-1"
              style={{ boxShadow: "4px 4px 0px #C68A27" }}
            >
              Secure Entry
            </a>
            <div className="border-t-[2px] border-[#FDF8EE]/10 pt-5 mt-2">
              <p className="font-[family-name:var(--font-outfit)] text-xs opacity-60 uppercase tracking-widest mb-1">
                Telegram To:
              </p>
              <a href="mailto:contact@megaevent.io" className="font-[family-name:var(--font-outfit)] text-sm text-[#E5A93B] hover:text-[#F5D77A] uppercase tracking-widest font-semibold transition-colors">
                CONTACT@MEGAEVENT.IO
              </a>
            </div>
          </div>

          {/* Column 4: Frequencies */}
          <div>
            <h4 className="font-[family-name:var(--font-cinzel)] text-[#F5D77A] text-base sm:text-lg font-bold tracking-widest mb-6">
              Frequencies
            </h4>
            <div className="flex gap-4">
              {/* SVG Icons for Socials */}
              <SocialButton
                href="https://instagram.com"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                }
              />
              <SocialButton
                href="https://github.com"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                }
              />
              <SocialButton
                href="https://discord.com"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="max-w-7xl mx-auto border-t-[2px] border-[#C68A27]/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Scroll Ornament */}
          <div className="hidden md:flex flex-1 items-center gap-2 opacity-40">
            <div className="h-[1px] flex-1 bg-[#FDF8EE]" />
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
               <path d="M 20 6 Q 25 0 30 6 T 40 6 M 20 6 Q 15 12 10 6 T 0 6" stroke="#FDF8EE" strokeWidth="1" fill="none"/>
               <circle cx="20" cy="6" r="3" fill="#FDF8EE" />
            </svg>
            <div className="h-[1px] flex-1 bg-[#FDF8EE]" />
          </div>

          <p className="font-[family-name:var(--font-outfit)] text-[10px] sm:text-xs opacity-50 uppercase tracking-widest text-center mx-8">
            © 2026 Mega Event Factory. Patents Pending. Do Not Eat The Wallpaper.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-[family-name:var(--font-cinzel)] text-[#E5A93B] hover:text-[#F5D77A] text-xs font-bold tracking-widest uppercase transition-colors"
          >
            Chimney Ascent
            <span className="flex items-center justify-center w-6 h-6 rounded-full border-[1px] border-[#E5A93B] group-hover:bg-[#E5A93B] group-hover:text-[#1D120C] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </span>
          </button>
          
        </div>
      </div>
    </footer>
  );
}
