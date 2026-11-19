import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export interface SeaThriftSpec {
  x: number;
  y: number;
  /** stem height */
  h: number;
  lean?: number;
}

/** Sea thrift: a grassy tuft with a round pink flower-head on a thin stem. */
export default function SeaThrift({ x, y, h, lean = 0 }: SeaThriftSpec) {
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round">
      <path d="M-4 0Q-3 -4 -5 -7M-1.5 0Q-1 -5 -2.4 -8M1.5 0Q2 -4 3.4 -7M4 0Q3.6 -3 5.4 -5" fill="none" stroke={sea.grass} strokeWidth={0.8} />
      <path d={`M0 0Q${f(lean * 0.2)} ${f(-h * 0.55)} ${f(lean)} ${f(-h)}`} fill="none" stroke={sea.grass} strokeWidth={0.8} />
      <g transform={`translate(${f(lean)} ${f(-h)})`} stroke={ink.line} strokeWidth={0.6}>
        <circle r={3.4} fill={sea.thrift} />
        <circle cx={-1} cy={-1} r={1.1} fill={ink.white} fillOpacity={0.5} stroke="none" />
        <path d="M-2 1.4L-1.2 0.4M0.4 1.8L0.8 0.5M2 0.8L1.2 -0.2" fill="none" strokeWidth={0.4} opacity={0.6} />
      </g>
    </g>
  );
}
