import { f, rng } from "./rng";
import { ink } from "./palette";

/** Wobbly hand-drawn ground line with a few tiny texture dashes beneath it. */
export default function Ground({ width, y, seed }: { width: number; y: number; seed: number }) {
  const rand = rng(seed);
  let d = `M-4 ${y}`;
  for (let x = 0; x <= width + 20; x += 40) {
    d += `Q${f(x + 10)} ${f(y + (rand() - 0.5) * 2.2)} ${f(x + 20)} ${f(y + (rand() - 0.5) * 1.2)}T${f(x + 40)} ${f(y)}`;
  }
  let ticks = "";
  for (let i = 0; i < width / 46; i++) {
    const x = rand() * width;
    const yy = y + 3 + rand() * 3;
    ticks += `M${f(x)} ${f(yy)}h${f(3 + rand() * 6)}`;
  }
  return (
    <g fill="none" stroke={ink.line} strokeLinecap="round">
      <path d={d} strokeWidth={1} />
      <path d={ticks} strokeWidth={0.6} opacity={0.5} />
    </g>
  );
}
