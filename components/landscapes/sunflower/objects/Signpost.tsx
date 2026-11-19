import type { CSSProperties } from "react";
import { allDestinations } from "@/config/navigation";
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
    ? `M${-w + 6} -6.5H${w - 6}L${w} 0L${w - 6} 6.5H${-w + 6}Z`
    : `M${w - 6} -6.5H${-w + 6}L${-w} 0L${-w + 6} 6.5H${w - 6}Z`;

/** Alternating directions, widths and tilts so the planks look hand-nailed. */
const layout = [
  { dir: 1 as const, w: 30, rot: -2 },
  { dir: -1 as const, w: 27, rot: 2 },
  { dir: 1 as const, w: 29, rot: -1.5 },
  { dir: -1 as const, w: 28, rot: 1.5 },
];

/**
 * Wooden signpost whose arrow planks are lettered with the site's destinations.
 * Each `.sign-plank` carries `data-href`; the interactive footer layer navigates on click.
 */
export default function Signpost({ x, y, scale = 1 }: SignpostSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
      <path d="M-3 0V-96L0 -100L3 -96V0Z" fill={ink.line} fillOpacity={0.4} />
      <path d="M0 -4V-90" strokeWidth={0.4} opacity={0.5} />
      {allDestinations.slice(0, layout.length).map((d, i) => {
        const p = layout[i];
        return (
          <g key={d.href} transform={`translate(0 ${-86 + i * 15})`}>
            <g className="sign-plank" data-href={d.href} style={{ "--rot": p.rot } as CSSProperties}>
              <path d={plank(p.dir, p.w)} fill={ink.butter} />
              <text
                x={p.dir * 2.5}
                y={0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={ink.deep}
                stroke="none"
                fontSize={6.6}
                fontWeight={600}
                style={{ fontFamily: "inherit", letterSpacing: "0.02em" }}
              >
                {d.label}
              </text>
            </g>
          </g>
        );
      })}
      <path d="M-9 0Q0 -3 9 0" fill="none" strokeWidth={1} />
    </g>
  );
}
