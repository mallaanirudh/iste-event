'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Ban, Eye, Flag, Radio } from 'lucide-react';

const rules = [
  {
    icon: Ban,
    text: 'Sharing or leaking flags/answers with other squads leads to immediate disqualification.',
    severity: 'critical',
  },
  {
    icon: Radio,
    text: 'Malfunctions or platform anomalies must be reported immediately to dispatchers.',
    severity: 'warning',
  },
  {
    icon: Eye,
    text: 'Inspect element is permitted, but blind link clicking will cost you.',
    severity: 'info',
  },
  {
    icon: Flag,
    text: 'All flags must be submitted in the exact format provided. Partial flags are invalid.',
    severity: 'info',
  },
  {
    icon: AlertTriangle,
    text: 'Any form of external assistance, automated tools, or brute forcing is prohibited.',
    severity: 'critical',
  },
];

const severityColors: Record<string, { border: string; icon: string; bg: string }> = {
  critical: { border: '#FF003C30', icon: '#FF003C', bg: '#FF003C08' },
  warning: { border: '#FFB00030', icon: '#FFB000', bg: '#FFB00008' },
  info: { border: '#00FF4130', icon: '#00FF41', bg: '#00FF4108' },
};

export default function RulesOfEngagement() {
  return (
    <section id="rules" className="py-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs text-[#FF003C] tracking-[0.3em] uppercase">
          // Mandatory Compliance
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 font-mono text-[#00FF41] glow-green-text">
          RULES OF ENGAGEMENT
        </h2>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#FF003C] to-transparent mx-auto mt-4" />
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-3">
        {rules.map((rule, i) => {
          const Icon = rule.icon;
          const colors = severityColors[rule.severity];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 font-mono text-sm
                         transition-all duration-300 hover:translate-x-1"
              style={{
                borderLeft: `2px solid ${colors.border}`,
                background: colors.bg,
              }}
            >
              <Icon size={18} style={{ color: colors.icon }} className="shrink-0 mt-0.5" />
              <span className="text-[#00FF41] opacity-80">{rule.text}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-8"
      >
        <p className="font-mono text-xs text-[#FF003C] opacity-60 flex items-center justify-center gap-2">
          <AlertTriangle size={14} /> Violation of any directive results in immediate extraction from the operation.
        </p>
      </motion.div>
    </section>
  );
}
