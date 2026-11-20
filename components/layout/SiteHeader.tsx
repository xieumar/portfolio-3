import MainNavigation from "./MainNavigation";

/**
 * Floating, centred navigation. The header has no height of its own: the pill sticks to the top of the
 * viewport while the page content scrolls beneath it.
 */
export default function SiteHeader() {
  return (
    <header className="pointer-events-none sticky top-3.5 z-30 flex h-0 justify-center px-(--pad-x)">
      <MainNavigation />
    </header>
  );
}
