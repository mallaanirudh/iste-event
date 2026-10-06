'use client'

import { useEffect, useRef } from 'react'

type Streak = {
  x: number
  y: number
  length: number
  speed: number
  width: number
  color: string
  alpha: number
}

const COLORS = ['#FF1801', '#00E5FF', '#FFD000', '#FFFFFF']

export function SpeedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1
    let streaks: Streak[] = []
    let frame = 0
    let boost = 0
    let lastScrollY = window.scrollY
    let scrollOffset = 0

    const makeStreak = (randomX: boolean): Streak => {
      const isAccent = Math.random() < 0.28
      return {
        x: randomX ? Math.random() * width : -Math.random() * width * 0.5,
        y: Math.random() * height,
        length: 40 + Math.random() * 220,
        speed: 2 + Math.random() * 6,
        width: Math.random() < 0.15 ? 2 : 1,
        color: isAccent ? COLORS[Math.floor(Math.random() * 3)] : COLORS[3],
        alpha: isAccent ? 0.35 + Math.random() * 0.35 : 0.06 + Math.random() * 0.12,
      }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((width * height) / 9000)
      streaks = Array.from({ length: Math.min(count, 220) }, () => makeStreak(true))
    }

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      boost = Math.min(boost + Math.abs(delta) * 0.08, 18)
      scrollOffset += delta * 0.25
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      boost *= 0.94
      const drift = scrollOffset
      scrollOffset *= 0.9

      for (const s of streaks) {
        const velocity = s.speed + boost * (s.speed / 4)
        s.x += velocity
        s.y -= drift * (s.speed / 8)
        if (s.y < -10) s.y = height + 10
        if (s.y > height + 10) s.y = -10
        if (s.x - s.length > width) {
          Object.assign(s, makeStreak(false))
        }

        const stretch = s.length * (1 + boost * 0.06)
        const grad = ctx.createLinearGradient(s.x - stretch, s.y, s.x, s.y)
        grad.addColorStop(0, 'rgba(0,0,0,0)')
        grad.addColorStop(1, s.color)
        ctx.globalAlpha = s.alpha
        ctx.strokeStyle = grad
        ctx.lineWidth = s.width
        ctx.beginPath()
        ctx.moveTo(s.x - stretch, s.y)
        ctx.lineTo(s.x, s.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduceMotion) {
      boost = 0
      for (const s of streaks) s.speed = 0
      draw()
      cancelAnimationFrame(frame)
    } else {
      window.addEventListener('scroll', onScroll, { passive: true })
      frame = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-asphalt">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="halftone absolute inset-0 text-white/[0.035]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,#0B0E14_85%)]" />
    </div>
  )
}
