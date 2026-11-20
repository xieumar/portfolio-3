"use client";

import { MotionConfig, motion, useReducedMotion, useSpring } from "motion/react";
import { useState, type CSSProperties, type PointerEvent } from "react";
import TransitionLink from "@/components/layout/TransitionLink";
import { projects, type Project } from "@/config/projects";

// A folder is drawn from a back panel with a tab, two sheets of paper and a front flap that tilts open.
const line = "border-[color:var(--folder-line)]";

const folderBack =
  "absolute inset-x-0 top-(--tab) bottom-0 rounded-[4px_12px_10px_10px] border-[1.5px] " + line +
  " bg-[color-mix(in_srgb,var(--tone)_78%,var(--color-earth))] " +
  "before:absolute before:top-[calc(var(--tab)*-1)] before:-left-[1.5px] before:h-[calc(var(--tab)+1px)] before:w-[42%] " +
  "before:rounded-t-[10px] before:border-[1.5px] before:border-b-0 before:border-[color:var(--folder-line)] " +
  "before:bg-inherit before:content-['']";

const sheet =
  "absolute inset-x-[7%] top-11 bottom-[30%] flex origin-bottom flex-col gap-[7px] rounded-[4px] border-[1.5px] " +
  line + " bg-paper px-3.5 py-3";
const sheetBackClass =
  "absolute inset-x-[10%] top-[52px] bottom-[30%] origin-bottom rounded-[4px] border-[1.5px] " + line +
  " bg-[color-mix(in_srgb,var(--color-paper)_88%,var(--color-earth))]";

const bar = "block h-1.5 rounded-[3px] bg-ink/12";

const spring = { type: "spring", stiffness: 260, damping: 22 } as const;

// Every part reads the folder's "rest" / "open" state (hover or keyboard focus).
const lift = {
  rest: { y: 0, transition: spring },
  open: { y: -8, transition: spring },
};
const shadow = {
  rest: { opacity: 0.35, scaleX: 0.88, y: 0, transition: spring },
  open: { opacity: 0.75, scaleX: 1.04, y: 8, transition: spring },
};
const sheetFront = {
  rest: { y: 0, rotate: -1, transition: spring },
  open: { y: -56, rotate: -3, transition: spring },
};
const sheetBack = {
  rest: { y: 0, rotate: 1.5, transition: spring },
  open: { y: -30, rotate: 5, transition: spring },
};
const flap = {
  rest: { rotateX: 0, transition: spring },
  open: { rotateX: -18, transition: spring },
};
const arrow = {
  rest: { rotate: 0, transition: spring },
  open: { rotate: -45, transition: spring },
};
const arrowFill = {
  rest: { scale: 0, transition: spring },
  open: { scale: 1, transition: spring },
};

function Folder({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const [focused, setFocused] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  // The folder leans toward the cursor.
  const tiltX = useSpring(0, { stiffness: 180, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 180, damping: 18 });

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    tiltY.set(px * 12);
    tiltX.set(py * -9);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 48, rotate: index % 2 ? 2.5 : -2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.09 }}
    >
      <motion.div
        data-folder=""
        className="[--folder-line:color-mix(in_srgb,var(--color-earth)_75%,transparent)] [--tab:26px]"
        style={{ "--tone": project.tone, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 } as CSSProperties}
        variants={lift}
        initial="rest"
        animate={focused ? "open" : "rest"}
        whileHover="open"
        whileTap={{ scale: 0.98 }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
      >
        <TransitionLink
          href={project.href}
          label="Work"
          className="relative block aspect-[5/4] [perspective:900px] transition-opacity duration-300 ease-soft"
          aria-label={`${project.title}, ${project.category}, ${project.year}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <motion.span className="pointer-events-none absolute inset-x-[6%] -bottom-1.5 h-[22px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(33,31,26,0.38),transparent_70%)] blur-[6px] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),transparent_70%)]" variants={shadow} aria-hidden="true" />
          <span className={folderBack} aria-hidden="true" />

          {/* Two sheets of paper poking out of the folder; placeholder shapes stand in for the real content. */}
          <motion.span className={sheetBackClass} variants={sheetBack} aria-hidden="true" />
          <motion.span className={sheet} variants={sheetFront} aria-hidden="true">
            <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-ink-secondary uppercase">{project.category}</span>
            <span className="relative block h-[46px] overflow-hidden rounded-[3px] bg-[color-mix(in_srgb,var(--tone)_70%,var(--color-paper))]">
              <span className="absolute top-[9px] left-2.5 size-3.5 rounded-full bg-ink/22" />
              <span className="absolute right-[30%] bottom-[9px] left-2.5 h-1.5 rounded-[3px] bg-ink/16" />
            </span>
            <span className={bar} />
            <span className={`${bar} w-[62%]`} />
          </motion.span>

          <motion.span className={`absolute inset-x-0 top-[38%] bottom-0 grid origin-bottom grid-cols-[1fr_auto] grid-rows-[auto_1fr_auto_auto] rounded-[6px_6px_10px_10px] border-[1.5px] ${line} bg-(--tone) px-[18px] pt-3.5 pb-4 shadow-[0_-8px_18px_rgba(33,31,26,0.06)]`} variants={flap} aria-hidden="true">
            <span className="col-start-1 row-start-1 font-mono text-[0.8125rem] text-ink-secondary">{number}</span>
            <span className={`relative col-start-2 row-start-1 grid size-[34px] place-items-center overflow-hidden rounded-full border-[1.5px] ${line}`}>
              <motion.span className="absolute inset-0 rounded-full bg-accent" variants={arrowFill} />
              <motion.span className="relative block text-base leading-none text-ink" variants={arrow}>
                →
              </motion.span>
            </span>
            <span className="col-span-full row-start-3 text-xl font-medium tracking-[-0.02em]">{project.title}</span>
            <span className="col-span-full row-start-4 mt-0.5 font-mono text-xs text-ink-secondary">
              {project.year} · {project.category}
            </span>
          </motion.span>
        </TransitionLink>
      </motion.div>
    </motion.li>
  );
}

// 1 / 2 / 4 columns. While one folder is hovered, the others step back.
const grid =
  "grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 min-[1200px]:grid-cols-4 " +
  "[&:has([data-folder]:hover)_[data-folder]:not(:hover)_a]:opacity-45";

/** Selected work, shown as a row of folders that open on hover. */
export default function ProjectFolders() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-(--pad-x) py-(--section-space)" aria-labelledby="projects-title">
        <div className="mb-14 flex items-baseline justify-between gap-4">
          <h2 id="projects-title" className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium tracking-[-0.03em]">
            Selected work
            <span className="ml-2.5 font-mono text-sm font-normal tracking-normal text-ink-secondary">({String(projects.length).padStart(2, "0")})</span>
          </h2>
          <TransitionLink href="/work" label="Work" className="link-subtle font-medium">
            View all
          </TransitionLink>
        </div>

        <ul className={grid}>
          {projects.map((project, i) => (
            <Folder key={project.title} project={project} index={i} />
          ))}
        </ul>
      </section>
    </MotionConfig>
  );
}
