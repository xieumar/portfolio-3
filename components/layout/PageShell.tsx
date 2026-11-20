import type { ReactNode } from "react";

/** The simple layout shared by the inner pages (About, Work, Contact) while they are placeholders. */
export default function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex-1 px-(--pad-x) py-(--section-space)">
      <h1 className="mt-10 text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-semibold tracking-[-0.045em]">
        {title}
      </h1>
      <p className="mt-4 max-w-[52ch] text-ink-secondary">{children}</p>
    </main>
  );
}
