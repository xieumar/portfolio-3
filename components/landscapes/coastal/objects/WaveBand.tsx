import type { CSSProperties } from "react";
import { f } from "../../shared/objects/rng";

export interface WaveBandProps {
  width: number;
  /** resting height of the wave line */
  y: number;
  /** bottom of the filled shape */
  bottom: number;
  /** length of one full wave: the loop point of the drift animation */
  wavelength: number;
  amp: number;
  fill: string;
  stroke: string;
  opacity?: number;
  /** `dur` is one wavelength of drift, in seconds; negative `delay` desynchronises bands */
  drift?: { dur: number; delay: number; bobDur?: number; bobDelay?: number };
}

/**
 * One band of sea. The line is exactly periodic, so sliding it left by one wavelength looks
 * identical to the start: the drift loops with no visible jump. A slower vertical bob on an
 * outer group keeps neighbouring bands from moving in lockstep.
 */
export default function WaveBand({ width, y, bottom, wavelength: w, amp, fill, stroke, opacity = 1, drift }: WaveBandProps) {
  const periods = Math.ceil(width / w) + 2;
  let d = `M${f(-w)} ${f(y)}`;
  for (let i = 0; i < periods; i++) {
    const x = -w + i * w;
    d += `Q${f(x + w / 4)} ${f(y - amp * 2)} ${f(x + w / 2)} ${f(y)}T${f(x + w)} ${f(y)}`;
  }
  const endX = -w + periods * w;
  const style = drift
    ? ({
        "--dur": `${drift.dur}s`,
        "--delay": `${drift.delay}s`,
        "--wl": `${w}px`,
        "--bob-dur": `${drift.bobDur ?? 6}s`,
        "--bob-delay": `${drift.bobDelay ?? 0}s`,
      } as CSSProperties)
    : undefined;
  return (
    <g className={drift ? "cs-bob-y" : undefined} style={style} opacity={opacity}>
      <g className={drift ? "cs-wave" : undefined}>
        <path d={`${d}L${f(endX)} ${f(bottom)}L${f(-w)} ${f(bottom)}Z`} fill={fill} />
        <path d={d} fill="none" stroke={stroke} strokeWidth={0.8} strokeLinecap="round" />
      </g>
    </g>
  );
}
