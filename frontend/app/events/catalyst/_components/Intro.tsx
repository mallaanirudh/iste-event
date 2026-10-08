"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../cata.module.css";
import Pour from "./Pour";

type Held = "none" | "wrench" | "flask";
const SUPPLY = 14; // seconds the liquid keeps pouring after the tank breaks
const NEED = 4; // seconds of full-flow stream the flask needs to fill
const RATE = 110; // drops per second at full flow
const START =
  "Everything is dark and the door will not open. Something is glowing in the middle of the room.";
// Inside of the bulb, in the logo's own 200x200 coordinates (liquid is clipped to this).
const BULB =
  "M72 52C100 52 114 74 114 98C114 118 100 128 94 140L92 148L52 148L50 140C44 128 31 118 31 98C31 74 45 52 72 52Z";
const FLASK = "M15 2H25V5H23V19L36 44Q38 50 32 50H8Q2 50 4 44L17 19V5H15Z";
const WRENCH =
  "M8 36 26 18a9 9 0 0 0 12-11l-6 6-5-1-1-5 6-6A9 9 0 0 0 20 14L2 32z";
const SHARDS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 + (i % 3) * 0.2,
    r = 90 + ((i * 37) % 140);
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r + 60, r: (i * 53) % 360 };
});

function FlaskSvg({ liquid }: { liquid?: boolean }) {
  return (
    <svg viewBox="0 0 40 52" width="44" height="57">
      <clipPath id="fc">
        <path d={FLASK} />
      </clipPath>
      {liquid && (
        <g clipPath="url(#fc)">
          <rect className={styles.fillR} x="0" y="18" width="40" height="34" />
        </g>
      )}
      <path
        d={FLASK}
        fill="rgba(190,255,210,.14)"
        stroke="#c9ffd9"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function Intro({
  muted,
  paused,
  onDone,
}: {
  muted: boolean;
  paused: boolean;
  onDone: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const logoEl = useRef<HTMLImageElement>(null);
  const curEl = useRef<HTMLDivElement>(null);
  const dimEl = useRef<HTMLDivElement>(null);
  const tankEl = useRef<HTMLDivElement>(null);
  const mv = useRef(0);
  const G = useRef({
    x: 0,
    y: 0,
    held: "none" as Held,
    broken: false,
    supply: SUPPLY,
    fill: 0,
  });
  const live = useRef({ muted, paused });
  useEffect(() => {
    live.current = { muted, paused };
  }, [muted, paused]);
  const ac = useRef<AudioContext | null>(null);
  const pour = useRef<AudioBufferSourceNode | null>(null);
  const timers = useRef<number[]>([]);

  const [held, setHeld] = useState<Held>("none");
  const [broken, setBroken] = useState(false);
  const [gone, setGone] = useState({ wrench: false, flask: false });
  const [hint, setHint] = useState(START);
  const [toast, setToast] = useState("");
  const [fail, setFail] = useState(false);
  const [done, setDone] = useState(false);

  // ---- sound (tiny synth, only used here) ----
  const ctx = () => {
    if (live.current.muted) return null;
    try {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ac.current ??= new AC();
      if (ac.current.state === "suspended") void ac.current.resume();
      return ac.current;
    } catch {
      return null;
    }
  };
  const tone = (
    f0: number,
    f1: number,
    ms: number,
    vol: number,
    type: OscillatorType = "sine"
  ) => {
    const a = ctx();
    if (!a) return;
    const o = a.createOscillator(),
      g = a.createGain(),
      t = a.currentTime;
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + ms / 1000);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
    o.connect(g);
    g.connect(a.destination);
    o.start(t);
    o.stop(t + ms / 1000 + 0.02);
  };
  const noise = (ms: number, f: number, vol: number, loop = false) => {
    const a = ctx();
    if (!a) return null;
    const b = a.createBuffer(1, a.sampleRate, a.sampleRate),
      d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = a.createBufferSource(),
      bp = a.createBiquadFilter(),
      g = a.createGain(),
      t = a.currentTime;
    s.buffer = b;
    s.loop = loop;
    bp.type = "bandpass";
    bp.frequency.value = f;
    g.gain.setValueAtTime(vol, t);
    if (!loop) g.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
    s.connect(bp);
    bp.connect(g);
    g.connect(a.destination);
    s.start(t);
    if (!loop) s.stop(t + ms / 1000 + 0.05);
    return s;
  };
  const stopPour = () => {
    try {
      pour.current?.stop();
    } catch {
      /* already stopped */
    }
    pour.current = null;
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const say = (s: string) => {
    setToast(s);
    later(() => setToast(""), 2200);
  };
  const hold = (h: Held) => {
    G.current.held = h;
    setHeld(h);
  };

  // Moves the arrow/flask with transform (no layout) and the light with two variables on .dim only.
  const place = (x: number, y: number) => {
    G.current.x = x;
    G.current.y = y;
    if (curEl.current)
      curEl.current.style.transform = `translate(${x}px,${y}px)`;
    dimEl.current?.style.setProperty("--x", `${x}px`);
    dimEl.current?.style.setProperty("--y", `${y}px`);
  };

  useEffect(() => {
    place((root.current?.clientWidth ?? window.innerWidth) * 0.14, (root.current?.clientHeight ?? window.innerHeight) * 0.72);
    const resize = () => place(
      Math.max(16, Math.min(G.current.x, (root.current?.clientWidth ?? window.innerWidth) - 16)),
      Math.max(16, Math.min(G.current.y, (root.current?.clientHeight ?? window.innerHeight) - 16)),
    );
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(mv.current);
      timers.current.forEach(clearTimeout);
      stopPour();
      void ac.current?.close();
    };
  }, []);

  // When the briefing board closes, the arrow goes back to the door instead of jumping to the button.
  useEffect(() => {
    if (!paused) place((root.current?.clientWidth ?? window.innerWidth) * 0.14, (root.current?.clientHeight ?? window.innerHeight) * 0.72);
  }, [paused]);

  // ---- the pour: tank drains, flask fills with drops that land in it ----
  const win = () => {
    setDone(true);
    stopPour();
    tone(523, 523, 150, 0.07);
    later(() => tone(784, 784, 400, 0.07), 160);
    later(onDone, 1500);
  };
  const lose = () => {
    stopPour();
    hold("none");
    setFail(true);
    tone(140, 60, 600, 0.08, "sawtooth");
  };
  const caught = () => {
    const g = G.current;
    g.fill = Math.min(1, g.fill + 1 / (NEED * RATE));
  };

  useEffect(() => {
    if (!broken || done || fail) return;
    let raf = 0,
      last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const g = G.current;
      if (!live.current.paused) {
        g.supply -= dt; // runs 1s past zero so drops already in the air still count
        tankEl.current?.style.setProperty(
          "--lvl",
          String(Math.max(0, g.supply) / SUPPLY)
        );
        curEl.current?.style.setProperty("--fill", String(g.fill));
        if (g.fill >= 1) {
          win();
          return;
        }
        if (g.supply <= -1) {
          lose();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [broken, done, fail]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- actions ----
  const move = (e: React.PointerEvent) => {
    const bounds = root.current?.getBoundingClientRect();
    G.current.x = e.clientX - (bounds?.left ?? 0);
    G.current.y = e.clientY - (bounds?.top ?? 0);
    if (!mv.current)
      mv.current = requestAnimationFrame(() => {
        mv.current = 0;
        place(G.current.x, G.current.y);
      });
  };
  const door = () => {
    tone(90, 60, 170, 0.1, "square");
    later(() => tone(70, 50, 150, 0.09, "square"), 190);
    say("The door is locked.");
  };
  const takeWrench = () => {
    if (G.current.held !== "none") return;
    tone(900, 600, 90, 0.05, "triangle");
    hold("wrench");
    setHint("Now break the glowing ISTE tank with it.");
  };
  const tank = () => {
    const g = G.current;
    if (g.broken) return;
    if (g.held !== "wrench") {
      say("It is sealed. You need something heavy.");
      setHint(
        "Find something heavy to break the tank. Look around in the dark."
      );
      return;
    }
    g.broken = true;
    setBroken(true);
    hold("none");
    setGone((x) => ({ ...x, wrench: true }));
    root.current?.classList.add(styles.quake);
    later(() => root.current?.classList.remove(styles.quake), 600);
    noise(500, 3000, 0.2);
    tone(300, 60, 400, 0.12, "sawtooth");
    pour.current = noise(0, 700, 0.08, true);
    setHint(
      "It is pouring out! Grab the flask and hold it in the stream. Hurry."
    );
  };
  const takeFlask = () => {
    const g = G.current;
    if (!g.broken) {
      say("Nothing to fill it with yet.");
      return;
    }
    if (g.held !== "none") return;
    tone(600, 900, 100, 0.05, "triangle");
    hold("flask");
    setGone((x) => ({ ...x, flask: true }));
    setHint("Keep the flask under the stream until it is full.");
  };
  const restart = () => {
    stopPour();
    timers.current.forEach(clearTimeout);
    timers.current = [];
    Object.assign(G.current, {
      held: "none",
      broken: false,
      supply: SUPPLY,
      fill: 0,
    });
    setHeld("none");
    setBroken(false);
    setGone({ wrench: false, flask: false });
    setFail(false);
    setDone(false);
    setHint(START);
    tankEl.current?.style.setProperty("--lvl", "1");
    curEl.current?.style.setProperty("--fill", "0");
  };

  return (
    <div
      ref={root}
      className={`${styles.intro} ${held === "flask" ? styles.lit : ""} ${
        broken ? styles.brk : ""
      }`}
      onPointerMove={move}
      onPointerDown={move}
    >
      <div className={styles.pipes} aria-hidden="true" />
      <div className={styles.floorL} aria-hidden="true" />
      <button
        type="button"
        className={styles.doorway}
        onClick={door}
        aria-label="Door"
      >
        <i />
        <span>EXIT</span>
      </button>
      {!gone.wrench && (
        <button
          type="button"
          className={styles.itemW}
          onClick={takeWrench}
          aria-label="Wrench"
        >
          <svg viewBox="0 0 40 40" width="54" height="54">
            <path d={WRENCH} fill="#cfd5cf" />
          </svg>
        </button>
      )}
      {!gone.flask && (
        <button
          type="button"
          className={styles.itemF}
          onClick={takeFlask}
          aria-label="Empty flask"
        >
          <FlaskSvg />
        </button>
      )}
      <div ref={dimEl} className={styles.dim} aria-hidden="true" />

      <div ref={tankEl} className={styles.tankWrap}>
        <button
          type="button"
          className={styles.tank}
          onClick={tank}
          aria-label="ISTE tank"
        >
          <svg
            className={styles.liqSvg}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <clipPath id="bulb">
              <path d={BULB} />
            </clipPath>
            <g clipPath="url(#bulb)">
              <rect
                className={styles.liq}
                x="20"
                y="46"
                width="110"
                height="106"
              />
            </g>
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={logoEl}
            className={styles.logo}
            src="/cata/iste.svg"
            alt=""
            draggable={false}
          />
          <svg
            className={styles.crackSvg}
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            {broken && (
              <path d="M72 148 84 126 66 112 80 92" className={styles.crack} />
            )}
          </svg>
        </button>
        {broken &&
          SHARDS.map((s, i) => (
            <i
              key={i}
              className={styles.shard}
              style={
                {
                  "--dx": `${s.dx}px`,
                  "--dy": `${s.dy}px`,
                  "--r": `${s.r}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        {broken && <div className={styles.burst} aria-hidden="true" />}
      </div>

      <Pour
        logo={logoEl}
        catcher={curEl}
        bulb={{ x: 0.36, y: 0.5 }}
        floor={0.86}
        rate={RATE}
        active={broken}
        catching={held === "flask"}
        onCatch={caught}
        flow={() =>
          live.current.paused || G.current.supply <= 0
            ? 0
            : 0.3 + 0.7 * (G.current.supply / SUPPLY)
        }
      />

      <div
        ref={curEl}
        className={`${styles.cur} ${held === "flask" ? styles.curF : ""}`}
        aria-hidden="true"
      >
        {held === "none" && (
          <svg
            className={styles.arrow}
            viewBox="0 0 24 24"
            width="26"
            height="26"
          >
            <path d="M3 2 21 12 12 14 8 22z" fill="#fff" />
          </svg>
        )}
        {held === "wrench" && (
          <svg viewBox="0 0 40 40" width="54" height="54">
            <path d={WRENCH} fill="#e8eee8" />
          </svg>
        )}
        {held === "flask" && <FlaskSvg liquid />}
      </div>

      <p className={styles.introHint} role="status">
        {hint}
      </p>
      {toast && (
        <p className={styles.toast} role="alert">
          {toast}
        </p>
      )}
      <button
        type="button"
        className={`${styles.btn} ${styles.skip}`}
        onClick={onDone}
      >
        Skip intro
      </button>
      {fail && (
        <div className={styles.failBox} role="alertdialog" aria-label="Failed">
          <div>
            <h2>The liquid ran out</h2>
            <p>
              The flask was not full in time and the plant went dark again. Your
              maze stays exactly the same.
            </p>
            <button type="button" className={styles.btn} onClick={restart}>
              Try again
            </button>
          </div>
        </div>
      )}
      {done && <div className={styles.whiteout} aria-hidden="true" />}
    </div>
  );
}
