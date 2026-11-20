import SunflowerHeader from "@/components/landscapes/sunflower/SunflowerHeader";
import HeroIntro from "@/components/layout/HeroIntro";

export default function Home() {
  return (
    <main className="hero" aria-label="Home">
      <HeroIntro />
      <SunflowerHeader />
    </main>
  );
}
