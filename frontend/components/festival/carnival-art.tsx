import { useId } from "react";

export function CarnivalArt({ silhouette = false }: { silhouette?: boolean }) {
  const id = useId().replace(/:/g, "");
  const pink = silhouette ? "#160b26" : "#ff007f";
  const blue = silhouette ? "#160b26" : "#00e5ff";
  const gold = silhouette ? "#160b26" : "#ffd700";
  return (
    <svg
      viewBox="0 0 640 480"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor="#b956ff" stopOpacity=".28" />
          <stop offset="1" stopColor="#b956ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {!silhouette && (
        <>
          <ellipse
            cx="330"
            cy="265"
            rx="290"
            ry="225"
            fill={`url(#${id}-halo)`}
          />
          <path
            d="M495 65a30 30 0 1 0 38 38 29 29 0 0 1-38-38Z"
            fill="#fff0ae"
          />
          <g strokeWidth="3" strokeLinecap="round">
            <path
              d="M71 115v22m-11-11h22M543 170v18m-9-9h18M184 43v16m-8-8h16M439 30v15m-7-7h14"
              stroke={gold}
            />
            <path
              d="m71 247 5 10m-11-4 13-4M584 285v16m-8-8h16M300 61v13m-6-6h12"
              stroke={pink}
            />
          </g>
          <g fill="#ffecbc">
            <circle cx="127" cy="71" r="2" />
            <circle cx="390" cy="91" r="2" />
            <circle cx="554" cy="80" r="2" />
            <circle cx="25" cy="197" r="2" />
            <circle cx="609" cy="217" r="2" />
          </g>
          <path
            d="M19 397c127-25 409-25 596 5"
            stroke="#674185"
            strokeWidth="2"
            strokeDasharray="4 9"
          />
        </>
      )}
      <g
        stroke={silhouette ? "#160b26" : "#10081d"}
        strokeWidth="5"
        strokeLinejoin="round"
      >
        <path d="m217 218-80 203h159Z" fill={blue} />
        <path d="m217 235-47 170h94Z" fill={silhouette ? blue : "#211036"} />
        <g className={silhouette ? "" : "festival-wheel"}>
          <circle
            cx="217"
            cy="216"
            r="132"
            fill={silhouette ? pink : "#281442"}
            stroke={gold}
            strokeWidth="7"
          />
          <circle cx="217" cy="216" r="117" stroke={pink} strokeWidth="3" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * Math.PI) / 6;
            const x = 217 + Math.cos(angle) * 132;
            const y = 216 + Math.sin(angle) * 132;
            return (
              <g key={i}>
                <path
                  d={`M217 216L${x} ${y}`}
                  stroke={silhouette ? gold : "#9568b2"}
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={i % 2 ? blue : gold}
                  stroke="none"
                />
                <rect
                  x={x - 16}
                  y={y - 5}
                  width="32"
                  height="27"
                  rx="8"
                  fill={i % 3 ? pink : blue}
                  strokeWidth="4"
                />
                {!silhouette && (
                  <path
                    d={`M${x - 9} ${y + 3}h18`}
                    stroke="#ffecbc"
                    strokeWidth="3"
                  />
                )}
              </g>
            );
          })}
          <circle cx="217" cy="216" r="17" fill={gold} />
          <circle cx="217" cy="216" r="6" fill={pink} stroke="none" />
        </g>
        <path d="M340 296h212v133H340Z" fill={silhouette ? pink : "#fff0ba"} />
        <path
          d="M360 310h28v119h-28Zm56 0h28v119h-28Zm56 0h28v119h-28Z"
          fill={pink}
          stroke="none"
        />
        <path d="m446 156-128 146h258Z" fill={pink} />
        <path
          d="m446 156-52 146h52Zm0 0v146h51Z"
          fill={silhouette ? gold : "#ffefbc"}
          stroke="none"
        />
        <path d="m446 156-128 146h258Z" stroke={gold} fill="none" />
        <path d="M446 156V99l62 17-62 17" fill={blue} />
        <path
          d="M320 301c0 20 28 25 35 1 0 22 30 24 36 0 0 22 30 24 36 0 0 22 30 24 36 0 0 22 30 24 36 0 0 22 30 24 36 0 0 22 30 24 37 0"
          fill={gold}
          strokeWidth="3"
        />
        <path d="M421 429v-58a25 25 0 0 1 50 0v58" fill="#160b26" />
        {!silhouette && (
          <>
            <rect
              x="385"
              y="266"
              width="123"
              height="30"
              rx="5"
              fill="#211036"
              stroke={gold}
              strokeWidth="3"
            />
            <text
              x="446"
              y="287"
              textAnchor="middle"
              fill={gold}
              stroke="none"
              fontFamily="var(--font-bangers), sans-serif"
              fontSize="20"
              letterSpacing="2"
            >
              IDEAS &amp; WONDER
            </text>
          </>
        )}
        <path d="M48 355h83v72H48Z" fill={blue} />
        <path d="m39 354 51-45 51 45Z" fill={pink} />
        <path d="M72 427v-39h35v39" fill={silhouette ? pink : "#211036"} />
        <path d="M559 376h52v52h-52Z" fill={pink} />
        <path d="m550 376 36-33 36 33Z" fill={gold} />
        <path
          d="M27 430h598"
          stroke={silhouette ? gold : "#ffd700"}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
      {!silhouette && (
        <g fill={gold} stroke="#180d29" strokeWidth="3">
          <path d="m330 361 7 14 16 2-12 11 3 16-14-7-14 7 3-16-12-11 16-2Z" />
          <path d="m126 288 5 10 12 2-9 8 2 12-10-6-11 6 2-12-8-8 12-2Z" />
        </g>
      )}
    </svg>
  );
}

export function Bunting() {
  return (
    <svg
      className="pointer-events-none block h-full w-full"
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M-20 8Q350 158 720 24Q1090 158 1460 8"
        stroke="#78609a"
        strokeWidth="2"
        fill="none"
      />
      {Array.from({ length: 27 }, (_, i) => {
        const x = i * 56 - 7;
        const y =
          x < 720
            ? 8 + 64 * Math.sin((x / 720) * Math.PI)
            : 8 + 64 * Math.sin(((x - 720) / 720) * Math.PI);
        return (
          <path
            key={i}
            d={`m${x} ${y} 18 36 18-31Z`}
            fill={["#ff007f", "#ffd700", "#00e5ff", "#a78bfa"][i % 4]}
            stroke="#180a2b"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}
