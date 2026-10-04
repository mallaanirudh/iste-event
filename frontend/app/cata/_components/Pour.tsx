"use client";
import { useEffect, useRef } from "react";

type Props = {
  logo: React.RefObject<HTMLElement | null>;
  catcher: React.RefObject<HTMLElement | null>;
  bulb?: { x: number; y: number }; // pour point as a fraction of the logo box
  floor?: number;                  // floor line as a fraction of viewport height
  active: boolean;                 // tank broken
  catching: boolean;               // flask is in hand
  flow: () => number;              // 0..1, how hard it is pouring right now
  rate?: number;                   // drops per second at flow 1
  onCatch: () => void;             // one call per drop that lands in the flask
  debug?: boolean;
};

type Drop = { x: number; y: number; vx: number; vy: number; r: number; s: boolean };
type Ring = { x: number; t: number };

export default function Pour({ logo, catcher, bulb = { x: 0.36, y: 0.5 }, floor = 0.86, active, catching, flow, rate = 110, onCatch, debug }: Props) {
  const cv = useRef<HTMLCanvasElement>(null);
  const live = useRef({ active, catching, flow, onCatch });
  live.current = { active, catching, flow, onCatch };

  useEffect(() => {
    const c = cv.current, ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    let w = 0, h = 0;
    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);

    // Glow sprite, drawn once (much cheaper than shadowBlur).
    const glow = document.createElement("canvas");
    glow.width = glow.height = 32;
    const gx = glow.getContext("2d")!;
    const gr = gx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, "rgba(220,255,230,.9)");
    gr.addColorStop(0.4, "rgba(93,255,142,.5)");
    gr.addColorStop(1, "rgba(93,255,142,0)");
    gx.fillStyle = gr; gx.fillRect(0, 0, 32, 32);

    const drops: Drop[] = [], rings: Ring[] = [];
    let puddle = 0, puddleX = w / 2, acc = 0, raf = 0, wasIdle = false, last = performance.now();
    const G = 1500;

    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const L = live.current;

      // Nothing to draw: skip the frame entirely.
      const idle = !L.active && !drops.length && !rings.length && puddle <= 0 && !debug;
      if (idle) {
        if (!wasIdle) ctx.clearRect(0, 0, w, h);
        wasIdle = true;
        raf = requestAnimationFrame(tick);
        return;
      }
      wasIdle = false;

      const lr = logo.current?.getBoundingClientRect();
      const sx = lr ? lr.left + lr.width * bulb.x : w / 2;
      const sy = lr ? lr.top + lr.height * bulb.y : h / 3;
      const fy = h * floor;
      const cr = L.catching ? catcher.current?.getBoundingClientRect() : undefined;

      if (L.active) {
        acc += dt * rate * L.flow();
        while (acc >= 1 && drops.length < 400) {
          acc -= 1;
          drops.push({ x: sx + (Math.random() - 0.5) * 6, y: sy, vx: (Math.random() - 0.5) * 16, vy: Math.random() * 60, r: 2 + Math.random() * 2.2, s: false });
        }
        puddleX = sx;
      } else {
        acc = 0;
        puddle = Math.max(0, puddle - dt * 40);
      }

      ctx.clearRect(0, 0, w, h);

      if (puddle > 0) {
        ctx.fillStyle = "rgba(60,220,110,.35)";
        ctx.beginPath(); ctx.ellipse(puddleX, fy + 4, puddle, puddle * 0.14, 0, 0, 6.283); ctx.fill();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(glow, puddleX - puddle * 1.2, fy - puddle * 0.5, puddle * 2.4, puddle);
        ctx.globalAlpha = 1;
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.t += dt / 0.8;
        if (r.t >= 1) { rings.splice(i, 1); continue; }
        const rx = 8 + r.t * 46;
        ctx.strokeStyle = `rgba(150,255,185,${(1 - r.t) * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(r.x, fy + 4, rx, rx * 0.15, 0, 0, 6.283); ctx.stroke();
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.vy += G * dt; d.x += d.vx * dt; d.y += d.vy * dt;

        // Landed in the flask's mouth.
        if (cr && !d.s && d.y > cr.top + cr.height * 0.1 && d.y < cr.top + cr.height * 0.7 && d.x > cr.left + cr.width * 0.2 && d.x < cr.right - cr.width * 0.2) {
          drops.splice(i, 1);
          L.onCatch();
          continue;
        }

        // Hit the floor: splash, ripple, puddle grows.
        if (d.y >= fy) {
          if (!d.s) {
            const n = 4 + Math.floor(Math.random() * 4);
            for (let k = 0; k < n && drops.length < 400; k++) {
              const dir = Math.random() < 0.5 ? -1 : 1;
              drops.push({ x: d.x, y: fy - 1, vx: dir * (60 + Math.random() * 170), vy: -(120 + Math.random() * 260), r: 0.8 + Math.random() * 1.2, s: true });
            }
            if (Math.random() < 0.35 && rings.length < 6) rings.push({ x: d.x, t: 0 });
            puddle = Math.min(150, puddle + 0.6);
          }
          drops.splice(i, 1);
          continue;
        }

        // Stretch each drop along its velocity so it reads as liquid, not a dot.
        const len = d.r + Math.min(Math.hypot(d.vx, d.vy) * 0.018, 14);
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(Math.atan2(d.vy, d.vx) - Math.PI / 2);
        ctx.fillStyle = "rgba(93,255,142,.92)";
        ctx.beginPath(); ctx.ellipse(0, 0, d.r, len, 0, 0, 6.283); ctx.fill();
        ctx.restore();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(glow, d.x - d.r * 4, d.y - d.r * 4, d.r * 8, d.r * 8);
        ctx.globalAlpha = 1;
      }

      if (debug) { ctx.fillStyle = "red"; ctx.fillRect(sx - 3, sy - 3, 6, 6); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", fit); };
  }, [logo, catcher, bulb.x, bulb.y, floor, rate, debug]);

  return <canvas ref={cv} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }} />;
}