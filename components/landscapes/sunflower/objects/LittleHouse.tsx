import { f } from "./rng";
import { ink } from "./palette";

export interface LittleHouseSpec {
  x: number;
  y: number;
  /** distant houses are drawn small (0.25–0.5) */
  scale?: number;
  variant?: 0 | 1 | 2;
}

/**
 * Tiny background houses for the hills. Strokes are compensated for scale so
 * lines stay fine and delicate even when the house is drawn very small.
 */
export default function LittleHouse({ x, y, scale = 0.4, variant = 0 }: LittleHouseSpec) {
  const sw = 0.8 / scale;
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      stroke={ink.line}
      strokeWidth={f(sw)}
      strokeLinejoin="round"
      strokeLinecap="round"
      opacity={0.95}
    >
      {variant === 0 && (
        <>
          <path d="M9 -18V-30H14V-22" fill={ink.paper} />
          <path d="M-14 0V-17H14V0Z" fill={ink.paper} />
          <path d="M-18 -16L0 -31L18 -16Z" fill={ink.line} fillOpacity={0.45} />
          <path d="M-3 0V-8A3 3 0 0 1 3 -8V0Z" fill={ink.leafGreen} fillOpacity={0.8} />
          <rect x={6} y={-13} width={5} height={5} fill={ink.white} />
        </>
      )}
      {variant === 1 && (
        <>
          <path d="M-22 0V-14H22V0Z" fill={ink.paper} />
          <path d="M-24 -13L-16 -26H16L24 -13Z" fill={ink.tomato} fillOpacity={0.6} />
          <path d="M-5 0V-10H5V0Z" fill={ink.line} fillOpacity={0.4} />
          <path d="M-5 -10L5 0M5 -10L-5 0" strokeWidth={f(sw * 0.6)} fill="none" />
          <rect x={-18} y={-11} width={6} height={5} fill={ink.white} />
          <rect x={12} y={-11} width={6} height={5} fill={ink.white} />
        </>
      )}
      {variant === 2 && (
        <>
          <path d="M-10 0V-30H10V0Z" fill={ink.paper} />
          <path d="M-13 -29L0 -42L13 -29Z" fill={ink.olive} fillOpacity={0.55} />
          <path d="M10 0V-14H20V0Z" fill={ink.paper} />
          <path d="M9 -13L15 -21L21 -13Z" fill={ink.line} fillOpacity={0.45} />
          <circle cy={-22} r={3} fill={ink.white} />
          <path d="M-3 0V-7A3 3 0 0 1 3 -7V0Z" fill={ink.line} fillOpacity={0.5} />
        </>
      )}
    </g>
  );
}
