import type { CSSProperties } from "react";
import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface LighthouseSpec {
  x: number;
  y: number;
  scale?: number;
  /** adds a faint beam that slowly sweeps from one side to the other */
  beam?: { dur: number; delay: number };
}

/** Half-width of the tapered tower at height `y` (negative = up). */
const half = (y: number) => 9 - ((9 - 6.4) * -y) / 52;

const BANDS = [
  [-40, -30],
  [-20, -10],
] as const;

/**
 * Striped lighthouse. Origin: centre of the base. Interaction hooks: `.lh-beam` (the wedge of
 * light; `.is-lit` on an ancestor brightens it) and `.lh-glass` (the lantern room).
 */
export default function Lighthouse({ x, y, scale = 1, beam }: LighthouseSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={0.9}
    >
      {/* tower: slightly tapered, off-white with teal bands */}
      <path d="M-9 0L-6.4 -52H6.4L9 0Z" fill={sea.foam} />
      {BANDS.map(([y0, y1]) => (
        <path
          key={y0}
          d={`M${f(-half(y0))} ${y0}H${f(half(y0))}L${f(half(y1))} ${y1}H${f(-half(y1))}Z`}
          fill={sea.teal}
          fillOpacity={0.85}
        />
      ))}
      <path d="M-7 -6L-6.5 -46" fill="none" strokeWidth={0.4} opacity={0.45} />
      {/* door and window */}
      <path d="M-2.4 0V-7A2.4 2.4 0 0 1 2.4 -7V0Z" fill={sea.woodDark} fillOpacity={0.8} />
      <rect x={-1.2} y={-27} width={2.4} height={3.6} rx={1.2} fill={sea.deep} fillOpacity={0.7} strokeWidth={0.5} />
      {/* gallery and rail */}
      <path d="M-9 -52H9V-54.4H-9Z" fill={sea.sandDark} />
      <path
        d="M-8.4 -54.4V-58.5M-4.2 -54.4V-58.5M0 -54.4V-58.5M4.2 -54.4V-58.5M8.4 -54.4V-58.5M-8.4 -58.5H8.4"
        fill="none"
        strokeWidth={0.5}
      />
      {/* lantern room and roof */}
      <rect className="lh-glass" x={-4.6} y={-67} width={9.2} height={8.6} fill={sea.beam} fillOpacity={0.9} />
      <path d="M0 -67V-58.4M-4.6 -62.7H4.6" fill="none" strokeWidth={0.5} />
      <path d="M-6.4 -67Q0 -77 6.4 -67Z" fill={sea.coral} />
      <path d="M0 -74.5V-79" fill="none" />
      {/* beam: a soft wedge pivoting around the lantern */}
      <g transform="translate(0 -62.7)">
        <g
          className={beam ? "lh-beam lh-beam--sweep" : "lh-beam"}
          style={beam ? ({ "--dur": `${beam.dur}s`, "--delay": `${beam.delay}s` } as CSSProperties) : undefined}
        >
          <path d="M5 -1.2L96 -12V13Z" fill={sea.beam} fillOpacity={0.42} stroke="none" />
        </g>
      </g>
    </g>
  );
}
