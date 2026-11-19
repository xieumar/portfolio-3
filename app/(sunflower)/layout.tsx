import type { ReactNode } from "react";
import SunflowerFooter from "@/components/landscapes/sunflower/SunflowerFooter";
import SunflowerHeader from "@/components/landscapes/sunflower/SunflowerHeader";
import EnvironmentShell from "@/components/layout/EnvironmentShell";

/** Welcome (home): the sunflower field. */
export default function SunflowerLayout({ children }: { children: ReactNode }) {
  return (
    <EnvironmentShell header={<SunflowerHeader />} footer={<SunflowerFooter />}>
      {children}
    </EnvironmentShell>
  );
}
