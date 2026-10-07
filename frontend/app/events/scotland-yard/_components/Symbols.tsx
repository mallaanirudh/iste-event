/** Flat poster-style figures and props, referenced with <use href="#..."> in the scenes. */
export default function Symbols() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {/* detective: trench coat and deerstalker */}
        <symbol id="sy-det" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#2d1210" /><rect x="11" y="30" width="3" height="10" fill="#2d1210" />
          <path d="M4 15 Q10 11.5 16 15 L17.5 33 L2.5 33Z" fill="#c9a676" />
          <path d="M10 13 V33" stroke="#8a6a44" strokeWidth="1" />
          <path d="M4 15 L2 27 M16 15 L18 27" stroke="#c9a676" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="10" cy="9" r="4.2" fill="#e8b98e" />
          <path d="M5.4 8.4 Q10 1.5 14.6 8.4Z" fill="#6b3423" />
          <path d="M3.5 8.6 Q10 6.6 16.5 8.6 Q10 9.6 3.5 8.6Z" fill="#4a2219" />
        </symbol>
        {/* factory hand: cream overalls, red cap */}
        <symbol id="sy-hand" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#4a2219" /><rect x="11" y="30" width="3" height="10" fill="#4a2219" />
          <path d="M5 15 Q10 12 15 15 L15.5 31 L4.5 31Z" fill="#fdf8ee" stroke="#c9a676" strokeWidth=".6" />
          <path d="M6.5 15 V22 H13.5 V15" fill="none" stroke="#e0552b" strokeWidth="1.4" />
          <path d="M5 15 L3 26 M15 15 L17 26" stroke="#fdf8ee" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="10" cy="9" r="4.2" fill="#c98f62" />
          <path d="M5.6 8 Q6 3.5 10 3.6 Q14 3.5 14.4 8Z" fill="#f0484c" /><rect x="9" y="7.2" width="7" height="1.4" rx=".7" fill="#f0484c" />
        </symbol>
        {/* constable */}
        <symbol id="sy-cop" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#14233f" /><rect x="11" y="30" width="3" height="10" fill="#14233f" />
          <path d="M4.5 15 Q10 12 15.5 15 L16 32 L4 32Z" fill="#1f3a68" />
          <path d="M4.5 15 L3 27 M15.5 15 L17 27" stroke="#1f3a68" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="10" cy="19" r=".7" fill="#e9e5dc" /><circle cx="10" cy="24" r=".7" fill="#e9e5dc" />
          <circle cx="10" cy="10" r="4" fill="#e8b98e" />
          <path d="M6.2 9 Q6 0 10 0 Q14 0 13.8 9Z" fill="#14233f" /><circle cx="10" cy="5" r="1.2" fill="#f5c834" />
        </symbol>
        {/* Mr. X: long black coat, top hat, mask */}
        <symbol id="sy-mrx" viewBox="0 0 20 40">
          <rect x="6" y="31" width="3" height="9" fill="#111" /><rect x="11" y="31" width="3" height="9" fill="#111" />
          <path d="M3.5 15 Q10 11 16.5 15 L18 35 L2 35Z" fill="#1d120c" />
          <path d="M3.5 15 L1.5 28 M16.5 15 L18.5 28" stroke="#1d120c" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M8.5 13 L10 17 L11.5 13Z" fill="#f0484c" />
          <circle cx="10" cy="9" r="4.2" fill="#fdf8ee" />
          <text x="10" y="11.4" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#1d120c">?</text>
          <rect x="6.6" y="-1" width="6.8" height="6.4" fill="#1d120c" /><rect x="4.6" y="5" width="10.8" height="1.6" rx=".8" fill="#1d120c" />
        </symbol>
        {/* candy mushroom */}
        <symbol id="sy-shroom" viewBox="0 0 30 26">
          <rect x="12" y="12" width="6" height="14" rx="2" fill="#fdf8ee" />
          <path d="M1 14 Q15 -6 29 14Z" fill="#f0484c" />
          <circle cx="9" cy="8" r="2" fill="#fdf8ee" /><circle cx="17" cy="5" r="2.2" fill="#fdf8ee" /><circle cx="23" cy="10" r="1.6" fill="#fdf8ee" />
        </symbol>
        {/* swirl lollipop */}
        <symbol id="sy-lolly" viewBox="0 0 20 40">
          <rect x="9" y="16" width="2" height="24" fill="#fdf8ee" />
          <circle cx="10" cy="9" r="8.5" fill="#f6d2b4" stroke="#2d1210" strokeWidth="1" />
          <path d="M10 9 m0 -1.5 a1.5 1.5 0 1 1 -1.5 1.5 a3 3 0 1 1 3 3 a4.5 4.5 0 1 1 -4.5 -4.5 a6 6 0 1 1 6 6" fill="none" stroke="#e0552b" strokeWidth="1.6" />
        </symbol>
        {/* candlestick phone */}
        <symbol id="sy-phone" viewBox="0 0 16 30">
          <ellipse cx="8" cy="28" rx="6" ry="2" fill="#2d1210" /><rect x="6.8" y="8" width="2.4" height="20" fill="#2d1210" />
          <path d="M4 5 H12 L10.5 9 H5.5Z" fill="#2d1210" /><rect x="11" y="10" width="3" height="9" rx="1.4" fill="#e5a93b" />
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
          <circle cx="20" cy="20" r="6" fill="#dcc095" />
        </symbol>
      </defs>
    </svg>
  );
}
