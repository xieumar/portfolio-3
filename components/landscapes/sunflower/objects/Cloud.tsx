import type { CSSProperties } from "react";
import { f } from "./rng";
import { ink } from "./palette";

export interface CloudSpec {
  x: number;
  y: number;
  scale?: number;
  variant?: 0 | 1;
  /** drift animation hooks: `travel` is the distance covered per loop */
  drift?: { dur: number; delay: number };
}

const SHAPES = [
  "M0 9C-7 9-8 2-2 1C-2-6 9-8 13-2C17-8 28-5 27 1C35 1 35 9 27 9Z",
  "M0 8C-5 8-6 3-1 2C0-3 7-5 10-1C13-6 21-4 21 1C27 1 27 8 21 8Z",
] as const;

export default function Cloud({ x, y, scale = 1, variant = 0, drift }: CloudSpec) {
  const style = drift
    ? ({ "--dur": `${drift.dur}s`, "--delay": `${drift.delay}s` } as CSSProperties)
    : undefined;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      <g className={drift ? "sf-cloud" : undefined} style={style}>
        <g transform={`scale(${scale})`} strokeLinecap="round" strokeLinejoin="round">
          <path d={SHAPES[variant]} fill={ink.white} stroke={ink.line} strokeWidth={0.8} />
          <path
            d={variant === 0 ? "M6 6Q10 4 14 6" : "M5 5Q8 3 11 5"}
            fill="none"
            stroke={ink.line}
            strokeWidth={0.5}
            opacity={0.6}
          />
        </g>
      </g>
    </g>
  );
}
