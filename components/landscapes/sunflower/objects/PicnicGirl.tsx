import { f } from "../../shared/objects/rng";
import { ink } from "../../shared/objects/palette";
import { Curls, Limb } from "./Bicycle";

type Curl = [cx: number, cy: number, r: number];

/** Her curls hanging down her back, relaxed (on the bike they stream out in the wind). */
const hanging: Curl[][] = [
  [[-4, -25, 2.5], [-6.6, -22, 2.4], [-7.8, -18.6, 2.2], [-7.2, -15.4, 1.8]],
  [[-2.6, -21, 2.6], [-4.2, -17.8, 2.5], [-5, -14.4, 2.3], [-4.6, -11.2, 2]],
];

export interface PicnicGirlSpec {
  /** where she sits (her hip rests here) */
  x: number;
  y: number;
  scale?: number;
}

/**
 * The cyclist from the footer, sitting down for a picnic: same curly hair, sunflower tucked in, cobalt top,
 * green trousers and tomato shoes, with a steaming cup of tea raised to her mouth. Faces right.
 */
export default function PicnicGirl({ x, y, scale = 1 }: PicnicGirlSpec) {
  return (
    <g
      transform={`translate(${f(x)} ${f(y)}) scale(${scale})`}
      strokeLinejoin="round"
      strokeLinecap="round"
      stroke={ink.line}
      strokeWidth={1}
    >
      {/* hair down her back, behind everything */}
      {hanging.map((circles, i) => (
        <Curls key={i} circles={circles} />
      ))}

      {/* far leg, bent and tucked */}
      <Limb d="M0 -1L8.6 -11.6L14.6 -1.4" fill={ink.leafGreen} w={3.8} />
      <ellipse cx={16.2} cy={-0.2} rx={3} ry={1.8} fill={ink.tomato} strokeWidth={0.7} />
      {/* far arm resting on her knee */}
      <Limb d="M1.2 -16.4L7.4 -11.2L12.6 -11" fill={ink.cobalt} w={2.6} />
      <circle cx={13.2} cy={-11} r={1.5} fill={ink.skin} strokeWidth={0.7} />

      {/* torso, sitting up */}
      <Limb d="M-0.6 0L2.4 -19.6" fill={ink.cobalt} w={7} />

      {/* near leg, knee drawn up */}
      <Limb d="M0 0L13 -9.4" fill={ink.leafGreen} w={4.2} />
      <Limb d="M13 -9.4L20.4 -0.6" fill={ink.leafGreen} w={3.4} />
      <ellipse cx={22} cy={0.4} rx={3.2} ry={1.9} fill={ink.tomato} strokeWidth={0.7} />

      {/* near arm, raising a cup of tea to sip */}
      <Limb d="M2 -17.6L8.8 -11.6" fill={ink.cobalt} w={3} />
      <Limb d="M8.8 -11.6L12.2 -18" fill={ink.cobalt} w={2.8} />
      {/* steam curling up from the cup */}
      <g className="tea-steam" fill="none" stroke={ink.line} strokeWidth={0.6} opacity={0.6}>
        <path d="M11.6 -26.2Q10.2 -28 11.8 -29.6Q13.2 -31.2 11.8 -32.8" />
        <path d="M14.8 -26.4Q13.6 -28 15 -29.4Q16.4 -30.8 15.2 -32.2" />
      </g>
      {/* a white teacup with a blue band and tea in it; its handle is on the far side, out of sight */}
      <path d="M9.8 -24.6H16.2V-21.6Q16.2 -18.4 13 -18.4Q9.8 -18.4 9.8 -21.6Z" fill={ink.white} strokeWidth={0.8} />
      <path d="M10 -22.4H16" fill="none" stroke={ink.cobalt} strokeWidth={0.9} />
      <ellipse cx={13} cy={-24.6} rx={3.2} ry={0.9} fill={ink.skin} strokeWidth={0.6} />
      {/* her hand around the cup */}
      <circle cx={13} cy={-19.6} r={2.2} fill={ink.skin} strokeWidth={0.7} />

      {/* neck, head, hair and face: the cyclist's, moved down to sit at her shoulders */}
      <g transform="translate(0 20)">
        <path d="M2.2 -41L4 -43.5" stroke={ink.skin} strokeWidth={2.4} />
        <Curls
          circles={[
            [0.6, -47.6, 3.6],
            [1.2, -52, 3.5],
            [5.2, -54, 3.4],
            [9, -52.6, 3],
            [-0.6, -43.6, 3],
            [2, -41.6, 2.4],
          ]}
        />
        <circle cx={5.8} cy={-47} r={4.6} fill={ink.skin} strokeWidth={0.9} />
        <Curls
          circles={[
            [4.2, -50, 2.4],
            [7.6, -50.6, 2.2],
            [10.3, -49.2, 1.6],
          ]}
        />
        {/* the little sunflower in her hair */}
        <circle cx={2.6} cy={-53.6} r={1.5} fill={ink.golden} strokeWidth={0.5} />
        <circle cx={2.6} cy={-53.6} r={0.6} fill={ink.deep} stroke="none" />
        <circle cx={8.4} cy={-46.4} r={0.7} fill={ink.hair} stroke="none" />
        <path d="M7.2 -44.4Q8.6 -43.4 9.9 -44.6" fill="none" strokeWidth={0.6} />
        <circle cx={9.2} cy={-45.2} r={0.9} fill={ink.tomato} fillOpacity={0.5} stroke="none" />
      </g>
    </g>
  );
}
