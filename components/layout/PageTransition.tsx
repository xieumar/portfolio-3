"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface Target {
  href: string;
  label: string;
}

interface NavTransition {
  /** Navigate to `href`, covering the screen with `label` while the route changes. */
  go: (href: string, label: string) => void;
}

const NavTransitionContext = createContext<NavTransition>({ go: () => {} });

export const useNavTransition = () => useContext(NavTransitionContext);

const wipeEase = [0.76, 0, 0.24, 1] as const;
const riseEase = [0.22, 1, 0.36, 1] as const;

/** A full-screen panel that wipes up to cover the page, and wipes up again to reveal it. */
const wipe = (enterDelay: number, exitDelay: number) => ({
  out: { clipPath: "inset(100% 0% 0% 0%)" },
  in: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.4, ease: wipeEase, delay: enterDelay },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.4, ease: wipeEase, delay: exitDelay },
  },
});

const accentWipe = wipe(0, 0.07); // deeper golden panel: first in, last out
const softWipe = wipe(0.08, 0); // pale panel on top, carries the content

/**
 * Wraps the app. Nav links call `go()`: two coloured panels wipe up over the page and the destination's
 * name rises in letter by letter while the route changes underneath, then the panels wipe away.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [target, setTarget] = useState<Target | null>(null);
  const [covered, setCovered] = useState(false);

  const go = useCallback(
    (href: string, label: string) => {
      if (target) return; // a transition is already running
      if (href === pathname) {
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        return;
      }
      if (reduce) {
        router.push(href);
        return;
      }
      setCovered(false);
      setTarget({ href, label });
    },
    [pathname, reduce, router, target],
  );

  // Once the new page is showing underneath, hold briefly and then lift the panels.
  useEffect(() => {
    if (!target || !covered || pathname !== target.href) return;
    const t = setTimeout(() => setTarget(null), 450);
    return () => clearTimeout(t);
  }, [target, covered, pathname]);

  // Safety net: never leave the screen covered.
  useEffect(() => {
    if (!target) return;
    const t = setTimeout(() => setTarget(null), 4500);
    return () => clearTimeout(t);
  }, [target]);

  const value = useMemo(() => ({ go }), [go]);

  return (
    <NavTransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {target && (
          <motion.div
            key="overlay-accent"
            className="page-overlay page-overlay-accent"
            aria-hidden="true"
            variants={accentWipe}
            initial="out"
            animate="in"
            exit="exit"
          />
        )}
        {target && (
          <motion.div
            key="overlay-soft"
            className="page-overlay page-overlay-soft"
            role="status"
            aria-live="polite"
            variants={softWipe}
            initial="out"
            animate="in"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === "in") {
                setCovered(true);
                router.push(target.href);
              }
            }}
          >
            <div className="page-overlay-inner">
              <motion.p
                className="page-overlay-kicker"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.35 } }}
              >
                Heading to
              </motion.p>

              <span className="page-overlay-label" aria-label={target.label}>
                {Array.from(target.label).map((letter, i) => (
                  <span className="page-overlay-letter-mask" key={i} aria-hidden="true">
                    <motion.span
                      className="page-overlay-letter"
                      initial={{ y: "115%", rotate: 6 }}
                      animate={{
                        y: 0,
                        rotate: 0,
                        transition: { duration: 0.5, ease: riseEase, delay: 0.3 + i * 0.03 },
                      }}
                    >
                      {letter}
                    </motion.span>
                  </span>
                ))}
              </span>

              <span className="page-overlay-track" aria-hidden="true">
                <motion.span
                  className="page-overlay-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1, transition: { duration: 0.6, ease: "easeInOut", delay: 0.35 } }}
                />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavTransitionContext.Provider>
  );
}
