import type { CSSProperties } from "react";
import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";

export interface BicycleSpec {
  x: number;
  y: number;
  scale?: number;
  /**
   * When set, a cyclist rides across the scene (x0/x1 are offsets from x/y's origin in scene units),
   * then the bike is out of sight until the next cycle. Without it the bicycle is parked.
   */
  ride?: { dur: number; delay: number; x0: number; x1: number };
}

function Wheel({ cx }: { cx: number }) {
  return (
    <g transform={`translate(${cx} -10)`}>
      <g className="bike-wheel">
        <circle r={10} fill="none" strokeWidth={1.1} />
        <circle r={8.6} fill="none" strokeWidth={0.4} opacity={0.6} />
        <path d="M-8.6 0H8.6M0 -8.6V8.6M-6 -6L6 6M6 -6L-6 6" strokeWidth={0.35} opacity={0.6} fill="none" />
        <circle r={1.2} fill={ink.line} />
      </g>
    </g>
  );
}

/** Outlined limb: a dark outline stroke under a coloured fill stroke, so it matches the line-art style. */
export function Limb({ d, fill, w }: { d: string; fill: string; w: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={ink.line} strokeWidth={w + 1.4} />
      <path d={d} fill="none" stroke={fill} strokeWidth={w} />
    </>
  );
}

/**
 * One pedalling leg. The thigh swings at the hip and the shin at the knee; the keyframes are
 * inverse-kinematics poses, so the foot follows the pedal around the crank. `phase` 1 is half a turn behind.
 */
function Leg({ phase }: { phase: 0 | 1 }) {
  const style = { animationDelay: phase ? "calc(var(--pedal) / -2)" : undefined };
  return (
    <g transform="translate(-8 -26)">
      <g className="bike-thigh" style={style}>
        <Limb d="M0 0V11.5" fill={ink.leafGreen} w={4.2} />
        <g transform="translate(0 11.5)">
          <g className="bike-shin" style={style}>
            <Limb d="M0 0V11.5" fill={ink.leafGreen} w={3.4} />
            {/* shoe */}
            <ellipse cx={1.6} cy={11.6} rx={3.2} ry={1.9} fill={ink.tomato} strokeWidth={0.7} />
          </g>
        </g>
      </g>
    </g>
  );
}

type Curl = [cx: number, cy: number, r: number];

/** A clump of overlapping circles that reads as curly hair: outlined as one silhouette, with a ringlet in each curl. */
export function Curls({ circles }: { circles: Curl[] }) {
  return (
    <>
      {circles.map(([cx, cy, r], i) => (
        <circle key={`o${i}`} cx={cx} cy={cy} r={r} fill={ink.hair} stroke={ink.line} strokeWidth={0.9} />
      ))}
      {circles.map(([cx, cy, r], i) => (
        <circle key={`f${i}`} cx={cx} cy={cy} r={r - 0.4} fill={ink.hair} stroke="none" />
      ))}
      {circles.map(([cx, cy, r], i) => (
        <path
          key={`c${i}`}
          d={`M${f(cx - r * 0.45)} ${f(cy + r * 0.1)}a${f(r * 0.45)} ${f(r * 0.45)} 0 1 1 ${f(r * 0.6)} ${f(r * 0.55)}`}
          fill="none"
          stroke={ink.paper}
          strokeWidth={0.4}
          opacity={0.35}
        />
      ))}
    </>
  );
}

/** Curls blown back by the wind: each chain bobs on its own rhythm (`.bike-curl`, anchored at the head end). */
const trailing: { circles: Curl[]; dur: number; delay: number }[] = [
  // upper bundles
  { circles: [[-2, -55, 2.6], [-5.8, -56.4, 2.4], [-9.6, -55.4, 2.2], [-13, -56.8, 1.8]], dur: 0.6, delay: -0.1 },
  { circles: [[-3, -51.5, 3], [-7.2, -52.8, 2.7], [-11.2, -51.6, 2.4], [-15, -53, 2], [-18.4, -51.6, 1.5]], dur: 0.55, delay: 0 },
  // middle bundles
  { circles: [[-3.4, -48, 3.1], [-7.8, -48.8, 2.8], [-12, -47.6, 2.5], [-16, -49, 2], [-19.4, -47.6, 1.5]], dur: 0.7, delay: -0.25 },
  { circles: [[-3, -45, 3], [-7.4, -44.6, 2.6], [-11.4, -45.8, 2.3], [-15, -44.4, 1.9]], dur: 0.5, delay: -0.15 },
  // lower bundles
  { circles: [[-2, -41.6, 2.7], [-6, -40.8, 2.4], [-9.8, -42, 2.1], [-13, -40.6, 1.7]], dur: 0.62, delay: -0.4 },
  { circles: [[-1, -38.6, 2.3], [-4.6, -37.6, 2], [-8, -38.8, 1.7]], dur: 0.58, delay: -0.3 },
];

