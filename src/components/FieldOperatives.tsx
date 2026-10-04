'use client';

import { motion } from 'framer-motion';
import { Phone, User } from 'lucide-react';

const pocs = [
  { name: 'Umar', phone: '+91 6362511760', role: 'Field Commander' },
  { name: 'Druva', phone: '+91 7676413198', role: 'Ops Coordinator' },
];

export default function FieldOperatives() {
  return (
    <section id="contact" className="py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs text-[#00F0FF] tracking-[0.3em] uppercase">
          // Dispatch & Operatives
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 font-mono text-[#00FF41] glow-green-text">
          FIELD OPERATIVES
        </h2>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent mx-auto mt-4" />
      </motion.div>

      {/* POC Cards */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {pocs.map((poc, i) => (
          <motion.div
            key={poc.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="terminal-border bg-[#0a0a0a] p-6 text-center
                       hover:bg-[#0d0d0d] transition-all duration-300 group"
          >
            {/* Avatar silhouette */}
            <div className="w-20 h-20 mx-auto mb-4 border border-[#00FF4130] bg-[#00FF4108]
                          flex items-center justify-center rounded-sm">
              <User size={32} className="text-[#00FF41] opacity-40 group-hover:opacity-70 transition-opacity" />
            </div>

            <div className="text-xs text-[#00F0FF] tracking-[0.2em] uppercase mb-1 font-mono">
              {poc.role}
            </div>
            <h3 className="text-[#00FF41] font-mono font-bold text-lg mb-2">
              AGENT_{poc.name.toUpperCase()}
            </h3>
            <a
              href={`tel:${poc.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 text-[#FFB000] font-mono text-sm
                       hover:text-[#00FF41] transition-colors"
            >
              <Phone size={14} />
              {poc.phone}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
