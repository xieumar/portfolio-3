"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { contactNav, mainNav } from "@/config/navigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function MainNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main" className="main-nav">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="main-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="nav-toggle-bars" data-open={open} />
      </button>

      <div id="main-nav-panel" className="nav-panel" data-open={open}>
        <ul className="nav-list">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={contactNav.href}
          className="btn btn-primary nav-cta"
          aria-current={isActive(pathname, contactNav.href) ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          {contactNav.label}
        </Link>
      </div>
    </nav>
  );
}
