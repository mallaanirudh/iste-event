import { css } from "./css";

/** The river, drifting fog and the Thames Division patrol launch. */
export default function Thames() {
  return (
      <div className="thames" aria-hidden="true">
        <div className="fog"><span></span><span></span><span></span></div>
        <svg viewBox="0 0 1000 270" preserveAspectRatio="xMidYMin meet">
          {/* embankment */}
          <rect x="0" y="0" width="1000" height="34" fill="#cbc7ba" stroke="#2b1d12" strokeWidth="3"/>
          <path d="M0 34 H1000" stroke="#6e7176" strokeWidth="6"/>
          <g stroke="#2b1d12" strokeWidth="3"><path d="M150 34 V0 M430 34 V0 M610 34 V0 M880 34 V0"/></g>
          <g fill="#c9a227" stroke="#2b1d12" strokeWidth="2"><circle cx="150" cy="-2" r="5"/><circle cx="430" cy="-2" r="5"/><circle cx="610" cy="-2" r="5"/><circle cx="880" cy="-2" r="5"/></g>
          {/* water */}
          <rect x="0" y="38" width="1000" height="232" fill="#7d8a93"/>
          <rect x="0" y="150" width="1000" height="120" fill="#6a7781"/>
          <g className="waves" stroke="#b9c4cf" strokeWidth="3" fill="none" opacity=".75">
            <path d="M0 70 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
            <path d="M0 196 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
          </g>
          <g className="waves b" stroke="#a9b6c1" strokeWidth="2.5" fill="none" opacity=".6">
            <path d="M0 120 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
            <path d="M0 240 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
          </g>
          {/* bridge (left) */}
          <path d="M0 40 H140 V60 Q110 64 100 110 H86 Q78 70 40 64 Q14 70 8 110 H0Z" fill="#9a8a70" stroke="#2b1d12" strokeWidth="3"/>
          {/* searchlight beam */}
          <path className="beam-light" d="M640 104 L1000 50 L1000 160Z" fill="#f0d58a"/>
          <g className="sail">
          {/* patrol launch */}
          <g className="bob">
            <path d="M300 170 L700 170 L670 214 L340 214Z" fill="#1f3a68" stroke="#2b1d12" strokeWidth="4"/>
            <path d="M306 180 H694" stroke="#f6ead0" strokeWidth="7"/>
            <path d="M330 206 H680" stroke="#b8472a" strokeWidth="5"/>
            <text x="500" y="203" textAnchor="middle" className="f-sc" fontSize="16" letterSpacing="6" fill="#f6ead0">POLICE · THAMES DIVISION</text>
            {/* cabin */}
            <rect x="420" y="112" width="150" height="58" fill="#efe0bf" stroke="#2b1d12" strokeWidth="3.5"/>
            <rect x="410" y="104" width="170" height="10" fill="#4a2e17"/>
            <g fill="#cfe3e0" stroke="#2b1d12" strokeWidth="2"><rect x="434" y="124" width="26" height="22"/><rect x="470" y="124" width="26" height="22"/><rect x="506" y="124" width="26" height="22"/><rect x="542" y="124" width="18" height="22"/></g>
            {/* blue lamp & funnel */}
            <rect className="siren" x="490" y="84" width="16" height="20" fill="#3c5f99" stroke="#2b1d12" strokeWidth="2"/><rect x="486" y="80" width="24" height="5" fill="#2b1d12"/>
            <rect x="440" y="78" width="20" height="26" fill="#b8472a" stroke="#2b1d12" strokeWidth="2"/><rect x="438" y="74" width="24" height="6" fill="#2b1d12"/>
            <g className="steam" fill="#d6d3c8"><circle cx="450" cy="68" r="8"/><circle cx="446" cy="68" r="6"/><circle cx="454" cy="68" r="9"/></g>
            {/* searchlight */}
            <circle cx="630" cy="108" r="12" fill="#d4a94f" stroke="#2b1d12" strokeWidth="3"/><path d="M630 120 V170" stroke="#2b1d12" strokeWidth="3"/>
            {/* flag */}
            <path d="M330 170 V100" stroke="#2b1d12" strokeWidth="3"/><path d="M330 102 L364 110 L330 118Z" fill="#c9a227" stroke="#2b1d12" strokeWidth="1.5"/>
            {/* crew */}
            <use href="#p-cop" x="352" y="120" width="26" height="52"/>
            <use href="#p-cop" x="384" y="120" width="26" height="52"/>
            <use href="#p-det" x="590" y="118" width="26" height="54"/>
            <path d="M612 130 L628 124" stroke="#2b1d12" strokeWidth="4" strokeLinecap="round"/>
            {/* life ring */}
            <circle cx="400" cy="190" r="0" fill="none"/>
            <circle cx="660" cy="190" r="9" fill="none" stroke="#b8472a" strokeWidth="5" strokeDasharray="7 7"/>
          </g>
          {/* bow wake */}
          <path d="M700 188 q20 6 46 2 M700 200 q26 10 60 6" stroke="#f6ead0" strokeWidth="3" fill="none" opacity=".8"/>
          </g>
          {/* gulls */}
          <path d="M200 70 q8 -8 16 0 q8 -8 16 0 M820 90 q6 -6 12 0 q6 -6 12 0" stroke="#2b1d12" strokeWidth="2" fill="none"/>
          {/* bottle in the river */}
          <g className="bob" style={css({animationDelay: "-2s"})}><path d="M240 232 L262 226 L264 234 L242 240Z" fill="#3f6b4a" stroke="#2b1d12" strokeWidth="1.5"/><rect x="262" y="227" width="6" height="5" fill="#b89462"/></g>
        </svg>
      </div>
  );
}
