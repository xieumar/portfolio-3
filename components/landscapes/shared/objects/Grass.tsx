import type { CSSProperties } from "react";
import { f, rng } from "./rng";
import { ink } from "./palette";

export interface GrassSpec {
  x: number;
  y: number;
  /** tallest blade */
  len: number;
  seed: number;
  blades?: number;
  sway?: { dur: number; delay: number; amp: number };
  opacity?: number;
}

export default function Grass({ x, y, len, seed, blades = 7, sway, opacity = 1 }: GrassSpec) {
  const rand = rng(seed);
  let d = "";
  for (let i = 0; i < blades; i++) {
    const spread = (i - (blades - 1) / 2) / blades;
    const L = len * (0.45 + rand() * 0.55);
    const tipX = spread * len * 1.1 + (rand() - 0.5) * 3;
    const bx = (rand() - 0.5) * 3;
    d += `M${f(bx)} 0Q${f(bx + tipX * 0.25)} ${f(-L * 0.65)} ${f(tipX)} ${f(-L)}`;
  }
  const style = sway
    ? ({
        "--dur": `${sway.dur}s`,
        "--delay": `${sway.delay}s`,
        "--amp": `${sway.amp}deg`,
      } as CSSProperties)
    : undefined;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} opacity={opacity}>
      <g className={sway ? "sf-grass" : undefined} style={style}>
        <path d={d} fill="none" stroke={ink.olive} strokeWidth={0.9} strokeLinecap="round" />
      </g>
    </g>
  );
}
