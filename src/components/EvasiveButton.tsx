'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function EvasiveButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const evade = () => {
    // Determine random new position within a wider range
    // 300px horizontal spread, 150px vertical spread
    const maxX = 300;
    const maxY = 150;
    
    let newX = (Math.random() - 0.5) * maxX * 2;
    let newY = (Math.random() - 0.5) * maxY * 2;
    
    // Ensure it moves far enough away from current position to avoid double-triggers
    if (Math.abs(newX - position.x) < 50) newX += (newX > 0 ? 100 : -100);
    if (Math.abs(newY - position.y) < 30) newY += (newY > 0 ? 50 : -50);

    setPosition({ x: newX, y: newY });
  };

  return (
    <div ref={containerRef} className="relative flex justify-center items-center py-20 min-h-[300px] overflow-visible w-full">
      <motion.button
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        onMouseEnter={evade}
        onTouchStart={evade}
        className="px-6 py-3 border border-[#00FF41] text-[#00FF41] font-mono text-sm 
                   hover:bg-[#00FF4110] relative z-10 shadow-[0_0_15px_rgba(0,255,65,0.2)]
                   uppercase tracking-wider font-bold"
      >
        [ EXIT VIM ]
      </motion.button>
      
      <div className="absolute bottom-4 text-center w-full pointer-events-none">
        <p className="text-[#FF003C] font-mono text-xs opacity-50 uppercase tracking-widest">
          Good luck with that.
        </p>
      </div>
    </div>
  );
}
