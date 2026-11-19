import { f, rng } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface PierSpec {
  /** where the pier leaves the shore */
  x: number;
  /** y of the water surface the posts stand in */
  y: number;
  length: number;
  seed: number;
  /** height of the deck above the water */
  deck?: number;
}

/** A wooden pier seen from the side, ending in a lantern post. Posts reach below the waterline. */
export default function Pier({ x, y, length, seed, deck = 14 }: PierSpec) {
  const rand = rng(seed);
  const top = -deck;
  const n = Math.max(2, Math.round(length / 18));
  let posts = "";
  for (let i = 0; i <= n; i++) {
    const px = (i / n) * length;
    posts += `M${f(px - 1.7)} ${f(top + 3)}V${f(7 + rand() * 4)}H${f(px + 1.7)}V${f(top + 3)}Z`;
  }
  let seams = "";
  for (let px = 6; px < length; px += 7 + rand() * 3) seams += `M${f(px)} ${f(top)}v3`;
  const lx = length - 3;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round" stroke={ink.line} strokeWidth={0.9}>
      <path d={posts} fill={sea.woodDark} fillOpacity={0.75} />
      {/* deck */}
      <path d={`M-3 ${top}H${length + 3}V${top + 3}H-3Z`} fill={sea.wood} />
      <path d={seams} fill="none" strokeWidth={0.4} opacity={0.55} />
      <path d={`M0 ${top + 3}V${top + 7}M${f(length)} ${top + 3}V${top + 7}`} fill="none" strokeWidth={0.5} opacity={0.4} />
      {/* lantern post at the far end */}
      <path d={`M${f(lx)} ${top}V${top - 17}`} fill="none" strokeWidth={1.2} />
      <path d={`M${f(lx - 3)} ${top - 17}H${f(lx + 3)}V${top - 23}H${f(lx - 3)}Z`} fill={sea.beam} fillOpacity={0.9} strokeWidth={0.7} />
      <path d={`M${f(lx - 4)} ${top - 23}L${f(lx)} ${top - 27}L${f(lx + 4)} ${top - 23}Z`} fill={sea.woodDark} strokeWidth={0.7} />
    </g>
  );
}
