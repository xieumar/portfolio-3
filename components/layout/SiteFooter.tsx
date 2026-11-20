import Link from "next/link";
import type { ReactNode } from "react";
import { allDestinations } from "@/config/navigation";
import { site } from "@/config/site";

// Column heading: a short golden rule above the title.
const label =
  "relative mb-5 pt-[0.9rem] text-[0.9375rem] font-semibold text-ink before:absolute before:top-0 before:left-0 " +
  "before:h-[3px] before:w-7 before:bg-accent before:content-['']";

/**
 * Shared footer: environment illustration slot + four-column information layout.
 */
export default function SiteFooter({ landscape }: { landscape?: ReactNode }) {
  return (
    <footer className="relative">
      {landscape}
      <div className="bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_27px,var(--color-canvas-line)_27px,var(--color-canvas-line)_28px)] px-(--pad-x) pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className={label}>
              Write to me
            </h2>
            <a href={`mailto:${site.email}`} className="link-subtle text-[1.375rem] font-medium tracking-[-0.01em]">
              {site.email}
            </a>
            <p className="mt-3 text-ink-secondary">Got an idea, a question or a field to plant? Send a note.</p>
          </section>

          <nav aria-labelledby="footer-sitemap">
            <h2 id="footer-sitemap" className={label}>
              Wander
            </h2>
            <ul className="grid gap-[0.6rem]">
              {allDestinations.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-subtle text-ink-secondary hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-elsewhere">
            <h2 id="footer-elsewhere" className={label}>
              Find me
            </h2>
            <ul className="grid gap-[0.6rem]">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="link-subtle text-ink-secondary hover:text-ink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-studio">
            <h2 id="footer-studio" className={label}>
              Currently
            </h2>
            <p className="mt-3 text-ink-secondary">{site.location}</p>
            <p className="mt-3 text-ink-secondary">{site.role}</p>
          </section>
        </div>

        <div className="mt-[72px] flex flex-col items-center gap-1 border-t border-border pt-6 text-center text-[0.8125rem] text-ink-secondary">
          <p>
            © {site.year} {site.name}
          </p>
          <p>Illustrated by hand, built from concrete.</p>
        </div>
      </div>
    </footer>
  );
}
