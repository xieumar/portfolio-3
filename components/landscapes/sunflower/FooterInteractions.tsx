"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { allDestinations } from "@/config/navigation";
import { site } from "@/config/site";

type Kind = "mailbox" | "signpost";

interface Open {
  kind: Kind;
  /** Anchor point in px, relative to the footer illustration. */
  left: number;
  top: number;
  below: boolean;
}

const HALF_WIDTH = 120;

/**
 * Pointer-only enhancement for the footer illustration: clicking the mailbox opens it and
 * offers the email address; clicking the signpost lists the site's destinations.
 * It attaches one delegated listener to the illustration, so the SVG stays server-rendered.
 * The scene is decorative (aria-hidden); the footer body carries the same links for
 * keyboard and screen-reader users, so the popover links are kept out of the tab order.
 */
export default function FooterInteractions() {
  const anchor = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<Open | null>(null);

  useEffect(() => {
    const root = anchor.current?.parentElement;
    if (!root) return;

    // Hand each signpost plank its own tilt (read from data-rot) for the hover effect.
    root.querySelectorAll<SVGElement>(".sign-plank").forEach((p) => {
      p.style.setProperty("--rot", p.dataset.rot ?? "0");
    });

    const objects = () => root.querySelectorAll<SVGGElement>("[data-object]");
    const reset = () => objects().forEach((o) => o.classList.remove("is-open"));

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(".fi-pop")) return;
      const obj = target.closest<SVGGElement>("[data-object]");
      if (!obj) {
        reset();
        setOpen(null);
        return;
      }
      const kind = obj.dataset.object as Kind;
      const wasOpen = obj.classList.contains("is-open");
      reset();
      if (wasOpen) {
        setOpen(null);
        return;
      }
      obj.classList.add("is-open");
      const box = obj.getBoundingClientRect();
      const frame = root.getBoundingClientRect();
      const below = box.top - frame.top < 90;
      setOpen({
        kind,
        left: Math.min(Math.max(box.left - frame.left + box.width / 2, HALF_WIDTH), frame.width - HALF_WIDTH),
        top: below ? box.bottom - frame.top : box.top - frame.top,
        below,
      });
    };

    const onOutside = (e: PointerEvent) => {
      if (!root.contains(e.target as Node)) {
        reset();
        setOpen(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        reset();
        setOpen(null);
      }
    };

    root.addEventListener("click", onClick);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("click", onClick);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    anchor.current?.parentElement?.querySelectorAll("[data-object]").forEach((o) => o.classList.remove("is-open"));
    setOpen(null);
  };

  return (
    <>
      <span ref={anchor} hidden />
      {open && (
        <div
          className="fi-pop"
          data-below={open.below}
          style={{ left: open.left, top: open.top }}
          role="group"
          aria-label={open.kind === "mailbox" ? "Mailbox" : "Signpost"}
        >
          {open.kind === "mailbox" ? (
            <>
              <p className="fi-title">You&rsquo;ve got mail to send</p>
              <a href={`mailto:${site.email}`} className="fi-link" tabIndex={-1} onClick={close}>
                {site.email}
              </a>
            </>
          ) : (
            <>
              <p className="fi-title">Which way?</p>
              <ul className="fi-list">
                {allDestinations.map((d) => (
                  <li key={d.href}>
                    <Link href={d.href} className="fi-link" tabIndex={-1} onClick={close}>
                      {d.label} <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
}
