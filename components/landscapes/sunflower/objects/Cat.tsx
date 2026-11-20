import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";

export interface CatSpec {
  /** bottom centre of the cat */
  x: number;
  y: number;
  scale?: number;
}

/** A ginger cat curled up asleep, head on its paws, tail wrapped round, breathing slowly with a drifting "z z". Faces left. */
export default function Cat({ x, y, scale = 1 }: CatSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      stroke={ink.line}
      strokeWidth={0.8}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <g className="cat-breathe">
        {/* body */}
        <path d="M-9 0C-11 -8 -3 -12 4 -11C11 -10.5 13 -4 10.6 0Z" fill={ink.golden} />
        <path
          d="M-1 -11C-0.4 -8.6 -0.6 -6.4 -1.6 -4.4M3.6 -11C4.4 -8.4 4.4 -6 3.6 -3.6M8 -9.6C8.6 -7.6 8.6 -5.4 8 -3.4"
          fill="none"
          stroke={ink.tomato}
          strokeWidth={1.1}
          opacity={0.7}
        />
        {/* tail wrapped round the front */}
        <path d="M9.4 -2.4C14.6 -1 8.6 3.2 -3 1.8" fill="none" strokeWidth={4.6} />
        <path d="M9.4 -2.4C14.6 -1 8.6 3.2 -3 1.8" fill="none" stroke={ink.golden} strokeWidth={3} />
        <path d="M11.6 -0.4C11.2 0.2 10.8 0.8 10.2 1.2" fill="none" stroke={ink.butter} strokeWidth={2} />
      </g>

      {/* head, resting on its front paws */}
      <path d="M-11.6 -6.2L-12.2 -11.2L-8.4 -8.2Z" fill={ink.golden} />
      <path d="M-7.4 -8.2L-4.6 -11.6L-4 -6.4Z" fill={ink.golden} />
      <path d="M-11 -7.6L-11.2 -9.6L-9.6 -8.4Z" fill={ink.tomato} fillOpacity={0.5} stroke="none" />
      <circle cx={-8} cy={-3.8} r={4.5} fill={ink.golden} />
      <ellipse cx={-5.6} cy={-0.2} rx={3.1} ry={1.5} fill={ink.butter} strokeWidth={0.6} />
      <ellipse cx={-10.6} cy={0.1} rx={2.6} ry={1.3} fill={ink.butter} strokeWidth={0.6} />
      {/* closed eyes, nose, mouth, whiskers */}
      <path d="M-10.6 -4.2Q-9.6 -3.2 -8.6 -4.2M-7.2 -4.2Q-6.2 -3.2 -5.2 -4.2" fill="none" strokeWidth={0.6} />
      <circle cx={-7.4} cy={-2.4} r={0.7} fill={ink.tomato} stroke="none" />
      <path d="M-7.4 -1.8Q-8 -1.1 -8.8 -1.4M-7.4 -1.8Q-6.8 -1.1 -6 -1.4" fill="none" strokeWidth={0.4} />
      <path d="M-11.6 -2.6L-14.6 -3.4M-11.6 -1.8L-14.4 -1.4" fill="none" strokeWidth={0.35} opacity={0.7} />

      {/* a drifting "z z" */}
      <g className="cat-z" fill="none" strokeWidth={0.7} opacity={0.75}>
        <path d="M-6 -14.4H-3.4L-6 -11.8H-3.4" />
        <path d="M-1.4 -19H2.2L-1.4 -15.4H2.2" />
      </g>
    </g>
  );
}
