import { f } from "./rng";
import { ink } from "./palette";

export type WildflowerKind = "daisy" | "cobalt" | "raspberry" | "tomato";

export interface WildflowerSpec {
  x: number;
  y: number;
  h: number;
  kind: WildflowerKind;
  lean?: number;
}

const PETAL = "M0 0C-1.7-1.2-1.7-3.6 0-4.2C1.7-3.6 1.7-1.2 0 0Z";
const COLORS: Record<WildflowerKind, string> = {
  daisy: ink.white,
  cobalt: ink.cobalt,
  raspberry: ink.raspberry,
  tomato: ink.tomato,
};

export default function Wildflower({ x, y, h, kind, lean = 0 }: WildflowerSpec) {
  return (
    <g transform={`translate(${f(x)} ${f(y)})`} strokeLinejoin="round" strokeLinecap="round">
      <path
        d={`M0 0Q${f(lean * 0.2)} ${f(-h * 0.5)} ${f(lean)} ${f(-h)}`}
        fill="none"
        stroke={ink.olive}
        strokeWidth={0.8}
      />
      <path
        d={`M${f(lean * 0.2)} ${f(-h * 0.35)}q-4 -1 -5 -4q4 0 5 4Z`}
        fill={ink.leaf}
        fillOpacity={0.6}
        stroke={ink.olive}
        strokeWidth={0.5}
      />
      <g transform={`translate(${f(lean)} ${f(-h)})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <path
            key={a}
            d={PETAL}
            transform={`rotate(${a})`}
            fill={COLORS[kind]}
            fillOpacity={0.9}
            stroke={ink.line}
            strokeWidth={0.5}
          />
        ))}
        <circle r={1.3} fill={ink.golden} stroke={ink.line} strokeWidth={0.4} />
      </g>
    </g>
  );
}
