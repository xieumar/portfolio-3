import type { CSSProperties } from "react";
import { f } from "./rng";
import { ink } from "./palette";

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
function Limb({ d, fill, w }: { d: string; fill: string; w: number }) {
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

function Rider() {
  return (
    <g>
      {/* far leg, then body, then near leg */}
      <Leg phase={1} />
      {/* ponytail streaming behind */}
      <path d="M1.2 -49.5Q-3 -49 -5 -45.5Q-2 -46.5 1.5 -46Z" fill={ink.deep} strokeWidth={0.6} />
      {/* torso leaning toward the bars */}
      <Limb d="M-8 -27L1.5 -39" fill={ink.cobalt} w={6.6} />
      {/* arm to the grip */}
      <Limb d="M2 -39L7 -33.5L10 -28.2" fill={ink.cobalt} w={3} />
      <circle cx={10.2} cy={-27.6} r={1.7} fill={ink.butter} strokeWidth={0.7} />
      {/* neck, head, helmet and face */}
      <path d="M2.2 -41L4 -43.5" stroke={ink.butter} strokeWidth={2.4} />
      <circle cx={5.8} cy={-47} r={4.6} fill={ink.butter} strokeWidth={0.9} />
      <path d="M1.2 -47.6A4.7 4.7 0 0 1 10.6 -48.4L9.6 -49.2Q5.5 -51.6 1.6 -48.6Z" fill={ink.golden} strokeWidth={0.8} />
      <path d="M9.4 -49.4L12.2 -48.2" strokeWidth={0.9} />
      <circle cx={8.4} cy={-46.6} r={0.7} fill={ink.deep} stroke="none" />
      <path d="M7.2 -44.4Q8.6 -43.4 9.9 -44.6" fill="none" strokeWidth={0.6} />
      <circle cx={9.2} cy={-45.2} r={0.9} fill={ink.raspberry} fillOpacity={0.45} stroke="none" />
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
