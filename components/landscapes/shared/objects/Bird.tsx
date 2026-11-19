import type { CSSProperties } from "react";
import { f } from "./rng";
import { ink } from "./palette";

export interface BirdSpec {
  x: number;
  y: number;
  scale?: number;
  /**
   * Crossing hooks. `dur` is the flight time in seconds; the CSS adds long, irregular
   * pauses between flights. `rtl` flies right-to-left.
   */
  cross?: { dur: number; delay: number; rtl?: boolean };
}

export default function Bird({ x, y, scale = 1, cross }: BirdSpec) {
  const style = cross
    ? ({
        "--dur": `${cross.dur}s`,
        "--delay": `${cross.delay}s`,
        "--cx": `${f(x)}px`,
      } as CSSProperties)
    : undefined;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      <g
        className={cross ? `sf-bird${cross.rtl ? " sf-bird--rtl" : ""}` : undefined}
        style={style}
      >
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
