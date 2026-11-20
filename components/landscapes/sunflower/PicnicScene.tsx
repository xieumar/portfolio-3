import "../shared/landscape.css";
import "./sunflower.css";
import type { CSSProperties } from "react";
import Bird from "../shared/objects/Bird";
import Bush from "../shared/objects/Bush";
import Butterfly from "../shared/objects/Butterfly";
import Cloud from "../shared/objects/Cloud";
import Grass from "../shared/objects/Grass";
import Ground from "../shared/objects/Ground";
import Hills, { ridgeY } from "../shared/objects/Hills";
import Tree from "../shared/objects/Tree";
import { ink } from "../shared/objects/palette";
import { f } from "../shared/objects/rng";
import Cat from "./objects/Cat";
import LittleHouse from "./objects/LittleHouse";
import PicnicGirl from "./objects/PicnicGirl";

const W = 200;
const H = 250;
const WAVE = 220;
const GROUND = 198;

// The blanket is a trapezoid (far edge narrower than the near edge) so it reads as lying on the grass.
const FAR = { y: 214, x0: 64, x1: 142 };
const NEAR = { y: 242, x0: 34, x1: 172 };

function Blanket() {
  const cols = 8;
  const rows = 6;
  const fx = (i: number) => FAR.x0 + ((FAR.x1 - FAR.x0) * i) / cols;
  const nx = (i: number) => NEAR.x0 + ((NEAR.x1 - NEAR.x0) * i) / cols;
  const at = (j: number) => FAR.y + ((NEAR.y - FAR.y) * j) / rows;
  const left = (y: number) => FAR.x0 + (NEAR.x0 - FAR.x0) * ((y - FAR.y) / (NEAR.y - FAR.y));
  const right = (y: number) => FAR.x1 + (NEAR.x1 - FAR.x1) * ((y - FAR.y) / (NEAR.y - FAR.y));
  const outline = `M${FAR.x0} ${FAR.y}L${FAR.x1} ${FAR.y}L${NEAR.x1} ${NEAR.y}L${NEAR.x0} ${NEAR.y}Z`;

  return (
    <g strokeLinejoin="round">
      {/* a soft shadow on the grass */}
      <ellipse cx={103} cy={245} rx={74} ry={4} fill={ink.line} fillOpacity={0.14} />
      <path d={outline} fill={ink.paper} />
      {/* gingham: translucent stripes one way, then the other, so the crossings come out darker */}
      {Array.from({ length: cols / 2 }, (_, k) => k * 2).map((i) => (
        <path
          key={`c${i}`}
          d={`M${f(fx(i))} ${FAR.y}L${f(fx(i + 1))} ${FAR.y}L${f(nx(i + 1))} ${NEAR.y}L${f(nx(i))} ${NEAR.y}Z`}
          fill={ink.raspberry}
          fillOpacity={0.3}
        />
      ))}
      {Array.from({ length: rows / 2 }, (_, k) => k * 2).map((j) => (
        <path
          key={`r${j}`}
          d={`M${f(left(at(j)))} ${f(at(j))}L${f(right(at(j)))} ${f(at(j))}L${f(right(at(j + 1)))} ${f(at(j + 1))}L${f(left(at(j + 1)))} ${f(at(j + 1))}Z`}
          fill={ink.raspberry}
          fillOpacity={0.3}
        />
      ))}
      <path d={outline} fill="none" stroke={ink.line} strokeWidth={0.9} />
      {/* a turned-up corner */}
      <path d="M34 242L47 242L39 235.5Z" fill={ink.paper} stroke={ink.line} strokeWidth={0.7} />
      <path d="M34 242L47 242L39 235.5Z" fill={ink.raspberry} fillOpacity={0.3} stroke="none" />
    </g>
  );
}

/** A wicker basket with a baguette and a napkin poking out. */
function Basket({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeLinejoin="round" strokeLinecap="round" stroke={ink.line}>
      {/* baguette */}
      <path d="M-2 -12L7 -24" fill="none" strokeWidth={6} />
      <path d="M-2 -12L7 -24" fill="none" stroke={ink.golden} strokeWidth={4.6} />
      <path d="M0.4 -15L1.6 -16.6M2.6 -17.8L3.8 -19.4M4.8 -20.6L6 -22.2" fill="none" stroke={ink.butter} strokeWidth={0.8} />
      {/* napkin */}
      <path d="M-10 -12L-2 -10L-9 -4Z" fill={ink.raspberry} fillOpacity={0.55} strokeWidth={0.7} />
      {/* body */}
      <path d="M-12 -12H12L10 4H-10Z" fill={ink.butter} fillOpacity={0.85} strokeWidth={0.9} />
      <path d="M-11.4 -7.5H11.4M-10.8 -3H10.8M-10.4 1.2H10.4" fill="none" strokeWidth={0.4} opacity={0.6} />
      <path d="M-6 -12L-5 4M0 -12V4M6 -12L5 4" fill="none" strokeWidth={0.4} opacity={0.6} />
      {/* handle */}
      <path d="M-9.5 -12Q0 -29 9.5 -12" fill="none" strokeWidth={1.3} />
    </g>
  );
}

