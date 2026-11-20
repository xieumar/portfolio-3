export interface NavItem {
  label: string;
  href: string;
}

/** The header navigation (the site name, which links home, and the theme toggle are rendered separately). */
export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

/** Every destination, used by the footer sitemap and the footer signpost. */
export const allDestinations: NavItem[] = [{ label: "Welcome", href: "/" }, ...navItems];
