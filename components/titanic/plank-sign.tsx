'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import type { MouseEvent } from 'react'

export function PlankSign() {
  const reduce = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 120, damping: 12, mass: 0.6 })
  const springY = useSpring(pointerY, { stiffness: 120, damping: 12, mass: 0.6 })
  const tilt = useTransform(springX, [-1, 1], [-7, 7])
  const rotateX = useTransform(springY, [-1, 1], [8, -8])
  const lift = useTransform(springY, [-1, 1], [-6, 6])

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  function handleLeave() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className="relative mx-auto w-full max-w-3xl origin-top [perspective:900px]"
      animate={reduce ? undefined : { rotate: [-2.2, 2.2, -2.2], y: [0, 6, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg aria-hidden="true" viewBox="0 0 600 90" className="block h-16 w-full md:h-24" preserveAspectRatio="none">
        <path d="M150 0 C 148 30, 138 60, 120 90" fill="none" stroke="var(--ink)" strokeWidth="3" strokeDasharray="6 3" />
        <path d="M153 0 C 151 30, 141 60, 124 90" fill="none" stroke="#7a5a3a" strokeWidth="2" />
        <path d="M450 0 C 452 30, 462 60, 480 90" fill="none" stroke="var(--ink)" strokeWidth="3" strokeDasharray="6 3" />
        <path d="M447 0 C 449 30, 459 60, 476 90" fill="none" stroke="#7a5a3a" strokeWidth="2" />
        <circle cx="151" cy="4" r="5" fill="var(--ink)" />
        <circle cx="449" cy="4" r="5" fill="var(--ink)" />
      </svg>

      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotate: tilt, rotateX, y: lift }}
        className="wood-grain relative -mt-1 cursor-grab px-6 py-7 text-center md:px-12 md:py-10"
      >
        <div className="pointer-events-none absolute inset-0 border-[3px] border-ink [border-radius:18px_6px_22px_8px/8px_20px_6px_18px] shadow-[4px_6px_0_0_var(--ink)]" />
        <span aria-hidden="true" className="absolute left-4 top-1/2 size-3 -translate-y-1/2 rounded-full bg-ink/80 ring-2 ring-[#c9a46b]/60" />
        <span aria-hidden="true" className="absolute right-4 top-1/2 size-3 -translate-y-1/2 rounded-full bg-ink/80 ring-2 ring-[#c9a46b]/60" />
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#f3dfb8]/80 md:text-sm">
          {'White Star Line · Est. 1912'}
        </p>
        <h1 className="mt-2 text-balance font-serif text-3xl font-black uppercase leading-tight text-[#fbf1dc] [text-shadow:2px_2px_0_var(--ink),-1px_-1px_0_rgb(0_0_0/0.4)] sm:text-4xl md:text-6xl">
          <span className="block">Titanic:</span>
          <span className="block">Float it for Jack</span>
        </h1>
      </motion.div>
    </motion.div>
  )
}