function Rider() {
  return (
    <g>
      {/* far leg, then body, then near leg */}
      <Leg phase={1} />
      {/* curly hair streaming back in the wind */}
      {trailing.map((c, i) => (
        <g key={i} className="bike-curl" style={{ animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
          <Curls circles={c.circles} />
        </g>
      ))}
      {/* torso leaning toward the bars */}
      <Limb d="M-8 -27L1.5 -39" fill={ink.cobalt} w={6.6} />
      {/* arm to the grip */}
      <Limb d="M2 -39L7 -33.5L10 -28.2" fill={ink.cobalt} w={3} />
      <circle cx={10.2} cy={-27.6} r={1.7} fill={ink.skin} strokeWidth={0.7} />
      {/* neck, head, hair and face */}
      <path d="M2.2 -41L4 -43.5" stroke={ink.skin} strokeWidth={2.4} />
      <Curls circles={[[0.6, -47.6, 3.6], [1.2, -52, 3.5], [5.2, -54, 3.4], [9, -52.6, 3], [-0.6, -43.6, 3], [2, -41.6, 2.4]]} />
      <circle cx={5.8} cy={-47} r={4.6} fill={ink.skin} strokeWidth={0.9} />
      {/* side-swept curly fringe, with a little sunflower tucked in */}
      <Curls circles={[[4.2, -50, 2.4], [7.6, -50.6, 2.2], [10.3, -49.2, 1.6]]} />
      <circle cx={2.6} cy={-53.6} r={1.5} fill={ink.golden} strokeWidth={0.5} />
      <circle cx={2.6} cy={-53.6} r={0.6} fill={ink.deep} stroke="none" />
      <circle cx={8.4} cy={-46.4} r={0.7} fill={ink.hair} stroke="none" />
      <path d="M7.2 -44.4Q8.6 -43.4 9.9 -44.6" fill="none" strokeWidth={0.6} />
      <circle cx={9.2} cy={-45.2} r={0.9} fill={ink.tomato} fillOpacity={0.5} stroke="none" />
      <Leg phase={0} />
      {/* crank arms and pedals, turning with the legs */}
      <g transform="translate(-3 -9)">
        <g className="bike-crank">
          <path d="M-5 0H5" strokeWidth={1.1} />
          <path d="M3.4 0.2H7" strokeWidth={1.8} />
          <path d="M-7 0.2H-3.4" strokeWidth={1.8} />
        </g>
      </g>
    </g>
  );
}

/** A little bicycle with a sunflower in its front basket: parked, or ridden across the scene on a loop. */
export default function Bicycle({ x, y, scale = 1, ride }: BicycleSpec) {
  const bike = (
    <g transform={`scale(${scale})`} strokeLinejoin="round" strokeLinecap="round" stroke={ink.line} strokeWidth={1}>
      <Wheel cx={-16} />
      <Wheel cx={16} />
      {/* frame */}
      <g fill="none" stroke={ink.raspberry} strokeWidth={1.3}>
        <path d="M-16 -10L-3 -9L10 -21L-8 -22L-3 -9M-8 -22L-16 -10M10 -21L16 -10" />
      </g>
      {/* seat, bars, pedal */}
      <path d="M-11 -23.5H-5" strokeWidth={1.6} />
      <path d="M10 -21L9 -27M7 -28L13 -27" fill="none" />
      {!ride && <path d="M-3 -9L-6 -5M-3 -9L0 -13" fill="none" strokeWidth={0.8} />}
      {/* kickstand (parked only) */}
      {!ride && <path d="M-4 -9L-9 0" fill="none" strokeWidth={0.7} />}
      {ride && <Rider />}
      {/* basket with a flower */}
      <path d="M12 -29H22L20 -22H14Z" fill={ink.butter} fillOpacity={0.7} strokeWidth={0.8} />
      <path d="M14 -29V-22M17 -29V-22M20 -29V-22" strokeWidth={0.4} opacity={0.6} />
      <path d="M17 -29V-33" stroke={ink.olive} strokeWidth={0.8} />
      <circle cx={17} cy={-35.5} r={3.4} fill={ink.golden} strokeWidth={0.6} />
      <circle cx={17} cy={-35.5} r={1.4} fill={ink.deep} strokeWidth={0.4} />
    </g>
  );

  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      {ride ? (
        <g
          className="sf-ride"
          style={
            {
              "--dur": `${ride.dur}s`,
              "--delay": `${ride.delay}s`,
              "--x0": `${ride.x0}px`,
              "--x1": `${ride.x1}px`,
            } as CSSProperties
          }
        >
          {bike}
        </g>
      ) : (
        bike
      )}
    </g>
  );
}
