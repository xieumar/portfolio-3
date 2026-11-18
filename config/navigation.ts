export interface NavItem {
  label: string;
  href: string;
}

/** Main navigation (the Contact call-to-action is rendered separately). */
export const mainNav: NavItem[] = [
  { label: "Welcome", href: "/" },
  { label: "My Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const contactNav: NavItem = { label: "Contact", href: "/contact" };

/** Every destination, used by the footer sitemap and the footer signpost. */
export const allDestinations: NavItem[] = [...mainNav, contactNav];
