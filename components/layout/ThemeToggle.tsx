"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// null on the server and during hydration, so the icon never mismatches.
const getServerSnapshot = (): Theme | null => null;

function Sun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  }

  const dark = theme === "dark";

  return (
    <button
      type="button"
      className={`inline-grid ${className ?? ""}`}
      onClick={toggle}
      aria-pressed={theme === null ? undefined : dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme !== null && (
          <motion.span
            key={theme}
            className="inline-grid place-items-center"
            initial={{ rotate: -80, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 80, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22 }}
          >
            {dark ? <Moon /> : <Sun />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
