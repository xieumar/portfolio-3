"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/config/site";
import TransitionLink from "./TransitionLink";

const { intro } = site;

// The main button matches the highlighted word in the headline.
const cta =
  "inline-flex items-center gap-2 rounded-sm border border-soft bg-soft px-5 py-3 font-medium text-ink " +
  "transition-[background-color,border-color,transform] duration-(--dur-hover) ease-soft " +
  "hover:bg-[color-mix(in_srgb,var(--env-soft)_80%,var(--env-accent))] active:translate-y-px";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

/**
 * A highlighted word that swaps through a list: the old word slides up and blurs away, the new one
 * slides in from below, and the highlight eases to the new word's width.
 */
function RotatingWord({ words }: { words: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | "auto">("auto");

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(timer);
  }, [reduce, words.length]);

  // Runs when each word mounts: measure it so the highlight can animate to its width.
  const measure = useCallback((el: HTMLSpanElement | null) => {
    if (el) setWidth(el.offsetWidth);
  }, []);

  return (
    <motion.span
      className="-my-[0.04em] inline-block overflow-hidden bg-soft py-[0.04em] align-top whitespace-nowrap transition-colors duration-400 ease-soft"
      aria-hidden="true"
      initial={false}
      animate={{ width }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          ref={measure}
          className="inline-block px-[0.08em]"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.32, ease }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

/** The introduction above the landscape: a headline on the left, a few lines and two links on the right. */
export default function HeroIntro() {
  const { before, words, after } = intro.headline;

  return (
    <section className="grid flex-1 grid-cols-1 content-center items-end gap-y-8 px-(--pad-x) pt-24 pb-10 min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] min-[900px]:gap-x-12" aria-labelledby="hero-title">
      <div className="flex flex-col items-start gap-4 self-start">
        <motion.h1
          id="hero-title"
          className="text-[clamp(1.6rem,3.8vw,3.75rem)] leading-[1.1] font-medium tracking-[-0.035em] text-balance"
          aria-label={`${before} ${words[0]} ${after}`}
          {...rise(0.1)}
        >
          <span aria-hidden="true">{before} </span>
          <RotatingWord words={words} />
          <span aria-hidden="true"> {after}</span>
        </motion.h1>
      </div>

      <div className="flex flex-col items-start gap-5">
        <motion.p className="max-w-[44ch] text-base leading-[1.6] text-ink-secondary" {...rise(0.2)}>
          {intro.blurb}
        </motion.p>

        <motion.div className="flex flex-wrap items-center gap-6" {...rise(0.3)}>
          <TransitionLink href="/work" label="Work" className={cta}>
            See my work
          </TransitionLink>
          <TransitionLink href="/contact" label="Contact" className="link-subtle py-1 font-medium">
            Say hello
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
