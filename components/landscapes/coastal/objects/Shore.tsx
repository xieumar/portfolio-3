import { ridge } from "../../shared/objects/Hills";
import { f, rng } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface ShoreProps {
  width: number;
  /** y of the sand's top edge (average) */
  y: number;
  bottom: number;
  amp?: number;
  wave?: number;
  phase?: number;
  seed: number;
}

/** A sandy bank with a hand-drawn crest line, a darker wet edge and scattered grain marks. */
export default function Shore({ width, y, bottom, amp = 5, wave = 520, phase = 0.6, seed }: ShoreProps) {
  const top = ridge(width, y, amp, wave, phase);
  const rand = rng(seed);
  let grains = "";
  for (let i = 0; i < width / 26; i++) {
    const x = rand() * width;
    const yy = y + 6 + rand() * Math.max(4, bottom - y - 10);
    grains += `M${f(x)} ${f(yy)}h${f(1.5 + rand() * 2.5)}`;
  }
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d={`${top}L${width + 24} ${bottom}L-24 ${bottom}Z`} fill={sea.sand} />
      <path d={`${top}L${width + 24} ${y + amp + 7}L-24 ${y + amp + 7}Z`} fill={sea.sandDark} fillOpacity={0.35} />
      <path d={top} fill="none" stroke={ink.line} strokeWidth={0.9} opacity={0.75} />
      <path d={grains} fill="none" stroke={ink.line} strokeWidth={0.5} opacity={0.4} />
    </g>
  );
}
