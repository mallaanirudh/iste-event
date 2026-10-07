import type { Chamber } from "./chamber-data";
import { designRefinements } from "./design-refinements";
import { ChamberScene } from "./chamber-scenes";

// Each illustration follows the chamber's original visual theme.
export function ChamberArt({ chamber }: { chamber: Chamber }) {
  return designRefinements[6] ? (
    <ChamberScene chamber={chamber} />
  ) : (
    <OriginalChamberArt chamber={chamber} />
  );
}

function OriginalChamberArt({ chamber }: { chamber: Chamber }) {
  return (
    <svg
      viewBox="0 0 240 140"
      className="festival-chamber-art h-32 w-full"
      fill="none"
      aria-hidden="true"
      style={{ color: chamber.color }}
    >
      <ellipse
        cx="120"
        cy="127"
        rx="85"
        ry="5"
        fill="currentColor"
        opacity=".08"
      />
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {chamber.artwork === "mystery" && (
          <>
            <path d="M48 26h90v91H48Z" fill="#28163e" strokeOpacity=".45" />
            <path
              d="M63 41h43m-43 12h53m-53 12h23m-23 31h26"
              strokeOpacity=".4"
            />
            <circle cx="123" cy="67" r="32" fill="#26143c" strokeWidth="5" />
            <circle cx="123" cy="67" r="25" strokeOpacity=".35" />
            <path d="m146 92 31 31" strokeWidth="12" />
            <path
              d="M110 61c0-10 12-16 20-11"
              stroke="#fff5df"
              strokeWidth="3"
            />
            <path
              d="m177 30 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z"
              fill="currentColor"
              stroke="none"
            />
          </>
        )}
        {chamber.artwork === "beacon" && (
          <>
            <path d="M82 81h76v43H82Z" fill="#293e3c" />
            <path
              d="M82 81 119 60l39 21-38 22Z"
              fill="currentColor"
              fillOpacity=".25"
            />
            <path d="M120 104v20m-38-21 38 21 38-21" strokeOpacity=".6" />
            <path
              d="M109 15h23v56h-23Z"
              fill="currentColor"
              fillOpacity=".12"
              stroke="none"
            />
            <path
              d="M116 8h8v63h-8Z"
              fill="currentColor"
              fillOpacity=".45"
              stroke="none"
            />
            <path
              d="m50 56 12-12 12 12-12 13Z"
              fill="currentColor"
              fillOpacity=".45"
            />
            <path d="m177 91 8-8 8 8-8 8Z" fill="currentColor" />
            <path d="M45 107v14h16m116-79h15v15" strokeOpacity=".45" />
          </>
        )}
        {chamber.artwork === "maze" && (
          <>
            <rect
              x="51"
              y="22"
              width="119"
              height="102"
              rx="3"
              fill="#291940"
              strokeOpacity=".6"
            />
            <path d="M71 22v24h26V22m24 0v44h28V46h21M51 66h45v24H72v34m48 0V88h29v36" />
            <path
              d="M51 106h9V56h47v22h33v-2m22 31h8"
              stroke="#ffd700"
              strokeDasharray="2 7"
              strokeWidth="2"
            />
            <path
              d="M185 40v30l-15 32c-3 7 2 14 9 14h22c7 0 12-7 9-14l-15-32V40m-13 0h16"
              fill="#201032"
            />
            <path
              d="M177 97h26l7 16h-39Z"
              fill="currentColor"
              fillOpacity=".45"
              stroke="none"
            />
          </>
        )}
        {chamber.artwork === "terminal" && (
          <>
            <rect
              x="44"
              y="24"
              width="152"
              height="93"
              rx="8"
              fill="#150c24"
              strokeWidth="4"
            />
            <path d="M44 44h152" strokeOpacity=".45" />
            <circle cx="56" cy="35" r="2" fill="currentColor" />
            <circle cx="65" cy="35" r="2" fill="currentColor" />
            <circle cx="74" cy="35" r="2" fill="currentColor" />
            <path
              d="m63 65 11 8-11 8m20 0h23m-44 17h37m12 0h34m-5-32h39m-53 14h46"
              strokeWidth="3"
            />
            <path d="M105 117v9m30-9v9m-38 0h47" />
            <path
              d="M189 60h15m-9 28h10M36 87h16"
              stroke="#ff83bf"
              strokeWidth="5"
            />
          </>
        )}
        {chamber.artwork === "race" && (
          <>
            <path
              d="m66 90 19-49 40 15-20 48m19-14 18-46 40 15-18 47"
              strokeOpacity=".6"
            />
            {Array.from({ length: 8 }, (_, i) => (
              <rect
                key={i}
                x={86 + (i % 4) * 10}
                y={45 + Math.floor(i / 4) * 10}
                width="10"
                height="10"
                transform="rotate(19 86 45)"
                fill={i % 2 === Math.floor(i / 4) ? "#fff5df" : "currentColor"}
                stroke="none"
              />
            ))}
            <path d="M53 113h134m-122-9 10-19h60l20 19v9H65Z" fill="#3b2440" />
            <path d="m84 85 14-15h21l13 15" />
            <circle cx="83" cy="112" r="10" fill="#190d29" />
            <circle cx="137" cy="112" r="10" fill="#190d29" />
            <path d="M157 98h28m-24 10h32" strokeWidth="2" />
          </>
        )}
        {chamber.artwork === "voyage" && (
          <>
            <path
              d="m59 93 123 0-20 26H78Z"
              fill="currentColor"
              fillOpacity=".25"
            />
            <path d="M118 22v70m-5-65L74 82h39Zm13 9v46h36Z" fill="#2d193e" />
            <path
              d="M47 127q12-12 24 0t24 0 24 0 24 0 24 0 24 0"
              stroke="#00e5ff"
              strokeOpacity=".65"
            />
            <circle cx="103" cy="105" r="3" fill="currentColor" stroke="none" />
            <circle cx="118" cy="105" r="3" fill="currentColor" stroke="none" />
            <circle cx="133" cy="105" r="3" fill="currentColor" stroke="none" />
            <path
              d="m174 41 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1Z"
              fill="currentColor"
              stroke="none"
            />
          </>
        )}
      </g>
    </svg>
  );
}
