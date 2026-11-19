import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

/** A small far-off rocky island with a tuft of green on top. Origin: centre of its waterline. */
export default function Island({ x, y, w = 40, h = 12 }: { x: number; y: number; w?: number; h?: number }) {
  const a = w / 2;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round" stroke={ink.line} strokeWidth={0.8}>
      <path
        d={`M${-a} 0C${-a * 0.8} ${-h * 0.5} ${-a * 0.5} ${-h} ${-a * 0.1} ${-h}C${a * 0.3} ${-h} ${a * 0.55} ${-h * 0.6} ${a} 0Z`}
        fill={sea.rock}
        fillOpacity={0.8}
      />
      <path d={`M${-a * 0.55} ${-h * 0.75}C${-a * 0.3} ${-h * 1.25} ${a * 0.1} ${-h * 1.25} ${a * 0.3} ${-h * 0.85}Z`} fill={sea.grass} fillOpacity={0.55} stroke="none" />
      <path d={`M${-a * 0.4} ${-h * 0.35}L${-a * 0.1} ${-h * 0.5}M${a * 0.1} ${-h * 0.3}L${a * 0.4} ${-h * 0.4}`} fill="none" strokeWidth={0.5} opacity={0.5} />
    </g>
  );
}
