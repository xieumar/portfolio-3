"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/config/navigation";
import { site } from "@/config/site";
import ThemeToggle from "./ThemeToggle";
import TransitionLink from "./TransitionLink";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// The pill. On phones it spans the width and the links drop down as a card underneath.
const pill =
  "pointer-events-auto relative flex h-[52px] items-center gap-1 rounded-full border border-border p-[5px] " +
  "bg-[color-mix(in_srgb,var(--env-background)_84%,transparent)] backdrop-blur-[14px] " +
  "shadow-[0_8px_28px_rgba(33,31,26,0.08)] dark:shadow-[0_8px_28px_rgba(0,0,0,0.45)] " +
  "transition-[background-color,border-color] duration-400 ease-soft max-md:w-full max-md:max-w-[420px]";

const list =
  "flex items-center gap-0.5 " +
  "max-md:absolute max-md:inset-x-0 max-md:top-[calc(100%+8px)] max-md:flex-col max-md:items-stretch max-md:gap-0.5 " +
  "max-md:rounded-3xl max-md:border max-md:border-border max-md:bg-surface max-md:p-1.5 " +
  "max-md:shadow-[0_12px_32px_rgba(33,31,26,0.08)] dark:max-md:shadow-[0_12px_32px_rgba(0,0,0,0.45)] " +
  "max-md:invisible max-md:-translate-y-1.5 max-md:opacity-0 max-md:transition-[opacity,translate,visibility] " +
  "max-md:duration-(--dur-hover) max-md:ease-soft max-md:[transition-delay:0s,0s,var(--dur-hover)] " +
  "max-md:data-[open=true]:visible max-md:data-[open=true]:translate-y-0 max-md:data-[open=true]:opacity-100 " +
  "max-md:data-[open=true]:[transition-delay:0s]";

const link =
  "relative inline-flex h-10 items-center px-[0.95rem] font-medium text-ink-secondary " +
  "transition-colors duration-(--dur-hover) ease-soft hover:text-ink aria-[current=page]:text-ink max-md:flex max-md:h-[46px]";

// A small dot that slides between the links (motion layoutId); on phones it sits at the right of the row.
const dot =
  "absolute bottom-[3px] left-1/2 -ml-0.5 size-1 rounded-full bg-accent " +
  "max-md:top-1/2 max-md:right-4 max-md:bottom-auto max-md:left-auto max-md:-mt-0.5 max-md:ml-0";

const iconButton =
  "size-10 cursor-pointer place-items-center rounded-full text-ink transition-colors duration-(--dur-hover) ease-soft " +
  "hover:bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)]";

// The two bars of the menu button morph into an X when open.
const bars =
  "relative block h-[1.5px] w-[18px] -translate-y-[3px] bg-ink transition-transform duration-(--dur-hover) ease-soft " +
  "before:absolute before:top-1.5 before:block before:h-[1.5px] before:w-[18px] before:bg-ink before:content-[''] " +
  "before:transition-transform before:duration-(--dur-hover) before:ease-soft " +
  "data-[open=true]:translate-y-0 data-[open=true]:rotate-45 " +
  "data-[open=true]:before:-translate-y-1.5 data-[open=true]:before:-rotate-90";

/** The centred pill: name, About, Work, Contact and the theme toggle. */
export default function MainNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav aria-label="Main" className={pill}>
      <TransitionLink
        href="/"
        label="Home"
        className="inline-flex h-full items-center rounded-full pr-3 pl-4 font-semibold tracking-[-0.02em] max-md:flex-1"
        aria-label={`${site.name}, home`}
        aria-current={pathname === "/" ? "page" : undefined}
        onNavigate={close}
      >
        {site.name}
      </TransitionLink>

      <ul id="main-nav-list" className={list} data-open={open}>
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <TransitionLink
                href={item.href}
                label={item.label}
                className={link}
                aria-current={active ? "page" : undefined}
                onNavigate={close}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className={dot}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
              </TransitionLink>
            </li>
          );
        })}
      </ul>

      <span aria-hidden="true" className="mr-[0.15rem] ml-[0.35rem] h-5 w-px bg-border max-md:hidden" />
      <ThemeToggle className={iconButton} />

      <button
        type="button"
        className={`${iconButton} hidden max-md:inline-grid`}
        aria-expanded={open}
        aria-controls="main-nav-list"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className={bars} data-open={open} />
      </button>
    </nav>
  );
}