/** Two triangle sandwiches and a pair of cherries on a plate. */
function Plate({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} strokeLinejoin="round" strokeLinecap="round" stroke={ink.line}>
      <ellipse rx={13} ry={3.8} fill={ink.white} strokeWidth={0.8} />
      <ellipse rx={9} ry={2.4} fill="none" strokeWidth={0.4} opacity={0.5} />
      <path d="M-9.5 -0.6L-2.6 -7.4L1.2 -0.6Z" fill={ink.butter} strokeWidth={0.8} />
      <path d="M-8.4 -1.8H-0.2" fill="none" stroke={ink.leafGreen} strokeWidth={1.2} />
      <path d="M-1 -0.4L5 -6.6L9.4 -0.4Z" fill={ink.butter} strokeWidth={0.8} />
      <path d="M0.2 -1.6H8" fill="none" stroke={ink.tomato} strokeWidth={1} />
      <path d="M8.6 -1.4Q9.4 -6 11.6 -7.4" fill="none" stroke={ink.olive} strokeWidth={0.6} />
      <circle cx={8.6} cy={-0.4} r={1.9} fill={ink.raspberry} strokeWidth={0.5} />
      <circle cx={11.6} cy={-1} r={1.7} fill={ink.raspberry} strokeWidth={0.5} />
    </g>
  );
}

/** A jar of lemonade with a lemon slice on the rim and a striped straw. */
function Lemonade({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeLinejoin="round" strokeLinecap="round" stroke={ink.line}>
      <path d="M1.4 -26L3 -10" fill="none" stroke={ink.tomato} strokeWidth={1.6} />
      <path d="M1.9 -22L2.3 -19M2.5 -17L2.8 -14" fill="none" stroke={ink.white} strokeWidth={1.1} />
      <rect x={-6} y={-16} width={12} height={16} rx={2.2} fill={ink.white} fillOpacity={0.55} strokeWidth={0.8} />
      <rect x={-5.2} y={-10.5} width={10.4} height={10.2} rx={1.6} fill={ink.golden} fillOpacity={0.75} stroke="none" />
      <path d="M-3 -6.5Q-1.4 -5.2 0.2 -6.6M0.8 -3.4Q2.4 -2.2 4 -3.6" fill="none" stroke={ink.white} strokeWidth={0.5} opacity={0.8} />
      <rect x={-6.4} y={-18.4} width={12.8} height={2.8} rx={1} fill={ink.olive} strokeWidth={0.7} />
      <g transform="translate(6 -15.5)">
        <circle r={3.4} fill={ink.butter} strokeWidth={0.6} stroke={ink.golden} />
        <path d="M0 -3V3M-3 0H3M-2.1 -2.1L2.1 2.1M2.1 -2.1L-2.1 2.1" stroke={ink.golden} strokeWidth={0.35} />
      </g>
    </g>
  );
}

/** A string of pennants slung between the tree and a post. */
function Bunting() {
  const p0 = [37, 134] as const;
  const p1 = [112, 172] as const;
  const p2 = [184, 144] as const;
  const colors = [ink.raspberry, ink.golden, ink.cobalt, ink.butter, ink.tomato, ink.leafGreen];
  const at = (t: number) => ({
    x: (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0],
    y: (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1],
  });
  const flags = Array.from({ length: 9 }, (_, i) => at(0.1 + i * 0.1));

  return (
    <g strokeLinejoin="round" strokeLinecap="round" stroke={ink.line}>
      <path d={`M184 144L184 ${GROUND}`} fill="none" strokeWidth={1.5} />
      <circle cx={184} cy={143} r={1.6} fill={ink.line} />
      <path d={`M${p0[0]} ${p0[1]}Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`} fill="none" strokeWidth={0.7} />
      {flags.map((p, i) => (
        <path
          key={i}
          d={`M${f(p.x - 4)} ${f(p.y)}L${f(p.x + 4)} ${f(p.y)}L${f(p.x)} ${f(p.y + 9)}Z`}
          fill={colors[i % colors.length]}
          fillOpacity={0.85}
          strokeWidth={0.6}
        />
      ))}
    </g>
  );
}

