import { css } from "./css";
import Clue from "./Clue";

/** Cross-section of the Yard, floor by floor. Each room hides a fingerprint <Clue />. */
export default function Floors() {
  return (
    <div className="frame">
        {/* ─── Floor 1 ─── */}
        <div className="floor">
          <section className="room has-text" style={css({gridColumn: "span 8", "--bg": "var(--room-pink)"})} aria-labelledby="h-case">
            <span className="plaque">Briefing Room · Fl. 5</span>
            <div className="note">
              <span className="step">FILE 01</span>
              <h2 id="h-case">The Case Begins</h2>
              <p>Your team is handed a sealed dossier. A crime has rattled London and the Yard needs fresh minds. Break the seal, read the statements, and take your first step into the fog.</p>
            </div>
            <svg className="scene" viewBox="0 0 400 220" aria-hidden="true">
              <rect y="168" width="400" height="52" fill="url(#boards)"/>
              <rect y="128" width="400" height="40" fill="#c98f74" opacity=".55"/>
              {/* window with fog */}
              <rect x="18" y="26" width="70" height="86" fill="#c9c6bb" stroke="#4a2e17" strokeWidth="5"/>
              <path d="M53 26 V112 M18 69 H88" stroke="#4a2e17" strokeWidth="3"/>
              <path d="M22 50 Q40 44 58 52 T86 48" stroke="#f6ead0" strokeWidth="5" fill="none" opacity=".7"/>
              <path d="M22 90 Q46 82 66 92 T86 88" stroke="#f6ead0" strokeWidth="4" fill="none" opacity=".6"/>
              {/* pinboard */}
              <rect x="118" y="18" width="150" height="92" fill="url(#cork)" stroke="#4a2e17" strokeWidth="5"/>
              <rect x="130" y="28" width="30" height="36" fill="#f6ead0" transform="rotate(-5 145 46)"/>
              <rect x="176" y="34" width="26" height="22" fill="#efe0bf"/><circle cx="189" cy="44" r="6" fill="#4a3624"/>
              <rect x="216" y="26" width="38" height="28" fill="#f6ead0" transform="rotate(4 235 40)"/>
              <rect x="146" y="70" width="34" height="30" fill="#e6cf8f"/><rect x="200" y="68" width="44" height="32" fill="#f6ead0" transform="rotate(-3 222 84)"/>
              <path d="M145 32 L189 38 L235 30 M189 38 L163 74 L222 72" stroke="#b8472a" strokeWidth="1.6" fill="none"/>
              <g fill="#b8472a"><circle cx="145" cy="32" r="3"/><circle cx="189" cy="38" r="3"/><circle cx="235" cy="30" r="3"/><circle cx="163" cy="74" r="3"/><circle cx="222" cy="72" r="3"/></g>
              {/* desk */}
              <rect x="190" y="132" width="180" height="10" fill="#6b4423"/>
              <rect x="198" y="142" width="8" height="28" fill="#4a2e17"/><rect x="352" y="142" width="8" height="28" fill="#4a2e17"/>
              <rect x="300" y="142" width="54" height="24" fill="#8b5a2b"/><rect x="318" y="150" width="18" height="3" fill="#d4a94f"/>
              {/* dossier */}
              <g transform="rotate(-6 260 126)"><rect x="232" y="118" width="58" height="14" fill="#e6cf8f" stroke="#6b4423"/><rect x="250" y="120" width="22" height="7" fill="#b8472a"/></g>
              {/* lamp */}
              <path d="M346 132 V112 L336 102" stroke="#2b1d12" strokeWidth="2.5" fill="none"/><path d="M324 96 L346 96 L342 106 L328 106Z" fill="#3f6b4a" transform="rotate(-20 336 101)"/>
              <use href="#phone" x="208" y="104" width="16" height="30"/>
              {/* detectives */}
              <use href="#p-tweed" x="292" y="108" width="30" height="62"/>
              <use href="#p-det" x="118" y="110" width="30" height="60"/>
              <use href="#p-det" x="150" y="114" width="27" height="56"/>
              <use href="#p-cop" x="364" y="108" width="30" height="62"/>
            </svg>
            <Clue at={{left: "14%", bottom: "8%"}} note="A smudged print on the dossier's wax seal. Someone opened it before you." />
          </section>

          <section className="room" style={css({gridColumn: "span 4", "--bg": "var(--room-fog)"})} aria-label="The Wire Room">
            <span className="plaque">The Wire Room</span>
            <svg className="scene" viewBox="0 0 300 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
              <rect y="176" width="300" height="44" fill="url(#tiles)"/>
              {/* switchboard */}
              <rect x="24" y="44" width="160" height="112" fill="#6b4423" stroke="#2b1d12" strokeWidth="3"/>
              <rect x="34" y="54" width="140" height="70" fill="url(#jacks)"/>
              <rect x="24" y="148" width="160" height="10" fill="#4a2e17"/>
              <rect x="30" y="156" width="8" height="22" fill="#4a2e17"/><rect x="170" y="156" width="8" height="22" fill="#4a2e17"/>
              <g fill="none" strokeWidth="2"><path d="M48 68 Q60 150 90 146" stroke="#b8472a"/><path d="M104 82 Q100 140 120 148" stroke="#2b1d12"/><path d="M146 96 Q150 140 70 146" stroke="#1f3a68"/><path d="M160 68 Q170 130 150 146" stroke="#b8472a"/></g>
              {/* operator */}
              <use href="#p-cop" x="86" y="122" width="28" height="56"/>
              {/* wall phones & side table */}
              <rect x="206" y="138" width="78" height="8" fill="#6b4423"/><rect x="212" y="146" width="6" height="32" fill="#4a2e17"/><rect x="272" y="146" width="6" height="32" fill="#4a2e17"/>
              <use href="#phone" x="216" y="110" width="16" height="30"/>
              <use href="#phone" x="246" y="110" width="16" height="30"/>
              {/* ticker tape */}
              <rect x="222" y="40" width="48" height="40" rx="4" fill="#d4a94f" stroke="#2b1d12" strokeWidth="2"/>
              <path d="M246 80 Q244 100 258 108 Q270 116 262 132" stroke="#f6ead0" strokeWidth="7" fill="none"/>
              <path d="M243 88 h4 M250 100 h4 M258 112 h3" stroke="#2b1d12" strokeWidth="1.4"/>
              <use href="#p-tweed" x="268" y="122" width="26" height="56"/>
            </svg>
            <Clue at={{right: "6%", top: "18%"}} note="Ticker tape, half-burnt: '…MEET AT THE EMBANKMENT. MIDNIGHT…'" />
          </section>
        </div>

        <div className="beam" aria-hidden="true"></div>

        {/* ─── Floor 2 ─── */}
        <div className="floor">
          <section className="room" style={css({gridColumn: "span 5", "--bg": "var(--room-cream)"})} aria-label="Forensics Lab">
            <span className="plaque">Forensics Lab</span>
            <svg className="scene" viewBox="0 0 360 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
              <rect y="176" width="360" height="44" fill="url(#tiles)"/>
              {/* shelf of bottles */}
              <rect x="20" y="56" width="140" height="6" fill="#6b4423"/>
              <g stroke="#2b1d12" strokeWidth="1.4">
                <rect x="28" y="34" width="12" height="22" fill="#3f6b4a"/><rect x="46" y="40" width="10" height="16" fill="#b8472a"/>
                <path d="M66 56 L72 38 H80 L86 56Z" fill="#cfe3e0"/><rect x="94" y="30" width="14" height="26" fill="#b5893a"/>
                <circle cx="124" cy="48" r="8" fill="#3c5f99"/><rect x="138" y="40" width="10" height="16" fill="#f6ead0"/>
              </g>
              {/* chalkboard */}
              <rect x="176" y="30" width="78" height="56" fill="#2f3a32" stroke="#6b4423" strokeWidth="4"/>
              <text x="184" y="52" className="f-type" fontSize="10" fill="#efe0bf">Pb + ? = !</text>
              <text x="184" y="70" className="f-type" fontSize="10" fill="#efe0bf">pH 3.2 ✓</text>
              {/* fume hood */}
              <rect x="268" y="34" width="80" height="142" fill="#8e9196" stroke="#2b1d12" strokeWidth="3"/>
              <rect x="276" y="64" width="64" height="58" fill="#cfe3e0" opacity=".75"/>
              <path d="M296 122 L304 100 H312 L320 122Z" fill="#b8d48a" stroke="#2b1d12" strokeWidth="1.4"/>
              <circle className="bubble" cx="306" cy="104" r="3" fill="#b8d48a"/><circle className="bubble b" cx="311" cy="104" r="2" fill="#b8d48a"/>
              <rect x="268" y="122" width="80" height="10" fill="#4a4c50"/>
              {/* bench */}
              <rect x="16" y="134" width="236" height="9" fill="#6b4423"/>
              <rect x="24" y="143" width="8" height="35" fill="#4a2e17"/><rect x="236" y="143" width="8" height="35" fill="#4a2e17"/>
              <use href="#scope" x="40" y="100" width="24" height="34"/>
              <use href="#scope" x="148" y="100" width="24" height="34"/>
              <path d="M100 134 L106 116 V108 H114 V116 L120 134Z" fill="#e9b9a0" stroke="#2b1d12" strokeWidth="1.4"/>
              <circle className="bubble c" cx="110" cy="112" r="2.4" fill="#e9b9a0"/>
              <rect x="200" y="120" width="5" height="14" fill="#cfe3e0" stroke="#2b1d12"/><rect x="208" y="118" width="5" height="16" fill="#3c5f99" stroke="#2b1d12"/><rect x="216" y="122" width="5" height="12" fill="#b8472a" stroke="#2b1d12"/>
              {/* scientists */}
              <use href="#p-sci" x="62" y="120" width="28" height="58"/>
              <use href="#p-sci" x="168" y="122" width="27" height="56"/>
              <use href="#p-det" x="220" y="122" width="27" height="56"/>
            </svg>
            <Clue at={{left: "44%", top: "52%"}} note="Under the microscope: fibres of Harris tweed and a trace of river silt." />
          </section>

          <section className="room has-text flip" style={css({gridColumn: "span 7", "--bg": "var(--room-blue)"})} aria-labelledby="h-clues">
            <span className="plaque">Cipher &amp; Data Bureau</span>
            <div className="note">
              <span className="step">FILE 02</span>
              <h2 id="h-clues">Solve the Clues</h2>
              <p>Ciphers, forensic reports and data dumps arrive by pneumatic tube. Decode, cross-reference and deduce. Every answer unlocks the next room of the Yard.</p>
            </div>
            <svg className="scene" viewBox="0 0 400 220" aria-hidden="true">
              <rect y="176" width="400" height="44" fill="url(#boards)"/>
              {/* pneumatic tube */}
              <rect x="356" y="0" width="22" height="96" fill="#cfe3e0" opacity=".7" stroke="#b5893a" strokeWidth="3"/>
              <g className="capsule"><rect x="360" y="20" width="14" height="24" rx="6" fill="#b5893a" stroke="#2b1d12" strokeWidth="1.4"/></g>
              <path d="M350 96 H384 L378 108 H356Z" fill="#b5893a" stroke="#2b1d12" strokeWidth="2"/>
              {/* console & screens */}
              <rect x="30" y="128" width="320" height="48" fill="#6e7176" stroke="#2b1d12" strokeWidth="3"/>
              <g fill="#b8472a"><circle cx="60" cy="146" r="4"/><circle cx="160" cy="146" r="4"/><circle cx="260" cy="146" r="4"/></g>
              <g fill="#d4a94f"><rect x="76" y="142" width="40" height="6" rx="3"/><rect x="176" y="142" width="40" height="6" rx="3"/><rect x="276" y="142" width="40" height="6" rx="3"/></g>
              <g stroke="#2b1d12" strokeWidth="3">
                <rect x="42" y="42" width="94" height="80" rx="10" fill="#4a4a44"/>
                <rect x="146" y="30" width="94" height="92" rx="10" fill="#4a4a44"/>
                <rect x="250" y="42" width="94" height="80" rx="10" fill="#4a4a44"/>
              </g>
              <rect className="flicker" x="52" y="52" width="74" height="60" rx="6" fill="#1f3a2a"/>
              <rect className="flicker b" x="156" y="40" width="74" height="72" rx="6" fill="#1f3a2a"/>
              <rect className="flicker c" x="260" y="52" width="74" height="60" rx="6" fill="#1f3a2a"/>
              <polyline points="56,84 66,84 70,66 76,100 82,74 88,90 96,80 104,84 122,84" fill="none" stroke="#9fe39a" strokeWidth="2"/>
              <g className="f-type" fontSize="10" fill="#9fe39a">
                <text x="162" y="58">QX7 ?? LR</text><text x="162" y="74">B4K ER S7</text><text x="162" y="90">221 · B ·</text><text x="162" y="106">&gt; DECODE_</text>
              </g>
              <g transform="translate(284 60) scale(1.5)" color="#9fe39a"><use href="#fp" width="20" height="24"/></g>
              {/* detectives */}
              <use href="#p-det" x="16" y="118" width="29" height="58"/>
              <circle cx="54" cy="128" r="7" fill="rgba(240,213,138,.4)" stroke="#b5893a" strokeWidth="2.5"/><line x1="49" y1="133" x2="42" y2="140" stroke="#4a2e17" strokeWidth="3"/>
              <use href="#p-tweed" x="180" y="120" width="28" height="56"/>
              <use href="#p-sci" x="296" y="120" width="28" height="56"/>
            </svg>
            <Clue at={{right: "46%", top: "18%"}} note="Decoded fragment: the meeting point is beneath a bridge with two towers." />
          </section>
        </div>

        <div className="beam" aria-hidden="true"></div>

        {/* ─── Floor 3 ─── */}
        <div className="floor">
          <section className="room" style={css({gridColumn: "span 4", "--bg": "#b7a98c"})} aria-label="Interview Room">
            <span className="plaque">Interview Room</span>
            <svg className="scene" viewBox="0 0 260 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
              <rect y="176" width="260" height="44" fill="#6e6250"/>
              {/* one-way mirror */}
              <rect x="176" y="44" width="72" height="70" fill="#3a4350" stroke="#2b1d12" strokeWidth="4"/>
              <path d="M186 60 L204 52 M188 84 L230 62 M200 104 L240 82" stroke="#8e9196" strokeWidth="2"/>
              {/* clock */}
              <circle cx="40" cy="58" r="16" fill="#f6ead0" stroke="#2b1d12" strokeWidth="3"/><path d="M40 58 V47 M40 58 L48 62" stroke="#2b1d12" strokeWidth="2"/>
              {/* swinging lamp + light */}
              <g className="swing">
                <path d="M60 172 L200 172 L152 88 L108 88Z" fill="#f0d58a" opacity=".32"/>
                <line x1="130" y1="0" x2="130" y2="72" stroke="#2b1d12" strokeWidth="2"/>
                <path d="M114 72 H146 L156 90 H104Z" fill="#3f6b4a" stroke="#2b1d12" strokeWidth="2"/>
                <circle cx="130" cy="92" r="5" fill="#fff6dc"/>
              </g>
              {/* table & chairs */}
              <path d="M40 176 V128 M40 150 H64 V176" stroke="#4a2e17" strokeWidth="4" fill="none"/>
              <path d="M220 176 V128 M220 150 H196 V176" stroke="#4a2e17" strokeWidth="4" fill="none"/>
              <use href="#p-det" x="54" y="118" width="29" height="58"/>
              <use href="#p-sus" x="176" y="118" width="29" height="58"/>
              <rect x="78" y="140" width="104" height="8" fill="#6b4423"/>
              <rect x="86" y="148" width="6" height="28" fill="#4a2e17"/><rect x="168" y="148" width="6" height="28" fill="#4a2e17"/>
              <rect x="100" y="132" width="10" height="8" fill="#f6ead0" stroke="#2b1d12"/><rect x="134" y="134" width="26" height="6" fill="#e6cf8f" stroke="#6b4423"/>
            </svg>
            <Clue at={{left: "46%", bottom: "10%"}} note="The suspect's alibi clock reads 11:40, but the river tide tables disagree." />
          </section>

          <section className="room" style={css({gridColumn: "span 4", "--bg": "var(--room-ochre)"})} aria-label="Evidence Locker">
            <span className="plaque">Evidence Locker</span>
            <svg className="scene" viewBox="0 0 260 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
              <rect y="176" width="260" height="44" fill="url(#tiles)"/>
              {/* shelves */}
              <g fill="#6b4423"><rect x="14" y="74" width="170" height="6"/><rect x="14" y="122" width="170" height="6"/><rect x="14" y="170" width="170" height="6"/></g>
              <rect x="12" y="36" width="5" height="140" fill="#4a2e17"/><rect x="181" y="36" width="5" height="140" fill="#4a2e17"/>
              {/* top shelf: pocket watch, top hat, envelope */}
              <circle cx="36" cy="64" r="9" fill="#d4a94f" stroke="#2b1d12" strokeWidth="2"/><path d="M36 64 V58 M36 64 L40 66" stroke="#2b1d12" strokeWidth="1.4"/><path d="M36 55 V51" stroke="#d4a94f" strokeWidth="2"/>
              <path d="M66 74 H96 M70 74 V48 H92 V74" fill="#2b1d12" stroke="#2b1d12" strokeWidth="3"/><rect x="70" y="64" width="22" height="4" fill="#b8472a"/>
              <rect x="112" y="54" width="34" height="20" fill="#f6ead0" stroke="#6b4423"/><path d="M112 54 L129 66 L146 54" fill="none" stroke="#6b4423"/><circle cx="129" cy="66" r="4" fill="#b8472a"/>
              <rect x="156" y="58" width="20" height="16" fill="#8b5a2b" stroke="#2b1d12"/>
              {/* middle shelf: pipe, key, bottle, boot cast */}
              <path d="M24 112 Q30 120 44 116 L56 108" stroke="#4a2e17" strokeWidth="4" fill="none" strokeLinecap="round"/><path d="M20 104 h8 v10 h-8z" fill="#4a2e17"/>
              <circle cx="76" cy="108" r="5" fill="none" stroke="#b5893a" strokeWidth="3"/><path d="M81 108 H100 M94 108 V114 M99 108 V113" stroke="#b5893a" strokeWidth="3"/>
              <path d="M116 122 V100 H120 V92 H126 V100 H130 V122Z" fill="#3f6b4a" stroke="#2b1d12" strokeWidth="1.4"/><rect x="117" y="106" width="12" height="7" fill="#f6ead0"/>
              <path d="M144 120 Q140 100 152 98 Q162 98 160 108 L172 112 Q176 120 168 120Z" fill="#d6d3c8" stroke="#6e7176" strokeWidth="1.4"/>
              {/* bottom shelf: umbrella, boxes w/ tags */}
              <path d="M24 168 L56 136" stroke="#2b1d12" strokeWidth="3"/><path d="M50 128 Q66 132 62 148 L42 140Z" fill="#2b1d12"/>
              <rect x="74" y="142" width="40" height="28" fill="#c9a776" stroke="#6b4423" strokeWidth="2"/><rect x="120" y="148" width="54" height="22" fill="#b89462" stroke="#6b4423" strokeWidth="2"/>
              <g fill="#f6ead0" stroke="#6b4423"><rect x="96" y="152" width="14" height="9"/><rect x="152" y="156" width="16" height="9"/></g>
              {/* cage door, swung open */}
              <path d="M196 30 L250 40 V178 L196 176Z" fill="url(#mesh)" stroke="#4a4c50" strokeWidth="4"/>
              <circle cx="204" cy="104" r="4" fill="#b5893a"/>
              <use href="#p-cop" x="210" y="120" width="28" height="56"/>
              <rect x="230" y="138" width="12" height="16" fill="#f6ead0" stroke="#4a2e17"/>
            </svg>
            <Clue at={{left: "52%", top: "42%"}} note="Item 14: a brass key stamped 'T.B. 2'. It doesn't fit any lock in the Yard." />
          </section>

          <section className="room" style={css({gridColumn: "span 4", "--bg": "var(--room-sage)"})} aria-label="Records and Archive">
            <span className="plaque">Records &amp; Archive</span>
            <svg className="scene" viewBox="0 0 260 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
              <rect y="176" width="260" height="44" fill="url(#boards)"/>
              <rect x="16" y="30" width="80" height="146" fill="url(#drawers)" stroke="#2b1d12" strokeWidth="3"/>
              <rect x="164" y="52" width="80" height="124" fill="url(#drawers)" stroke="#2b1d12" strokeWidth="3"/>
              {/* open drawer with papers */}
              <rect x="96" y="96" width="30" height="18" fill="#7f8b72" stroke="#2b1d12" strokeWidth="2"/>
              <rect x="100" y="88" width="20" height="10" fill="#f6ead0"/>
              {/* ladder */}
              <path d="M120 176 L146 40 M144 176 L170 40" stroke="#6b4423" strokeWidth="4"/>
              <path d="M124 158 H148 M128 136 H152 M132 114 H156 M136 92 H160 M140 70 H164" stroke="#6b4423" strokeWidth="3"/>
              <use href="#p-tweed" x="138" y="54" width="26" height="54"/>
              {/* drifting papers */}
              <g fill="#f6ead0" stroke="#8b5a2b" strokeWidth=".8"><rect x="100" y="40" width="14" height="18" transform="rotate(-18 107 49)"/><rect x="70" y="10" width="12" height="15" transform="rotate(22 76 17)"/></g>
              <use href="#p-sci" x="60" y="120" width="27" height="56"/>
            </svg>
            <Clue at={{left: "16%", bottom: "18%"}} note="Archive card 1888-B is missing. The borrower signed only with a deerstalker doodle." />
          </section>
        </div>

        <div className="beam" aria-hidden="true"></div>

        {/* ─── Floor 4 ─── */}
        <div className="floor">
          <section className="room has-text" style={css({gridColumn: "span 12", "--bg": "var(--room-pink)"})} aria-labelledby="h-track">
            <span className="plaque">Operations Room · Ground Fl.</span>
            <div className="note">
              <span className="step">FILE 03</span>
              <h2 id="h-track">Track the Suspects</h2>
              <p>Plot movements across the city map, intercept tips over the wire, and race rival squads to make the arrest before the trail goes cold.</p>
            </div>
            <svg className="scene" viewBox="0 0 640 230" aria-hidden="true">
              <rect y="186" width="640" height="44" fill="url(#tiles)"/>
              {/* big map */}
              <rect x="160" y="16" width="320" height="150" fill="#efe0bf" stroke="#4a2e17" strokeWidth="7"/>
              <g stroke="#c9bfa6" strokeWidth="1.4"><path d="M170 50 H470 M170 90 H470 M170 130 H470 M220 22 V160 M290 22 V160 M360 22 V160 M420 22 V160"/></g>
              <path d="M164 118 C210 100 236 140 280 124 S350 76 390 98 S450 130 476 112" stroke="#7b9fc6" strokeWidth="12" fill="none"/>
              <g className="f-sc" fontSize="9" fill="#4a3624"><text x="178" y="42">MARYLEBONE</text><text x="300" y="44">SOHO</text><text x="396" y="70">WHITECHAPEL</text><text x="236" y="152">LAMBETH</text><text x="372" y="150">BERMONDSEY</text></g>
              <polyline points="196,64 316,58 410,84 386,140 262,140" fill="none" stroke="#b8472a" strokeWidth="2"/>
              <g fill="#b8472a" stroke="#2b1d12" strokeWidth="1"><circle cx="196" cy="64" r="5"/><circle cx="316" cy="58" r="5"/><circle cx="410" cy="84" r="5"/><circle cx="386" cy="140" r="5"/><circle cx="262" cy="140" r="5"/></g>
              <circle cx="440" cy="110" r="10" fill="none" stroke="#1f3a68" strokeWidth="3" strokeDasharray="4 3" className="spin"/>
              <text x="432" y="114" className="f-type" fontSize="10" fill="#1f3a68">?</text>
              {/* constable with pointer */}
              <use href="#p-cop" x="474" y="126" width="30" height="60"/>
              <path d="M478 146 L446 116" stroke="#4a2e17" strokeWidth="2.4"/>
              {/* team A */}
              <use href="#p-det" x="24" y="128" width="27" height="56"/>
              <use href="#p-tweed" x="56" y="130" width="26" height="54"/>
              <use href="#p-sci" x="88" y="128" width="27" height="56"/>
              <rect x="16" y="160" width="124" height="8" fill="#6b4423"/><rect x="22" y="168" width="6" height="18" fill="#4a2e17"/><rect x="128" y="168" width="6" height="18" fill="#4a2e17"/>
              <rect x="44" y="152" width="30" height="8" fill="#e6cf8f"/><use href="#phone" x="104" y="134" width="13" height="26"/>
              {/* team B */}
              <use href="#p-tweed" x="524" y="130" width="26" height="54"/>
              <use href="#p-det" x="556" y="128" width="27" height="56"/>
              <use href="#p-cop" x="590" y="128" width="27" height="56"/>
              <rect x="514" y="160" width="118" height="8" fill="#6b4423"/><rect x="520" y="168" width="6" height="18" fill="#4a2e17"/><rect x="620" y="168" width="6" height="18" fill="#4a2e17"/>
              <rect x="560" y="150" width="34" height="10" fill="#f6ead0" stroke="#6b4423"/>
            </svg>
          </section>
        </div>
      </div>
  );
}
