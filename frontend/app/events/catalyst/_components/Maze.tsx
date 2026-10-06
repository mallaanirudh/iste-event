"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../cata.module.css";
import { BULLETINS, CODE_ORDER, CONTACT, TAUNTS } from "../_data/content";
import { createAudio } from "../_lib/audio";
import { buildMaze, C, H, W } from "../_lib/maze";
import Board from "./Board";
import Intro from "./Intro";
import Locker from "./Locker";
import TallyEmbed from "./TallyEmbed";

const WW = W * C;
const WH = H * C;
const R = 13; // flask radius in px
const HALF_WALL = 4;
const MAX_SPEED = 430; // px/s
const MIN_SPEED = 70;
const GAIN = 3; // how fast speed grows with pointer distance

const center = (c: number) => ({
  x: ((c % W) + 0.5) * C,
  y: (Math.floor(c / W) + 0.5) * C,
});
const px = (c: number) => ({ left: center(c).x, top: center(c).y });
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};
const d = (i: number) => ({ "--i": i } as React.CSSProperties);
const pad = (n: number) => String(n).padStart(2, "0");
const f1 = (n: number) => n.toFixed(1);

// Cobweb geometry: 5 radial strands plus 4 sagging rings, drawn in one corner quadrant.
const L = 90;
const RAYS = [0, 22.5, 45, 67.5, 90].map((a) => (a * Math.PI) / 180);
const WEB_RAYS = RAYS.map(
  (a) => `M0 0L${f1(Math.cos(a) * L)} ${f1(Math.sin(a) * L)}`
).join("");
const WEB_RINGS = [0.28, 0.5, 0.72, 0.94]
  .map((f) =>
    RAYS.slice(1)
      .map((b, i) => {
        const a = RAYS[i],
          m = (a + b) / 2,
          r = L * f,
          q = r * 0.8;
        return `M${f1(Math.cos(a) * r)} ${f1(Math.sin(a) * r)}Q${f1(
          Math.cos(m) * q
        )} ${f1(Math.sin(m) * q)} ${f1(Math.cos(b) * r)} ${f1(
          Math.sin(b) * r
        )}`;
      })
      .join("")
  )
  .join("");
const SPIDER_LEGS =
  "M-2 -1L-7 -4M-2 0L-8 0M-2 1L-7 4M2 -1L7 -4M2 0L8 0M2 1L7 4";

// Everything random lives here. It is built once per page load, in the browser only.
function buildWorld() {
  const seed = Math.floor(Math.random() * 2147483000) + 1;
  const M = buildMaze(seed);
  const SEGS = M.segs.map(([a, b, c, e]) => [a * C, b * C, c * C, e * C]);
  const WALLS = SEGS.map(([a, b, c, e]) => `M${a} ${b}L${c} ${e}`).join("");

  // Sparse chemical trail along the real route.
  const rd = seeded(seed);
  const pts = M.path.map(center);
  const drops: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i],
      b = pts[i + 1],
      horiz = a.y === b.y;
    for (let t = 0; t < 1; t += 64 / C) {
      if (rd() < 0.4) continue;
      const j = (rd() - 0.5) * 14;
      drops.push({
        x: a.x + (b.x - a.x) * t + (horiz ? 0 : j),
        y: a.y + (b.y - a.y) * t + (horiz ? j : 0),
        r: rd() < 0.15 ? 5 + rd() * 3 : 1.6 + rd() * 2.4,
      });
    }
  }

  // Stains, and cobwebs only where two walls really meet.
  const rs = seeded((seed % 2147483646) + 1);
  const stains: {
    x: number;
    y: number;
    rx: number;
    ry: number;
    toxic: boolean;
  }[] = [];
  for (let c = 0; c < W * H; c++) {
    const o = center(c);
    if (rs() < 0.5)
      stains.push({
        x: o.x + (rs() - 0.5) * C * 0.7,
        y: o.y + (rs() - 0.5) * C * 0.7,
        rx: 14 + rs() * 46,
        ry: 10 + rs() * 30,
        toxic: rs() < 0.3,
      });
  }
  const HW = new Set<string>(),
    VW = new Set<string>();
  for (const [x1, y1, x2, y2] of SEGS) {
    if (y1 === y2)
      for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x += C)
        HW.add(`${x / C},${y1 / C}`);
    else
      for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y += C)
        VW.add(`${x1 / C},${y / C}`);
  }
  const webs: {
    x: number;
    y: number;
    sx: number;
    sy: number;
    k: number;
    sp: boolean;
  }[] = [];
  for (let i = 0; i <= W; i++)
    for (let j = 0; j <= H; j++)
      for (const ex of [-1, 1])
        for (const ey of [-1, 1]) {
          if (
            HW.has(`${ex > 0 ? i : i - 1},${j}`) &&
            VW.has(`${i},${ey > 0 ? j : j - 1}`) &&
            rs() < 0.2
          ) {
            webs.push({
              x: i * C,
              y: j * C,
              sx: ex,
              sy: ey,
              k: 0.65 + rs() * 0.6,
              sp: rs() < 0.25,
            });
          }
        }

  // The lock code: one random digit per fragment bulletin.
  const code = CODE_ORDER.map(() => Math.floor(Math.random() * 10));
  if (Math.max(...code) === 0) code[0] = 1;

  return { M, SEGS, WALLS, drops, stains, webs, code };
}
type World = ReturnType<typeof buildWorld>;

