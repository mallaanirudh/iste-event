"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { WORKBENCH } from "../_data/content";
import { useGame } from "../_lib/game";
import { gsap, prefersReducedMotion } from "../_lib/gsap";
import s from "./workbench.module.css";

/*
 * A 5 x 4 board of redstone wire tiles. Each tile's connections are a bitmask
 * (N=1, E=2, S=4, W=8) drawn in its solved orientation and turned by CSS; `turns`
 * counts quarter turns, so the CSS rotation only ever moves clockwise.
 * Power enters row 1 from the left; the lamp sits to the right of row 2.
 */
const COLS = 5;
const ROWS = 4;
const N = 1;
const E = 2;
const S = 4;
const W = 8;
const IN_ROW = 1;
const OUT_ROW = 2;

/** The solved board, row by row. The path snakes up and back down; the rest are decoys. */
const SOLVED = [
  S | E, W | E, S | E, W | S, W | S,
  W | E, W | S, N | S, N | S, N | W,
  N | S, N | E, W | N, N | E, W | E,
  N | E, W | E, N | E | S, W | S, N | S,
];

/** The wire, in the order the current travels it. The demo turns these tiles in this order. */
const PATH = [5, 6, 11, 12, 7, 2, 3, 8, 13, 14];

/** A fixed opening scramble (the same on server and client). The first tile always starts broken. */
const START = [1, 2, 3, 0, 1, 1, 3, 0, 2, 2, 1, 2, 1, 0, 3, 2, 1, 1, 3, 0];

const isStraight = (m: number) => m === (N | S) || m === (E | W);

/** Quarter turns still needed to put tile `i` back in its solved orientation. */
const needed = (i: number, t: number) => {
  const k = (4 - (((t % 4) + 4) % 4)) % 4;
  return isStraight(SOLVED[i]) ? k % 2 : k;
};

const rotate = (m: number, k: number) => {
  let r = m;
  for (let i = 0; i < ((k % 4) + 4) % 4; i++) r = ((r << 1) | (r >> 3)) & 15;
  return r;
};

const DIRS = [
  { bit: N, opp: S, dr: -1, dc: 0 },
  { bit: E, opp: W, dr: 0, dc: 1 },
  { bit: S, opp: N, dr: 1, dc: 0 },
  { bit: W, opp: E, dr: 0, dc: -1 },
];

/** Which tiles carry current, in the order it reaches them, and whether the lamp is lit. */
function trace(turns: number[]) {
  const mask = (i: number) => rotate(SOLVED[i], turns[i]);
  const start = IN_ROW * COLS;
  const order: number[] = [];
  if (!(mask(start) & W)) return { order, lit: false };
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const i = queue.shift()!;
    order.push(i);
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    for (const d of DIRS) {
      if (!(mask(i) & d.bit)) continue;
      const nr = r + d.dr;
      const nc = c + d.dc;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) continue;
      const j = nr * COLS + nc;
      if (seen.has(j) || !(mask(j) & d.opp)) continue;
      seen.add(j);
      queue.push(j);
    }
  }
  const end = OUT_ROW * COLS + COLS - 1;
  return { order, lit: seen.has(end) && Boolean(mask(end) & E) };
}

const ARM: Record<number, string> = {
  [N]: "M7 0h2v7H7z",
  [E]: "M9 7h7v2H9z",
  [S]: "M7 9h2v7H7z",
  [W]: "M0 7h7v2H0z",
};

function Wire({ mask }: { mask: number }) {
  return (
    <svg className={s.wire} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="6" y="6" width="4" height="4" />
      {[N, E, S, W].map((b) => (mask & b ? <path key={b} d={ARM[b]} /> : null))}
    </svg>
  );
}

const DIR_NAMES: [number, string][] = [
  [N, "up"],
  [E, "right"],
  [S, "down"],
  [W, "left"],
];
const describe = (m: number) => DIR_NAMES.filter(([b]) => m & b).map(([, n]) => n).join(" and ");

type Mode = "idle" | "demo" | "play";

