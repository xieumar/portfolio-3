import { f } from "./rng";
import { ink } from "./palette";

export interface MailboxSpec {
  x: number;
  y: number;
  scale?: number;
}

const ARCH = "M-12 -30V-46A12 12 0 0 1 12 -46V-30Z";
const DOOR = "M-12 0V-16A12 12 0 0 1 12 -16V0Z";

/**
 * Wooden post with a cobalt mailbox. Hooks for the open interaction:
 * `.mb-door` (folds down), `.mb-envelope` (rises out), `.mb-flag` (lifts).
 */
export default function Mailbox({ x, y, scale = 1 }: MailboxSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
      {/* post */}
      <path d="M-2.6 0V-30H2.6V0Z" fill={ink.line} fillOpacity={0.4} />
      <path d="M0 -3V-26" strokeWidth={0.4} opacity={0.5} />
      <path d="M-8 -29H8" strokeWidth={1.2} />
      {/* box depth, then opening */}
      <path d={ARCH} transform="translate(5 -4)" fill={ink.cobalt} fillOpacity={0.55} />
      <path d={ARCH} fill={ink.deep} />
      {/* envelope waiting inside */}
      <g className="mb-envelope" opacity={0}>
        <g transform="translate(0 -38) rotate(-8)">
          <rect x={-8} y={-5} width={16} height={10} fill={ink.paper} strokeWidth={0.7} />
          <path d="M-8 -5L0 1L8 -5" fill="none" strokeWidth={0.6} />
          <rect x={3.5} y={0.8} width={3} height={3} fill={ink.raspberry} stroke="none" />
        </g>
      </g>
      {/* door: pivots at the bottom edge */}
      <g transform="translate(0 -30)">
        <g className="mb-door">
          <path d={DOOR} fill={ink.cobalt} fillOpacity={0.9} />
          <path d="M-8 -18A8 8 0 0 1 8 -18" fill="none" stroke={ink.white} strokeWidth={0.6} opacity={0.5} />
          <circle cy={-6} r={1.2} fill={ink.golden} strokeWidth={0.4} />
        </g>
      </g>
      {/* flag */}
      <g transform="translate(17 -38)">
        <g className="mb-flag">
          <path d="M0 0V-14" strokeWidth={0.9} />
          <path d="M0 -14H8V-9H0Z" fill={ink.tomato} strokeWidth={0.7} />
        </g>
      </g>
    </g>
  );
}
