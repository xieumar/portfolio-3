import type { CSSProperties } from "react";
import { f, rng } from "./rng";
import { ink } from "./palette";

/** Closed, smooth, irregular blob (used for tree canopies and bushes). */
export function blobPath(r: number, n: number, rand: () => number, squash = 1) {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand() * 0.25;
    const rr = r * (0.8 + rand() * 0.3);
    pts.push([Math.cos(a) * rr, Math.sin(a) * rr * squash]);
  }
  const mid = (i: number) => {
    const a = pts[i % n];
    const b = pts[(i + 1) % n];
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  };
  const start = mid(n - 1);
  let d = `M${f(start[0])} ${f(start[1])}`;
  for (let i = 0; i < n; i++) {
    const m = mid(i);
    d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`;
  }
  return d + "Z";
}

/** Little "v" leaf marks scattered inside a canopy. */
function leafMarks(r: number, count: number, rand: () => number) {
  let d = "";
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const rr = Math.sqrt(rand()) * r * 0.7;
    const x = Math.cos(a) * rr;
    const y = Math.sin(a) * rr * 0.85;
    d += `M${f(x - 2.2)} ${f(y - 1)}Q${f(x)} ${f(y + 1.6)} ${f(x + 2.2)} ${f(y - 1)}`;
  }
  return d;
}

export interface TreeSpec {
  x: number;
  y: number;
  /** trunk height */
  h: number;
  /** canopy radius */
  r: number;
  seed: number;
  sway?: { dur: number; delay: number; amp: number };
}

export default function Tree({ x, y, h, r, seed, sway }: TreeSpec) {
  const rand = rng(seed);
  const style = sway
    ? ({
        "--dur": `${sway.dur}s`,
        "--delay": `${sway.delay}s`,
        "--amp": `${sway.amp}deg`,
      } as CSSProperties)
    : undefined;
  const w = Math.max(2, r * 0.1);
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round">
      <path
        d={`M${f(-w * 1.6)} 0C${f(-w)} ${f(-h * 0.4)} ${f(-w)} ${f(-h * 0.8)} ${f(-w * 0.7)} ${f(-h)}L${f(w * 0.7)} ${f(-h)}C${f(w)} ${f(-h * 0.8)} ${f(w)} ${f(-h * 0.4)} ${f(w * 1.6)} 0Z`}
        fill={ink.line}
        fillOpacity={0.4}
        stroke={ink.line}
        strokeWidth={0.9}
      />
      <path
        d={`M${f(-w * 0.2)} ${f(-h * 0.1)}Q${f(-w * 0.5)} ${f(-h * 0.5)} ${f(-w * 0.2)} ${f(-h * 0.85)}`}
        fill="none"
        stroke={ink.line}
        strokeWidth={0.5}
        opacity={0.6}
      />
      <g transform={`translate(0 ${f(-h)})`}>
        <g className={sway ? "sf-tree" : undefined} style={style}>
          <g transform={`translate(0 ${f(-r * 0.62)})`}>
            <path d={blobPath(r, 9, rand)} fill={ink.leaf} fillOpacity={0.5} stroke={ink.olive} strokeWidth={1} />
            <path
              d={blobPath(r * 0.55, 7, rand)}
              transform={`translate(${f(-r * 0.22)} ${f(-r * 0.2)})`}
              fill={ink.butter}
              fillOpacity={0.5}
              stroke="none"
            />
            <path d={leafMarks(r, Math.round(r / 3), rand)} fill="none" stroke={ink.olive} strokeWidth={0.6} opacity={0.8} />
          </g>
        </g>
      </g>
    </g>
  );
}
