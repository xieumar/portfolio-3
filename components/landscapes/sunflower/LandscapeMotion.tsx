"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a landscape and pauses all of its CSS animations while it is off-screen
 * (or the tab is hidden). It only flips a data attribute, so there is no React
 * state and no re-render. Without JavaScript the scene simply keeps animating.
 */
export default function LandscapeMotion({
  className,
  children,
  ...rest
}: {
  className: string;
  children: ReactNode;
  "data-landscape"?: string;
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = true;
    const apply = () => {
      el.dataset.active = String(visible && !document.hidden);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        apply();
      },
      { rootMargin: "80px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, []);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
