import { f, rng } from "./rng";
import { ink } from "./palette";

export interface FenceSpec {
  x: number;
  y: number;
  width: number;
  seed: number;
}

/** Low wooden picket fence with slightly uneven posts. */
export default function Fence({ x, y, width, seed }: FenceSpec) {
  const rand = rng(seed);
  const n = Math.max(2, Math.round(width / 11));
  let posts = "";
  for (let i = 0; i <= n; i++) {
    const px = (i / n) * width;
    const hgt = 17 + rand() * 3;
    posts += `M${f(px - 2)} 0V${f(-hgt + 2)}L${f(px)} ${f(-hgt)}L${f(px + 2)} ${f(-hgt + 2)}V0Z`;
  }
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round">
      <path d={posts} fill={ink.paper} stroke={ink.line} strokeWidth={0.8} />
      <path d={`M0 -12H${width}M0 -5H${width}`} fill="none" stroke={ink.line} strokeWidth={0.9} />
    </g>
  );
}
