export interface Project {
  title: string;
  category: string;
  year: string;
  /** Where the folder links to. Placeholders all go to the work page for now. */
  href: string;
  /** Folder colour, built from theme tokens so it follows light and dark. */
  tone: string;
}

/** Placeholder projects: replace the titles, categories and links with real ones. */
export const projects: Project[] = [
  {
    title: "Project One",
    category: "Web app",
    year: "2026",
    href: "/work",
    tone: "var(--env-soft)",
  },
  {
    title: "Project Two",
    category: "Design system",
    year: "2025",
    href: "/work",
    tone: "color-mix(in srgb, var(--color-golden) 55%, var(--color-ivory))",
  },
  {
    title: "Project Three",
    category: "Marketing site",
    year: "2025",
    href: "/work",
    tone: "color-mix(in srgb, var(--color-olive) 38%, var(--color-ivory))",
  },
  {
    title: "Project Four",
    category: "Mobile app",
    year: "2024",
    href: "/work",
    tone: "color-mix(in srgb, var(--color-raspberry) 28%, var(--color-ivory))",
  },
];
