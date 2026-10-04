'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Users, MapPin, Calendar, Brain, AlertTriangle } from 'lucide-react';
import RedactedText from './RedactedText';

const specs = [
  {
    icon: Shield,
    label: 'ELIGIBILITY',
    value: 'B.Tech 1st Years Only',
    color: '#00FF41',
  },
  {
    icon: Brain,
    label: 'FORMAT',
    value: '1 Round CTF • ~1.5 to 2 Hours',
    color: '#00F0FF',
  },
  {
    icon: AlertTriangle,
    label: 'CS_KNOWLEDGE',
    value: 'NONE REQUIRED',
    subtext: 'Pure logic, recon, attention to detail & problem solving',
    color: '#FFB000',
  },
  {
    icon: Users,
    label: 'TEAM_SIZE',
    value: '3 Members per Squad',
    color: '#00FF41',
  },
  {
    icon: Calendar,
    label: 'DATE_TIME',
    value: '15th Oct',
    color: '#00F0FF',
  },
  {
    icon: MapPin,
    label: 'VENUE',
    value: 'TBA',
    color: '#FFB000',
  },
];

export default function BriefingGrid() {
  return (
    <section id="briefing" className="py-20 px-4 md:px-8 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs text-[#00F0FF] tracking-[0.3em] uppercase">
          // Mission Parameters
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 font-mono text-[#00FF41] glow-green-text">
          MISSION DOSSIER
        </h2>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#00FF41] to-transparent mx-auto mt-4" />
      </motion.div>

      {/* Specs grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {specs.map((spec, i) => {
          const Icon = spec.icon;
          return (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="terminal-border bg-[#0a0a0a] p-5 hover:bg-[#0d0d0d] 
                         transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon size={18} style={{ color: spec.color }} />
                <span
                  className="text-xs tracking-[0.2em] uppercase opacity-60"
                  style={{ color: spec.color }}
                >
                  {spec.label}
                </span>
              </div>
              <p className="font-mono text-sm font-semibold" style={{ color: spec.color }}>
                {spec.value}
              </p>
              {spec.subtext && (
                <p className="text-xs text-[#00FF41] opacity-40 mt-2 font-mono">
                  {spec.subtext}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
