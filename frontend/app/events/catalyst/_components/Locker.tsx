"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../cata.module.css";

export default function Locker({ code, onOpen }: { code: string; onOpen: () => void }) {
  const n = code.length;
  const [dig, setDig] = useState<number[]>(() => Array(n).fill(0));
  const [dir, setDir] = useState<number[]>(() => Array(n).fill(1));
  const [state, setState] = useState<"idle" | "bad" | "good">("idle");
  const [tries, setTries] = useState(0);
  const ac = useRef<AudioContext | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  const sfx = (f: number, ms: number, type: OscillatorType = "square", vol = 0.04) => {
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ac.current ??= new AC();
      const a = ac.current, o = a.createOscillator(), g = a.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(vol, a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + ms / 1000);
      o.connect(g); g.connect(a.destination);
      o.start(); o.stop(a.currentTime + ms / 1000);
    } catch { /* no audio, no problem */ }
  };

  const turn = (i: number, by: number) => {
    if (state === "good") return;
    setDir((p) => p.map((v, j) => (j === i ? by : v)));
    setDig((p) => p.map((v, j) => (j === i ? (v + by + 10) % 10 : v)));
    sfx(380 + Math.random() * 80, 40);
  };

  const onKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") { e.preventDefault(); turn(i, 1); }
    else if (e.key === "ArrowDown") { e.preventDefault(); turn(i, -1); }
    else if (/^[0-9]$/.test(e.key)) {
      setDir((p) => p.map((v, j) => (j === i ? 1 : v)));
      setDig((p) => p.map((v, j) => (j === i ? Number(e.key) : v)));
      sfx(420, 40);
    }
  };

  const tryOpen = () => {
    if (state !== "idle") return;
    if (dig.join("") === code) {
      setState("good");
      sfx(523, 120, "sine", 0.06);
      later(() => sfx(784, 280, "sine", 0.06), 140);
      later(onOpen, 1300);
    } else {
      setState("bad");
      setTries((t) => t + 1);
      sfx(110, 280, "sawtooth", 0.05);
      later(() => setState("idle"), 700);
    }
  };

  const cls = state === "bad" ? styles.denied : state === "good" ? styles.granted : "";
  const msg =
    state === "good" ? "ACCESS GRANTED"
    : state === "bad" ? `ACCESS DENIED · attempt ${tries}`
    : tries >= 3 ? "Hint: the code fragments are collected in the tray, top right."
    : `Enter the ${n}-digit code.`;

  return (
    <div>
      <h2>The locker</h2>
      <p>{n} dials. The fragments you collected are the combination.</p>
      <div className={`${styles.lockbox} ${cls}`}>
        <div className={styles.leds} aria-hidden="true">{dig.map((_, i) => <i key={i} className={styles.led} />)}</div>
        <div className={styles.dials}>
          {dig.map((v, i) => (
            <div key={i} className={styles.dial}>
              <button type="button" className={styles.turn} onClick={() => turn(i, 1)} aria-label={`Dial ${i + 1} up`}>▲</button>
              <div className={styles.digit} role="spinbutton" tabIndex={0} aria-label={`Dial ${i + 1}`}
                aria-valuenow={v} aria-valuemin={0} aria-valuemax={9} onKeyDown={(e) => onKey(i, e)}>
                <span key={`${i}-${v}`} className={dir[i] > 0 ? styles.up : styles.down}>{v}</span>
              </div>
              <button type="button" className={styles.turn} onClick={() => turn(i, -1)} aria-label={`Dial ${i + 1} down`}>▼</button>
            </div>
          ))}
        </div>
        <div className={styles.bolt} aria-hidden="true" />
        <div className={styles.msg} role="status">{msg}</div>
      </div>
      <button type="button" className={styles.btn} onClick={tryOpen} disabled={state === "good"} style={{ marginTop: 14 }}>Unlock</button>
    </div>
  );
}