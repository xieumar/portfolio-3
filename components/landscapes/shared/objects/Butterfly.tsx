import type { CSSProperties } from "react";
import { f } from "./rng";
import { ink } from "./palette";

export interface ButterflySpec {
  x: number;
  y: number;
  scale?: number;
  color: string;
  /** flight animation hooks (x0/x1: start and end offsets in px) */
  fly?: { dur: number; delay: number; x0: number; x1: number };
}

const UPPER = "M0 0C-3-6-9-9-10-3C-10 0-5 1 0 0Z";
const LOWER = "M0 0C-2 3-6 7-7 3C-7 1-3 0 0 0Z";

function Wing({ color }: { color: string }) {
  return (
    <g className="bf-wing">
      <path d={UPPER} fill={color} fillOpacity={0.85} stroke={ink.line} strokeWidth={0.6} />
      <path d={LOWER} fill={color} fillOpacity={0.6} stroke={ink.line} strokeWidth={0.6} />
    </g>
  );
}

export default function Butterfly({ x, y, scale = 1, color, fly }: ButterflySpec) {
  const style = fly
    ? ({
        "--dur": `${fly.dur}s`,
        "--delay": `${fly.delay}s`,
        "--x0": `${fly.x0}px`,
        "--x1": `${fly.x1}px`,
      } as CSSProperties)
    : undefined;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      <g className={fly ? "sf-fly" : undefined} style={style}>
        <g className={fly ? "sf-fly-bob" : undefined}>
          <g transform={`scale(${scale})`} strokeLinejoin="round" strokeLinecap="round">
            <Wing color={color} />
            <g transform="scale(-1 1)">
              <Wing color={color} />
            </g>
            <ellipse rx={0.7} ry={3} fill={ink.deep} />
            <path
              d="M0-2.6Q-1.5-5-2.6-5.2M0-2.6Q1.5-5 2.6-5.2"
              fill="none"
              stroke={ink.line}
              strokeWidth={0.4}
            />
          </g>
        </g>
      </g>
    </g>
  );
}
