import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface BeachHutSpec {
  x: number;
  y: number;
  scale?: number;
}

/**
 * A small beach hut: plank walls, a striped awning, a round window and a pennant on the ridge
 * (`.cs-flag` flutters). Origin: centre of the ground line.
 */
export default function BeachHut({ x, y, scale = 1 }: BeachHutSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
      {/* pennant */}
      <path d="M0 -66V-80" fill="none" strokeWidth={0.9} />
      <path className="cs-flag" d="M0 -80L9 -77L0 -74Z" fill={sea.coral} strokeWidth={0.7} />
      {/* walls with plank lines */}
      <path d="M-26 0V-34L0 -41L26 -34V0Z" fill={sea.foam} />
      <path d="M-18 -1V-35M-9 -1V-37M0 -1V-40M9 -1V-37M18 -1V-35" fill="none" strokeWidth={0.4} opacity={0.5} />
      {/* roof */}
      <path d="M-32 -33L0 -66L32 -33Z" fill={sea.teal} fillOpacity={0.85} />
      <path d="M-24 -37L0 -60M-14 -37L0 -54M-32 -33H32" fill="none" strokeWidth={0.5} opacity={0.55} />
      {/* door with a striped awning */}
      <path d="M-18 0V-22H-4V0Z" fill={sea.wood} />
      <path d="M-11 -22V0" fill="none" strokeWidth={0.5} opacity={0.6} />
      <circle cx={-6} cy={-11} r={0.8} fill={ink.golden} strokeWidth={0.4} />
      <path d="M-21 -24L-1 -24L1 -29H-23Z" fill={ink.white} />
      <path d="M-17 -29L-18 -24M-9 -29L-10 -24M-1 -29L-2 -24" fill="none" stroke={sea.coral} strokeWidth={2.2} />
      {/* round window */}
      <circle cx={13} cy={-20} r={5.4} fill={sea.water} fillOpacity={0.55} />
      <path d="M7.6 -20H18.4M13 -25.4V-14.6" fill="none" strokeWidth={0.5} />
      {/* step */}
      <path d="M-21 0H-1" fill="none" strokeWidth={1.4} />
    </g>
  );
}
