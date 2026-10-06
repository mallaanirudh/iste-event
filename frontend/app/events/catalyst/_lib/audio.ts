const LEVEL = 0.9; // master volume

export function createAudio() {
  let ctx: AudioContext | null = null;
  let master: GainNode, dry: GainNode, send: GainNode;
  let white: AudioBuffer, brown: AudioBuffer;
  let hum: OscillatorNode;
  let muted = false,
    closed = false,
    susp = 0;
  let tDrip = 3,
    tClang = 14,
    tBeat = 0;

  const noise = (c: AudioContext, brownish: boolean) => {
    const b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate),
      d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      if (brownish) {
        last = (last + 0.02 * w) / 1.02;
        d[i] = last * 3.5;
      } else d[i] = w;
    }
    return b;
  };

  const init = () => {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const c = new AC();
    ctx = c;
    white = noise(c, false);
    brown = noise(c, true);

    master = c.createGain();
    master.gain.value = muted ? 0 : LEVEL;
    const comp = c.createDynamicsCompressor();
    master.connect(comp);
    comp.connect(c.destination);

    // one shared echo, so drips and clangs sound like they happen down long corridors
    dry = c.createGain();
    dry.connect(master);
    send = c.createGain();
    send.gain.value = 0.55;
    const delay = c.createDelay(1);
    delay.delayTime.value = 0.29;
    const fb = c.createGain();
    fb.gain.value = 0.4;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1500;
    send.connect(delay);
    delay.connect(fb);
    fb.connect(delay);
    delay.connect(lp);
    lp.connect(master);

    // ambience: hum + flicker buzz + room tone + faint hiss
    const amb = c.createGain();
    amb.connect(master);
    const humF = c.createBiquadFilter();
    humF.type = "lowpass";
    humF.frequency.value = 240;
    const hg = c.createGain();
    hg.gain.value = 0.04;
    hum = c.createOscillator();
    hum.frequency.value = 50;
    const hum2 = c.createOscillator();
    hum2.frequency.value = 100.7;
    hum.connect(humF);
    hum2.connect(humF);
    humF.connect(hg);
    hg.connect(amb);
    hum.start();
    hum2.start();

    const buzz = c.createOscillator();
    buzz.type = "sawtooth";
    buzz.frequency.value = 120;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 360;
    bp.Q.value = 2;
    const bg = c.createGain();
    bg.gain.value = 0.007;
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.13;
    const lfoD = c.createGain();
    lfoD.gain.value = 0.005;
    lfo.connect(lfoD);
    lfoD.connect(bg.gain);
    buzz.connect(bp);
    bp.connect(bg);
    bg.connect(amb);
    buzz.start();
    lfo.start();

    const loop = (
      buf: AudioBuffer,
      type: BiquadFilterType,
      f: number,
      g: number
    ) => {
      const s = c.createBufferSource();
      s.buffer = buf;
      s.loop = true;
      const fl = c.createBiquadFilter();
      fl.type = type;
      fl.frequency.value = f;
      const gn = c.createGain();
      gn.gain.value = g;
      s.connect(fl);
      fl.connect(gn);
      gn.connect(amb);
      s.start();
    };
    loop(brown, "lowpass", 260, 0.07); // room tone
    loop(white, "highpass", 3500, 0.004); // gas hiss
  };

  const out = (n: AudioNode, echo = true) => {
    n.connect(dry);
    if (echo) n.connect(send);
  };
  const env = (
    g: GainNode,
    t: number,
    peak: number,
    attack: number,
    decay: number
  ) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  };

  const drip = (c: AudioContext) => {
    const t = c.currentTime,
      o = c.createOscillator(),
      g = c.createGain(),
      f = 900 + Math.random() * 900;
    o.frequency.setValueAtTime(f, t);
    o.frequency.exponentialRampToValueAtTime(f * 0.35, t + 0.09);
    env(g, t, 0.05, 0.004, 0.14);
    o.connect(g);
    out(g);
    o.start(t);
    o.stop(t + 0.25);
  };
  const clang = (c: AudioContext) => {
    const t = c.currentTime,
      base = 150 + Math.random() * 110;
    [1, 2.76, 5.4, 8.9].forEach((m, i) => {
      const o = c.createOscillator(),
        g = c.createGain();
      o.frequency.value = base * m;
      env(g, t, 0.05 / (i + 1), 0.005, 2.2 - i * 0.35);
      o.connect(g);
      out(g);
      o.start(t);
      o.stop(t + 2.6);
    });
  };
  const groan = (c: AudioContext) => {
    const t = c.currentTime,
      o = c.createOscillator(),
      g = c.createGain(),
      f = c.createBiquadFilter();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(82, t);
    o.frequency.linearRampToValueAtTime(56, t + 3);
    f.type = "lowpass";
    f.frequency.value = 200;
    env(g, t, 0.03, 1.2, 1.8);
    o.connect(f);
    f.connect(g);
    out(g);
    o.start(t);
    o.stop(t + 3.2);
  };
  const thump = (c: AudioContext, at: number, vol: number) => {
    const t = c.currentTime + at,
      o = c.createOscillator(),
      g = c.createGain();
    o.frequency.setValueAtTime(72, t);
    o.frequency.exponentialRampToValueAtTime(38, t + 0.12);
    env(g, t, vol, 0.01, 0.16);
    o.connect(g);
    out(g, false);
    o.start(t);
    o.stop(t + 0.3);
  };
  const click = (c: AudioContext) => {
    const t = c.currentTime,
      s = c.createBufferSource(),
      f = c.createBiquadFilter(),
      g = c.createGain();
    s.buffer = white;
    f.type = "highpass";
    f.frequency.value = 2500;
    g.gain.setValueAtTime(0.1, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    s.connect(f);
    f.connect(g);
    out(g, false);
    s.start(t, Math.random());
    s.stop(t + 0.02);
  };

  return {
    // call from a user gesture (pointerdown); safe to call many times
    start() {
      if (closed) return;
      if (!ctx) init();
      if (!muted && ctx && ctx.state === "suspended") void ctx.resume();
    },
    // fades out, then suspends the audio engine so nothing plays or runs
    mute(m: boolean) {
      muted = m;
      const c = ctx;
      if (!c) return;
      window.clearTimeout(susp);
      master.gain.cancelScheduledValues(c.currentTime);
      master.gain.setTargetAtTime(m ? 0 : LEVEL, c.currentTime, m ? 0.25 : 0.1);
      if (m)
        susp = window.setTimeout(() => {
          if (muted && c.state === "running") void c.suspend();
        }, 1400);
      else if (c.state === "suspended") void c.resume();
    },
    // called every frame: near and fear are 0..1
    update(dt: number, near: number, fear: number) {
      const c = ctx;
      if (!c || muted || c.state !== "running") return;
      hum.frequency.setTargetAtTime(50 + fear * 7, c.currentTime, 0.3);
      if ((tDrip -= dt) <= 0) {
        drip(c);
        tDrip = 2.5 + Math.random() * 7;
      }
      if ((tClang -= dt) <= 0) {
        if (Math.random() < 0.55) clang(c);
        else groan(c);
        tClang = 16 + Math.random() * 26;
      }
      if (fear > 0.06) {
        if ((tBeat -= dt) <= 0) {
          thump(c, 0, 0.1 + fear * 0.3);
          thump(c, 0.2, 0.07 + fear * 0.2);
          tBeat = 1.15 - fear * 0.65;
        }
      } else tBeat = 0;
      if (near > 0.04 && Math.random() < near * near * 30 * dt) click(c);
    },
    hurt() {
      const c = ctx;
      if (!c || muted || c.state !== "running") return;
      const t = c.currentTime,
        s = c.createBufferSource(),
        f = c.createBiquadFilter(),
        g = c.createGain();
      s.buffer = white;
      f.type = "lowpass";
      f.frequency.setValueAtTime(2400, t);
      f.frequency.exponentialRampToValueAtTime(200, t + 0.35);
      env(g, t, 0.25, 0.01, 0.35);
      s.connect(f);
      f.connect(g);
      out(g, false);
      s.start(t);
      s.stop(t + 0.4);
      const o = c.createOscillator(),
        og = c.createGain();
      o.frequency.setValueAtTime(190, t);
      o.frequency.exponentialRampToValueAtTime(38, t + 0.5);
      env(og, t, 0.35, 0.01, 0.5);
      o.connect(og);
      out(og, false);
      o.start(t);
      o.stop(t + 0.6);
    },
    stop() {
      closed = true;
      window.clearTimeout(susp);
      if (ctx) void ctx.close();
      ctx = null;
    },
    // plays on its own context, so it works even after the ambience has been shut off
    victory() {
      try {
        const AC =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const c = new AC();
        const out = c.createGain();
        out.gain.value = 0.5;
        const comp = c.createDynamicsCompressor();
        out.connect(comp);
        comp.connect(c.destination);
        const note = (
          f: number,
          at: number,
          dur: number,
          type: OscillatorType,
          vol: number,
          lp = 5000
        ) => {
          const t = c.currentTime + at,
            o = c.createOscillator(),
            g = c.createGain(),
            fl = c.createBiquadFilter();
          o.type = type;
          o.frequency.value = f;
          fl.type = "lowpass";
          fl.frequency.value = lp;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          o.connect(fl);
          fl.connect(g);
          g.connect(out);
          o.start(t);
          o.stop(t + dur + 0.05);
        };
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
          note(f, i * 0.12, 0.45, "triangle", 0.22)
        );
        [659.25, 783.99, 1046.5, 1318.5].forEach((f, i) =>
          note(f, 0.62 + i * 0.12, 0.45, "triangle", 0.2)
        );
        [261.63, 329.63, 392, 523.25].forEach((f) =>
          note(f, 1.15, 2.6, "sawtooth", 0.07, 1600)
        );
        [130.81, 65.41].forEach((f) => note(f, 1.15, 2.6, "sine", 0.28));
        [1046.5, 1318.5, 1568, 2093].forEach((f, i) =>
          note(f, 1.3 + i * 0.22, 0.9, "sine", 0.08)
        );
        window.setTimeout(() => void c.close(), 5200);
      } catch {
        /* no audio, no problem */
      }
    },
  };
}
