import type { GrassSpec } from "./Grass";
import { rng } from "./rng";

export const inClear = (x: number, clear: [number, number][] = []) =>
  clear.some(([a, b]) => x > a && x < b);

/** Grass tufts spread along the ground with varied height; front tufts are taller. */
export function layoutGrass(
  width: number,
  ground: number,
  seed: number,
  count: number,
  lenRange: [number, number],
  opts: { opacity?: number; animate?: boolean; clear?: [number, number][] } = {},
): GrassSpec[] {
  const rand = rng(seed);
  const out: GrassSpec[] = [];
  for (let i = 0; i < count; i++) {
    const x = ((i + 0.15 + rand() * 0.7) / count) * width;
    if (inClear(x, opts.clear)) continue;
    const dur = 4 + rand() * 3;
    out.push({
      x,
      y: ground + (rand() - 0.3) * 3,
      len: lenRange[0] + rand() * (lenRange[1] - lenRange[0]),
      seed: seed + i * 7,
      blades: 5 + Math.floor(rand() * 4),
      opacity: opts.opacity,
      sway: opts.animate
        ? {
            dur: Math.round(dur * 10) / 10,
            delay: -Math.round(rand() * dur * 10) / 10,
            amp: Math.round((1 + rand() * 1.2) * 10) / 10,
          }
        : undefined,
    });
  }
  return out;
}
