import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

/**
 * Wraps a route group's pages in the shared header and footer with that environment's
 * illustrations. Each route group's layout renders this with its own landscapes, so only the
 * active environment's code is loaded and the shared header/footer are never edited.
 */
export default function EnvironmentShell({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader landscape={header} />
      {children}
      <SiteFooter landscape={footer} />
    </>
  );
}
