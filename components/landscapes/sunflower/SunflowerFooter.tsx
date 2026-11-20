import "../shared/landscape.css";
import "./sunflower.css";
import type { CSSProperties } from "react";
import FooterInteractions from "../shared/FooterInteractions";
import LandscapeMotion from "../shared/LandscapeMotion";
import Bee from "./objects/Bee";
import Bicycle from "./objects/Bicycle";
import Bird from "../shared/objects/Bird";
import Bush from "../shared/objects/Bush";
import Butterfly from "../shared/objects/Butterfly";
import Cloud from "../shared/objects/Cloud";
import Cottage from "./objects/Cottage";
import Fence from "../shared/objects/Fence";
import Grass from "../shared/objects/Grass";
import Ground from "../shared/objects/Ground";
import Hills, { ridgeY } from "../shared/objects/Hills";
import LittleHouse from "./objects/LittleHouse";
import Mailbox from "../shared/objects/Mailbox";
import Night from "../shared/objects/Night";
import Signpost from "../shared/objects/Signpost";
import Sunflower from "./objects/Sunflower";
import Tree from "../shared/objects/Tree";
import Wildflower, { type WildflowerKind } from "../shared/objects/Wildflower";
import { layoutField, layoutGrass, layoutPatch } from "./objects/field";
import { ink } from "../shared/objects/palette";
import { rng } from "../shared/objects/rng";

/** Wildflowers scattered across [x0,x1]; mostly white daisies, vivid colours only occasionally. */
function scatterWildflowers(x0: number, x1: number, ground: number, seed: number, count: number) {
  const rand = rng(seed);
  const kinds: WildflowerKind[] = ["daisy", "daisy", "daisy", "daisy", "cobalt", "raspberry", "tomato"];
  return Array.from({ length: count }, (_, i) => ({
    x: x0 + ((i + 0.2 + rand() * 0.6) / count) * (x1 - x0),
    y: ground + 1 + rand() * 4,
    h: 12 + rand() * 12,
    kind: kinds[Math.floor(rand() * kinds.length)],
    lean: (rand() - 0.5) * 6,
  }));
}

/** A hamlet of tiny houses dotted across both hills. Each entry: [x, hill, scale, variant]. */
function HillHouses({
  houses,
  far,
  near,
  wave,
}: {
  houses: [number, "far" | "near", number, 0 | 1 | 2][];
  far: number;
  near: number;
  wave: number;
}) {
  return (
    <g>
      {houses.map(([x, hill, scale, variant]) => (
        <LittleHouse
          key={`${hill}${x}`}
          x={x}
          y={(hill === "far" ? ridgeY(x, far, 9, wave * 1.1, 0.8) : ridgeY(x, near, 8, wave * 0.8, 2.6)) + 2}
          scale={scale}
          variant={variant}
        />
      ))}
    </g>
  );
}

/** Tiny far-away trees standing on the near hill. */
function HillTrees({ xs, base, amp, wave, phase }: { xs: number[]; base: number; amp: number; wave: number; phase: number }) {
  return (
    <g>
      {xs.map((x, i) => (
        <Tree key={x} x={x} y={ridgeY(x, base, amp, wave, phase) + 2} h={7 + (i % 3)} r={6 + (i % 2) * 2} seed={900 + i} />
      ))}
    </g>
  );
}

