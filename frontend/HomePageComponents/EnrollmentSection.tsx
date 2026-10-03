"use client";

import Script from "next/script";

function CogGear({
  size = 100,
  color = "#C68A27",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        fill={color}
        stroke="#1D120C"
        strokeWidth="3"
      />
      <circle cx="50" cy="50" r="16" fill="#1D120C" opacity="0.15" />
      <circle cx="50" cy="50" r="8" fill="#1D120C" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path
          key={angle}
          d="M44 15 L46 2 L54 2 L56 15 Z"
          fill={color}
          stroke="#1D120C"
          strokeWidth="3"
          strokeLinejoin="round"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* Decorative dashed inner ring */}
      <circle
        cx="50"
        cy="50"
        r="24"
        stroke="#E5A93B"
        strokeWidth="2"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function CornerScrew({
  top,
  bottom,
  left,
  right,
}: {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}) {
  let classes = "absolute w-6 h-6 sm:w-8 sm:h-8 z-20";
  if (top) classes += " top-2 sm:top-3";
  if (bottom) classes += " bottom-2 sm:bottom-3";
  if (left) classes += " left-2 sm:left-3";
  if (right) classes += " right-2 sm:right-3";

  return (
    <div className={classes}>
      <svg viewBox="0 0 32 32" fill="none">
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="#C68A27"
          stroke="#1D120C"
          strokeWidth="2"
        />
        <circle cx="16" cy="16" r="10" fill="#E5A93B" />
        {/* Screw slot */}
        <rect
          x="8"
          y="14"
          width="16"
          height="4"
          rx="1"
          fill="#1D120C"
          opacity="0.6"
          transform="rotate(45 16 16)"
        />
      </svg>
    </div>
  );
}

function ExhaustPipe() {
  return (
    <svg
      viewBox="0 0 60 80"
      fill="none"
      className="absolute bottom-0 right-0 w-full h-full"
    >
      <rect
        x="0"
        y="50"
        width="30"
        height="20"
        fill="#C68A27"
        stroke="#1D120C"
        strokeWidth="3"
      />
      <rect
        x="20"
        y="20"
        width="24"
        height="50"
        fill="#C68A27"
        stroke="#1D120C"
        strokeWidth="3"
      />
      <rect
        x="16"
        y="10"
        width="32"
        height="10"
        rx="2"
        fill="#E5A93B"
        stroke="#1D120C"
        strokeWidth="3"
      />
      <ellipse cx="32" cy="10" rx="12" ry="5" fill="#1D120C" />
      {/* Brass highlights */}
      <rect x="24" y="22" width="4" height="46" fill="#E5A93B" opacity="0.5" />
    </svg>
  );
}

export default function EnrollmentSection() {
  return (
    <section className="relative bg-[#FDF8EE] py-24 sm:py-32 overflow-hidden px-4">
      
      {/* Title Area */}
      <div className="relative z-20 text-center mb-16 max-w-2xl mx-auto">
        <h2
          className="font-[family-name:var(--font-berkshire)] text-5xl md:text-6xl mb-4"
          style={{
            color: "#2B0C3D",
            textShadow: "3px 3px 0px rgba(29,18,12,0.1)",
          }}
        >
          Secure Your Spot
        </h2>
        <p className="font-[family-name:var(--font-outfit)] text-[#1D120C] opacity-80 text-lg">
          Please input your credentials into the Enrollment Machine below.
          Ensure your gears are aligned.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-3xl">
        
        {/* Left Flanking Gears */}
        <div className="absolute -left-12 sm:-left-20 top-24 hidden md:flex flex-col items-center z-0">
          <CogGear
            size={90}
            color="#C68A27"
            className="animate-[spin_12s_linear_infinite]"
          />
          <CogGear
            size={60}
            color="#E5A93B"
            className="animate-[spin_8s_linear_infinite_reverse] -mt-4 ml-8"
          />
        </div>

        {/* Right Flanking Gears */}
        <div className="absolute -right-8 sm:-right-16 top-1/2 hidden md:flex flex-col items-center z-0">
          <CogGear
            size={70}
            color="#E5A93B"
            className="animate-[spin_9s_linear_infinite_reverse]"
          />
          <CogGear
            size={50}
            color="#C68A27"
            className="animate-[spin_6s_linear_infinite] -mt-3 mr-6"
          />
        </div>

        {/* Exhaust Pipe & Steam */}
        <div className="absolute -right-6 sm:-right-12 bottom-16 w-16 h-24 hidden sm:block z-0">
          <div className="steam-particle particle-1" />
          <div className="steam-particle particle-2" />
          <div className="steam-particle particle-3" />
          <ExhaustPipe />
        </div>

        {/* Machine Housing Wrapper */}
        <div
          className="relative z-10 border-[3px] border-[#1D120C] p-4 sm:p-8 rounded-sm"
          style={{
            background:
              "linear-gradient(135deg, #F5D77A 0%, #E5A93B 25%, #C68A27 50%, #E5A93B 75%, #B07820 100%)",
            boxShadow: "10px 10px 0px #1D120C",
          }}
        >
          {/* Inner machinery texture overlay (perforated metal look) */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1D120C 1.5px, transparent 1.5px)",
              backgroundSize: "12px 12px",
            }}
          />

          <CornerScrew top left />
          <CornerScrew top right />
          <CornerScrew bottom left />
          <CornerScrew bottom right />

          {/* Stamped Nameplate */}
          <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-[#1D120C] border-[2px] border-[#C68A27] px-6 sm:px-10 py-1.5 sm:py-2 flex items-center shadow-[4px_4px_0px_#1D120C] whitespace-nowrap z-20">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E5A93B] mr-3 sm:mr-4 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.5)]" />
            <h3 className="font-[family-name:var(--font-cinzel)] text-[#F5D77A] tracking-[0.2em] sm:tracking-[0.25em] font-bold text-xs sm:text-base">
              OFFICIAL ENROLLMENT
            </h3>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E5A93B] ml-3 sm:ml-4 shadow-[inset_1px_1px_1px_rgba(0,0,0,0.5)]" />
          </div>

          {/* Recessed Screen Area for Tally Embed */}
          <div
            className="relative mt-8 sm:mt-6 bg-[#FDF8EE] border-[3px] border-[#1D120C] rounded-sm p-2 sm:p-4 w-full z-10"
            style={{
              boxShadow:
                "inset 6px 6px 16px rgba(29, 18, 12, 0.3), inset -2px -2px 8px rgba(255, 255, 255, 0.8)",
            }}
          >
            {/* Tally Embed */}
            <iframe
              data-tally-src="https://tally.so/embed/YOUR_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="300"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              title="Registration"
              className="w-full min-h-[300px] bg-transparent"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Tally Widget Script */}
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

      {/* Internal Styles for Steam Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes steamUp {
          0% { transform: translateY(0) scale(1) translateX(-50%); opacity: 0.8; }
          100% { transform: translateY(-70px) scale(3) translateX(-50%); opacity: 0; }
        }
        .steam-particle {
          position: absolute;
          bottom: 75%;
          left: 53%;
          width: 14px;
          height: 14px;
          background-color: rgba(253, 248, 238, 0.9);
          border-radius: 50%;
          animation: steamUp 2.5s infinite ease-out;
          filter: blur(1.5px);
          pointer-events: none;
        }
        .particle-1 { animation-delay: 0s; }
        .particle-2 { animation-delay: 0.8s; width: 18px; height: 18px; left: 56%; }
        .particle-3 { animation-delay: 1.6s; width: 10px; height: 10px; left: 50%; }
      `,
        }}
      />
    </section>
  );
}
