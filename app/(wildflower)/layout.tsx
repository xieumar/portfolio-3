import type { ReactNode } from "react";
import SunflowerFooter from "@/components/landscapes/sunflower/SunflowerFooter";
import SunflowerHeader from "@/components/landscapes/sunflower/SunflowerHeader";
import EnvironmentShell from "@/components/layout/EnvironmentShell";

/**
 * About: wildflower environment. Uses the sunflower scenes as a stand-in until the
 * wildflower header and footer land; then only the two props below change.
 */
export default function WildflowerLayout({ children }: { children: ReactNode }) {
  return (
    <EnvironmentShell header={<SunflowerHeader />} footer={<SunflowerFooter />}>
      {children}
    </EnvironmentShell>
  );
}
