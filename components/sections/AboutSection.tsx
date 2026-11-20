"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import PicnicScene from "@/components/landscapes/sunflower/PicnicScene";
import TransitionLink from "@/components/layout/TransitionLink";
import { softButton } from "@/components/ui/styles";

// Placeholder copy: replace with the real thing.
const statement =
  "I care about the details nobody asks for: the spacing, the motion, and the way a page feels in your hands.";

const bio = [
  "I'm a frontend developer who turns designs into fast, accessible websites. I like the place where design and code meet, and I'm happiest when a small detail makes someone smile.",
  "Away from the screen you'll find me wandering, sketching, and collecting ideas for the next thing to build.",
];

const ease = [0.22, 1, 0.36, 1] as const;

/** One word that brightens as the scroll progress passes its slot. */
function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>{" "}
    </>
  );
}

/** A sentence whose words fill in from faint to full ink as it scrolls into view. */
function ScrollStatement({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-[clamp(1.5rem,3.2vw,2.75rem)] leading-[1.2] font-medium tracking-[-0.03em] text-balance"
    >
      {reduce
        ? text
        : words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
    </p>
  );
}

/** A tilted polaroid of the picnic scene, held up with a piece of tape. */
function Polaroid() {
  return (
    <motion.figure
      className="relative mx-auto w-full max-w-[320px] border-[1.5px] border-earth/70 bg-paper p-3 pb-10 shadow-[0_14px_30px_rgba(33,31,26,0.14)] dark:shadow-[0_14px_30px_rgba(0,0,0,0.5)]"
      initial={{ opacity: 0, y: 40, rotate: 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: -3 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 border border-earth/25 bg-golden/45"
      />
      {/* The footer's cyclist, off her bike and having a picnic. At night the scene is dimmed like the landscapes. */}
      <div className="relative aspect-[4/5] overflow-hidden bg-soft">
        <PicnicScene className="absolute inset-0 size-full transition-[filter] duration-500 ease-soft dark:brightness-[0.55] dark:saturate-[0.8]" />
      </div>
      <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-mono text-xs text-ink-secondary">
        me, probably
      </figcaption>
    </motion.figure>
  );
}

/** The About section: a statement that fills in as you scroll, a short bio with a link to the About page, and a polaroid. */
export default function AboutSection() {
  return (
    <section id="about" aria-label="About" className="border-t border-border px-(--pad-x) pt-(--section-space) pb-[calc(var(--section-space)/2)]">
      <div className="grid grid-cols-1 items-start gap-12 min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] min-[900px]:gap-x-12">
        <div className="flex flex-col gap-10">
          <ScrollStatement text={statement} />

          <div className="flex max-w-[52ch] flex-col gap-4 text-ink-secondary">
            {bio.map((paragraph) => (
              <motion.p
                key={paragraph}
                className="leading-[1.65]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease }}
          >
            <TransitionLink href="/about" label="About" className={softButton}>
              Get to know me
            </TransitionLink>
          </motion.div>
        </div>

        <Polaroid />
      </div>
    </section>
  );
}
