"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

interface Open {
  /** Anchor point in px, relative to the footer illustration. */
  left: number;
  top: number;
  below: boolean;
}

const HALF_WIDTH = 120;

/**
 * Pointer-only enhancement for the footer illustration, via one delegated listener so the SVG
 * stays server-rendered: clicking a signpost plank goes to that page, and clicking the mailbox
 * opens it and offers the email address. The scene is decorative (aria-hidden); the footer body
 * carries the same links for keyboard and screen-reader users, so the popover link is kept out
 * of the tab order.
 */
export default function FooterInteractions() {
  const router = useRouter();
  const anchor = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<Open | null>(null);

  useEffect(() => {
    const root = anchor.current?.parentElement;
    if (!root) return;

    const mailboxes = () => root.querySelectorAll<SVGGElement>('[data-object="mailbox"]');
    const reset = () => {
      mailboxes().forEach((o) => o.classList.remove("is-open"));
      setOpen(null);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest(".fi-pop")) return;

      const plank = target.closest<SVGGElement>(".sign-plank[data-href]");
      if (plank) {
        reset();
        router.push(plank.dataset.href!);
        return;
      }

      const mailbox = target.closest<SVGGElement>('[data-object="mailbox"]');
      if (!mailbox) {
        reset();
        return;
      }
      const wasOpen = mailbox.classList.contains("is-open");
      reset();
      if (wasOpen) return;

      mailbox.classList.add("is-open");
      const box = mailbox.getBoundingClientRect();
      const frame = root.getBoundingClientRect();
      const below = box.top - frame.top < 90;
      setOpen({
        left: Math.min(Math.max(box.left - frame.left + box.width / 2, HALF_WIDTH), frame.width - HALF_WIDTH),
        top: below ? box.bottom - frame.top : box.top - frame.top,
        below,
      });
    };

    const onOutside = (e: PointerEvent) => {
      if (!root.contains(e.target as Node)) reset();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };

    root.addEventListener("click", onClick);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("click", onClick);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [router]);

  const close = () => {
    anchor.current?.parentElement
      ?.querySelectorAll('[data-object="mailbox"]')
      .forEach((o) => o.classList.remove("is-open"));
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
          aria-label="Mailbox"
        >
          <p className="fi-title">Drop me a line</p>
          <a href={`mailto:${site.email}`} className="fi-link" tabIndex={-1} onClick={close}>
            {site.email}
          </a>
        </div>
      )}
    </>
  );
}
