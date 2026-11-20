"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useNavTransition } from "./PageTransition";

type Props = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string;
  /** The name shown full-screen while the page changes. */
  label: string;
  onNavigate?: () => void;
};

/** A next/link that plays the full-screen page-name transition on a normal click. */
export default function TransitionLink({ href, label, onNavigate, children, ...rest }: Props) {
  const { go } = useNavTransition();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return; // let the browser handle new-tab / download clicks
    }
    e.preventDefault();
    onNavigate?.();
    go(href, label);
  }

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
