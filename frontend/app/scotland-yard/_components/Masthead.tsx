import { css } from "./css";

export default function Masthead() {
  return (
    <header className="masthead">
      <div className="iste-row">
        <svg className="flourish" viewBox="0 0 180 40" aria-hidden="true"><path d="M178 20 H70 C55 20 50 6 38 8 C26 10 28 26 40 26 C50 26 50 14 42 14 M70 20 C60 20 55 34 40 34 C18 34 6 22 2 20" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="178" cy="20" r="3" fill="currentColor"/></svg>
        <p className="iste">ISTE</p>
        <svg className="flourish" viewBox="0 0 180 40" aria-hidden="true" style={css({transform: "scaleX(-1)"})}><path d="M178 20 H70 C55 20 50 6 38 8 C26 10 28 26 40 26 C50 26 50 14 42 14 M70 20 C60 20 55 34 40 34 C18 34 6 22 2 20" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="178" cy="20" r="3" fill="currentColor"/></svg>
      </div>
      <p className="presents">presents</p>

      <div className="title-row">
        <h1 className="title">
          <span className="sr-only">Scotland Yard</span>
          <span aria-hidden="true">
            <span className="ln"><span className="l" style={css({"--i": "0"})}>S</span><span className="l" style={css({"--i": "1"})}>C</span><svg className="mag" style={css({"--i": "2"})} viewBox="0 0 40 40"><circle cx="16" cy="16" r="11.5" fill="rgba(240,213,138,.35)" stroke="currentColor" strokeWidth="5.5"/><path d="M10 12 Q12 9 15 8.5" stroke="#fff6dc" strokeWidth="2" fill="none" strokeLinecap="round"/><line x1="24.5" y1="24.5" x2="36" y2="36" stroke="#4a2e17" strokeWidth="7" strokeLinecap="round"/></svg><span className="l" style={css({"--i": "3"})}>T</span><span className="l" style={css({"--i": "4"})}>L</span><span className="l" style={css({"--i": "5"})}>A</span><span className="l" style={css({"--i": "6"})}>N</span><span className="l" style={css({"--i": "7"})}>D</span></span>
            <span className="ln yard"><span className="l" style={css({"--i": "8"})}>Y</span><span className="l" style={css({"--i": "9"})}>A</span><span className="l" style={css({"--i": "10"})}>R</span><span className="l" style={css({"--i": "11"})}>D</span></span>
          </span>
        </h1>
        {/* Logo badge: deerstalker + magnifying glass */}
        <svg className="badge" viewBox="0 0 140 140" role="img" aria-label="Event badge: a deerstalker hat and magnifying glass">
          <defs><path id="ring" d="M70 70 m-52 0 a52 52 0 1 1 104 0 a52 52 0 1 1 -104 0"/></defs>
          <circle cx="70" cy="70" r="68" fill="#1f3a68" stroke="#2b1d12" strokeWidth="3"/>
          <circle cx="70" cy="70" r="62" fill="none" stroke="#d4a94f" strokeWidth="1.5"/>
          <text className="f-sc" fontSize="13" letterSpacing="2.6" fill="#f0d58a"><textPath href="#ring">ISTE ✦ SCOTLAND YARD ✦ EST. MMXXVI ✦</textPath></text>
          <g className="still">
            <circle cx="70" cy="70" r="40" fill="#e8d5b0" stroke="#d4a94f" strokeWidth="2"/>
            <path d="M46 70 Q46 48 70 45 Q94 48 94 70Z" fill="#2b1d12"/>
            <path d="M34 73 Q46 64 56 70 L84 70 Q94 64 106 73 Q94 79 70 76 Q46 79 34 73Z" fill="#2b1d12"/>
            <path d="M64 46 Q70 38 76 46" stroke="#2b1d12" strokeWidth="3" fill="none"/>
            <path d="M50 62 Q70 56 90 62" stroke="#e8d5b0" strokeWidth="1" fill="none" strokeDasharray="2 2"/>
            <circle cx="78" cy="88" r="10" fill="rgba(240,213,138,.5)" stroke="#b5893a" strokeWidth="3.5"/>
            <line x1="85" y1="95" x2="96" y2="106" stroke="#4a2e17" strokeWidth="4.5" strokeLinecap="round"/>
          </g>
        </svg>
      </div>

      <div className="subtitle">
        <span className="rule"></span>
        <svg className="compass" aria-hidden="true"><use href="#compass"/></svg>
        <span>The Ultimate Mystery Challenge</span>
        <svg className="compass" aria-hidden="true" style={css({animationDirection: "reverse"})}><use href="#compass"/></svg>
        <span className="rule"></span>
      </div>
      <p className="tagline">Six departments. One case. Every clue matters, even the ones hidden on this page.</p>
    </header>
  );
}
