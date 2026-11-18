import { f } from "./rng";
import { ink } from "./palette";

export interface BicycleSpec {
  x: number;
  y: number;
  scale?: number;
}

function Wheel({ cx }: { cx: number }) {
  return (
    <g transform={`translate(${cx} -10)`}>
      <circle r={10} fill="none" strokeWidth={1.1} />
      <circle r={8.6} fill="none" strokeWidth={0.4} opacity={0.6} />
      <path d="M-8.6 0H8.6M0 -8.6V8.6M-6 -6L6 6M6 -6L-6 6" strokeWidth={0.35} opacity={0.6} fill="none" />
      <circle r={1.2} fill={ink.line} />
    </g>
  );
}

/** A little parked bicycle with a sunflower in its front basket. */
export default function Bicycle({ x, y, scale = 1 }: BicycleSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
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
      {/* kickstand */}
      <path d="M-4 -9L-9 0" fill="none" strokeWidth={0.7} />
      {/* basket with a flower */}
      <path d="M12 -29H22L20 -22H14Z" fill={ink.butter} fillOpacity={0.7} strokeWidth={0.8} />
      <path d="M14 -29V-22M17 -29V-22M20 -29V-22" strokeWidth={0.4} opacity={0.6} />
      <path d="M17 -29V-33" stroke={ink.olive} strokeWidth={0.8} />
      <circle cx={17} cy={-35.5} r={3.4} fill={ink.golden} strokeWidth={0.6} />
      <circle cx={17} cy={-35.5} r={1.4} fill={ink.deep} strokeWidth={0.4} />
    </g>
  );
}
