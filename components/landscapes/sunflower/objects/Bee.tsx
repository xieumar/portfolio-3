import type { CSSProperties } from "react";
import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";

export interface BeeSpec {
  x: number;
  y: number;
  scale?: number;
  /** waypoint offsets (relative to x,y) for the hop animation */
  hop?: { dur: number; delay: number; points: [number, number][] };
}

export default function Bee({ x, y, scale = 1, hop }: BeeSpec) {
  // The bee faces right; flip it when its route heads left.
  const pts = hop?.points ?? [];
  const flip = pts.length > 1 && pts[pts.length - 1][0] < pts[0][0] ? -1 : 1;
  const vars: Record<string, string> = {};
  hop?.points.forEach(([px, py], i) => {
    vars[`--p${i}x`] = `${px}px`;
    vars[`--p${i}y`] = `${py}px`;
  });
  const style = hop
    ? ({ "--dur": `${hop.dur}s`, "--delay": `${hop.delay}s`, ...vars } as CSSProperties)
    : undefined;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      <g className={hop ? "sf-bee" : undefined} style={style}>
        <g transform={`scale(${flip * scale} ${scale})`} strokeLinejoin="round" strokeLinecap="round">
          <g className="bee-wings">
            <ellipse
              cx={0.5}
              cy={-3}
              rx={2.6}
              ry={1.4}
              transform="rotate(-25 0.5 -3)"
              fill={ink.white}
              fillOpacity={0.8}
              stroke={ink.line}
              strokeWidth={0.4}
            />
            <ellipse
              cx={-1.5}
              cy={-3}
              rx={2.2}
              ry={1.2}
              transform="rotate(-50 -1.5 -3)"
              fill={ink.white}
              fillOpacity={0.7}
              stroke={ink.line}
              strokeWidth={0.4}
            />
          </g>
          <ellipse rx={4} ry={2.6} fill={ink.golden} stroke={ink.line} strokeWidth={0.6} />
          <path
            d="M-0.8-2.4Q-1.6 0-0.8 2.4M1.2-2.4Q2 0 1.2 2.4"
            fill="none"
            stroke={ink.deep}
            strokeWidth={1}
          />
          <circle cx={4.2} cy={-0.2} r={1.5} fill={ink.deep} />
          <path d="M-4 0L-5.4 0.2" stroke={ink.line} strokeWidth={0.6} />
        </g>
      </g>
    </g>
  );
}
