import SunflowerHeader from "@/components/landscapes/sunflower/SunflowerHeader";
import HeroIntro from "@/components/layout/HeroIntro";
import ProjectFolders from "@/components/sections/ProjectFolders";

/* The hero is 90% of the viewport tall, so the field of flowers ends about 90% down the first screen.
   The soft glow behind it is warm sun by day and cool moonlight at night. */
const hero =
  "relative isolate flex min-h-[90svh] flex-1 flex-col [&_.ls-header]:border-b [&_.ls-header]:border-border " +
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:content-[''] " +
  "before:bg-[radial-gradient(ellipse_55%_60%_at_82%_12%,color-mix(in_srgb,var(--env-accent)_22%,transparent),transparent_70%),radial-gradient(ellipse_40%_45%_at_8%_75%,color-mix(in_srgb,var(--env-accent)_10%,transparent),transparent_70%)] " +
  "dark:before:bg-[radial-gradient(ellipse_55%_60%_at_82%_12%,rgba(120,150,255,0.14),transparent_70%)]";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col" aria-label="Home">
      <section className={hero} aria-label="Introduction">
        <HeroIntro />
        <SunflowerHeader />
      </section>
      <ProjectFolders />
    </main>
  );
}
