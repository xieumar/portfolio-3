/** Deterministic PRNG so artwork is identical on server and client (no hydration drift). */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Round to 1 decimal to keep SVG path strings short. */
export const f = (n: number) => Math.round(n * 10) / 10;
