export function TrackBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-15">
      <svg
        className="w-full h-full text-[#FF1801]"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Outer Circuit Outline */}
        <path
          d="M 150,200 L 750,150 C 850,150 900,250 850,350 L 700,500 C 650,550 650,650 750,700 L 800,750 C 850,800 800,900 700,900 L 300,900 C 200,900 150,800 200,700 L 300,550 C 350,480 300,400 200,400 L 150,400 C 80,400 80,200 150,200 Z"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray="16 12"
        />
        {/* Inner Apex Racing Line */}
        <path
          d="M 160,210 L 740,160 C 830,160 880,250 830,340 L 690,490 C 640,540 640,640 740,690 L 790,740 C 830,780 790,880 690,880 L 310,880 C 220,880 170,780 210,690 L 310,540 C 360,470 310,390 210,390 L 160,390 C 100,390 100,210 160,210 Z"
          stroke="#00E5FF"
          strokeWidth="2"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  )
}