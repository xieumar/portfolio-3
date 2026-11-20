import type { CSSProperties } from "react";
import { f, rng } from "./rng";

interface NightProps {
  /** Unique per instance: SVG gradient ids are document-global. */
  id: string;
  width: number;
  height: number;
  seed: number;
  stars: number;
  moon: { x: number; y: number; r: number };
  /** Fade the top of the sky into the page background (for a header that sits on the page). */
  blend?: boolean;
}

/**
 * The night sky, drawn behind the scene: a gradient, twinkling stars and a moon.
 * It is invisible in light mode and fades in when `[data-theme="dark"]` is set.
 * Hills and flowers (the scene svg, stacked above) cover its lower part.
 */
export default function Night({ id, width, height, seed, stars, moon, blend }: NightProps) {
  const rand = rng(seed);
  const field = Array.from({ length: stars }, () => ({
    x: f(rand() * width),
    y: f(rand() * height * 0.62),
    r: f(0.5 + rand() * 1.1),
    dur: f(2.5 + rand() * 4),
    delay: f(-rand() * 6),
    o: f(0.5 + rand() * 0.5),
  }));

  return (
    <svg
      className="ls-night"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMax slice"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          {/* the top starts as the page colour (dark theme --color-ivory) so the sky melts into the page */}
          <stop offset="0" style={{ stopColor: blend ? "var(--color-ivory)" : "#060a1c" }} />
          <stop offset="0.55" stopColor="#12204a" />
          <stop offset="1" stopColor="#2a3f74" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#f6efd2" stopOpacity="0.38" />
          <stop offset="1" stopColor="#f6efd2" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width={width} height={height} fill={`url(#${id}-sky)`} />

      <g fill="#f6efd2">
        {field.map((s, i) => (
          <circle
            key={i}
            className="ls-star"
            cx={s.x}
            cy={s.y}
            r={s.r}
            style={{ "--dur": `${s.dur}s`, "--delay": `${s.delay}s`, "--o": s.o } as CSSProperties}
          />
        ))}
      </g>

      <circle cx={moon.x} cy={moon.y} r={moon.r * 3.4} fill={`url(#${id}-glow)`} />
      <circle cx={moon.x} cy={moon.y} r={moon.r} fill="#f6efd2" />
      <g fill="#d9d0ac" opacity="0.7">
        <circle cx={moon.x - moon.r * 0.3} cy={moon.y - moon.r * 0.25} r={moon.r * 0.2} />
        <circle cx={moon.x + moon.r * 0.35} cy={moon.y + moon.r * 0.1} r={moon.r * 0.13} />
        <circle cx={moon.x - moon.r * 0.05} cy={moon.y + moon.r * 0.45} r={moon.r * 0.1} />
      </g>
    </svg>
  );
}
