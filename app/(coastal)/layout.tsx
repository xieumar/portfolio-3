import type { ReactNode } from "react";
import SunflowerFooter from "@/components/landscapes/sunflower/SunflowerFooter";
import SunflowerHeader from "@/components/landscapes/sunflower/SunflowerHeader";
import EnvironmentShell from "@/components/layout/EnvironmentShell";

/**
 * My Work: coastal environment. Uses the sunflower scenes as a stand-in until the
 * coastal header and footer land; then only the two props below change.
 */
export default function CoastalLayout({ children }: { children: ReactNode }) {
  return (
    <EnvironmentShell header={<SunflowerHeader />} footer={<SunflowerFooter />}>
      {children}
    </EnvironmentShell>
  );
}
