import { f, rng } from "./rng";
import { ink } from "./palette";
import { blobPath } from "./Tree";

export interface BushSpec {
  x: number;
  y: number;
  r: number;
  seed: number;
  /** a few tiny berries (use sparingly) */
  berries?: string;
}

export default function Bush({ x, y, r, seed, berries }: BushSpec) {
  const rand = rng(seed);
  let marks = "";
  for (let i = 0; i < Math.round(r / 2.5); i++) {
    const px = (rand() - 0.5) * r * 1.4;
    const py = -rand() * r * 0.6;
    marks += `M${f(px - 2)} ${f(py - 1)}Q${f(px)} ${f(py + 1.5)} ${f(px + 2)} ${f(py - 1)}`;
  }
  const dots = berries
    ? Array.from({ length: 4 }, () => [(rand() - 0.5) * r * 1.2, -rand() * r * 0.55 - 2] as const)
    : [];
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round">
      <path
        d={blobPath(r, 8, rand, 0.7)}
        transform={`translate(0 ${f(-r * 0.45)})`}
        fill={ink.leaf}
        fillOpacity={0.5}
        stroke={ink.olive}
        strokeWidth={1}
      />
      <path d={marks} fill="none" stroke={ink.olive} strokeWidth={0.6} opacity={0.8} />
      {dots.map(([dx, dy], i) => (
        <circle key={i} cx={f(dx)} cy={f(dy)} r={1.5} fill={berries} stroke={ink.line} strokeWidth={0.4} />
      ))}
    </g>
  );
}
