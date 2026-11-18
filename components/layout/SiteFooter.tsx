import Link from "next/link";
import type { ReactNode } from "react";
import { allDestinations } from "@/config/navigation";
import { site } from "@/config/site";

/**
 * Shared footer: environment illustration slot + four-column information layout.
 */
export default function SiteFooter({ landscape }: { landscape?: ReactNode }) {
  return (
    <footer className="site-footer">
      {landscape}
      <div className="site-footer-body">
        <div className="footer-grid">
          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className="footer-label">
              Write to me
            </h2>
            <a href={`mailto:${site.email}`} className="footer-strong link-subtle">
              {site.email}
            </a>
            <p className="footer-text">Got an idea, a question or a field to plant? Send a note.</p>
          </section>

          <nav aria-labelledby="footer-sitemap">
            <h2 id="footer-sitemap" className="footer-label">
              Wander
            </h2>
            <ul className="footer-list">
              {allDestinations.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link link-subtle">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-elsewhere">
            <h2 id="footer-elsewhere" className="footer-label">
              Find me
            </h2>
            <ul className="footer-list">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="footer-link link-subtle"
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
            <h2 id="footer-studio" className="footer-label">
              Currently
            </h2>
            <p className="footer-text">{site.location}</p>
            <p className="footer-text">{site.role}</p>
          </section>
        </div>

        <div className="footer-legal">
          <p>
            © {site.year} {site.name}
          </p>
          <p>Illustrated by hand, built from concrete.</p>
        </div>
      </div>
    </footer>
  );
}
