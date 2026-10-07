/**
 * Tiny synthesised sound effects (Web Audio, no files). Nothing plays until the
 * visitor turns sound on, and the AudioContext is only created on that first gesture.
 */

let ctx: AudioContext | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  { at = 0, dur = 0.08, type = "square", gain = 0.05, to }: { at?: number; dur?: number; type?: OscillatorType; gain?: number; to?: number } = {},
) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + at;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(a.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

export const SFX = {
  /** A wire tile turning. */
  tick: () => tone(520 + Math.random() * 60, { dur: 0.045, gain: 0.035 }),
  /** Picking up a hidden part, like an XP orb. */
  pickup: () => {
    const base = 880 + Math.random() * 120;
    tone(base, { dur: 0.07, type: "sine", gain: 0.09 });
    tone(base * 1.5, { at: 0.06, dur: 0.12, type: "sine", gain: 0.08 });
  },
  /** The circuit closing: a rising arpeggio. */
  power: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, { at: i * 0.08, dur: 0.16, gain: 0.05 })),
  /** All five parts found. */
  fanfare: () => [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, { at: i * 0.07, dur: 0.22, type: "triangle", gain: 0.08 })),
  /** A surge up the beacon. */
  surge: () => tone(110, { dur: 0.4, type: "sawtooth", gain: 0.03, to: 880 }),
} as const;

export type SfxName = keyof typeof SFX;
