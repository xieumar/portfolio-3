import type { CSSProperties } from "react";
import { f, rng } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";

export interface SunflowerSpec {
  x: number;
  /** ground y */
  y: number;
  /** stem height to the neck */
  h: number;
  /** head radius */
  r: number;
  seed: number;
  /** horizontal lean of the stem top, px */
  lean?: number;
  /** head rotation, degrees */
  tilt?: number;
  /** 1 = facing us, <1 = turned away */
  facing?: number;
  leaves?: boolean;
  /** swaying head (CSS animation hooks) */
  sway?: { dur: number; delay: number; amp: number };
}

function petalRing(
  r0: number,
  len: number,
  w: number,
  n: number,
  offset: number,
  rand: () => number,
) {
  let d = "";
  for (let i = 0; i < n; i++) {
    const th = offset + (i / n) * Math.PI * 2 + (rand() - 0.5) * 0.14;
    const c = Math.cos(th);
    const s = Math.sin(th);
    const L = len * (0.86 + rand() * 0.26);
    const ww = w * (0.82 + rand() * 0.34);
    const jt = (rand() - 0.5) * ww * 0.7;
    const pts: [number, number][] = [
      [0, -r0],
      [-ww, -r0 - L * 0.35],
      [-ww * 0.5, -r0 - L * 0.86],
      [jt, -r0 - L],
      [ww * 0.5, -r0 - L * 0.86],
      [ww, -r0 - L * 0.35],
    ];
    const p = pts.map(([x, y]) => `${f(x * c - y * s)} ${f(x * s + y * c)}`);
    d += `M${p[0]}C${p[1]} ${p[2]} ${p[3]}C${p[4]} ${p[5]} ${p[0]}Z`;
  }
  return d;
}

function seedDots(r0: number, rand: () => number) {
  const n = Math.round(r0 * 3.2);
  const k = (r0 * 0.86) / Math.sqrt(n);
  let d = "";
  for (let i = 1; i <= n; i++) {
    const a = i * 2.39996 + rand() * 0.1;
    const rr = Math.sqrt(i) * k;
    d += `M${f(Math.cos(a) * rr)} ${f(Math.sin(a) * rr)}h.1`;
  }
  return d;
}

function Head({ r, seed, facing }: { r: number; seed: number; facing: number }) {
  const rand = rng(seed);
  const r0 = r * 0.4;
  const len = r - r0;
  const w = r * 0.21;
  const n = r < 8 ? 9 : r < 11 ? 12 : 15;
  const sw = r > 10 ? 0.8 : 0.6;
  const back = r >= 8 ? petalRing(r0 * 0.9, len * 0.86, w, n, Math.PI / n, rand) : "";
  const front = petalRing(r0 * 0.95, len, w, n, 0, rand);
  let veins = "";
  if (r >= 11) {
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2;
      veins += `M${f(Math.sin(th) * (r0 + 1))} ${f(-Math.cos(th) * (r0 + 1))}L${f(Math.sin(th) * r * 0.78)} ${f(-Math.cos(th) * r * 0.78)}`;
    }
  }
  return (
    <g transform={`scale(${facing} 1)`} strokeLinejoin="round" strokeLinecap="round">
      {back && (
        <path d={back} fill={ink.butter} stroke={ink.line} strokeWidth={sw * 0.85} />
      )}
      <path d={front} fill={ink.golden} stroke={ink.line} strokeWidth={sw} />
      {veins && (
        <path d={veins} fill="none" stroke={ink.line} strokeWidth={0.35} opacity={0.55} />
      )}
      <circle r={r0} fill={ink.line} stroke={ink.deep} strokeWidth={sw} />
      <circle r={r0 * 0.55} fill={ink.deep} />
      {r >= 9 && (
        <path
          d={seedDots(r0, rand)}
          stroke={ink.butter}
          strokeWidth={0.9}
          opacity={0.75}
          fill="none"
        />
      )}
    </g>
  );
}

const LEAF = "M0 0C5-4 12-4 17 1C12 5 5 4 0 0Z";

/** Point on the stem bezier for t in [0,1]. */
function stemAt(h: number, lean: number, t: number) {
  const u = 1 - t;
  const x = 3 * u * u * t * lean * 0.3 + 3 * u * t * t * lean + t * t * t * lean;
  const y = 3 * u * u * t * -h * 0.35 + 3 * u * t * t * -h * 0.65 + t * t * t * -h;
  return [x, y] as const;
}

export default function Sunflower({
  x,
  y,
  h,
  r,
  seed,
  lean = 0,
  tilt = 0,
  facing = 1,
  leaves = false,
  sway,
}: SunflowerSpec) {
  const stemW = r > 11 ? 1.6 : r > 7.5 ? 1.2 : 0.9;
  const rand = rng(seed + 7);
  const l1 = stemAt(h, lean, 0.32);
  const l2 = stemAt(h, lean, 0.58);
  const leafK = Math.max(0.5, r / 12);
  const style = sway
    ? ({
        "--dur": `${sway.dur}s`,
        "--delay": `${sway.delay}s`,
        "--amp": `${sway.amp}deg`,
      } as CSSProperties)
    : undefined;
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} className="sf-flower">
      <path
        d={`M0 0C${f(lean * 0.3)} ${f(-h * 0.35)} ${f(lean)} ${f(-h * 0.65)} ${f(lean)} ${f(-h)}`}
        fill="none"
        stroke={ink.olive}
        strokeWidth={stemW}
        strokeLinecap="round"
      />
      {leaves && (
        <g
          stroke={ink.olive}
          strokeWidth={0.8}
          strokeLinejoin="round"
          fill={ink.leaf}
          fillOpacity={0.55}
        >
          <g
            transform={`translate(${f(l1[0])} ${f(l1[1])}) rotate(${f(-150 + rand() * 20)}) scale(${f(leafK)})`}
          >
            <path d={LEAF} />
          </g>
          <g
            transform={`translate(${f(l2[0])} ${f(l2[1])}) rotate(${f(-30 - rand() * 20)}) scale(${f(leafK * 0.9)})`}
          >
            <path d={LEAF} />
          </g>
        </g>
      )}
      <g transform={`translate(${f(lean)} ${f(-h)})`}>
        <g className={sway ? "sf-head" : undefined} style={style}>
          <g transform={`translate(0 ${f(-r * 0.6)}) rotate(${tilt})`}>
            <Head r={r} seed={seed} facing={facing} />
          </g>
        </g>
      </g>
    </g>
  );
}
