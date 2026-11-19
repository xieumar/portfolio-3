import type { CSSProperties } from "react";
import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface RowBoatSpec {
  x: number;
  y: number;
  scale?: number;
  /** rocks gently when set (boat afloat); omit for a boat pulled up on the sand */
  bob?: { dur: number; delay: number };
}

/** A little wooden rowing boat with an oar and a coil of rope. Origin: centre of the keel line. */
export default function RowBoat({ x, y, scale = 1, bob }: RowBoatSpec) {
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
        {/* oar leaning on the far side */}
        <path d="M-6 -9L10 -22" fill="none" strokeWidth={1.1} />
        <path d="M10 -22L14 -26L11 -19Z" fill={sea.wood} strokeWidth={0.7} />
        {/* hull */}
        <path d="M-20 -8Q-18 1 -9 3H10Q19 1 22 -9Z" fill={sea.wood} />
        <path d="M-20 -8H22" fill="none" strokeWidth={1.1} />
        <path d="M-18 -4.5H20" fill="none" stroke={sea.teal} strokeWidth={1.6} />
        <path d="M-10 -8V3M0 -8V3.4M10 -8V3" fill="none" strokeWidth={0.4} opacity={0.45} />
        {/* thwart (seat) */}
        <path d="M-4 -8H5" fill="none" strokeWidth={1.6} />
        {/* rope */}
        <circle cx={-15} cy={-9.4} r={2} fill="none" strokeWidth={0.7} />
        <circle cx={-15} cy={-9.4} r={0.9} fill="none" strokeWidth={0.5} />
      </g>
    </g>
  );
}
