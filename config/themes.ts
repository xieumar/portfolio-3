/**
 * Environment themes. Only `sunflower` is applied today; the others are token
 * maps ready for when those environments are built. There is no switcher yet.
 * Each theme overrides the semantic `--env-*` aliases declared in globals.css.
 */
export type EnvironmentId =
  | "sunflower"
  | "coastal"
  | "wildflower"
  | "aurora"
  | "mountain";

export interface EnvironmentTheme {
  background: string;
  accent: string;
}

export const themes: Record<EnvironmentId, EnvironmentTheme> = {
  sunflower: { background: "#FDF8EA", accent: "#E9AD35" },
  coastal: { background: "#F0F4F0", accent: "#568B9C" },
  wildflower: { background: "#F6F0E5", accent: "#75516D" },
  aurora: { background: "#142237", accent: "#65B9A5" },
  mountain: { background: "#F8E9D9", accent: "#C97959" },
};

/** CSS custom-property overrides for a theme (for use on a wrapper element). */
export function themeToCssVars(id: EnvironmentId): Record<string, string> {
  const t = themes[id];
  return { "--env-background": t.background, "--env-accent": t.accent };
}
