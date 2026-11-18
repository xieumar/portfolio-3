import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SunflowerHeader from "@/components/landscapes/sunflower/SunflowerHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "An illustrated developer portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className="canvas">
          <div className="surface">
            <SiteHeader landscape={<SunflowerHeader />} />
            {children}
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
