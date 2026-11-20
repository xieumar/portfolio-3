import MainNavigation from "./MainNavigation";

/** Floating, centred navigation. It sticks to the top of the page while the content scrolls beneath. */
export default function SiteHeader() {
  return (
    <header className="site-header">
      <MainNavigation />
    </header>
  );
}
