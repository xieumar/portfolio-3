import { f } from "./rng";
import { ink } from "./palette";

/** Smooth rolling ridge from two sine waves, sampled coarsely and smoothed with quadratics. */
export function ridge(width: number, base: number, amp: number, wave: number, phase: number) {
  const step = 24;
  const pts: [number, number][] = [];
  for (let x = -step; x <= width + step; x += step) {
    const a = (x / wave) * Math.PI * 2 + phase;
    pts.push([x, base + amp * (Math.sin(a) * 0.62 + Math.sin(a * 2.3 + phase * 1.7) * 0.38)]);
  }
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(mx)} ${f(my)}`;
  }
  return d;
}

/** y of the ridge at x, matching `ridge()` (used to stand tiny trees on a hill). */
export function ridgeY(x: number, base: number, amp: number, wave: number, phase: number) {
  const a = (x / wave) * Math.PI * 2 + phase;
  return base + amp * (Math.sin(a) * 0.62 + Math.sin(a * 2.3 + phase * 1.7) * 0.38);
}

export interface HillsProps {
  width: number;
  /** bottom of the filled shapes */
  bottom: number;
  far: number;
  near: number;
  wave: number;
}

/** Two layers of soft distant hills. */
export default function Hills({ width, bottom, far, near, wave }: HillsProps) {
  const rFar = ridge(width, far, 9, wave * 1.1, 0.8);
  const rNear = ridge(width, near, 8, wave * 0.8, 2.6);
  const fill = (r: string) => `${r}L${width + 24} ${bottom}L-24 ${bottom}Z`;
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d={fill(rFar)} fill={ink.butter} fillOpacity={0.55} />
      <path d={rFar} fill="none" stroke={ink.olive} strokeWidth={0.8} opacity={0.65} />
      <path d={fill(rNear)} fill={ink.leaf} fillOpacity={0.2} />
      <path d={rNear} fill="none" stroke={ink.olive} strokeWidth={0.9} opacity={0.75} />
    </g>
  );
}
