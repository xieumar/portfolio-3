import type { CSSProperties } from "react";
import { allDestinations } from "@/config/navigation";
import { f, rng } from "./rng";
import { ink } from "./palette";

export interface SignpostSpec {
  x: number;
  y: number;
  scale?: number;
}

const H = 7.5; // half the plank height

/** Weathered plank outline: dir 1 points right, -1 left. Edges wobble and one corner is chipped. */
function plankPath(dir: 1 | -1, w: number, seed: number) {
  const r = rng(seed);
  const j = (n = 0.7) => (r() - 0.5) * 2 * n;
  const body = w - 6;
  // Build for dir 1, then mirror x for dir -1.
  const pts: [number, number][] = [
    [-body + j(), -H + j()],
    [-body * 0.3 + j(), -H + j(0.9)],
    [body * 0.35 + j(), -H + j(0.9)],
    [body + j(), -H + j()],
    [w + j(0.4), j(0.6)],
    [body + j(), H + j()],
    [body * 0.4 + j(), H + j(0.9)],
    // chipped notch on the bottom edge
    [-body * 0.1 + j(), H + j(0.6)],
    [-body * 0.18, H - 2.2],
    [-body * 0.3 + j(), H + j(0.6)],
    [-body + 2.5, H + j()],
    [-body - 0.8 + j(), H - 3 + j()],
    [-body + 0.6 + j(), -1 + j()],
  ];
  return "M" + pts.map(([x, y]) => `${f(x * dir)} ${f(y)}`).join("L") + "Z";
}

const planks = [
  { href: "/work", dir: 1 as const, w: 31, rot: -2.2, seed: 11 },
  { href: "/about", dir: -1 as const, w: 28, rot: 2.4, seed: 29 },
];

/** A single worn plank: grain, a knot, a crack, nail holes and flaking paint over the lettering. */
function WornPlank({ dir, w, seed, label }: { dir: 1 | -1; w: number; seed: number; label: string }) {
  const r = rng(seed * 7);
  const body = w - 6;
  const grain = [-5.3, 5.2].map((gy, i) => {
    const x0 = (-body + 2 + r() * 5) * dir;
    const x1 = (body - 1 - r() * 8) * dir;
    const mid = (x0 + x1) / 2;
    return `M${f(x0)} ${f(gy)}Q${f(mid)} ${f(gy + (r() - 0.5) * 2.4)} ${f(x1)} ${f(gy + (i - 0.5) * 0.4)}`;
  });
  // keep knot, crack and paint wear clear of the lettering band (|y| < 4)
  const knotX = (body * (0.5 + r() * 0.3)) * dir * (r() > 0.5 ? 1 : -1);
  const knotY = r() > 0.5 ? -5.2 : 5.2;
  const crackX = body * 0.88 * dir;
  // flecks of paint missing over the lettering
  const flecks = Array.from({ length: 5 }, () => ({
    x: (r() - 0.5) * (body * 1.6) + dir * 2.5,
    y: (r() > 0.5 ? 1 : -1) * (4.8 + r() * 1.6),
    rx: 0.6 + r() * 1.1,
    ry: 0.4 + r() * 0.5,
  }));
  return (
    <>
      <path d={plankPath(dir, w, seed)} fill={ink.butter} />
      {/* sun-bleached and damp patches */}
      <path d={plankPath(dir, w, seed)} fill={ink.line} fillOpacity={0.07} stroke="none" transform={`translate(${dir * 6} 2.4) scale(0.55 0.5)`} />
      <path d={`M${-body * dir} ${-H}H${(-body + 7) * dir}L${(-body + 4) * dir} ${H}H${-body * dir}Z`} fill={ink.leaf} fillOpacity={0.22} stroke="none" />
      <g fill="none" strokeWidth={0.4} opacity={0.45}>
        {grain.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <ellipse cx={f(knotX)} cy={knotY} rx={1.3} ry={0.9} fill={ink.line} fillOpacity={0.35} strokeWidth={0.4} />
      <path d={`M${f(crackX)} ${-H + 0.4}l0.9 1.8l-1 1.6`} fill="none" strokeWidth={0.5} opacity={0.75} />
      {/* faded lettering */}
      <text
        x={dir * 2.5}
        y={0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={ink.deep}
        fillOpacity={0.9}
        stroke="none"
        fontSize={7}
        fontWeight={700}
        style={{ fontFamily: "inherit", letterSpacing: "0.03em" }}
      >
        {label}
      </text>
      {flecks.map((p, i) => (
        <ellipse key={i} cx={f(p.x)} cy={f(p.y)} rx={f(p.rx)} ry={f(p.ry)} fill={ink.butter} fillOpacity={0.85} stroke="none" />
      ))}
      {/* nail holes */}
      <circle cx={f((-body + 3) * dir)} cy={0} r={0.8} fill={ink.line} stroke="none" />
      <circle cx={f((body - 3) * dir)} cy={0} r={0.6} fill={ink.line} fillOpacity={0.6} stroke="none" />
    </>
  );
}

/**
 * Weathered wooden signpost with two lettered arrow planks (My Work, About).
 * Each `.sign-plank` carries `data-href`; the interactive footer layer navigates on click.
 */
export default function Signpost({ x, y, scale = 1 }: SignpostSpec) {
  const items = planks
    .map((p) => ({ ...p, dest: allDestinations.find((d) => d.href === p.href) }))
    .filter((p) => p.dest);
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
      {/* leaning, cracked post with a mossy foot */}
      <g transform="rotate(1.6)">
        <path d="M-3.2 0L-2.8 -70L-3.4 -73L-0.6 -76.5L3.2 -72.5L2.6 -69L3.1 0Z" fill={ink.line} fillOpacity={0.4} />
        <path d="M-0.4 -4V-62M1.4 -10V-40" strokeWidth={0.4} opacity={0.5} fill="none" />
        <path d="M-1.6 -68L-0.8 -63L-1.8 -58" strokeWidth={0.5} opacity={0.7} fill="none" />
        <path d="M-3.3 0C-3 -7 -1 -9 0.5 -7C2 -10 3.3 -6 3.2 0Z" fill={ink.olive} fillOpacity={0.45} stroke="none" />
      </g>
      {items.map((p, i) => (
        <g key={p.href} transform={`translate(0 ${-58 + i * 20}) rotate(${p.rot * 0.5})`}>
          <g className="sign-plank" data-href={p.href} style={{ "--rot": p.rot } as CSSProperties}>
            <WornPlank dir={p.dir} w={p.w} seed={p.seed} label={p.dest!.label} />
          </g>
        </g>
      ))}
      <path d="M-9 0Q0 -3 9 0" fill="none" strokeWidth={1} />
    </g>
  );
}
