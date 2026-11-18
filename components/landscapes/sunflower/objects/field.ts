import type { GrassSpec } from "./Grass";
import type { SunflowerSpec } from "./Sunflower";
import { rng } from "./rng";

export interface FieldOptions {
  width: number;
  /** ground line y */
  ground: number;
  seed: number;
  /** how many flowers per depth tier */
  tall: number;
  mid: number;
  back: number;
  /** scale factor for sizes (compact scenes use < 1) */
  size?: number;
  /** x-ranges left clear (e.g. for a signpost or cottage) */
  clear?: [number, number][];
}

const inClear = (x: number, clear: [number, number][] = []) =>
  clear.some(([a, b]) => x > a && x < b);

/**
 * Places flowers in three depth tiers using stratified jitter, so spacing feels
 * natural (clusters and gaps) rather than a regular row. Tiers are returned
 * back-to-front for painter's-order drawing.
 */
export function layoutField(o: FieldOptions): SunflowerSpec[] {
  const rand = rng(o.seed);
  const k = o.size ?? 1;
  const margin = 18;
  const span = o.width - margin * 2;
  const out: SunflowerSpec[] = [];

  const tier = (
    n: number,
    h: [number, number],
    r: [number, number],
    groundShift: number,
    leaves: boolean,
    swayAmp: [number, number] | null,
    seedBase: number,
  ) => {
    for (let i = 0; i < n; i++) {
      const x = margin + ((i + 0.1 + rand() * 0.8) / n) * span;
      if (inClear(x, o.clear)) continue;
      const roll = rand();
      const dur = 3 + rand() * 2;
      out.push({
        x,
        y: o.ground + groundShift + (rand() - 0.5) * 3,
        h: (h[0] + rand() * (h[1] - h[0])) * k,
        r: (r[0] + rand() * (r[1] - r[0])) * k,
        seed: seedBase + i * 13,
        lean: (rand() - 0.5) * 14 * k,
        tilt: (rand() - 0.5) * 26,
        facing: roll < 0.6 ? 1 : roll < 0.9 ? 0.72 : 0.42,
        leaves,
        sway: swayAmp
          ? {
              dur: Math.round(dur * 10) / 10,
              delay: -Math.round(rand() * dur * 10) / 10,
              amp: Math.round((swayAmp[0] + rand() * (swayAmp[1] - swayAmp[0])) * 10) / 10,
            }
          : undefined,
      });
    }
  };

  tier(o.back, [24, 40], [5, 7], -4, false, null, 100);
  tier(o.mid, [44, 66], [8, 10.5], -1, true, [2, 3.5], 400);
  tier(o.tall, [72, 98], [11, 14], 2, true, [1.5, 3], 800);
  return out;
}

/**
 * A cluster of sunflowers across [x0, x1], sorted back-to-front. Used for the
 * footer's sunflower patches, where flowers are grouped rather than spread evenly.
 */
export function layoutPatch(
  x0: number,
  x1: number,
  ground: number,
  seed: number,
  count: number,
  size = 1,
): SunflowerSpec[] {
  const rand = rng(seed);
  const out: SunflowerSpec[] = [];
  for (let i = 0; i < count; i++) {
    const x = x0 + ((i + 0.15 + rand() * 0.7) / count) * (x1 - x0);
    const depth = rand(); // 0 = back, 1 = front
    const dur = 3 + rand() * 2;
    const roll = rand();
    out.push({
      x,
      y: ground - 3 + depth * 6,
      h: (46 + depth * 44 + rand() * 18) * size,
      r: (8 + depth * 4.5 + rand() * 2) * size,
      seed: seed + i * 17,
      lean: (rand() - 0.5) * 12 * size,
      tilt: (rand() - 0.5) * 28,
      facing: roll < 0.6 ? 1 : roll < 0.9 ? 0.72 : 0.42,
      leaves: true,
      sway: {
        dur: Math.round(dur * 10) / 10,
        delay: -Math.round(rand() * dur * 10) / 10,
        amp: Math.round((1.5 + rand() * 2) * 10) / 10,
      },
    });
  }
  return out.sort((a, b) => a.y - b.y);
}

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
