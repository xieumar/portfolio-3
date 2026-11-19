import type { ReactNode } from "react";
import SunflowerFooter from "@/components/landscapes/sunflower/SunflowerFooter";
import SunflowerHeader from "@/components/landscapes/sunflower/SunflowerHeader";
import EnvironmentShell from "@/components/layout/EnvironmentShell";

/**
 * Contact: mountain environment. Uses the sunflower scenes as a stand-in until the
 * mountain header and footer land; then only the two props below change.
 */
export default function MountainLayout({ children }: { children: ReactNode }) {
  return (
    <EnvironmentShell header={<SunflowerHeader />} footer={<SunflowerFooter />}>
      {children}
    </EnvironmentShell>
  );
}
