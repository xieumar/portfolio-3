import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import MainNavigation from "./MainNavigation";

/** Small hand-drawn sunflower used as the logo mark. */
function LogoMark() {
  const petals = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg
      className="site-logo-mark"
      width="26"
      height="26"
      viewBox="-13 -13 26 26"
      aria-hidden="true"
    >
      <g
        fill="#E9AD35"
        stroke="#77624A"
        strokeWidth="0.8"
        strokeLinejoin="round"
      >
        {petals.map((a) => (
          <path key={a} d="M0 -4 Q3.2 -8.5 0 -12 Q-3.2 -8.5 0 -4Z" transform={`rotate(${a})`} />
        ))}
      </g>
      <circle r="4.2" fill="#77624A" />
      <circle r="2" fill="#5b4a37" />
    </svg>
  );
}

/**
 * Shared header: navigation bar plus a slot for the environment's illustration.
 * The landscape is passed in, so new environments never touch this file.
 */
export default function SiteHeader({ landscape }: { landscape?: ReactNode }) {
  return (
    <header className="site-header">
      <div className="site-header-bar">
        <Link href="/" className="site-logo" aria-label={`${site.name}, home`}>
          <LogoMark />
          {site.name}
        </Link>
        <MainNavigation />
      </div>
      {landscape}
    </header>
  );
}
