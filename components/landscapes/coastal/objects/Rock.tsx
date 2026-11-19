import { blobPath } from "../../shared/objects/Tree";
import { f, rng } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface RockSpec {
  x: number;
  y: number;
  /** radius */
  r: number;
  seed: number;
  /** a mossy cap */
  moss?: boolean;
}

/** A rounded, slightly flattened shore rock with a highlight stroke and a few cracks. */
export default function Rock({ x, y, r, seed, moss = false }: RockSpec) {
  const rand = rng(seed);
  const path = blobPath(r, 8, rand, 0.7);
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round">
      <g transform={`translate(0 ${f(-r * 0.55)})`}>
        <path d={path} fill={sea.rock} stroke={ink.line} strokeWidth={0.9} />
        <path d={path} fill={sea.rockDark} fillOpacity={0.3} stroke="none" transform="translate(1.2 1.6) scale(0.82 0.7)" />
        {moss && <path d={`M${f(-r * 0.7)} ${f(-r * 0.3)}Q0 ${f(-r * 0.95)} ${f(r * 0.6)} ${f(-r * 0.35)}Q0 ${f(-r * 0.55)} ${f(-r * 0.7)} ${f(-r * 0.3)}Z`} fill={sea.grass} fillOpacity={0.55} stroke="none" />}
        <path d={`M${f(-r * 0.45)} ${f(-r * 0.2)}Q${f(-r * 0.2)} ${f(-r * 0.5)} ${f(r * 0.1)} ${f(-r * 0.4)}`} fill="none" stroke={ink.paper} strokeWidth={0.6} opacity={0.6} />
        <path d={`M${f(r * 0.25)} ${f(r * 0.05)}l${f(r * 0.15)} ${f(r * 0.2)}`} fill="none" stroke={ink.line} strokeWidth={0.5} opacity={0.5} />
      </g>
    </g>
  );
}
