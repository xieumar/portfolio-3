import "../shared/landscape.css";
import "./sunflower.css";
import type { CSSProperties } from "react";
import LandscapeMotion from "../shared/LandscapeMotion";
import Bee from "./objects/Bee";
import Bird from "../shared/objects/Bird";
import Butterfly from "../shared/objects/Butterfly";
import Cloud from "../shared/objects/Cloud";
import Grass from "../shared/objects/Grass";
import Hills from "../shared/objects/Hills";
import Sunflower from "./objects/Sunflower";
import { layoutField, layoutGrass } from "./objects/field";
import Ground from "../shared/objects/Ground";
import { ink } from "../shared/objects/palette";

interface SceneProps {
  width: number;
  height: number;
}

/**
 * One composition of the header. `wide` is the panoramic desktop scene,
 * `compact` is a separately composed scene for small screens (not a crop).
 */
function Scene({ variant, width, height }: SceneProps & { variant: "wide" | "compact" }) {
  const wide = variant === "wide";
  const ground = height - 8;
  const flowers = layoutField(
    wide
      ? { width, ground, seed: 11, tall: 13, mid: 20, back: 30 }
      : { width, ground, seed: 29, tall: 5, mid: 8, back: 11, size: 0.82 },
  );
  const backGrass = layoutGrass(width, ground, 3, wide ? 70 : 34, [7, 15], {
    opacity: 0.55,
  });
  const frontGrass = layoutGrass(width, ground + 1, 9, wide ? 90 : 40, [9, 24], {
    animate: true,
  });

  return (
    <svg
      className={`ls-scene ls-${variant}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMax slice"
      focusable="false"
      aria-hidden="true"
      style={{ "--span": `${width}px` } as CSSProperties}
    >
      <g id="sky">
        {wide ? (
          <>
            <Cloud x={190} y={14} scale={0.95} drift={{ dur: 34, delay: -6 }} />
            <Cloud x={640} y={10} scale={0.8} variant={1} drift={{ dur: 28, delay: -19 }} />
            <Cloud x={1090} y={20} scale={1} drift={{ dur: 38, delay: -29 }} />
            <Bird x={420} y={34} scale={0.9} cross={{ dur: 8, delay: -2 }} />
            <Bird x={470} y={42} scale={0.7} cross={{ dur: 9, delay: -3 }} />
            <Bird x={1180} y={30} scale={0.8} cross={{ dur: 7, delay: -11 }} />
          </>
        ) : (
          <>
            <Cloud x={70} y={12} scale={0.8} drift={{ dur: 30, delay: -5 }} />
            <Cloud x={420} y={20} scale={0.7} variant={1} drift={{ dur: 34, delay: -20 }} />
            <Bird x={260} y={30} scale={0.8} cross={{ dur: 8, delay: -3 }} />
          </>
        )}
      </g>

      <g id="hills">
        <Hills
          width={width}
          bottom={ground}
          far={wide ? height * 0.62 : height * 0.56}
          near={wide ? height * 0.76 : height * 0.7}
          wave={wide ? 520 : 300}
        />
      </g>

      <g id="grass-back">
        {backGrass.map((g) => (
          <Grass key={g.seed} {...g} />
        ))}
      </g>

      <g id="field">
        {flowers.map((s) => (
          <Sunflower key={s.seed} {...s} />
        ))}
      </g>

      <g id="critters">
        {wide ? (
          <>
            <Butterfly x={330} y={92} scale={0.95} color={ink.cobalt} fly={{ dur: 24, delay: -4, x0: -120, x1: 520 }} />
            <Butterfly x={880} y={84} scale={0.85} color={ink.raspberry} fly={{ dur: 31, delay: -17, x0: 520, x1: -300 }} />
            <Butterfly x={1210} y={100} scale={0.8} color={ink.butter} fly={{ dur: 27, delay: -9, x0: -200, x1: 260 }} />
            <Bee x={560} y={86} scale={1} hop={{ dur: 19, delay: -4, points: [[0, 0], [90, 12], [160, -14]] }} />
            <Bee x={1010} y={94} scale={0.9} hop={{ dur: 23, delay: -13, points: [[0, 0], [-70, -10], [-150, 8]] }} />
          </>
        ) : (
          <>
            <Butterfly x={150} y={80} scale={0.85} color={ink.cobalt} fly={{ dur: 24, delay: -4, x0: -60, x1: 260 }} />
            <Bee x={410} y={82} scale={0.95} hop={{ dur: 19, delay: -6, points: [[0, 0], [-60, 8], [-120, -8]] }} />
          </>
        )}
      </g>

      <g id="grass-front">
        {frontGrass.map((g) => (
          <Grass key={g.seed} {...g} />
        ))}
      </g>

      <Ground width={width} y={ground + 2} seed={5} />
    </svg>
  );
}

/** Decorative panoramic header illustration. Sits directly under the navigation. */
export default function SunflowerHeader() {
  return (
    <LandscapeMotion className="ls-header" data-landscape="sunflower-header" aria-hidden>
      <Scene variant="wide" width={1440} height={150} />
      <Scene variant="compact" width={640} height={120} />
    </LandscapeMotion>
  );
}
