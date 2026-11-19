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

/** One pedalling leg: thigh swings at the hip, shin swings at the knee (`.bike-thigh` / `.bike-shin`). */
function Leg({ phase }: { phase: 0 | 1 }) {
  const style = { animationDelay: phase ? "calc(var(--pedal) * -1)" : undefined };
  return (
    <g transform="translate(-8 -25)">
      <g className="bike-thigh" style={style}>
        <path d="M0 0V11" stroke={ink.deep} strokeWidth={2.8} fill="none" />
        <g transform="translate(0 11)">
          <g className="bike-shin" style={style}>
            <path d="M0 0V11" stroke={ink.deep} strokeWidth={2.4} fill="none" />
            <path d="M-0.5 11.4H3.6" stroke={ink.tomato} strokeWidth={2.2} fill="none" />
          </g>
        </g>
      </g>
    </g>
  );
}

function Rider() {
  return (
    <g>
      <Leg phase={1} />
      {/* torso leaning toward the handlebars */}
      <path d="M-10.5 -24.5L-4.5 -27L6.5 -40L1 -42.5Z" fill={ink.cobalt} />
      {/* arm to the grip */}
      <path d="M3.5 -40L8 -33.5L10 -27.8" stroke={ink.cobalt} strokeWidth={2.4} fill="none" />
      {/* head and cap */}
      <circle cx={6.5} cy={-46} r={4} fill={ink.butter} strokeWidth={0.8} />
      <path d="M2.6 -47A4 4 0 0 1 10.4 -47Z" fill={ink.raspberry} strokeWidth={0.8} />
      <path d="M2.6 -47H13" strokeWidth={0.8} />
      <Leg phase={0} />
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
      <path d="M-3 -9L-6 -5M-3 -9L0 -13" fill="none" strokeWidth={0.8} />
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
