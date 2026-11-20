/** Placeholder details (email, socials, location, intro copy): replace with your real ones. */
export const site = {
  name: "Zainab",
  role: "Frontend developer",
  email: "hello@example.com",
  location: "Somewhere green",
  year: 2026,
  intro: {
    /** The headline reads: before + a highlighted word that cycles through `words` + after. Keep it to two lines. */
    headline: {
      before: "I build fun,",
      words: ["interactive", "playful", "accessible", "responsive", "expressive", "delightful"],
      after: "things for the web.",
    },
    blurb:
      "I'm Zainab, a frontend developer. I turn designs into fast, accessible sites, and I sweat the small things: the spacing, the motion, the details most people only feel.",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Read.cv", href: "https://read.cv/" },
  ],
} as const;