function Wide() {
  const W = 1440;
  const H = 250;
  const g = 234;
  const nearBase = 168;
  const wave = 640;
  const patches = [
    ...layoutPatch(430, 540, g, 21, 4),
    ...layoutPatch(960, 1090, g, 33, 5),
    ...layoutPatch(1370, 1428, g, 47, 2, 0.8),
  ];
  const backField = layoutField({
    width: W,
    ground: g - 2,
    seed: 61,
    tall: 0,
    mid: 2,
    back: 9,
    clear: [[240, 380]],
  });
  const wild = [
    ...scatterWildflowers(90, 140, g, 5, 5),
    ...scatterWildflowers(560, 720, g, 6, 6),
    ...scatterWildflowers(1240, 1350, g, 7, 5),
  ];
  const backGrass = layoutGrass(W, g, 3, 80, [8, 18], { opacity: 0.55 });
  const frontGrass = layoutGrass(W, g + 2, 9, 110, [10, 30], { animate: true });

  return (
    <svg className="ls-scene ls-wide" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" focusable="false" aria-hidden="true" style={{ "--span": `${W}px` } as CSSProperties}>
      <g id="sky">
        <Cloud x={110} y={26} scale={1.3} drift={{ dur: 36, delay: -8 }} />
        <Cloud x={470} y={48} scale={1} variant={1} drift={{ dur: 29, delay: -21 }} />
        <Cloud x={820} y={22} scale={1.5} drift={{ dur: 40, delay: -30 }} />
        <Cloud x={1180} y={44} scale={1.1} variant={1} drift={{ dur: 33, delay: -14 }} />
        <Bird x={300} y={60} scale={1} cross={{ dur: 9, delay: -2 }} />
        <Bird x={350} y={72} scale={0.75} cross={{ dur: 10, delay: -3 }} />
        <Bird x={1050} y={50} scale={0.9} cross={{ dur: 8, delay: -12, rtl: true }} />
      </g>

      <g id="hills">
        <Hills width={W} bottom={g} far={132} near={nearBase} wave={wave} />
        <HillHouses
          far={132}
          near={nearBase}
          wave={wave}
          houses={[
            [95, "far", 0.34, 0],
            [330, "far", 0.3, 2],
            [610, "far", 0.36, 1],
            [870, "far", 0.3, 0],
            [1135, "far", 0.34, 2],
            [1375, "far", 0.3, 1],
            [160, "near", 0.5, 1],
            [400, "near", 0.46, 0],
            [650, "near", 0.52, 2],
            [905, "near", 0.46, 1],
            [1160, "near", 0.5, 0],
            [1330, "near", 0.44, 2],
          ]}
        />
        <HillTrees xs={[70, 245, 520, 775, 1030, 1245, 1390]} base={nearBase} amp={8} wave={wave * 0.8} phase={2.6} />
      </g>

      <g id="grass-back">
        {backGrass.map((s) => (
          <Grass key={s.seed} {...s} />
        ))}
      </g>
      <g id="field-back">
        {backField.map((s) => (
          <Sunflower key={s.seed} {...s} />
        ))}
      </g>

      <g id="trees">
        <Tree x={170} y={g} h={84} r={46} seed={3} sway={{ dur: 7, delay: -2, amp: 0.7 }} />
        <Tree x={1315} y={g} h={72} r={39} seed={8} sway={{ dur: 8, delay: -5, amp: 0.6 }} />
        <Bush x={62} y={g} r={22} seed={4} berries={ink.raspberry} />
        <Bush x={1262} y={g} r={16} seed={5} />
      </g>

      <g id="cottage">
        <Cottage x={312} y={g} scale={1.3} />
      </g>

      <g id="sunflower-patches">
        {patches.map((s) => (
          <Sunflower key={s.seed} {...s} />
        ))}
      </g>

      <g id="signpost">
        <Signpost x={612} y={g} scale={1.15} />
      </g>
      <g id="mailbox-area">
        <Fence x={1120} y={g} width={140} seed={2} />
        <g data-object="mailbox">
          <Mailbox x={1192} y={g} scale={1.25} />
        </g>
      </g>

      <g id="wildflowers">
        {wild.map((w, i) => (
          <Wildflower key={i} {...w} />
        ))}
      </g>

      <g id="critters">
        <Butterfly x={500} y={170} scale={1.1} color={ink.cobalt} fly={{ dur: 26, delay: -5, x0: -200, x1: 640 }} />
        <Butterfly x={1010} y={150} scale={1} color={ink.butter} fly={{ dur: 32, delay: -18, x0: 400, x1: -700 }} />
        <Butterfly x={240} y={190} scale={0.9} color={ink.raspberry} fly={{ dur: 29, delay: -12, x0: -100, x1: 420 }} />
        <Bee x={470} y={168} scale={1.15} hop={{ dur: 20, delay: -6, points: [[0, 0], [60, -14], [110, 6]] }} />
        <Bee x={1060} y={160} scale={1.1} hop={{ dur: 24, delay: -15, points: [[0, 0], [-80, 10], [-150, -12]] }} />
      </g>

      <g id="grass-front">
        {frontGrass.map((s) => (
          <Grass key={s.seed} {...s} />
        ))}
      </g>
      <g id="bicycle">
        <Bicycle x={0} y={g + 2} scale={1.15} ride={{ dur: 40, delay: -6, x0: -80, x1: 1520 }} />
      </g>
      <Ground width={W} y={g + 3} seed={7} />
    </svg>
  );
}

