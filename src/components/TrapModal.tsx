'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

interface TrapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrapModal({ isOpen, onClose }: TrapModalProps) {
  const [staticText, setStaticText] = useState('');

  useEffect(() => {
    if (isOpen) {
      let count = 0;
      const interval = setInterval(() => {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let str = '';
        for (let i = 0; i < 40; i++) {
          str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setStaticText(str);
        count++;
        if (count > 15) {
          clearInterval(interval);
          setStaticText('');
        }
      }, 40);
      
      // Trigger a global red screen flash by adding a class to body
      document.body.classList.add('red-alert-flash');
      setTimeout(() => document.body.classList.remove('red-alert-flash'), 500);

      return () => {
        clearInterval(interval);
        document.body.classList.remove('red-alert-flash');
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FF003C]/10 font-mono backdrop-blur-md">
          <style jsx global>{`
            @keyframes redAlertFlash {
              0% { background-color: rgba(255, 0, 60, 0.4); }
              20% { background-color: rgba(255, 0, 60, 0); }
              40% { background-color: rgba(255, 0, 60, 0.6); }
              60% { background-color: rgba(255, 0, 60, 0); }
              80% { background-color: rgba(255, 0, 60, 0.3); }
              100% { background-color: transparent; }
            }
            .red-alert-flash::before {
              content: '';
              position: fixed;
              inset: 0;
              z-index: 9999;
              pointer-events: none;
              animation: redAlertFlash 0.5s ease-out;
            }
            @keyframes glitchJitter {
              0% { transform: translate(0, 0); }
              20% { transform: translate(-5px, 5px); }
              40% { transform: translate(-5px, -5px); }
              60% { transform: translate(5px, 5px); }
              80% { transform: translate(5px, -5px); }
              100% { transform: translate(0, 0); }
            }
          `}</style>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              animation: "glitchJitter 0.3s ease-out" 
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#050505] border-2 border-[#FF003C] p-8 text-center shadow-[0_0_50px_rgba(255,0,60,0.5)]"
          >
            <div className="mb-4 h-6 text-xs text-[#FF003C] opacity-70 tracking-widest overflow-hidden whitespace-nowrap">
              {staticText || "SECURITY_BREACH_DETECTED"}
            </div>

            <div className="flex justify-center mb-6">
              <ShieldAlert size={64} className="text-[#FF003C] drop-shadow-[0_0_15px_rgba(255,0,60,0.8)] animate-pulse" />
            </div>

            <h2 className="mb-4 text-2xl font-bold text-[#FF003C] uppercase tracking-wider">
              WARNING: Route Invalid
            </h2>
            
            <p className="mb-8 text-lg text-[#FFB000] border-y border-[#FFB000]/30 py-4 bg-[#FFB000]/5">
              We told you to TRUST NO LINK.
            </p>

            <button
              onClick={onClose}
              className="w-full border-2 border-[#FF003C] bg-transparent px-6 py-3 text-[#FF003C] font-bold uppercase tracking-widest transition-all hover:bg-[#FF003C] hover:text-[#050505] shadow-[inset_0_0_15px_rgba(255,0,60,0.2)]"
            >
              [ ACKNOWLEDGE & RETURN ]
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
