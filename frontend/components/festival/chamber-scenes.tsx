import type { Chamber } from "./chamber-data";

// Six static vector scenes share one canvas and stroke weight. Small details
// describe the event instead of adding more animated decoration to the page.
export function ChamberScene({ chamber }: { chamber: Chamber }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="festival-chamber-art block h-32 w-full max-w-full overflow-hidden"
      fill="none"
      aria-hidden="true"
      style={{ color: chamber.color }}
    >
      <path d="M28 161h264" stroke="#876b46" strokeOpacity=".4" />
      <g
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {chamber.artwork === "mystery" && (
          <>
            <rect
              x="52"
              y="24"
              width="190"
              height="123"
              rx="3"
              fill="#211030"
              strokeOpacity=".5"
            />
            <rect
              x="66"
              y="36"
              width="162"
              height="97"
              rx="2"
              strokeOpacity=".2"
            />
            <path
              d="M78 58 145 94l52-45m-52 45 52 29"
              stroke="#ff83bf"
              strokeWidth="1.5"
            />
            <path d="m74 44 41 4-5 51-41-4Z" fill="#37213f" />
            <circle cx="92" cy="65" r="8" fill="#bda4d1" stroke="none" />
            <path d="M80 86c1-15 21-14 23 1" stroke="#bda4d1" strokeWidth="6" />
            <path d="m177 37 39-4 4 32-39 4Z" fill="#37213f" />
            <path d="M189 47h17m-17 8h12" strokeOpacity=".55" />
            <circle cx="145" cy="94" r="5" fill="#ff83bf" stroke="none" />
            <circle cx="203" cy="114" r="29" fill="#211030" strokeWidth="4" />
            <circle cx="203" cy="114" r="22" strokeOpacity=".3" />
            <path d="m225 137 24 22" strokeWidth="10" />
            <path
              d="M191 110c0-10 10-15 16-12"
              stroke="#fff5df"
              strokeWidth="2"
            />
            <path d="m37 142 13-18 10 7-13 18Z" fill="#e9cb80" stroke="none" />
            <path d="M67 32h14m127 0h14" stroke="#e9cb80" strokeWidth="5" />
          </>
        )}
        {chamber.artwork === "beacon" && (
          <>
            <path
              d="M139 27h42v75h-42Z"
              fill="currentColor"
              fillOpacity=".08"
              stroke="none"
            />
            <path
              d="M153 17h14v87h-14Z"
              fill="currentColor"
              fillOpacity=".18"
              stroke="none"
            />
            <path d="m160 83 40 22-40 22-40-22Z" fill="#224537" />
            <path d="M120 105v31l40 21 40-21v-31l-40 22Z" fill="#211b30" />
            <path d="M160 127v30m-40-37 40 22 40-22" strokeOpacity=".45" />
            <path
              d="m160 94 20 11-20 11-20-11Z"
              fill="currentColor"
              fillOpacity=".5"
            />
            <path d="M107 138H86v-30H62" stroke="#a68a56" />
            <rect
              x="46"
              y="93"
              width="27"
              height="26"
              rx="2"
              fill="#211030"
              stroke="#a68a56"
            />
            <path d="m55 112 12-13" stroke="#e9cb80" strokeWidth="4" />
            <path d="M213 126h32v-23" stroke="#a68a56" />
            <rect x="234" y="87" width="22" height="16" fill="#263b36" />
            {[
              [91, 49],
              [222, 41],
              [205, 72],
            ].map(([x, y], i) => (
              <path
                key={i}
                d={`m${x} ${y} 8-8 8 8-8 8Z`}
                fill="currentColor"
                fillOpacity=".45"
              />
            ))}
            <path d="M126 47v10m63-24v9m-78 40v8" strokeOpacity=".4" />
            <path d="M130 153h60" stroke="#e9cb80" strokeOpacity=".4" />
          </>
        )}
        {chamber.artwork === "maze" && (
          <>
            <path d="M48 29h186v123H48Z" fill="#211030" strokeOpacity=".5" />
            <path
              d="M61 42h26v27h29V42h42v30h33V42h30M61 97h28v42m27 0v-40h42v40m33 0v-40h30"
              strokeOpacity=".65"
            />
            <path
              d="M47 123h13V80h42v7h26V58h16v22h35v13h20v30h35"
              stroke="#e9cb80"
              strokeWidth="2"
              strokeDasharray="3 6"
            />
            <rect x="130" y="103" width="22" height="49" fill="#37213f" />
            <path d="m130 103 17 7v42l-17-7Z" fill="#412648" />
            <circle cx="143" cy="126" r="1.5" fill="#e9cb80" stroke="none" />
            <path
              d="M250 73v25l-18 38c-4 8 1 17 10 17h29c9 0 14-9 10-17l-18-38V73m-17 0h21"
              fill="#211030"
            />
            <path
              d="M239 130h35l7 16c1 3-2 7-5 7h-39c-3 0-6-4-5-7Z"
              fill="currentColor"
              fillOpacity=".35"
              stroke="none"
            />
            <circle cx="253" cy="127" r="3" fill="currentColor" stroke="none" />
            <circle cx="263" cy="116" r="2" fill="currentColor" stroke="none" />
          </>
        )}
        {chamber.artwork === "terminal" && (
          <>
            <rect
              x="64"
              y="30"
              width="175"
              height="110"
              rx="5"
              fill="#211030"
              strokeWidth="3"
            />
            <rect
              x="76"
              y="43"
              width="151"
              height="80"
              rx="2"
              fill="#130b22"
              strokeOpacity=".3"
            />
            <path
              d="m89 63 12 9-12 9m24 0h24m-48 17h51m-51 10h28m37-42h54m-45 17h36m-43 17h25"
              strokeWidth="2"
            />
            <path d="M143 140v12m22-12v12m-32 0h42" strokeOpacity=".5" />
            <path
              d="m84 158 6-11h125l6 11Z"
              fill="#211030"
              strokeOpacity=".6"
            />
            <path d="M99 153h101" strokeOpacity=".3" strokeDasharray="3 5" />
            <circle cx="227" cy="132" r="2" fill="#e9cb80" stroke="none" />
            <path d="M243 115h22v-16" stroke="#a68a56" />
            <rect
              x="254"
              y="83"
              width="22"
              height="16"
              rx="2"
              fill="#211030"
              stroke="#a68a56"
            />
            <path d="M260 83v-7a5 5 0 0 1 10 0v7" stroke="#a68a56" />
            <path
              d="M48 82h29m151-21h24m-50 65h18"
              stroke="#ff83bf"
              strokeOpacity=".5"
              strokeWidth="3"
            />
          </>
        )}
        {chamber.artwork === "race" && (
          <>
            <path d="M47 148c37-67 138-88 226-44" strokeOpacity=".2" />
            <path
              d="M47 158c37-67 138-88 226-44"
              stroke="#e9cb80"
              strokeOpacity=".3"
              strokeDasharray="5 8"
            />
            <path d="M219 37v81" stroke="#a68a56" />
            <path
              d="m219 39 46 8-5 33-41-8Z"
              fill="#211030"
              strokeOpacity=".6"
            />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={221 + col * 10}
                  y={42 + row * 10}
                  width="10"
                  height="10"
                  transform="rotate(10 219 39)"
                  fill={(row + col) % 2 ? "#e9cb80" : "#211030"}
                  stroke="none"
                />
              )),
            )}
            <path
              d="m68 123 11-19h85l24 19v16H68Z"
              fill="#37213f"
              strokeWidth="3"
            />
            <path d="m96 104 13-21h34l17 21" fill="#211030" />
            <path d="M130 86v18" strokeOpacity=".5" />
            <circle cx="91" cy="139" r="15" fill="#130b22" strokeWidth="4" />
            <circle cx="167" cy="139" r="15" fill="#130b22" strokeWidth="4" />
            <circle cx="91" cy="139" r="5" stroke="#a68a56" />
            <circle cx="167" cy="139" r="5" stroke="#a68a56" />
            <path d="M60 114H38m21 13H28m173 2h24" strokeOpacity=".5" />
            <path d="M116 115h23" stroke="#e9cb80" strokeWidth="3" />
          </>
        )}
        {chamber.artwork === "voyage" && (
          <>
            <path d="M79 97h165l-27 43H98Z" fill="#37213f" strokeWidth="3" />
            <path d="M99 73h118v24H99Z" fill="#211030" />
            <path
              d="M117 53h23v20h-23Zm46 0h23v20h-23Z"
              fill="currentColor"
              fillOpacity=".25"
            />
            <path
              d="M105 86h99"
              strokeOpacity=".4"
              strokeDasharray="3 9"
              strokeWidth="4"
            />
            <path d="M94 111h139" stroke="#e9cb80" strokeOpacity=".6" />
            {[117, 145, 173, 201].map((x) => (
              <circle key={x} cx={x} cy="123" r="4" fill="#211030" />
            ))}
            <path
              d="M103 45V26l19 8-19 7"
              fill="#e9cb80"
              stroke="#e9cb80"
              strokeWidth="2"
            />
            <path
              d="M91 40c-4-6-13-6-16 0m102 0c3-6 11-6 15-2"
              strokeOpacity=".3"
            />
            <path
              d="M47 149q12-8 24 0t24 0 24 0 24 0 24 0 24 0 24 0 24 0 24 0"
              stroke="#65bcca"
              strokeOpacity=".6"
            />
            <path
              d="M84 161q12-8 24 0t24 0 24 0 24 0 24 0 24 0"
              stroke="#65bcca"
              strokeOpacity=".3"
            />
            <path
              d="M44 63v63m-7-57h14m-14 12h8m-8 12h14m-14 12h8m-8 12h14"
              stroke="#a68a56"
              strokeWidth="2"
            />
          </>
        )}
      </g>
    </svg>
  );
}
