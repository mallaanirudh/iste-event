'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Lock, Unlock } from 'lucide-react';

const TARGET_CODE = 'SQ1';
const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

interface CipherWidgetProps {
  onUnlock: () => void;
}

export default function CipherWidget({ onUnlock }: CipherWidgetProps) {
  const [code, setCode] = useState(['A', 'A', '0']);
  const [status, setStatus] = useState<'IDLE' | 'INVALID' | 'GRANTED'>('IDLE');

  const updateChar = (index: number, direction: 1 | -1) => {
    if (status === 'GRANTED') return;
    setStatus('IDLE');
    setCode((prev) => {
      const newCode = [...prev];
      const char = newCode[index];
      const charIndex = CHAR_SET.indexOf(char);
      const newIndex = (charIndex + direction + CHAR_SET.length) % CHAR_SET.length;
      newCode[index] = CHAR_SET[newIndex];
      return newCode;
    });
  };

  const handleVerify = () => {
    if (code.join('') === TARGET_CODE) {
      setStatus('GRANTED');
      onUnlock();
    } else {
      setStatus('INVALID');
      setTimeout(() => setStatus('IDLE'), 2000);
    }
  };

  return (
    <div id="cipher-terminal" className="w-[320px] bg-[#050505] border-2 border-[#00FF41]/30 p-6 font-mono text-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.1)]">
      <div className="flex justify-between items-center border-b border-[#00FF41]/30 pb-3 mb-6">
        <span className="text-sm font-bold tracking-widest text-[#00F0FF] uppercase">CIPHER_TERMINAL</span>
        {status === 'GRANTED' ? <Unlock size={16} className="text-[#00FF41]" /> : <Lock size={16} />}
      </div>

      {status === 'GRANTED' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-6 space-y-4"
        >
          <div className="text-[#00FF41] text-center text-sm font-bold animate-pulse uppercase tracking-wider">
            ACCESS GRANTED
          </div>
          <div className="text-[#00F0FF] text-xs text-center border-t border-[#00F0FF]/30 pt-4 mt-2 leading-relaxed">
            Sequence accepted. <br/>
            The registration terminal is now online below.
          </div>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            {code.map((char, i) => (
              <div key={i} className="flex flex-col items-center">
                <button 
                  onClick={() => updateChar(i, -1)}
                  className="p-2 text-[#00FF41]/50 hover:text-[#00FF41] hover:bg-[#00FF41]/10 transition-colors"
                >
                  <ChevronUp size={24} />
                </button>
                
                <div className="w-12 h-14 border-2 border-[#00FF41] flex items-center justify-center bg-[#050505] relative overflow-hidden shadow-[inset_0_0_10px_rgba(0,255,65,0.2)]">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={char}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute text-2xl font-bold"
                    >
                      {char}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => updateChar(i, 1)}
                  className="p-2 text-[#00FF41]/50 hover:text-[#00FF41] hover:bg-[#00FF41]/10 transition-colors"
                >
                  <ChevronDown size={24} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <div className="h-4">
              {status === 'INVALID' && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#FF003C] text-xs font-bold tracking-widest uppercase"
                >
                  INVALID SEQUENCE
                </motion.span>
              )}
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-3 border-2 border-[#00F0FF]/50 text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all uppercase tracking-widest text-sm font-bold relative group overflow-hidden"
            >
              <span className="relative z-10">[ VERIFY ]</span>
              <div className="absolute inset-0 bg-[#00F0FF]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
