"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/config/site";
import TransitionLink from "./TransitionLink";

const { intro } = site;

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
      className="hero-rotator"
      aria-hidden="true"
      initial={false}
      animate={{ width }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          ref={measure}
          className="hero-rotator-word"
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
    <section className="hero-intro" aria-labelledby="hero-title">
      <div className="hero-col hero-col-main">
        <motion.h1
          id="hero-title"
          className="hero-title"
          aria-label={`${before} ${words[0]} ${after}`}
          {...rise(0.1)}
        >
          <span aria-hidden="true">{before} </span>
          <RotatingWord words={words} />
          <span aria-hidden="true"> {after}</span>
        </motion.h1>
      </div>

      <div className="hero-col hero-col-side">
        <motion.p className="hero-blurb" {...rise(0.2)}>
          {intro.blurb}
        </motion.p>

        <motion.div className="hero-actions" {...rise(0.3)}>
          <TransitionLink href="/work" label="Work" className="btn hero-cta">
            See my work
          </TransitionLink>
          <TransitionLink href="/contact" label="Contact" className="hero-link link-subtle">
            Say hello
          </TransitionLink>
        </motion.div>
      </div>
    </section>
  );
}
