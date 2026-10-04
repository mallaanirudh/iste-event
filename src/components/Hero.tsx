'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function Hero() {
  const [headingText, setHeadingText] = useState('SQUARE 1');

  useEffect(() => {
    const texts = ['SQUARE 1', 'TRUST NO LINK'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % texts.length;
      setHeadingText(texts[idx]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBriefing = () => {
    const el = document.getElementById('briefing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRules = () => {
    const el = document.getElementById('rules');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden font-mono text-[#00FF41] p-4">

      <style>{`
        .glitch-wrapper {
          position: relative;
        }
        .glitch {
          position: relative;
          color: white;
          font-weight: bold;
          text-transform: uppercase;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #050505;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #FF003C;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00F0FF;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(78px, 9999px, 83px, 0); }
          5% { clip: rect(31px, 9999px, 91px, 0); }
          10% { clip: rect(21px, 9999px, 86px, 0); }
          15% { clip: rect(98px, 9999px, 91px, 0); }
          20% { clip: rect(87px, 9999px, 20px, 0); }
          25% { clip: rect(46px, 9999px, 55px, 0); }
          30% { clip: rect(34px, 9999px, 63px, 0); }
          35% { clip: rect(78px, 9999px, 12px, 0); }
          40% { clip: rect(2px, 9999px, 95px, 0); }
          45% { clip: rect(35px, 9999px, 23px, 0); }
          50% { clip: rect(10px, 9999px, 67px, 0); }
          55% { clip: rect(96px, 9999px, 43px, 0); }
          60% { clip: rect(48px, 9999px, 19px, 0); }
          65% { clip: rect(81px, 9999px, 87px, 0); }
          70% { clip: rect(21px, 9999px, 26px, 0); }
          75% { clip: rect(57px, 9999px, 42px, 0); }
          80% { clip: rect(91px, 9999px, 68px, 0); }
          85% { clip: rect(33px, 9999px, 4px, 0); }
          90% { clip: rect(70px, 9999px, 12px, 0); }
          95% { clip: rect(11px, 9999px, 99px, 0); }
          100% { clip: rect(88px, 9999px, 35px, 0); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          5% { clip: rect(52px, 9999px, 74px, 0); }
          10% { clip: rect(79px, 9999px, 85px, 0); }
          15% { clip: rect(75px, 9999px, 5px, 0); }
          20% { clip: rect(67px, 9999px, 61px, 0); }
          25% { clip: rect(14px, 9999px, 79px, 0); }
          30% { clip: rect(1px, 9999px, 22px, 0); }
          35% { clip: rect(86px, 9999px, 32px, 0); }
          40% { clip: rect(16px, 9999px, 87px, 0); }
          45% { clip: rect(4px, 9999px, 3px, 0); }
          50% { clip: rect(93px, 9999px, 56px, 0); }
          55% { clip: rect(18px, 9999px, 14px, 0); }
          60% { clip: rect(61px, 9999px, 11px, 0); }
          65% { clip: rect(73px, 9999px, 59px, 0); }
          70% { clip: rect(85px, 9999px, 86px, 0); }
          75% { clip: rect(28px, 9999px, 39px, 0); }
          80% { clip: rect(40px, 9999px, 7px, 0); }
          85% { clip: rect(48px, 9999px, 36px, 0); }
          90% { clip: rect(51px, 9999px, 68px, 0); }
          95% { clip: rect(92px, 9999px, 42px, 0); }
          100% { clip: rect(34px, 9999px, 90px, 0); }
        }
      `}</style>

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm border border-[#00FF41] text-[#00FF41] bg-[#0a0a0a] uppercase tracking-widest shadow-[0_0_10px_rgba(0,255,65,0.2)]">
            <Terminal size={14} />
            &gt;&gt; CLASSIFIED DOSSIER // RECON MISSION
          </span>
        </motion.div>

        {/* Glitch Heading */}
        <motion.div variants={itemVariants} className="mb-6 glitch-wrapper">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white glitch"
            data-text={headingText}
          >
            {headingText}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-[#00FF41]/70 italic mb-12"
        >
          "The internet is lying. Do not believe what you click."
        </motion.p>

        {/* CTAs */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full"
        >
          <button 
            onClick={scrollToBriefing}
            className="group relative px-6 py-3 bg-[#0a0a0a] border-2 border-[#00FF41] text-[#00FF41] uppercase tracking-widest font-bold hover:bg-[#00FF41] hover:text-[#050505] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)] w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              [ DECRYPT BRIEFING ]
            </span>
          </button>
          <button 
            onClick={scrollToRules}
            className="group relative px-6 py-3 bg-[#0a0a0a] border-2 border-[#00F0FF] text-[#00F0FF] uppercase tracking-widest font-bold hover:bg-[#00F0FF] hover:text-[#050505] transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              [ VIEW RULES ]
            </span>
          </button>
        </motion.div>

        {/* Classified Stamp */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 sm:mt-24"
        >
          <div className="inline-block border-2 border-[#FF003C] text-[#FF003C] px-4 py-1 text-xl font-bold tracking-widest uppercase rotate-[-5deg] opacity-80 shadow-[0_0_10px_rgba(255,0,60,0.4)]">
            CLASSIFIED
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
