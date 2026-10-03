import { css } from "./css";

/** Shared SVG symbols (figures, props, patterns) referenced with <use href="#..."> across the page. */
export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={css({position: "absolute"})} aria-hidden="true">
      <defs>
        {/* Detective: trench coat & deerstalker */}
        <symbol id="p-det" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#2b1d12"/><rect x="11" y="30" width="3" height="10" fill="#2b1d12"/>
          <path d="M4 15 Q10 11.5 16 15 L17.5 33 L2.5 33Z" fill="#a8875a"/>
          <path d="M10 13 L10 33" stroke="#7a5f3b" strokeWidth="1"/>
          <path d="M4 15 L2 27" stroke="#a8875a" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M16 15 L18 27" stroke="#a8875a" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M5.5 15 L8 19 L10 14 L12 19 L14.5 15" fill="none" stroke="#7a5f3b" strokeWidth=".8"/>
          <circle cx="10" cy="9" r="4.2" fill="#e3b98f"/>
          <path d="M5.4 8.4 Q10 1.5 14.6 8.4Z" fill="#7d6a48"/>
          <path d="M3.5 8.6 Q10 6.6 16.5 8.6 Q10 9.6 3.5 8.6Z" fill="#5e4f34"/>
        </symbol>
        {/* Constable: blue tunic & custodian helmet */}
        <symbol id="p-cop" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#14233f"/><rect x="11" y="30" width="3" height="10" fill="#14233f"/>
          <path d="M4.5 15 Q10 12 15.5 15 L16 32 L4 32Z" fill="#1f3a68"/>
          <path d="M4.5 15 L3 27" stroke="#1f3a68" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M15.5 15 L17 27" stroke="#1f3a68" strokeWidth="2.6" strokeLinecap="round"/>
          <circle cx="10" cy="18" r=".7" fill="#d6d3c8"/><circle cx="10" cy="22" r=".7" fill="#d6d3c8"/><circle cx="10" cy="26" r=".7" fill="#d6d3c8"/>
          <rect x="4.2" y="28" width="11.6" height="1.4" fill="#0f1a30"/>
          <circle cx="10" cy="10" r="4" fill="#e3b98f"/>
          <path d="M6.2 9 Q6 0 10 0 Q14 0 13.8 9Z" fill="#14233f"/>
          <rect x="5.4" y="8.4" width="9.2" height="1.4" rx=".6" fill="#0f1a30"/>
          <circle cx="10" cy="5" r="1.2" fill="#c9a227"/>
        </symbol>
        {/* Scientist: lab coat & goggles */}
        <symbol id="p-sci" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#4a4c50"/><rect x="11" y="30" width="3" height="10" fill="#4a4c50"/>
          <path d="M4 15 Q10 12 16 15 L17 34 L3 34Z" fill="#f4efe2" stroke="#8e9196" strokeWidth=".6"/>
          <path d="M4 15 L2.5 26" stroke="#f4efe2" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M16 15 L17.5 26" stroke="#f4efe2" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M10 14 L10 34" stroke="#8e9196" strokeWidth=".6"/>
          <circle cx="10" cy="9" r="4.2" fill="#c99872"/>
          <path d="M5.8 8 Q6 3.6 10 3.8 Q14 3.6 14.2 8 Q12 5.8 10 6 Q8 5.8 5.8 8Z" fill="#3a2a1e"/>
          <rect x="6" y="8" width="8" height="2" rx="1" fill="#3c5f99" opacity=".85"/>
        </symbol>
        {/* Tweed gentleman & bowler */}
        <symbol id="p-tweed" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#3a2a1e"/><rect x="11" y="30" width="3" height="10" fill="#3a2a1e"/>
          <path d="M4.5 15 Q10 12 15.5 15 L16 31 L4 31Z" fill="#7a5a3a"/>
          <path d="M4.5 15 L3 27" stroke="#7a5a3a" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M15.5 15 L17 27" stroke="#7a5a3a" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M4.5 19 H15.6 M4.3 23 H15.8 M4.2 27 H15.9 M7.5 13.5 V31 M12.5 13.5 V31" stroke="#5e4329" strokeWidth=".5"/>
          <path d="M8.5 14 L10 18 L11.5 14Z" fill="#b8472a"/>
          <circle cx="10" cy="9" r="4.2" fill="#e3b98f"/>
          <path d="M6.4 7.5 Q6.4 2.2 10 2.2 Q13.6 2.2 13.6 7.5Z" fill="#2b1d12"/>
          <rect x="4.8" y="7" width="10.4" height="1.4" rx=".7" fill="#2b1d12"/>
          <path d="M8 11.6 Q10 12.6 12 11.6" stroke="#6b4423" strokeWidth=".9" fill="none"/>
        </symbol>
        {/* Suspect: flat cap & striped jersey */}
        <symbol id="p-sus" viewBox="0 0 20 40">
          <rect x="6" y="30" width="3" height="10" fill="#4a4c50"/><rect x="11" y="30" width="3" height="10" fill="#4a4c50"/>
          <path d="M4.5 15 Q10 12 15.5 15 L15.5 31 L4.5 31Z" fill="#d6d3c8"/>
          <path d="M4.5 18 H15.5 M4.5 21.5 H15.5 M4.5 25 H15.5 M4.5 28.5 H15.5" stroke="#2b1d12" strokeWidth="1.3"/>
          <path d="M4.5 15 L3 27" stroke="#4a4c50" strokeWidth="2.6" strokeLinecap="round"/>
          <path d="M15.5 15 L17 27" stroke="#4a4c50" strokeWidth="2.6" strokeLinecap="round"/>
          <circle cx="10" cy="9" r="4.2" fill="#d9a87e"/>
          <path d="M5.6 8 Q6 4 10.5 4.2 Q14 4.4 14.2 7.4 L16.5 8.4 Z" fill="#5a5d52"/>
          <path d="M7 11.8 H13" stroke="#6b4423" strokeWidth=".6"/>
        </symbol>
        {/* Microscope */}
        <symbol id="scope" viewBox="0 0 24 34">
          <rect x="2" y="30" width="20" height="4" rx="1" fill="#2b1d12"/>
          <rect x="5" y="20" width="13" height="2" fill="#4a3624"/>
          <path d="M18 30 Q23 18 15 7" stroke="#b5893a" strokeWidth="3" fill="none"/>
          <rect x="9" y="1" width="5" height="17" rx="1" fill="#d4a94f" transform="rotate(-18 11 10)"/>
          <rect x="6.5" y="-1" width="6" height="3" rx="1" fill="#2b1d12" transform="rotate(-18 11 10)"/>
        </symbol>
        {/* Candlestick telephone */}
        <symbol id="phone" viewBox="0 0 16 30">
          <ellipse cx="8" cy="28" rx="6" ry="2" fill="#2b1d12"/>
          <rect x="6.8" y="8" width="2.4" height="20" fill="#2b1d12"/>
          <path d="M4 5 L12 5 L10.5 9 L5.5 9Z" fill="#2b1d12"/>
          <rect x="11" y="10" width="3" height="9" rx="1.4" fill="#b5893a"/>
          <path d="M12.5 10 L12.5 7 L9 7" stroke="#2b1d12" strokeWidth="1" fill="none"/>
        </symbol>
        {/* Fingerprint */}
        <symbol id="fp" viewBox="0 0 20 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round">
            <path d="M10 2.5c-4.2 0-7.2 3.2-7.2 8v4.5"/><path d="M10 2.5c4.2 0 7.2 3.2 7.2 8v6"/>
            <path d="M10 5.6c-2.6 0-4.6 2.1-4.6 5.2v6.6"/><path d="M10 5.6c2.6 0 4.6 2.1 4.6 5.2v8"/>
            <path d="M10 8.8c-1.3 0-2.1 1-2.1 2.6v8.4"/><path d="M10 8.8c1.3 0 2.1 1 2.1 2.6v9.4"/>
            <path d="M10 12v10"/>
          </g>
        </symbol>
        {/* Compass rose */}
        <symbol id="compass" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" fill="none" stroke="#6b4423" strokeWidth="1.4"/>
          <circle cx="20" cy="20" r="13" fill="none" stroke="#6b4423" strokeWidth=".7" strokeDasharray="1.5 2"/>
          <path d="M20 1 L23 17 L39 20 L23 23 L20 39 L17 23 L1 20 L17 17Z" fill="#b5893a" stroke="#4a2e17" strokeWidth=".8"/>
          <path d="M20 1 L23 17 L20 20Z M39 20 L23 23 L20 20Z M20 39 L17 23 L20 20Z M1 20 L17 17 L20 20Z" fill="#4a2e17"/>
          <circle cx="20" cy="20" r="2" fill="#b8472a"/>
        </symbol>
        <pattern id="cork" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#b88552"/><circle cx="2" cy="3" r=".9" fill="#9c6c3e"/><circle cx="6" cy="6" r=".7" fill="#d0a06c"/>
        </pattern>
        <pattern id="tiles" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#e9dfc8"/><rect width="10" height="10" fill="#c9bfa6"/><rect x="10" y="10" width="10" height="10" fill="#c9bfa6"/>
        </pattern>
        <pattern id="boards" width="40" height="10" patternUnits="userSpaceOnUse">
          <rect width="40" height="10" fill="#8b5a2b"/><path d="M0 9.5 H40 M20 0 V9.5" stroke="#6b4423" strokeWidth="1"/>
        </pattern>
        <pattern id="mesh" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 0 L8 8 M8 0 L0 8" stroke="#4a4c50" strokeWidth=".9"/>
        </pattern>
        <pattern id="jacks" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#4a2e17"/><circle cx="7" cy="7" r="2.6" fill="#1a1109" stroke="#b5893a" strokeWidth="1"/>
        </pattern>
        <pattern id="corrugated" width="12" height="10" patternUnits="userSpaceOnUse">
          <rect width="12" height="10" fill="#9a9ca0"/><rect width="5" height="10" fill="#aeb0b2"/><rect x="5" width="1" height="10" fill="#7e8084"/>
        </pattern>
        <pattern id="drawers" width="40" height="22" patternUnits="userSpaceOnUse">
          <rect width="40" height="22" fill="#6e7a62"/><rect x="2" y="2" width="36" height="18" fill="#7f8b72" stroke="#4e5944" strokeWidth="1"/>
          <rect x="14" y="9" width="12" height="3" rx="1" fill="#d4a94f"/><rect x="16" y="4" width="8" height="3" fill="#efe0bf"/>
        </pattern>
      </defs>
    </svg>
  );
}
