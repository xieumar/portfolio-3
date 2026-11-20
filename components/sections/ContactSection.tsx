"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { softButton } from "@/components/ui/styles";
import { site } from "@/config/site";

// Placeholder copy: replace with the real thing.
const headline = "Let's make something grow.";
const blurb = "I'd love to hear what you're working on.";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

/** The email address, with a button that copies it. */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      /* clipboard unavailable: the address is still a link */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <a href={`mailto:${site.email}`} className="link-subtle text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-[-0.02em]">
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="cursor-pointer rounded-full border border-border px-3 py-1 font-mono text-xs tracking-[0.08em] text-ink-secondary uppercase transition-colors duration-(--dur-hover) ease-soft hover:border-earth hover:text-ink"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}

/** The Contact section, below the projects: a short invitation on the left, the ways to reach me on the right. */
export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-border px-(--pad-x) pt-[calc(var(--section-space)/2)] pb-(--section-space)"
    >
      <div className="grid grid-cols-1 items-start gap-12 min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] min-[900px]:gap-x-12">
        <div className="flex flex-col gap-5">
          <motion.h2
            id="contact-title"
            className="text-[clamp(2rem,4.6vw,3.75rem)] leading-[1.08] font-medium tracking-[-0.035em] text-balance"
            {...rise()}
          >
            {headline}
          </motion.h2>
          <motion.p className="max-w-[40ch] leading-[1.65] text-ink-secondary" {...rise(0.08)}>
            {blurb}
          </motion.p>
        </div>

        <div className="flex flex-col items-start gap-8">
          <motion.div className="flex flex-col gap-4" {...rise(0.12)}>
            <CopyEmail />
            <div>
              <a href={`mailto:${site.email}`} className={softButton}>
                Send me an email
              </a>
            </div>
          </motion.div>

          <motion.ul className="w-full max-w-[52ch] border-t border-border" {...rise(0.2)}>
            {site.socials.map((s) => (
              <li key={s.href} className="border-b border-border">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 text-ink-secondary hover:text-ink"
                >
                  {s.label}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-(--dur-hover) ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