function Compact() {
  const W = 640;
  const H = 200;
  const g = 180;
  const nearBase = 130;
  const wave = 360;
  const patch = layoutPatch(412, 495, g, 71, 3, 0.85);
  const backField = layoutField({
    width: W,
    ground: g - 2,
    seed: 83,
    tall: 0,
    mid: 1,
    back: 5,
    size: 0.9,
    clear: [[90, 175]],
  });
  const wild = [...scatterWildflowers(190, 262, g, 9, 3), ...scatterWildflowers(515, 545, g, 10, 2)];
  const backGrass = layoutGrass(W, g, 4, 36, [7, 15], { opacity: 0.55 });
  const frontGrass = layoutGrass(W, g + 2, 8, 46, [9, 24], { animate: true });

  return (
    <svg className="ls-scene ls-compact" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" focusable="false" aria-hidden="true" style={{ "--span": `${W}px` } as CSSProperties}>
      <g id="sky">
        <Cloud x={60} y={22} scale={1} drift={{ dur: 30, delay: -6 }} />
        <Cloud x={380} y={34} scale={0.9} variant={1} drift={{ dur: 34, delay: -22 }} />
        <Bird x={250} y={46} scale={0.9} cross={{ dur: 9, delay: -3 }} />
      </g>
      <g id="hills">
        <Hills width={W} bottom={g} far={104} near={nearBase} wave={wave} />
        <HillHouses
          far={104}
          near={nearBase}
          wave={wave}
          houses={[
            [60, "far", 0.32, 1],
            [230, "far", 0.3, 0],
            [430, "far", 0.34, 2],
            [600, "far", 0.3, 0],
            [110, "near", 0.46, 0],
            [320, "near", 0.48, 2],
            [520, "near", 0.46, 1],
          ]}
        />
      </g>
      <g id="grass-back">
        {backGrass.map((s) => (
          <Grass key={s.seed} {...s} />
        ))}
      </g>
      <g id="field-back">
        {backField.map((s) => (
          <Sunflower key={s.seed} {...s} />
        ))}
      </g>
      <Tree x={44} y={g} h={64} r={34} seed={3} sway={{ dur: 7, delay: -2, amp: 0.7 }} />
      <Cottage x={132} y={g} scale={1.05} />
      <g id="sunflower-patches">
        {patch.map((s) => (
          <Sunflower key={s.seed} {...s} />
        ))}
      </g>
      <g id="signpost">
        <Signpost x={232} y={g} scale={1} />
      </g>
      <Fence x={525} y={g} width={90} seed={4} />
      <g data-object="mailbox">
        <Mailbox x={566} y={g} scale={1.1} />
      </g>
      <Bush x={618} y={g} r={14} seed={6} />
      <g id="wildflowers">
        {wild.map((w, i) => (
          <Wildflower key={i} {...w} />
        ))}
      </g>
      <g id="critters">
        <Butterfly x={170} y={140} scale={0.95} color={ink.cobalt} fly={{ dur: 24, delay: -4, x0: -80, x1: 420 }} />
        <Bee x={440} y={140} scale={1} hop={{ dur: 20, delay: -6, points: [[0, 0], [-50, 8], [-100, -8]] }} />
      </g>
      <g id="grass-front">
        {frontGrass.map((s) => (
          <Grass key={s.seed} {...s} />
        ))}
      </g>
      <g id="bicycle">
        <Bicycle x={0} y={g + 2} scale={0.95} ride={{ dur: 34, delay: -9, x0: -60, x1: 700 }} />
      </g>
      <Ground width={W} y={g + 3} seed={7} />
    </svg>
  );
}

/** Detailed panoramic footer illustration: another view of the same sunflower countryside. */
export default function SunflowerFooter() {
  return (
    <LandscapeMotion className="ls-footer" data-landscape="sunflower-footer" aria-hidden>
      <Night id="night-footer" width={1440} height={250} seed={202} stars={110} moon={{ x: 1000, y: 60, r: 20 }} />
      <Wide />
      <Compact />
      <FooterInteractions />
    </LandscapeMotion>
  );
}
