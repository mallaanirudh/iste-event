export const W = 15;
export const H = 9;
export const C = 170; // cell size in px

const rng = (s: number) => () => {
  s |= 0; s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function buildMaze(seed: number) {
  const r = rng(seed);
  const N = W * H;
  const adj: number[][] = Array.from({ length: N }, () => []);
  const link = (a: number, b: number) => { adj[a].push(b); adj[b].push(a); };
  const nbrs = (c: number) => {
    const x = c % W, y = Math.floor(c / W), o: number[] = [];
    if (x > 0) o.push(c - 1);
    if (x < W - 1) o.push(c + 1);
    if (y > 0) o.push(c - W);
    if (y < H - 1) o.push(c + W);
    return o;
  };

  // 1. Carve a perfect maze (long winding corridors).
  const seen = new Uint8Array(N);
  seen[0] = 1;
  const stack = [0];
  while (stack.length) {
    const c = stack[stack.length - 1];
    const options = nbrs(c).filter((n) => !seen[n]);
    if (!options.length) { stack.pop(); continue; }
    const n = options[Math.floor(r() * options.length)];
    seen[n] = 1; link(c, n); stack.push(n);
  }

  // 2. Knock out a few walls so there are loops and more than one way through.
  for (let c = 0; c < N; c++) {
    for (const n of nbrs(c)) if (n > c && !adj[c].includes(n) && r() < 0.07) link(c, n);
  }

  // 3. Shortest routes from the start; the locker goes in the farthest cell.
  const dist = new Int32Array(N).fill(-1);
  const parent = new Int32Array(N).fill(-1);
  dist[0] = 0;
  const q = [0];
  for (let i = 0; i < q.length; i++) {
    const c = q[i];
    for (const n of adj[c]) if (dist[n] < 0) { dist[n] = dist[c] + 1; parent[n] = c; q.push(n); }
  }
  let end = 0;
  for (let c = 1; c < N; c++) if (dist[c] > dist[end]) end = c;
  const path = [end];
  while (path[0] !== 0) path.unshift(parent[path[0]]);
  const onPath = new Set(path);

  // 4. Wall segments in cell units, including the outer frame.
  const segs: number[][] = [[0, 0, W, 0], [W, 0, W, H], [W, H, 0, H], [0, H, 0, 0]];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = y * W + x;
    if (x < W - 1 && !adj[c].includes(c + 1)) segs.push([x + 1, y, x + 1, y + 1]);
    if (y < H - 1 && !adj[c].includes(c + W)) segs.push([x, y + 1, x + 1, y + 1]);
  }

  // 5. Dead-end signs: real dead ends off the route, spread far apart.
  const pool = [...Array(N).keys()]
    .filter((c) => adj[c].length === 1 && c !== 0 && c !== end && !onPath.has(c))
    .map((c) => [r(), c])
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1]);
  const gap = (a: number, b: number) => Math.abs((a % W) - (b % W)) + Math.abs(Math.floor(a / W) - Math.floor(b / W));
  const dead: number[] = pool.slice(0, 1);
  while (dead.length < 4 && dead.length < pool.length) {
    let best = -1, bs = -1;
    for (const c of pool) {
      if (dead.includes(c)) continue;
      const s = Math.min(...dead.map((x) => gap(c, x)));
      if (s > bs) { bs = s; best = c; }
    }
    dead.push(best);
  }

  // 6. Steam vents at random cells (not the start, not the locker).
  const spots: number[] = [];
  while (spots.length < 7) {
    const c = 1 + Math.floor(r() * (N - 1));
    if (c !== end && !spots.includes(c)) spots.push(c);
  }
  const vents = spots.map((c) => ({ c, delay: r() * 8, dur: 7 + r() * 6 }));

  return { path, segs, dead, end, vents };
}