const bulletinCell = (w: World, i: number) =>
  w.M.path[
    Math.round(((i + 1) * (w.M.path.length - 1)) / (BULLETINS.length + 1))
  ];

function hit(segs: number[][], x: number, y: number) {
  const lim = (R + HALF_WALL) * (R + HALF_WALL);
  for (const [x1, y1, x2, y2] of segs) {
    const cx = clamp(x, Math.min(x1, x2), Math.max(x1, x2));
    const cy = clamp(y, Math.min(y1, y2), Math.max(y1, y2));
    const dx = x - cx,
      dy = y - cy;
    if (dx * dx + dy * dy < lim) return true;
  }
  return false;
}

type Open =
  | { kind: "bulletin"; id: string }
  | { kind: "dead"; n: number }
  | { kind: "locker" }
  | null;
type Fly = { t: string; x0: number; y0: number; x1: number; y1: number } | null;

export default function Maze() {
  const stage = useRef<HTMLDivElement>(null);
  const worldEl = useRef<HTMLDivElement>(null);
  const flaskEl = useRef<HTMLDivElement>(null);
  const flaskSvg = useRef<SVGSVGElement>(null);
  const shadeEl = useRef<HTMLDivElement>(null);
  const flashEl = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const fragEl = useRef<HTMLParagraphElement>(null);
  const slots = useRef<(HTMLElement | null)[]>([]);
  const rec = useRef<HTMLSpanElement>(null);
  const secs = useRef(0);
  const au = useRef<ReturnType<typeof createAudio> | null>(null);
  const closeRef = useRef<() => void>(() => {});
  const st = useRef({
    fx: C / 2,
    fy: C / 2,
    cx: 0,
    cy: 0,
    px: C / 2,
    py: C / 2,
    lock: false,
    tilt: 0,
    zx: C / 2,
    zy: C / 2,
    grace: 7,
  });

  const [world, setWorld] = useState<World | null>(null);
  const [open, setOpen] = useState<Open>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [seen, setSeen] = useState<string[]>([]);
  const [fly, setFly] = useState<Fly>(null);
  const [plain, setPlain] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [muted, setMuted] = useState(false);
  const [phase, setPhase] = useState<"intro" | "maze">("intro");
  const [boardOpen, setBoardOpen] = useState(true);

  // New random maze and code on every page load (browser only, so no hydration mismatch).
  // The intro restarts do not touch this, so the maze and code stay the same.
  useEffect(() => {
    setWorld(buildWorld());
  }, []);
  useEffect(() => {
    au.current = createAudio();
    return () => au.current?.stop();
  }, []);
  useEffect(() => {
    au.current?.mute(muted || plain || unlocked);
  }, [muted, plain, unlocked]);
  useEffect(() => {
    const locked = open !== null || boardOpen;
    const g = st.current;
    g.lock = locked;
    // when the board or a popup closes, park the aim on the flask so it doesn't run to where the mouse was
    if (!locked) {
      g.px = g.fx - g.cx;
      g.py = g.fy - g.cy;
    }
  }, [open, boardOpen]);
  useEffect(() => {
    if (unlocked && !muted) au.current?.victory();
  }, [unlocked]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  useEffect(() => {
    const el = card.current;
    if (!open || !el) return;
    el.focus();
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${r.left + r.width / 2}px`);
    el.style.setProperty("--my", `${r.top + r.height / 3}px`);
  }, [open]);

  // REC timer in the HUD (runs only in the maze).
  useEffect(() => {
    if (!world || plain || phase !== "maze") return;
    const id = window.setInterval(() => {
      secs.current += 1;
      const s = secs.current;
      if (rec.current)
        rec.current.textContent = `${pad(Math.floor(s / 3600))}:${pad(
          Math.floor(s / 60) % 60
        )}:${pad(s % 60)}`;
    }, 1000);
    return () => clearInterval(id);
  }, [world, plain, phase]);

  // Game loop: flask, wall sliding, tilt, camera, the follower, heartbeat and sound.
  useEffect(() => {
    const el = stage.current,
      wd = worldEl.current,
      fl = flaskEl.current,
      z = shadeEl.current;
    if (!world || !el || !wd || !fl || !z) return;
    const { SEGS } = world;
    const lk = center(world.M.end);
    const respawn = [center(0), lk];
    let raf = 0,
      last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const g = st.current,
        vw = el.clientWidth,
        vh = el.clientHeight;
      const ox = g.fx,
        oy = g.fy;

      if (!g.lock) {
        const dx = g.cx + g.px - g.fx,
          dy = g.cy + g.py - g.fy,
          dist = Math.hypot(dx, dy);
        if (dist > 1) {
          const step = Math.min(
            dist,
            Math.min(MAX_SPEED, Math.max(MIN_SPEED, dist * GAIN)) * dt
          );
          const n = Math.ceil(step / 6),
            sx = (dx / dist) * (step / n),
            sy = (dy / dist) * (step / n);
          for (let i = 0; i < n; i++) {
            if (!hit(SEGS, g.fx + sx, g.fy)) g.fx += sx;
            if (!hit(SEGS, g.fx, g.fy + sy)) g.fy += sy;
          }
        }
      }
      const speed = dt > 0 ? Math.hypot(g.fx - ox, g.fy - oy) / dt : 0;

      // Tilt toward the direction of travel.
      if (dt > 0) {
        const vx = (g.fx - ox) / dt;
        const target = clamp(vx / 18, -32, 32) + Math.sin(now / 420) * 1.8;
        g.tilt += (target - g.tilt) * Math.min(1, dt * 9);
        flaskSvg.current?.style.setProperty(
          "rotate",
          `${g.tilt.toFixed(2)}deg`
        );
      }

      // The follower: slow while you move, fast while you stand still. Ignores walls.
      g.grace = Math.max(0, g.grace - dt);
      let zd = Infinity;
      if (g.grace === 0) {
        const zx = g.fx - g.zx,
          zy = g.fy - g.zy;
        zd = Math.hypot(zx, zy);
        if (!g.lock) {
          const v = speed > 30 ? 38 : 90;
          if (zd > 1) {
            g.zx += (zx / zd) * v * dt;
            g.zy += (zy / zd) * v * dt;
          }
          if (zd < 32) {
            g.grace = 3;
            const p = respawn.reduce((a, b) =>
              Math.hypot(a.x - g.fx, a.y - g.fy) >
              Math.hypot(b.x - g.fx, b.y - g.fy)
                ? a
                : b
            );
            g.zx = p.x;
            g.zy = p.y;
            au.current?.hurt();
            const f = flashEl.current;
            if (f) {
              f.classList.remove(styles.hit);
              void f.offsetWidth;
              f.classList.add(styles.hit);
            }
          }
        }
      }
      z.style.visibility = g.grace > 0 ? "hidden" : "visible";
      z.style.transform = `translate(${g.zx}px,${g.zy}px)`;

      // Danger: close to the locker or close to the follower. Drives the red pulse, heartbeat and Geiger.
      const near = clamp(
        1 - Math.hypot(lk.x - g.fx, lk.y - g.fy) / (C * 3.5),
        0,
        1
      );
      const fear = Math.max(
        near * near,
        g.grace > 0 ? 0 : clamp(1 - zd / (C * 1.5), 0, 1)
      );
      el.style.setProperty("--heat", fear.toFixed(3));
      au.current?.update(dt, near, fear);

      const k = Math.min(1, dt * 6);
      g.cx += (clamp(g.fx - vw / 2, 0, Math.max(0, WW - vw)) - g.cx) * k;
      g.cy += (clamp(g.fy - vh / 2, 0, Math.max(0, WH - vh)) - g.cy) * k;
      wd.style.transform = `translate(${-g.cx}px,${-g.cy}px)`;
      fl.style.transform = `translate(${g.fx - g.cx}px,${g.fy - g.cy}px)`;
      el.style.setProperty("--x", `${g.fx - g.cx}px`);
      el.style.setProperty("--y", `${g.fy - g.cy}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [plain, world, phase]);

  const aim = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    st.current.px = e.clientX - r.left;
    st.current.py = e.clientY - r.top;
  };
  const glowText = (e: React.PointerEvent) => {
    card.current?.style.setProperty("--mx", `${e.clientX}px`);
    card.current?.style.setProperty("--my", `${e.clientY}px`);
  };

  // Keyboard users: focusing a sign walks the flask to it.
  const warp = (c: number) => {
    const g = st.current,
      p = center(c),
      el = stage.current;
    if (!el) return;
    g.fx = p.x;
    g.fy = p.y;
    g.cx = clamp(p.x - el.clientWidth / 2, 0, Math.max(0, WW - el.clientWidth));
    g.cy = clamp(
      p.y - el.clientHeight / 2,
      0,
      Math.max(0, WH - el.clientHeight)
    );
    g.px = p.x - g.cx;
    g.py = p.y - g.cy;
  };
  // You can only read a sign when the flask is actually standing at it.
  const near = (c: number) => {
    const p = center(c);
    return Math.hypot(p.x - st.current.fx, p.y - st.current.fy) < C * 0.55;
  };
  const show = (e: React.MouseEvent<HTMLElement>, c: number, o: Open) => {
    if (!near(c)) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: r.left + r.width / 2 - window.innerWidth / 2,
      y: r.top + r.height / 2 - window.innerHeight / 2,
    });
    setOpen(o);
  };

  // Closing a bulletin sends its digit flying into the tray.
  const close = () => {
    if (
      open?.kind === "bulletin" &&
      world &&
      CODE_ORDER.includes(open.id) &&
      !seen.includes(open.id) &&
      !fly
    ) {
      const id = open.id,
        i = CODE_ORDER.indexOf(id);
      const land = () => setSeen((s) => (s.includes(id) ? s : [...s, id]));
      const a = fragEl.current?.getBoundingClientRect(),
        b = slots.current[i]?.getBoundingClientRect();
      if (
        a &&
        b &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setFly({
          t: String(world.code[i]),
          x0: a.left + a.width / 2,
          y0: a.top + a.height / 2,
          x1: b.left + b.width / 2,
          y1: b.top + b.height / 2,
        });
        window.setTimeout(() => {
          land();
          setFly(null);
        }, 950);
      } else land();
    }
    setOpen(null);
  };
  closeRef.current = close;

  if (!world) return <div className={styles.stage} />;

  const frags = CODE_ORDER.map((id, i) =>
    seen.includes(id) ? String(world.code[i]) : "?"
  );

  if (plain) {
    return (
      <main className={styles.pg}>
        <div className={styles.pgBar}>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setPlain(false)}
          >
            ← Back to the maze
          </button>
          <a href="#register" className={`${styles.btn} ${styles.pgGo}`}>
            Register ↓
          </a>
        </div>

        <header className={styles.pgHero}>
          <p className={styles.pgPre}>ISTE Catalyst presents</p>
          <h1>LABLOCK: Escape the Lab</h1>
          <p className={styles.pgLede}>
            A Chemical Engineering escape room. Diagnose a simulated process
            emergency, stabilise the plant and find the shutdown code.
          </p>
          <a href="#register" className={styles.pgCta}>
            Register your team
          </a>
        </header>

        <div className={styles.pgBody}>
          <ul className={styles.pgFacts}>
            <li>
              <b>Date</b>
              <span>Fri, 16 Oct 2026</span>
            </li>
            <li>
              <b>Team size</b>
              <span>2–3 people</span>
            </li>
            <li>
              <b>Open to</b>
              <span>B.Tech 1st years</span>
            </li>
            <li>
              <b>Duration</b>
              <span>~120 minutes</span>
            </li>
          </ul>

          <ol className={styles.pgFlow} aria-label="How the event runs">
            <li>
              <i>1</i>Briefing
            </li>
            <li>
              <i>2</i>Round 1<small>Process Diagnosis</small>
            </li>
            <li>
              <i>3</i>Round 2<small>Process Stabilization</small>
            </li>
            <li>
              <i>4</i>Results
            </li>
          </ol>

          <div className={styles.pgGrid}>
            {BULLETINS.map((b, i) => (
              <section key={b.id} className={styles.pgCard}>
                <span className={styles.pgNum}>{pad(i + 1)}</span>
                <h2>{b.title}</h2>
                {b.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                {b.list && (
                  <ul>
                    {b.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className={styles.pgContact}>{CONTACT}</p>

          <section id="register" className={styles.pgReg}>
            <div className={styles.pgRegHead}>
              <span>★ Golden ticket ★</span>
              <span>Admit one team</span>
            </div>
            <h2>Register your team</h2>
            <div className={styles.formWrap}>
              <TallyEmbed />
            </div>
          </section>
        </div>
      </main>
    );
  }

  const board = (
    <Board
      open={boardOpen}
      onToggle={() => {
        au.current?.start();
        setBoardOpen((o) => !o);
      }}
    />
  );
  if (phase === "intro") {
    return (
      <>
        <Intro
          muted={muted}
          paused={boardOpen}
          onDone={() => setPhase("maze")}
        />
        {board}
      </>
    );
  }

  const b =
    open?.kind === "bulletin"
      ? BULLETINS.find((x) => x.id === open.id)
      : undefined;
  const digit = b
    ? CODE_ORDER.includes(b.id)
      ? String(world.code[CODE_ORDER.indexOf(b.id)])
      : b.fragment
    : undefined;
  const golden = open?.kind === "locker" && unlocked;
  const barText =
    open?.kind === "bulletin"
      ? `Incident log · ${pad(
          BULLETINS.findIndex((x) => x.id === open.id) + 1
        )}`
      : open?.kind === "dead"
      ? "Warning · route invalid"
      : golden
      ? "Golden ticket · issued"
      : "Locker control";

  return (
    <div
      ref={stage}
      className={`${styles.stage} ${styles.arrive}`}
      onPointerMove={aim}
      onPointerDown={(e) => {
        aim(e);
        au.current?.start();
      }}
    >
      <div
        ref={worldEl}
        className={styles.world}
        style={{ width: WW, height: WH }}
      >
        <svg
          width={WW}
          height={WH}
          viewBox={`0 0 ${WW} ${WH}`}
          className={styles.maze}
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="drop">
              <stop offset="0" stopColor="#eafff0" stopOpacity=".9" />
              <stop offset=".55" stopColor="#7dffa2" stopOpacity=".55" />
              <stop offset="1" stopColor="#7dffa2" stopOpacity="0" />
            </radialGradient>
          </defs>
          {world.stains.map((s, i) => (
            <ellipse
              key={i}
              cx={s.x}
              cy={s.y}
              rx={s.rx}
              ry={s.ry}
              fill={s.toxic ? "#2a7a46" : "#2a1c08"}
              opacity={s.toxic ? 0.28 : 0.55}
            />
          ))}
          {world.M.vents.map((v) => {
            const o = center(v.c);
            return (
              <g
                key={v.c}
                className={styles.grate}
                transform={`translate(${o.x - 17} ${o.y - 17})`}
              >
                <rect width="34" height="34" />
                <path d="M6 9H28M6 17H28M6 25H28" />
              </g>
            );
          })}
          {world.drops.map((dr, i) => (
            <circle
              key={i}
              cx={dr.x}
              cy={dr.y}
              r={dr.r}
              fill="url(#drop)"
              opacity=".26"
            />
          ))}
          <path
            d={world.WALLS}
            className={styles.wallR}
            transform="translate(-2 0)"
          />
          <path
            d={world.WALLS}
            className={styles.wallC}
            transform="translate(2 0)"
          />
          <path d={world.WALLS} className={styles.walls} />
          {world.webs.map((w, i) => (
            <g
              key={i}
              transform={`translate(${w.x} ${w.y}) scale(${w.sx * w.k} ${
                w.sy * w.k
              })`}
            >
              <path d={WEB_RAYS} className={styles.web} />
              <path d={WEB_RINGS} className={styles.webr} />
              {w.sp && (
                <g className={styles.spider} transform="translate(34 34)">
                  <circle r="3" />
                  <path d={SPIDER_LEGS} />
                </g>
              )}
            </g>
          ))}
        </svg>

        {BULLETINS.map((bl, i) => (
          <button
            key={bl.id}
            type="button"
            className={styles.pin}
            style={px(bulletinCell(world, i))}
            aria-label={bl.title}
            onFocus={() => warp(bulletinCell(world, i))}
            onClick={(e) =>
              show(e, bulletinCell(world, i), { kind: "bulletin", id: bl.id })
            }
          >
            !
          </button>
        ))}
        {world.M.dead.map((c, n) => (
          <button
            key={c}
            type="button"
            className={`${styles.pin} ${styles.dead}`}
            style={px(c)}
            aria-label="Dead end sign"
            onFocus={() => warp(c)}
            onClick={(e) => show(e, c, { kind: "dead", n })}
          >
            ?
          </button>
        ))}
        <button
          type="button"
          className={styles.locker}
          style={px(world.M.end)}
          aria-label="The locker"
          onFocus={() => warp(world.M.end)}
          onClick={(e) => show(e, world.M.end, { kind: "locker" })}
        >
          EXIT
          <br />
          LOCKER
        </button>
        <div ref={shadeEl} className={styles.shade} aria-hidden="true" />
        {world.M.vents.map((v) => (
          <div
            key={v.c}
            className={styles.vent}
            aria-hidden="true"
            style={{
              ...px(v.c),
              animationDelay: `${v.delay}s`,
              animationDuration: `${v.dur}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.fog} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.dark} aria-hidden="true" />
      <div className={styles.pulse} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.cctv} aria-hidden="true" />
      <div ref={flashEl} className={styles.flash} aria-hidden="true" />

      {board}

      <header className={styles.hud}>
        <Link href="/" className={styles.brand}>
          LABLOCK · Escape the Lab
        </Link>
        <span className={styles.recd} aria-hidden="true">
          <i />
          REC <span ref={rec}>00:00:00</span>
        </span>
        <div className={styles.tray} aria-label="Code fragments found">
          Fragments:{" "}
          {frags.map((f, i) => (
            <b
              key={i}
              ref={(n) => {
                slots.current[i] = n;
              }}
              className={seen.includes(CODE_ORDER[i]) ? styles.got : ""}
            >
              {f}
            </b>
          ))}
        </div>
        <div className={styles.tools}>
          <button
            type="button"
            className={styles.btn}
            aria-pressed={!(muted || unlocked)}
            onClick={() => setMuted((m) => !m)}
          >
            Sound: {muted || unlocked ? "off" : "on"}
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setPlain(true)}
          >
            Skip the maze
          </button>
        </div>
      </header>
      <p className={styles.hint}>
        Guide the flask with your cursor. Walls stop you. Push toward the screen
        edge to keep walking. Don&apos;t stand still.
      </p>

      <div ref={flaskEl} className={styles.flask} aria-hidden="true">
        <svg ref={flaskSvg} viewBox="0 0 40 52" width="44" height="57">
          <path
            d="M15 2H25V5H23V19L36 44Q38 50 32 50H8Q2 50 4 44L17 19V5H15Z"
            fill="rgba(190,255,210,.16)"
            stroke="#c9ffd9"
            strokeWidth="2"
          />
          <path d="M8 36H32L36 44Q38 50 32 50H8Q2 50 4 44Z" fill="#5dff8e" />
          <circle cx="16" cy="43" r="2" fill="#eaffef" />
          <circle cx="24" cy="40" r="1.4" fill="#eaffef" />
        </svg>
      </div>

      {fly && (
        <div
          className={styles.fly}
          aria-hidden="true"
          style={
            {
              "--x0": `${fly.x0}px`,
              "--y0": `${fly.y0}px`,
              "--x1": `${fly.x1}px`,
              "--y1": `${fly.y1}px`,
            } as React.CSSProperties
          }
        >
          {fly.t}
        </div>
      )}

      {open && (
        <div
          className={styles.backdrop}
          onClick={close}
          onPointerMove={glowText}
        >
          <div
            ref={card}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={
              b?.title ??
              (open.kind === "dead"
                ? "Dead end"
                : golden
                ? "Golden ticket"
                : "The locker")
            }
            className={`${styles.card} ${
              open.kind === "dead" ? styles.bad : ""
            } ${golden ? styles.gold : ""}`}
            style={
              {
                "--ox": `${origin.x}px`,
                "--oy": `${origin.y}px`,
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.tape} aria-hidden="true" />
            <button
              type="button"
              className={styles.x}
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
            <div className={styles.bar} aria-hidden="true">
              <i />
              {barText}
              <span>REC</span>
            </div>
            {b && (
              <>
                <h2>{b.title}</h2>
                {b.lines.map((l, i) => (
                  <p key={l} style={d(i + 1)}>
                    {l}
                  </p>
                ))}
                {b.list && (
                  <ul>
                    {b.list.map((l, i) => (
                      <li key={l} style={d(b.lines.length + i + 1)}>
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
                {digit && (
                  <p ref={fragEl} className={styles.frag}>
                    Code fragment: {digit}
                  </p>
                )}
              </>
            )}
            {open.kind === "dead" && (
              <>
                <h2>Dead end</h2>
                {/* TODO: put the dead-end meme image in this box (save it in public/cata/ and use next/image). */}
                <div className={styles.imgSlot}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/cata/images.jpg"
                    alt="A meme about reaching a dead end"
                  />
                </div>
                <p style={d(1)}>{TAUNTS[open.n % TAUNTS.length]}</p>
              </>
            )}
            {open.kind === "locker" &&
              (unlocked ? (
                <>
                  <h2>Golden ticket</h2>
                  <p style={d(1)}>
                    The vault is open, and one golden ticket was inside. It
                    admits one team to LABLOCK on Friday, 16 October 2026.
                  </p>
                  <div className={styles.ticket}>
                    <div className={styles.tkHead}>
                      <span>★ Golden ticket ★</span>
                      <span>Admit one team</span>
                    </div>
                    <div className={styles.formWrap}>
                      <TallyEmbed />
                    </div>
                  </div>
                </>
              ) : (
                <Locker
                  code={world.code.join("")}
                  onOpen={() => setUnlocked(true)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
