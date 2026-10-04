'use client';

import { motion } from 'framer-motion';

const steps = [
  { num: '01', label: 'Registration', desc: 'Form your squad' },
  { num: '02', label: 'Briefing', desc: 'Receive parameters' },
  { num: '03', label: 'Round 1', desc: 'Capture the flags' },
  { num: '04', label: 'Scoring', desc: 'Points calculated' },
  { num: '05', label: 'Exit', desc: 'Debrief & wrap-up' },
];

export default function OperationProtocol() {
  return (
    <section id="protocol" className="py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs text-[#FFB000] tracking-[0.3em] uppercase">
          // Operational Sequence
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 font-mono text-[#00FF41] glow-green-text">
          OPERATION PROTOCOL
        </h2>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#FFB000] to-transparent mx-auto mt-4" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Desktop: horizontal pipeline */}
        <div className="hidden md:flex items-start justify-between relative">
          
          {/* Static, solid SVG connecting line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-[#00FF41]/40 z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center relative z-10 w-1/5 group cursor-default"
            >
              <div className="w-16 h-16 border-2 border-[#00FF41] bg-[#050505] flex items-center justify-center
                            text-[#00FF41] font-mono font-bold text-lg mb-4 
                            group-hover:bg-[#00FF41] group-hover:text-[#050505] group-hover:shadow-[0_0_20px_#00FF41] transition-all duration-300 relative z-10">
                {step.num}
              </div>
              <span className="text-[#00FF41] font-mono text-sm font-bold text-center uppercase tracking-wider group-hover:text-[#00F0FF] transition-colors">
                {step.label}
              </span>
              <span className="text-[#00FF41] opacity-50 font-mono text-xs text-center mt-2 px-2">
                {step.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="md:hidden space-y-0 relative pl-4">
          {/* Static vertical line */}
          <div className="absolute left-[38px] top-4 bottom-12 w-[2px] bg-[#00FF41]/40 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-6 relative z-10 group py-6 cursor-default"
            >
              <div className="w-12 h-12 border-2 border-[#00FF41] bg-[#050505] flex items-center justify-center
                            text-[#00FF41] font-mono font-bold text-sm shrink-0
                            group-hover:bg-[#00FF41] group-hover:text-[#050505] group-hover:shadow-[0_0_15px_#00FF41] transition-all duration-300 relative z-10 mt-1">
                {step.num}
              </div>
              <div className="py-2">
                <span className="text-[#00FF41] font-mono text-base font-bold uppercase tracking-wider group-hover:text-[#00F0FF] transition-colors block mb-1">
                  {step.label}
                </span>
                <span className="text-[#00FF41] opacity-50 font-mono text-xs block">
                  {step.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
