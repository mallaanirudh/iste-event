/** Flat poster-style figures and sweets, referenced with <use href="#..."> in the scenes. */
export default function Symbols() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {/* the Chocolatier: purple velvet tailcoat, tall hat, cane */}
        <symbol id="sy-choc" viewBox="0 0 24 48">
          <rect x="8" y="35" width="3" height="13" fill="#3b1d14" /><rect x="13" y="35" width="3" height="13" fill="#3b1d14" />
          <path d="M5 17 Q12 13 19 17 L21 40 L17 37 L12 41 L7 37 L3 40Z" fill="#6b2fa0" />
          <path d="M12 16 V38" stroke="#4a1f73" strokeWidth="1" />
          <path d="M9.5 16 L12 22 L14.5 16Z" fill="#f5c834" />
          <path d="M10 17 L12 18.5 L14 17 L14 19.5 L12 18.5 L10 19.5Z" fill="#e2457a" />
          <path d="M5 17 L2.5 29" stroke="#6b2fa0" strokeWidth="3" strokeLinecap="round" />
          <path d="M19 17 L22 27" stroke="#6b2fa0" strokeWidth="3" strokeLinecap="round" />
          <path d="M22 27 V47" stroke="#2b1236" strokeWidth="1.2" /><circle cx="22" cy="26.5" r="1.4" fill="#f5c834" />
          <circle cx="12" cy="10" r="4.4" fill="#f1c9a5" />
          <path d="M7.4 10 Q6.5 6 9 5.5 M16.6 10 Q17.5 6 15 5.5" stroke="#c8732e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="8" y="-2" width="8" height="8" rx=".6" fill="#7a3b26" /><rect x="8" y="3.4" width="8" height="1.6" fill="#e2457a" />
          <rect x="5.6" y="5.2" width="12.8" height="1.8" rx=".9" fill="#5a2a1b" />
        </symbol>
        {/* Candy Crew helper: orange face, green hair, white dungarees */}
        <symbol id="sy-helper" viewBox="0 0 20 34">
          <rect x="6" y="26" width="3" height="8" fill="#3b1d14" /><rect x="11" y="26" width="3" height="8" fill="#3b1d14" />
          <path d="M4.5 13 Q10 10.5 15.5 13 L15 27 L5 27Z" fill="#7a3b26" />
          <path d="M6 16 H14 V27 H6Z" fill="#fdf8ee" />
          <path d="M6.5 16 L5.5 12.8 M13.5 16 L14.5 12.8" stroke="#fdf8ee" strokeWidth="1.4" />
          <path d="M4.5 13 L2.5 21 M15.5 13 L17.5 21" stroke="#7a3b26" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="10" cy="7.5" r="4.6" fill="#f08a2e" />
          <path d="M5.2 6.4 Q5 1.5 10 1.6 Q15 1.5 14.8 6.4 Q13 4.2 10 4.4 Q7 4.2 5.2 6.4Z" fill="#3fb34f" />
          <circle cx="8.4" cy="7.6" r=".7" fill="#2b1236" /><circle cx="11.6" cy="7.6" r=".7" fill="#2b1236" />
          <path d="M8.6 9.8 Q10 10.8 11.4 9.8" stroke="#2b1236" strokeWidth=".7" fill="none" />
        </symbol>
        {/* lucky ticket holder: cap, jumper, golden ticket */}
        <symbol id="sy-kid" viewBox="0 0 20 38">
          <rect x="6.5" y="28" width="3" height="10" fill="#3d4f7a" /><rect x="10.5" y="28" width="3" height="10" fill="#3d4f7a" />
          <path d="M5 14 Q10 11.5 15 14 L15 29 L5 29Z" fill="#c9b2e8" />
          <path d="M5 18 H15 M5 22 H15" stroke="#9a7fc6" strokeWidth="1" />
          <path d="M5 14 L3 22 M15 14 L17.5 18" stroke="#c9b2e8" strokeWidth="2.6" strokeLinecap="round" />
          <rect x="15" y="13" width="7" height="4.4" rx=".6" fill="#f5c834" stroke="#b8860b" strokeWidth=".5" transform="rotate(-18 18 15)" />
          <circle cx="10" cy="8.5" r="4.2" fill="#f1c9a5" />
          <path d="M5.6 7.6 Q6 3.2 10 3.4 Q14 3.2 14.4 7.6Z" fill="#7a3b26" /><rect x="10" y="6.6" width="6.4" height="1.4" rx=".7" fill="#7a3b26" />
        </symbol>
        {/* Mr. X: long black coat, top hat, mask, sack of loot */}
        <symbol id="sy-mrx" viewBox="0 0 20 40">
          <rect x="6" y="31" width="3" height="9" fill="#111" /><rect x="11" y="31" width="3" height="9" fill="#111" />
          <path d="M3.5 15 Q10 11 16.5 15 L18 35 L2 35Z" fill="#1c1024" />
          <path d="M3.5 15 L1.5 28 M16.5 15 L18.5 28" stroke="#1c1024" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M8.5 13 L10 17 L11.5 13Z" fill="#e2457a" />
          <circle cx="10" cy="9" r="4.2" fill="#fdf8ee" />
          <path d="M6 8 H14 V10 H6Z" fill="#1c1024" />
          <rect x="6.6" y="-1" width="6.8" height="6.4" fill="#1c1024" /><rect x="4.6" y="5" width="10.8" height="1.6" rx=".8" fill="#1c1024" />
        </symbol>
        {/* candy mushroom */}
        <symbol id="sy-shroom" viewBox="0 0 30 26">
          <rect x="12" y="12" width="6" height="14" rx="2" fill="#fdf8ee" />
          <path d="M1 14 Q15 -6 29 14Z" fill="#e2457a" />
          <circle cx="9" cy="8" r="2" fill="#fdf8ee" /><circle cx="17" cy="5" r="2.2" fill="#fdf8ee" /><circle cx="23" cy="10" r="1.6" fill="#fdf8ee" />
        </symbol>
        {/* swirl lollipop */}
        <symbol id="sy-lolly" viewBox="0 0 20 40">
          <rect x="9" y="16" width="2" height="24" fill="#fdf8ee" />
          <circle cx="10" cy="9" r="8.5" fill="#fbd3e6" stroke="#2b1236" strokeWidth="1" />
          <path d="M10 9 m0 -1.5 a1.5 1.5 0 1 1 -1.5 1.5 a3 3 0 1 1 3 3 a4.5 4.5 0 1 1 -4.5 -4.5 a6 6 0 1 1 6 6" fill="none" stroke="#7b3fb8" strokeWidth="1.6" />
        </symbol>
        {/* wrapped chocolate bar */}
        <symbol id="sy-bar" viewBox="0 0 40 20">
          <rect x="1" y="1" width="38" height="18" rx="2" fill="#5a2a1b" stroke="#2b1236" strokeWidth="1.2" />
          <path d="M8 1 V19 M15 1 V19 M1 10 H15" stroke="#3b1d14" strokeWidth="1" />
          <rect x="15" y="1" width="24" height="18" fill="#7b3fb8" /><rect x="15" y="1" width="2" height="18" fill="#f5c834" />
          <rect x="20" y="6" width="15" height="8" rx="4" fill="#f5c834" />
        </symbol>
        {/* gumdrop */}
        <symbol id="sy-gum" viewBox="0 0 12 10">
          <path d="M1 10 Q1 1 6 1 Q11 1 11 10Z" fill="currentColor" /><circle cx="4" cy="4" r="1" fill="#fff" opacity=".6" />
        </symbol>
        {/* fingerprint */}
        <symbol id="sy-fp" viewBox="0 0 20 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M10 2.5c-4.2 0-7.2 3.2-7.2 8v4.5" /><path d="M10 2.5c4.2 0 7.2 3.2 7.2 8v6" />
            <path d="M10 5.6c-2.6 0-4.6 2.1-4.6 5.2v6.6" /><path d="M10 5.6c2.6 0 4.6 2.1 4.6 5.2v8" />
            <path d="M10 8.8c-1.3 0-2.1 1-2.1 2.6v8.4" /><path d="M10 8.8c1.3 0 2.1 1 2.1 2.6v9.4" /><path d="M10 12v10" />
          </g>
        </symbol>
        {/* gear */}
        <symbol id="sy-gear" viewBox="0 0 40 40">
          <path d="M17 2h6l1 5 4 2 4-3 4 4-3 4 2 4 5 1v6l-5 1-2 4 3 4-4 4-4-3-4 2-1 5h-6l-1-5-4-2-4 3-4-4 3-4-2-4-5-1v-6l5-1 2-4-3-4 4-4 4 3 4-2z" fill="currentColor" />
          <circle cx="20" cy="20" r="6" fill="#e3d4f7" />
        </symbol>
      </defs>
    </svg>
  );
}