export function Workbench() {
  const { charge } = useGame();
  const [turns, setTurns] = useState<number[]>(START);
  // The latest board, so taps faster than a render never read a stale one.
  const turnsRef = useRef<number[]>(START);
  const [moves, setMoves] = useState(0);
  const [focus, setFocus] = useState(0);
  const [mode, setMode] = useState<Mode>("idle");
  /** The tile the demo's pointer is over, and whether it is pressing. */
  const [hand, setHand] = useState<{ i: number; down: boolean } | null>(null);
  const bench = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const wasLit = useRef(false);

  const { order, lit } = useMemo(() => trace(turns), [turns]);
  const powered = useMemo(() => new Set(order), [order]);

  const celebrate = (path: number[]) => {
    if (prefersReducedMotion() || !board.current) return;
    const els = path.map((i) => tiles.current[i]).filter(Boolean);
    gsap.fromTo(
      els,
      { scale: 1 },
      { scale: 1.12, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.05, overwrite: "auto" },
    );
    const lamp = board.current.querySelector("[data-lamp]");
    if (lamp) gsap.fromTo(lamp, { scale: 1.4 }, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)", delay: path.length * 0.05 });
  };

  const apply = (next: number[]) => {
    turnsRef.current = next;
    setTurns(next);
    const result = trace(next);
    if (result.lit && !wasLit.current) {
      celebrate(result.order);
      charge();
    }
    wasLit.current = result.lit;
  };

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  /*
   * The demo: a pointer glides to each broken tile along the wire, in the order the current
   * travels, and taps it round, so the redstone visibly creeps towards the lamp. With reduced
   * motion the board simply shows its solved state.
   */
  const playDemo = () => {
    clearTimers();
    setMoves(0);
    wasLit.current = false;
    turnsRef.current = START;
    setTurns(START);
    if (prefersReducedMotion()) {
      apply(START.map((t, i) => t + needed(i, t)));
      setMode("idle");
      return;
    }
    setMode("demo");
    let at = 500;
    for (const i of PATH) {
      const k = needed(i, START[i]);
      if (k === 0) continue;
      later(() => setHand({ i, down: false }), at);
      at += 420;
      for (let n = 0; n < k; n++) {
        later(() => {
          setHand({ i, down: true });
          const next = turnsRef.current.slice();
          next[i] += 1;
          apply(next);
        }, at);
        later(() => setHand({ i, down: false }), at + 140);
        at += 300;
      }
    }
    later(() => {
      setHand(null);
      setMode("idle");
    }, at + 500);
  };

  // Play the demo once, the first time the workbench is mostly in view.
  useEffect(() => {
    const el = bench.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        playDemo();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount
  }, []);

  /** Hand the board over: only the wire is scrambled, so it stays a short puzzle. */
  const tryIt = () => {
    clearTimers();
    setHand(null);
    let next: number[];
    do {
      next = turnsRef.current.slice();
      for (const i of PATH) next[i] += 1 + Math.floor(Math.random() * 3);
    } while (trace(next).lit);
    wasLit.current = false;
    turnsRef.current = next;
    setTurns(next);
    setMoves(0);
    setMode("play");
    setFocus(PATH[0]);
  };

  const turn = (i: number) => {
    // A tap during the demo takes over from it.
    if (mode !== "play") {
      clearTimers();
      setHand(null);
      setMode("play");
    }
    const next = turnsRef.current.slice();
    next[i] += 1;
    setMoves((m) => m + 1);
    apply(next);
  };

  // Arrow keys move between tiles (one tab stop for the whole board).
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    const to =
      e.key === "ArrowRight" ? (c < COLS - 1 ? i + 1 : i)
      : e.key === "ArrowLeft" ? (c > 0 ? i - 1 : i)
      : e.key === "ArrowDown" ? (r < ROWS - 1 ? i + COLS : i)
      : e.key === "ArrowUp" ? (r > 0 ? i - COLS : i)
      : null;
    if (to === null) return;
    e.preventDefault();
    setFocus(to);
    tiles.current[to]?.focus();
  };

  // Where the demo pointer sits: the centre of its tile, in the board's coordinates.
  const handTile = hand ? tiles.current[hand.i] : null;
  const handPos = handTile
    ? { x: handTile.offsetLeft + handTile.offsetWidth / 2, y: handTile.offsetTop + handTile.offsetHeight / 2 }
    : null;

  const status =
    lit ? "Lamp on. Circuit complete."
    : mode === "demo" ? WORKBENCH.watching
    : mode === "play" ? WORKBENCH.yourTurn
    : "Lamp off";

  return (
    <div ref={bench} className={s.bench} data-lit={lit ? "" : undefined} data-mode={mode}>
      <div ref={board} className={s.board} role="group" aria-label="Circuit board, 5 columns by 4 rows">
        {Array.from({ length: ROWS }, (_, r) => (
          <div key={r} className={s.row}>
            <span className={s.edge} aria-hidden="true">
              {r === IN_ROW ? <span className={s.source} data-on="" /> : null}
            </span>
            {Array.from({ length: COLS }, (_, c) => {
              const i = r * COLS + c;
              const on = powered.has(i);
              return (
                <button
                  key={i}
                  ref={(el) => {
                    tiles.current[i] = el;
                  }}
                  type="button"
                  className={s.tile}
                  data-on={on ? "" : undefined}
                  data-target={hand?.i === i ? "" : undefined}
                  tabIndex={focus === i ? 0 : -1}
                  onClick={() => turn(i)}
                  onFocus={() => setFocus(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  aria-label={`Row ${r + 1}, column ${c + 1}: wire going ${describe(rotate(SOLVED[i], turns[i]))}${on ? ", powered" : ""}. Turn it.`}
                  data-cursor="Turn"
                >
                  <span className={s.spin} style={{ transform: `rotate(${turns[i] * 90}deg)` }}>
                    <Wire mask={SOLVED[i]} />
                  </span>
                </button>
              );
            })}
            <span className={s.edge} aria-hidden="true">
              {r === OUT_ROW ? <span className={s.lamp} data-lamp="" data-on={lit ? "" : undefined} /> : null}
            </span>
          </div>
        ))}
        {handPos ? (
          <span
            className={s.hand}
            data-down={hand?.down ? "" : undefined}
            style={{ transform: `translate(${handPos.x}px, ${handPos.y}px)` }}
            aria-hidden="true"
          >
            <PointerIcon />
          </span>
        ) : null}
      </div>

      <div className={s.status}>
        <p className={s.state} aria-live="polite">
          <span className={s.dot} aria-hidden="true" />
          {status}
        </p>
        {mode === "play" ? <p className={s.moves}>{moves === 1 ? "1 turn" : `${moves} turns`}</p> : null}
        <div className={s.actions}>
          <button type="button" className={`${s.action} ${s.actionPrimary}`} onClick={tryIt} data-cursor="Play">
            {WORKBENCH.tryIt}
          </button>
          <button type="button" className={s.action} onClick={playDemo} data-cursor="Replay">
            {WORKBENCH.replay}
          </button>
        </div>
      </div>
    </div>
  );
}

/** A pixel hand pointer for the demo, fingertip at the top left. */
function PointerIcon() {
  return (
    <svg className={s.handArt} viewBox="0 0 12 14" shapeRendering="crispEdges">
      <path
        fill="#1a110e"
        d="M3 0h2v1H3zM2 1h1v6H2zM5 1h1v4H5zM6 4h3v1H6zM9 5h1v1H9zM10 6h1v5h-1zM0 6h2v1H0zM0 7h1v2H0zM1 9h1v1H1zM2 10h1v2H2zM3 12h7v1H3zM9 11h1v1H9z"
      />
      <path fill="#fff6d8" d="M3 1h2v5H3zM5 5h4v1H5zM3 6h7v1H3zM1 7h9v2H1zM2 9h8v1H2zM3 10h7v1H3zM3 11h6v1H3z" />
    </svg>
  );
}
