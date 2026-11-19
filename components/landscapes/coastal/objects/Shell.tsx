import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { sea } from "./palette";

export type ShellKind = "scallop" | "spiral" | "star";

export interface ShellSpec {
  x: number;
  y: number;
  kind: ShellKind;
  scale?: number;
  rot?: number;
}

/** A small beach find. The inner group is `.cs-shell` so the footer can make it hop when clicked. */
export default function Shell({ x, y, kind, scale = 1, rot = 0 }: ShellSpec) {
  return (
    <g transform={`translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${scale})`}>
      <g className="cs-shell" strokeLinejoin="round" strokeLinecap="round" stroke={ink.line} strokeWidth={0.7}>
        {kind === "scallop" && (
          <>
            <path d="M0 0C-7 -1-8 -8-4 -10Q0 -12 4 -10C8 -8 7 -1 0 0Z" fill={ink.paper} />
            <path d="M0 0L-4 -10M0 0L-1.4 -11M0 0L1.4 -11M0 0L4 -10" fill="none" strokeWidth={0.4} opacity={0.6} />
            <path d="M-2 0.8H2V2H-2Z" fill={sea.sandDark} strokeWidth={0.5} />
          </>
        )}
        {kind === "spiral" && (
          <>
            <path d="M-5 0C-6 -5-2 -9 2 -8C6 -7 7 -2 4 0Z" fill={sea.thrift} fillOpacity={0.55} />
            <path d="M-1 -6Q2 -6 2.4 -3.6Q2.6 -1.4 0.6 -1.4" fill="none" strokeWidth={0.5} />
            <path d="M-5 0H4" fill="none" />
          </>
        )}
        {kind === "star" && (
          <path
            d="M0 -9L2.2 -3.6L8 -3.2L3.4 0.4L5 6L0 2.8L-5 6L-3.4 0.4L-8 -3.2L-2.2 -3.6Z"
            fill={sea.coral}
            fillOpacity={0.8}
            transform="translate(0 3)"
          />
        )}
      </g>
    </g>
  );
}
