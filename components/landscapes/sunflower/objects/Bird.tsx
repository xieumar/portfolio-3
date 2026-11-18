import type { CSSProperties } from "react";
import { f } from "./rng";
import { ink } from "./palette";

export interface BirdSpec {
  x: number;
  y: number;
  scale?: number;
  /** crossing animation hooks (x0/x1: start and end offsets in px) */
  cross?: { dur: number; delay: number; x0: number; x1: number };
}

export default function Bird({ x, y, scale = 1, cross }: BirdSpec) {
  const style = cross
    ? ({
        "--dur": `${cross.dur}s`,
        "--delay": `${cross.delay}s`,
        "--x0": `${cross.x0}px`,
        "--x1": `${cross.x1}px`,
      } as CSSProperties)
    : undefined;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      <g className={cross ? "sf-bird" : undefined} style={style}>
        <g transform={`scale(${scale})`}>
          <path
            className="bird-wings"
            d="M-6 0Q-3-4 0 0Q3-4 6 0"
            fill="none"
            stroke={ink.line}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </g>
  );
}
