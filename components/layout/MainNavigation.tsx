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

/** The centred pill: name, About, Work, Contact and the theme toggle. */
export default function MainNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav aria-label="Main" className="main-nav">
      <TransitionLink
        href="/"
        label="Home"
        className="nav-name"
        aria-label={`${site.name}, home`}
        aria-current={pathname === "/" ? "page" : undefined}
        onNavigate={close}
      >
        {site.name}
      </TransitionLink>

      <ul id="main-nav-list" className="nav-list" data-open={open}>
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <TransitionLink
                href={item.href}
                label={item.label}
                className="nav-link"
                aria-current={active ? "page" : undefined}
                onNavigate={close}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="nav-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="nav-link-text">{item.label}</span>
              </TransitionLink>
            </li>
          );
        })}
      </ul>

      <span className="nav-sep" aria-hidden="true" />
      <ThemeToggle />

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="main-nav-list"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="nav-toggle-bars" data-open={open} />
      </button>
    </nav>
  );
}
