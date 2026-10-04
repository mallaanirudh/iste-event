'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Zap, Key } from 'lucide-react';

interface TrapLinksProps {
  onTrapClick: () => void;
}

export default function TrapLinks({ onTrapClick }: TrapLinksProps) {
  const buttonStyle = "inline-flex items-center gap-2 m-2 px-5 py-3 border font-mono text-sm uppercase transition-all duration-300 shadow-[0_0_10px_rgba(0,255,65,0.2)] hover:shadow-[0_0_20px_rgba(0,255,65,0.6)] cursor-pointer tracking-wider";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 my-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onTrapClick}
        className={`${buttonStyle} border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/10`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Package size={16} />
        Download Early Hints.zip
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onTrapClick}
        className={`${buttonStyle} border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <Zap size={16} />
        Bypass Waitlist
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onTrapClick}
        className={`${buttonStyle} border-[#FFB000] text-[#FFB000] hover:bg-[#FFB000]/10`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      >
        <Key size={16} />
        View Secret Key
      </motion.button>
    </div>
  );
}
