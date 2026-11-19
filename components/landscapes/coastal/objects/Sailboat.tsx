import type { CSSProperties } from "react";
import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface SailboatSpec {
  x: number;
  y: number;
  scale?: number;
  /** adds the gentle rocking animation */
  bob?: { dur: number; delay: number };
}

/** A small sloop seen from the side. Origin: the waterline under the mast. */
export default function Sailboat({ x, y, scale = 1, bob }: SailboatSpec) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}>
      <g
        className={bob ? "cs-rock" : undefined}
        style={bob ? ({ "--dur": `${bob.dur}s`, "--delay": `${bob.delay}s` } as CSSProperties) : undefined}
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke={ink.line}
        strokeWidth={0.9}
      >
        {/* sails */}
        <path d="M0 -4V-32L-13 -6Z" fill={sea.sail} />
        <path d="M2 -4V-27L15 -6Z" fill={sea.sail} />
        <path d="M-5 -10L-1 -22M-8 -9L-2 -26" fill="none" strokeWidth={0.4} opacity={0.5} />
        <path d="M0 -34L6 -32L0 -30Z" fill={sea.coral} strokeWidth={0.6} />
        <path d="M0 -34V-30" fill="none" />
        {/* hull */}
        <path d="M-17 -4H19L14 3Q0 6 -12 3Z" fill={sea.teal} />
        <path d="M-16 -1.5H17" fill="none" strokeWidth={0.5} opacity={0.6} />
      </g>
    </g>
  );
}