/**
 * The footer's cyclist girl, off her bike and having a picnic under a tree. Same hand-drawn objects and
 * palette as the header and footer landscapes: hills with tiny houses, drifting clouds, birds, and a butterfly.
 */
export default function PicnicScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      focusable="false"
      aria-hidden="true"
      className={className}
      style={{ "--span": `${W}px` } as CSSProperties}
    >
      <defs>
        <linearGradient id="picnic-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={ink.butter} />
          <stop offset="0.6" stopColor={ink.paper} />
        </linearGradient>
      </defs>

      {/* sky and sun */}
      <rect width={W} height={H} fill="url(#picnic-sky)" />
      <g stroke={ink.golden} strokeWidth={1.1} strokeLinecap="round" opacity={0.85}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <path
              key={i}
              d={`M${f(152 + Math.cos(a) * 23)} ${f(44 + Math.sin(a) * 23)}L${f(152 + Math.cos(a) * 29)} ${f(44 + Math.sin(a) * 29)}`}
              fill="none"
            />
          );
        })}
      </g>
      <circle cx={152} cy={44} r={18} fill={ink.golden} stroke={ink.line} strokeWidth={0.9} />
      <circle cx={146} cy={39} r={6} fill={ink.butter} fillOpacity={0.5} />

      <Cloud x={14} y={26} scale={0.95} drift={{ dur: 46, delay: -8 }} />
      <Cloud x={92} y={14} scale={0.75} variant={1} drift={{ dur: 38, delay: -22 }} />
      <Bird x={78} y={66} scale={0.85} cross={{ dur: 9, delay: -2 }} />
      <Bird x={96} y={74} scale={0.65} cross={{ dur: 10, delay: -3 }} />

      {/* hills, with a few tiny houses and trees */}
      <Hills width={W} bottom={H} far={112} near={134} wave={WAVE} />
      <LittleHouse x={150} y={ridgeY(150, 112, 9, WAVE * 1.1, 0.8) + 2} scale={0.4} variant={2} />
      <LittleHouse x={96} y={ridgeY(96, 112, 9, WAVE * 1.1, 0.8) + 2} scale={0.34} variant={0} />
      <LittleHouse x={118} y={ridgeY(118, 134, 8, WAVE * 0.8, 2.6) + 2} scale={0.46} variant={1} />
      {[24, 62, 170].map((x, i) => (
        <Tree key={x} x={x} y={ridgeY(x, 134, 8, WAVE * 0.8, 2.6) + 2} h={7 + (i % 2)} r={6 + i} seed={700 + i} />
      ))}

      {/* the meadow */}
      <path
        d={`M-4 ${GROUND} Q48 ${GROUND - 9} 100 ${GROUND - 3} T204 ${GROUND - 6} V${H} H-4Z`}
        fill={ink.leaf}
        fillOpacity={0.35}
        stroke={ink.olive}
        strokeWidth={0.9}
        strokeLinejoin="round"
      />
      <Ground width={W} y={GROUND + 6} seed={3} />

      {/* the tree she is sitting near, with its shade, and a bush */}
      <ellipse cx={36} cy={GROUND + 8} rx={32} ry={4.2} fill={ink.olive} fillOpacity={0.2} />
      <Tree x={34} y={GROUND + 4} h={84} r={38} seed={3} sway={{ dur: 8, delay: -3, amp: 0.6 }} />
      <Bush x={168} y={GROUND + 4} r={13} seed={4} berries={ink.raspberry} />
      <Bunting />

      {[
        [10, 222], [20, 236], [50, 246], [176, 232], [190, 244], [160, 247],
      ].map(([gx, gy], i) => (
        <Grass key={i} x={gx} y={gy} len={9 + (i % 3) * 3} seed={40 + i} blades={6} sway={{ dur: 4.5 + i * 0.4, delay: -i, amp: 2.4 }} />
      ))}

      {/* the picnic */}
      <Blanket />
      <Basket x={56} y={230} />
      <Lemonade x={131} y={222} />
      <PicnicGirl x={84} y={235} scale={1.2} />
      <Plate x={129} y={238} scale={0.88} />
      <Cat x={153} y={237} scale={1.05} />

      {/* a visitor */}
      <Butterfly x={112} y={176} scale={0.85} color={ink.cobalt} fly={{ dur: 24, delay: -6, x0: -90, x1: 100 }} />

      {/* a few blades in front of the blanket's edge */}
      {[[30, 249], [76, 250], [128, 250], [182, 250]].map(([gx, gy], i) => (
        <Grass key={i} x={gx} y={gy} len={10 + (i % 2) * 4} seed={60 + i} blades={7} sway={{ dur: 5 + i * 0.5, delay: -i * 1.3, amp: 2.2 }} />
      ))}
    </svg>
  );
}
