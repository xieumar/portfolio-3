import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";

export interface CottageSpec {
  x: number;
  y: number;
  scale?: number;
}

/** A small garden cottage with chimney, arched door and a flower box. Origin: centre of the ground line. */
export default function Cottage({ x, y, scale = 1 }: CottageSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
      {/* chimney + smoke */}
      <path d="M22 -58V-80H34V-64" fill={ink.paper} />
      <path d="M21 -80H35" />
      <path className="sf-smoke" d="M28 -85Q24 -91 29 -96Q33 -101 28 -106" fill="none" strokeWidth={0.7} opacity={0.5} />
      {/* walls */}
      <path d="M-45 0V-45L0 -46L45 -45V0Z" fill={ink.paper} />
      <path d="M-45 -9H45" strokeWidth={0.5} opacity={0.5} />
      <path d="M-45 -4H-30M-12 -4H4M20 -4H36" strokeWidth={0.4} opacity={0.5} />
      {/* roof */}
      <path d="M-56 -43L-1 -84L56 -43Z" fill={ink.butter} />
      <path d="M-47 -48L-1 -80M-38 -54L-1 -80M-47 -48H47" fill="none" strokeWidth={0.5} opacity={0.6} />
      <path d="M-56 -43H56" fill="none" />
      {/* door */}
      <path d="M-10 0V-24A8 8 0 0 1 6 -24V0Z" fill={ink.leafGreen} fillOpacity={0.85} />
      <circle cx={2.6} cy={-12} r={0.9} fill={ink.golden} strokeWidth={0.4} />
      {/* windows */}
      <rect x={-38} y={-34} width={15} height={15} fill={ink.white} fillOpacity={0.8} />
      <path d="M-30.5 -34V-19M-38 -26.5H-23" strokeWidth={0.6} />
      <rect x={19} y={-34} width={15} height={15} fill={ink.white} fillOpacity={0.8} />
      <path d="M26.5 -34V-19M19 -26.5H34" strokeWidth={0.6} />
      {/* flower box */}
      <path d="M17 -18H36V-14H17Z" fill={ink.line} fillOpacity={0.4} />
      <circle cx={21} cy={-19.5} r={1.3} fill={ink.raspberry} strokeWidth={0.4} />
      <circle cx={26.5} cy={-20} r={1.3} fill={ink.golden} strokeWidth={0.4} />
      <circle cx={32} cy={-19.5} r={1.3} fill={ink.raspberry} strokeWidth={0.4} />
      {/* doorstep */}
      <path d="M-13 0H9" strokeWidth={1.4} />
    </g>
  );
}
