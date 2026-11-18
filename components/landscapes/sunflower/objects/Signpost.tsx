import { f } from "./rng";
import { ink } from "./palette";

export interface SignpostSpec {
  x: number;
  y: number;
  scale?: number;
}

/** Plank outline: dir 1 points right, -1 points left. */
const plank = (dir: 1 | -1, w: number) =>
  dir === 1
    ? `M${-w + 6} -6H${w - 6}L${w} 0L${w - 6} 6H${-w + 6}Z`
    : `M${w - 6} -6H${-w + 6}L${-w} 0L${-w + 6} 6H${w - 6}Z`;

/**
 * Wooden signpost with three arrow planks (`.sign-plank`, each rotates a touch on hover).
 * Destinations are revealed by the interactive footer layer.
 */
export default function Signpost({ x, y, scale = 1 }: SignpostSpec) {
  const planks: { y: number; dir: 1 | -1; w: number; rot: number }[] = [
    { y: -78, dir: 1, w: 28, rot: -2 },
    { y: -62, dir: -1, w: 24, rot: 2 },
    { y: -46, dir: 1, w: 26, rot: -1.5 },
  ];
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
      <path d="M-3 0V-86L0 -90L3 -86V0Z" fill={ink.line} fillOpacity={0.4} />
      <path d="M0 -4V-80" strokeWidth={0.4} opacity={0.5} />
      {planks.map((p, i) => (
        <g key={i} transform={`translate(0 ${p.y})`}>
          <g className="sign-plank" style={{ transformOrigin: "0 0" }} data-rot={p.rot}>
            <path d={plank(p.dir, p.w)} fill={ink.butter} />
            <path
              d={p.dir === 1 ? "M-14 -1.5H8M-14 2H2" : "M14 -1.5H-8M14 2H-2"}
              fill="none"
              strokeWidth={0.6}
              opacity={0.55}
            />
            <circle cx={0} cy={0} r={0.9} fill={ink.line} stroke="none" />
          </g>
        </g>
      ))}
      <path d="M-9 0Q0 -3 9 0" fill="none" strokeWidth={1} />
    </g>
  );
}
