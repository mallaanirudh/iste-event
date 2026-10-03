import { css } from "./css";

/** Roofline with the Gothic clock tower. The hands and bell are driven by <SceneEffects />. */
export default function Roof() {
  return (
      <div className="roof" aria-hidden="true">
        <svg viewBox="0 -145 1000 395" preserveAspectRatio="xMidYMax meet">
          {/* steam */}
          <g className="steam" fill="#d6d3c8"><circle cx="220" cy="90" r="12"/><circle cx="214" cy="90" r="10"/><circle cx="226" cy="90" r="14"/></g>
          <g className="steam" fill="#d6d3c8"><circle cx="780" cy="110" r="12"/><circle cx="786" cy="110" r="10"/><circle cx="774" cy="110" r="14"/></g>
          {/* chimneys */}
          <rect x="200" y="100" width="40" height="80" fill="#b8472a" stroke="#2b1d12" strokeWidth="3"/><rect x="194" y="94" width="52" height="10" fill="#4a2e17"/>
          <path d="M200 120 H240 M200 140 H240 M200 160 H240 M220 100 V120 M210 120 V140 M230 140 V160" stroke="#8a3520" strokeWidth="2"/>
          <rect x="760" y="120" width="40" height="60" fill="#b8472a" stroke="#2b1d12" strokeWidth="3"/><rect x="754" y="114" width="52" height="10" fill="#4a2e17"/>
          {/* roof */}
          <path d="M40 250 L130 150 H870 L960 250Z" fill="url(#corrugated)" stroke="#2b1d12" strokeWidth="4"/>
          <path d="M130 150 H870" stroke="#4a4c50" strokeWidth="6"/>
          {/* skylights */}
          <g fill="#cfe3e0" stroke="#2b1d12" strokeWidth="2.5"><path d="M180 230 L205 180 H265 L250 230Z"/><path d="M735 230 L750 180 H810 L835 230Z"/></g>
          <path d="M228 180 L215 230 M780 180 L792 230" stroke="#2b1d12" strokeWidth="2"/>
          {/* clock tower (Gothic, after the Elizabeth Tower) */}
          <defs>
            <linearGradient id="stoneG" x1="0" x2="1"><stop offset="0" stopColor="#ead5a6"/><stop offset=".55" stopColor="#d9bd85"/><stop offset="1" stopColor="#b3935b"/></linearGradient>
            <linearGradient id="goldG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f8e3a3"/><stop offset=".5" stopColor="#d4a94f"/><stop offset="1" stopColor="#8f6a26"/></linearGradient>
            <radialGradient id="dialG" cx="45%" cy="40%" r="60%"><stop offset="0" stopColor="#fffaea"/><stop offset=".7" stopColor="#f3e6c4"/><stop offset="1" stopColor="#d6c294"/></radialGradient>
            <linearGradient id="slateG" x1="0" x2="1"><stop offset="0" stopColor="#4a5a70"/><stop offset=".5" stopColor="#2f3b4d"/><stop offset="1" stopColor="#1c2532"/></linearGradient>
            <pattern id="ashlar" width="26" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 H26 M0 14 H26 M6 0 V7 M19 7 V14" stroke="#9c7f4c" strokeWidth=".8" opacity=".55" fill="none"/></pattern>
            <pattern id="shingle" width="8" height="6" patternUnits="userSpaceOnUse"><path d="M0 6 Q2 2 4 6 Q6 2 8 6" fill="none" stroke="#5d6e86" strokeWidth=".7"/></pattern>
          </defs>
          <g id="clock" className="clock">
            {/* plinth & door with the blue lamp */}
            <rect x="420" y="226" width="160" height="24" fill="#b3935b" stroke="#2b1d12" strokeWidth="3"/>
            <rect x="420" y="226" width="160" height="24" fill="url(#ashlar)"/>
            <path d="M482 250 V234 Q500 214 518 234 V250Z" fill="#1f3a68" stroke="#2b1d12" strokeWidth="2.5"/>
            <path d="M500 222 V250" stroke="#14233f" strokeWidth="1.5"/>
            <rect x="494" y="204" width="12" height="11" fill="#3c5f99" stroke="#2b1d12" strokeWidth="1.5" className="siren"/>
            <path d="M492 204 H508 L505 200 H495Z" fill="#2b1d12"/>
            {/* shaft */}
            <rect x="436" y="132" width="128" height="94" fill="url(#stoneG)" stroke="#2b1d12" strokeWidth="3"/>
            <rect x="436" y="132" width="128" height="94" fill="url(#ashlar)"/>
            <path d="M436 152 H564 M436 196 H564" stroke="#9c7f4c" strokeWidth="2"/>
            <g fill="#1c2532" stroke="#2b1d12" strokeWidth="1.5">
              <path d="M458 192 V166 Q468 148 478 166 V192Z"/><path d="M522 192 V166 Q532 148 542 166 V192Z"/>
              <path d="M492 192 V172 Q500 160 508 172 V192Z"/>
            </g>
            <path d="M468 158 V192 M532 158 V192 M500 166 V192 M458 176 H478 M522 176 H542" stroke="#d4a94f" strokeWidth="1"/>
            {/* buttresses with pinnacles */}
            <path d="M428 226 V134 H442 V226Z" fill="#ead5a6" stroke="#2b1d12" strokeWidth="2.5"/>
            <path d="M558 226 V134 H572 V226Z" fill="#b3935b" stroke="#2b1d12" strokeWidth="2.5"/>
            <path d="M428 180 L442 174 M558 174 L572 180" stroke="#2b1d12" strokeWidth="2"/>
            {/* clock stage with corbel table */}
            <rect x="422" y="20" width="156" height="110" fill="url(#stoneG)" stroke="#2b1d12" strokeWidth="3"/>
            <rect x="422" y="20" width="156" height="110" fill="url(#ashlar)"/>
            <rect x="418" y="124" width="164" height="10" fill="#c9a776" stroke="#2b1d12" strokeWidth="2.5"/>
            <path d="M426 128 q4 6 8 0 M434 128 q4 6 8 0 M442 128 q4 6 8 0 M450 128 q4 6 8 0 M458 128 q4 6 8 0 M466 128 q4 6 8 0 M474 128 q4 6 8 0 M482 128 q4 6 8 0 M490 128 q4 6 8 0 M498 128 q4 6 8 0 M506 128 q4 6 8 0 M514 128 q4 6 8 0 M522 128 q4 6 8 0 M530 128 q4 6 8 0 M538 128 q4 6 8 0 M546 128 q4 6 8 0 M554 128 q4 6 8 0 M562 128 q4 6 8 0 M570 128 q4 6 8 0 " fill="none" stroke="#2b1d12" strokeWidth="1.2"/>
            {/* gilded surround */}
            <rect x="446" y="21" width="108" height="108" fill="url(#goldG)" stroke="#2b1d12" strokeWidth="2.5"/>
            <rect x="450" y="25" width="100" height="100" fill="none" stroke="#8f6a26" strokeWidth="1"/>
            <g fill="none" stroke="#2b1d12" strokeWidth=".9"><circle cx="455" cy="33" r="3"/><circle cx="461" cy="33" r="3"/><circle cx="458" cy="30" r="3"/><circle cx="458" cy="36" r="3"/></g><circle cx="458" cy="33" r="1.4" fill="#2b1d12"/><g fill="none" stroke="#2b1d12" strokeWidth=".9"><circle cx="539" cy="33" r="3"/><circle cx="545" cy="33" r="3"/><circle cx="542" cy="30" r="3"/><circle cx="542" cy="36" r="3"/></g><circle cx="542" cy="33" r="1.4" fill="#2b1d12"/><g fill="none" stroke="#2b1d12" strokeWidth=".9"><circle cx="455" cy="117" r="3"/><circle cx="461" cy="117" r="3"/><circle cx="458" cy="114" r="3"/><circle cx="458" cy="120" r="3"/></g><circle cx="458" cy="117" r="1.4" fill="#2b1d12"/><g fill="none" stroke="#2b1d12" strokeWidth=".9"><circle cx="539" cy="117" r="3"/><circle cx="545" cy="117" r="3"/><circle cx="542" cy="114" r="3"/><circle cx="542" cy="120" r="3"/></g><circle cx="542" cy="117" r="1.4" fill="#2b1d12"/>
            {/* dial */}
            <circle cx="500" cy="75" r="47" fill="#2b1d12"/>
            <circle cx="500" cy="75" r="45" fill="url(#goldG)"/>
            <circle cx="500" cy="75" r="41.5" fill="url(#dialG)" stroke="#2b1d12" strokeWidth="1.2"/>
            <g fill="none" stroke="#c4b083" strokeWidth=".7"><circle cx="500" cy="75" r="8"/><circle cx="500" cy="75" r="18"/><path d="M502.07 67.27 L506.86 49.40 M505.66 69.34 L518.74 56.26 M507.73 72.93 L525.60 68.14 M507.73 77.07 L525.60 81.86 M505.66 80.66 L518.74 93.74 M502.07 82.73 L506.86 100.60 M497.93 82.73 L493.14 100.60 M494.34 80.66 L481.26 93.74 M492.27 77.07 L474.40 81.86 M492.27 72.93 L474.40 68.14 M494.34 69.34 L481.26 56.26 M497.93 67.27 L493.14 49.40"/></g>
            <circle cx="500" cy="75" r="39" fill="none" stroke="#2b1d12" strokeWidth=".9"/>
            <circle cx="500" cy="75" r="28" fill="none" stroke="#2b1d12" strokeWidth=".9"/>
            <g stroke="#2b1d12"><line x1="500.00" y1="40.00" x2="500.00" y2="36.00" strokeWidth="1.4"/><line x1="503.85" y1="38.40" x2="504.08" y2="36.21" strokeWidth="0.6"/><line x1="507.65" y1="39.00" x2="508.11" y2="36.85" strokeWidth="0.6"/><line x1="511.37" y1="40.00" x2="512.05" y2="37.91" strokeWidth="0.6"/><line x1="514.97" y1="41.38" x2="515.86" y2="39.37" strokeWidth="0.6"/><line x1="517.50" y1="44.69" x2="519.50" y2="41.23" strokeWidth="1.4"/><line x1="521.63" y1="45.23" x2="522.92" y2="43.45" strokeWidth="0.6"/><line x1="524.62" y1="47.65" x2="526.10" y2="46.02" strokeWidth="0.6"/><line x1="527.35" y1="50.38" x2="528.98" y2="48.90" strokeWidth="0.6"/><line x1="529.77" y1="53.37" x2="531.55" y2="52.08" strokeWidth="0.6"/><line x1="530.31" y1="57.50" x2="533.77" y2="55.50" strokeWidth="1.4"/><line x1="533.62" y1="60.03" x2="535.63" y2="59.14" strokeWidth="0.6"/><line x1="535.00" y1="63.63" x2="537.09" y2="62.95" strokeWidth="0.6"/><line x1="536.00" y1="67.35" x2="538.15" y2="66.89" strokeWidth="0.6"/><line x1="536.60" y1="71.15" x2="538.79" y2="70.92" strokeWidth="0.6"/><line x1="535.00" y1="75.00" x2="539.00" y2="75.00" strokeWidth="1.4"/><line x1="536.60" y1="78.85" x2="538.79" y2="79.08" strokeWidth="0.6"/><line x1="536.00" y1="82.65" x2="538.15" y2="83.11" strokeWidth="0.6"/><line x1="535.00" y1="86.37" x2="537.09" y2="87.05" strokeWidth="0.6"/><line x1="533.62" y1="89.97" x2="535.63" y2="90.86" strokeWidth="0.6"/><line x1="530.31" y1="92.50" x2="533.77" y2="94.50" strokeWidth="1.4"/><line x1="529.77" y1="96.63" x2="531.55" y2="97.92" strokeWidth="0.6"/><line x1="527.35" y1="99.62" x2="528.98" y2="101.10" strokeWidth="0.6"/><line x1="524.62" y1="102.35" x2="526.10" y2="103.98" strokeWidth="0.6"/><line x1="521.63" y1="104.77" x2="522.92" y2="106.55" strokeWidth="0.6"/><line x1="517.50" y1="105.31" x2="519.50" y2="108.77" strokeWidth="1.4"/><line x1="514.97" y1="108.62" x2="515.86" y2="110.63" strokeWidth="0.6"/><line x1="511.37" y1="110.00" x2="512.05" y2="112.09" strokeWidth="0.6"/><line x1="507.65" y1="111.00" x2="508.11" y2="113.15" strokeWidth="0.6"/><line x1="503.85" y1="111.60" x2="504.08" y2="113.79" strokeWidth="0.6"/><line x1="500.00" y1="110.00" x2="500.00" y2="114.00" strokeWidth="1.4"/><line x1="496.15" y1="111.60" x2="495.92" y2="113.79" strokeWidth="0.6"/><line x1="492.35" y1="111.00" x2="491.89" y2="113.15" strokeWidth="0.6"/><line x1="488.63" y1="110.00" x2="487.95" y2="112.09" strokeWidth="0.6"/><line x1="485.03" y1="108.62" x2="484.14" y2="110.63" strokeWidth="0.6"/><line x1="482.50" y1="105.31" x2="480.50" y2="108.77" strokeWidth="1.4"/><line x1="478.37" y1="104.77" x2="477.08" y2="106.55" strokeWidth="0.6"/><line x1="475.38" y1="102.35" x2="473.90" y2="103.98" strokeWidth="0.6"/><line x1="472.65" y1="99.62" x2="471.02" y2="101.10" strokeWidth="0.6"/><line x1="470.23" y1="96.63" x2="468.45" y2="97.92" strokeWidth="0.6"/><line x1="469.69" y1="92.50" x2="466.23" y2="94.50" strokeWidth="1.4"/><line x1="466.38" y1="89.97" x2="464.37" y2="90.86" strokeWidth="0.6"/><line x1="465.00" y1="86.37" x2="462.91" y2="87.05" strokeWidth="0.6"/><line x1="464.00" y1="82.65" x2="461.85" y2="83.11" strokeWidth="0.6"/><line x1="463.40" y1="78.85" x2="461.21" y2="79.08" strokeWidth="0.6"/><line x1="465.00" y1="75.00" x2="461.00" y2="75.00" strokeWidth="1.4"/><line x1="463.40" y1="71.15" x2="461.21" y2="70.92" strokeWidth="0.6"/><line x1="464.00" y1="67.35" x2="461.85" y2="66.89" strokeWidth="0.6"/><line x1="465.00" y1="63.63" x2="462.91" y2="62.95" strokeWidth="0.6"/><line x1="466.38" y1="60.03" x2="464.37" y2="59.14" strokeWidth="0.6"/><line x1="469.69" y1="57.50" x2="466.23" y2="55.50" strokeWidth="1.4"/><line x1="470.23" y1="53.37" x2="468.45" y2="52.08" strokeWidth="0.6"/><line x1="472.65" y1="50.38" x2="471.02" y2="48.90" strokeWidth="0.6"/><line x1="475.38" y1="47.65" x2="473.90" y2="46.02" strokeWidth="0.6"/><line x1="478.37" y1="45.23" x2="477.08" y2="43.45" strokeWidth="0.6"/><line x1="482.50" y1="44.69" x2="480.50" y2="41.23" strokeWidth="1.4"/><line x1="485.03" y1="41.38" x2="484.14" y2="39.37" strokeWidth="0.6"/><line x1="488.63" y1="40.00" x2="487.95" y2="37.91" strokeWidth="0.6"/><line x1="492.35" y1="39.00" x2="491.89" y2="36.85" strokeWidth="0.6"/><line x1="496.15" y1="38.40" x2="495.92" y2="36.21" strokeWidth="0.6"/></g>
            <g className="f-sc" fontSize="7" fill="#2b1d12" textAnchor="middle" dominantBaseline="central"><text x="500.00" y="43.40" transform="rotate(0 500.00 43.40)">XII</text><text x="515.80" y="47.63" transform="rotate(30 515.80 47.63)">I</text><text x="527.37" y="59.20" transform="rotate(60 527.37 59.20)">II</text><text x="531.60" y="75.00" transform="rotate(90 531.60 75.00)">III</text><text x="527.37" y="90.80" transform="rotate(120 527.37 90.80)">IIII</text><text x="515.80" y="102.37" transform="rotate(150 515.80 102.37)">V</text><text x="500.00" y="106.60" transform="rotate(180 500.00 106.60)">VI</text><text x="484.20" y="102.37" transform="rotate(210 484.20 102.37)">VII</text><text x="472.63" y="90.80" transform="rotate(240 472.63 90.80)">VIII</text><text x="468.40" y="75.00" transform="rotate(270 468.40 75.00)">IX</text><text x="472.63" y="59.20" transform="rotate(300 472.63 59.20)">X</text><text x="484.20" y="47.63" transform="rotate(330 484.20 47.63)">XI</text></g>
            {/* hands (rotated to real time by script; default 10:10) */}
            <g id="clk-h" className="clock-hand" style={css({transform: "rotate(305deg)"})}><path d="M498.5 81 V63 L495.6 59.5 L500 50 L504.4 59.5 L501.5 63 V81Z" fill="#2b1d12"/><circle cx="500" cy="59.5" r="1.6" fill="#d4a94f"/></g>
            <g id="clk-m" className="clock-hand" style={css({transform: "rotate(60deg)"})}><path d="M499.1 82 V49 L497.6 46 L500 36 L502.4 46 L500.9 49 V82Z" fill="#2b1d12"/></g>
            <g id="clk-s" className="clock-hand second"><path d="M500 85 V38" stroke="#b8472a" strokeWidth="1"/><circle cx="500" cy="82" r="2" fill="#b8472a"/></g>
            <circle cx="500" cy="75" r="3.2" fill="url(#goldG)" stroke="#2b1d12" strokeWidth="1"/>
            {/* parapet & corner pinnacles */}
            <rect x="416" y="12" width="168" height="10" fill="#c9a776" stroke="#2b1d12" strokeWidth="2.5"/>
            <path d="M420 12 l3.5 -6 l3.5 6 M427 12 l3.5 -6 l3.5 6 M434 12 l3.5 -6 l3.5 6 M441 12 l3.5 -6 l3.5 6 M448 12 l3.5 -6 l3.5 6 M455 12 l3.5 -6 l3.5 6 M462 12 l3.5 -6 l3.5 6 M469 12 l3.5 -6 l3.5 6 M476 12 l3.5 -6 l3.5 6 M483 12 l3.5 -6 l3.5 6 M490 12 l3.5 -6 l3.5 6 M497 12 l3.5 -6 l3.5 6 M504 12 l3.5 -6 l3.5 6 M511 12 l3.5 -6 l3.5 6 M518 12 l3.5 -6 l3.5 6 M525 12 l3.5 -6 l3.5 6 M532 12 l3.5 -6 l3.5 6 M539 12 l3.5 -6 l3.5 6 M546 12 l3.5 -6 l3.5 6 M553 12 l3.5 -6 l3.5 6 M560 12 l3.5 -6 l3.5 6 M567 12 l3.5 -6 l3.5 6 M574 12 l3.5 -6 l3.5 6 " fill="#c9a776" stroke="#2b1d12" strokeWidth="1.2"/>
            <path d="M418 12 V-14 H428 V12Z M572 12 V-14 H582 V12Z" fill="#c9a776" stroke="#2b1d12" strokeWidth="2"/>
            <path d="M416 -14 L423 -40 L430 -14Z M570 -14 L577 -40 L584 -14Z" fill="url(#goldG)" stroke="#2b1d12" strokeWidth="1.5"/>
            {/* belfry */}
            <rect x="442" y="-40" width="116" height="52" fill="url(#stoneG)" stroke="#2b1d12" strokeWidth="3"/>
            <g fill="#141b26" stroke="#2b1d12" strokeWidth="1.5">
              <path d="M453 8 V-14 Q464 -34 475 -14 V8Z"/><path d="M489 8 V-14 Q500 -34 511 -14 V8Z"/><path d="M525 8 V-14 Q536 -34 547 -14 V8Z"/>
            </g>
            <g id="bell" className="bell"><path d="M500 -22 V-17" stroke="#8f6a26" strokeWidth="1.5"/><path d="M492 2 Q493 -6 494 -10 Q496 -17 500 -17 Q504 -17 506 -10 Q507 -6 508 2Z" fill="url(#goldG)" stroke="#2b1d12" strokeWidth="1"/><circle cx="500" cy="3" r="1.6" fill="#2b1d12"/></g>
            <path d="M442 8 H558" stroke="#9c7f4c" strokeWidth="3"/>
            {/* spire */}
            <path d="M436 -40 Q474 -58 500 -116 Q526 -58 564 -40Z" fill="url(#slateG)" stroke="#2b1d12" strokeWidth="3"/>
            <path d="M436 -40 Q474 -58 500 -116 Q526 -58 564 -40Z" fill="url(#shingle)"/>
            <path d="M500 -116 V-40 M468 -46 Q486 -66 500 -116 M532 -46 Q514 -66 500 -116" stroke="#d4a94f" strokeWidth="1.2" fill="none"/>
            <path d="M489 -42 V-58 L500 -70 L511 -58 V-42Z" fill="#d9bd85" stroke="#2b1d12" strokeWidth="1.5"/>
            <path d="M495 -44 V-55 Q500 -62 505 -55 V-44Z" fill="#141b26"/>
            <path d="M438 -40 L444 -62 L450 -40Z M550 -40 L556 -62 L562 -40Z" fill="url(#goldG)" stroke="#2b1d12" strokeWidth="1.2"/>
            {/* finial & pennant */}
            <path d="M500 -116 V-138" stroke="#b5893a" strokeWidth="2.5"/>
            <circle cx="500" cy="-122" r="3.4" fill="url(#goldG)" stroke="#2b1d12" strokeWidth="1"/>
            <path d="M500 -138 L524 -132 L500 -126Z" fill="#1f3a68" stroke="#2b1d12" strokeWidth="1"/>
          </g>
          {/* revolving sign */}
          <path d="M310 250 V120" stroke="#4a4c50" strokeWidth="6"/>
          <g className="sign">
            <path d="M250 70 L370 70 L360 118 L260 118Z" fill="#d6d3c8" stroke="#2b1d12" strokeWidth="3"/>
            <text x="310" y="91" textAnchor="middle" className="f-sc" fontSize="15" fill="#1f3a68" letterSpacing="1">SCOTLAND</text>
            <text x="310" y="110" textAnchor="middle" className="f-sc" fontSize="15" fill="#1f3a68" letterSpacing="3">YARD</text>
          </g>
          {/* detective with telescope */}
          <use href="#p-det" x="640" y="94" width="28" height="56"/>
          <path d="M660 112 L700 96" stroke="#b5893a" strokeWidth="5" strokeLinecap="round"/><path d="M690 100 L704 94" stroke="#2b1d12" strokeWidth="7" strokeLinecap="round"/>
          {/* pigeons */}
          <g className="pigeon"><ellipse cx="380" cy="146" rx="9" ry="5" fill="#8e9196"/><circle cx="388" cy="141" r="3.4" fill="#8e9196"/><path d="M391 141 l3 1 -3 1z" fill="#c9a227"/></g>
          <g className="pigeon" style={css({animationDelay: "1.2s"})}><ellipse cx="860" cy="146" rx="8" ry="4.5" fill="#6e7176"/><circle cx="852" cy="141" r="3" fill="#6e7176"/></g>
        </svg>
      </div>
  );
}
