'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const WAVE_PATH =
  'M0 40 Q 50 20 100 40 T 200 40 T 300 40 T 400 40 T 500 40 T 600 40 T 700 40 T 800 40 T 900 40 T 1000 40 T 1100 40 T 1200 40 T 1300 40 T 1400 40 T 1500 40 T 1600 40 V 80 H 0 Z'

function WaveLayer({ y, opacity, duration, reverse }: { y: number; opacity: number; duration: number; reverse?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1600 80"
      preserveAspectRatio="none"
      className="absolute left-0 h-16 w-[200%] md:h-20"
      style={{ bottom: y, opacity }}
      animate={reduce ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <path d={WAVE_PATH} fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
      <path d={WAVE_PATH} fill="var(--ocean)" fillOpacity="0.08" stroke="none" />
    </motion.svg>
  )
}

export function OceanBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-parchment">
      <div className="absolute inset-x-0 bottom-0 h-[70vh] [mask-image:linear-gradient(to_top,black_55%,transparent)]">
        <Image
          src="/images/titanic-sketch.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-30 mix-blend-multiply"
        />
      </div>
      <WaveLayer y={0} opacity={0.5} duration={38} />
      <WaveLayer y={18} opacity={0.3} duration={52} reverse />
      <div className="paper-grain absolute inset-0 opacity-20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgb(120_80_40/0.22))]" />
    </div>
  )
}
