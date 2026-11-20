import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SunflowerFooter from "@/components/landscapes/sunflower/SunflowerFooter";
import PageTransition from "@/components/layout/PageTransition";
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

/** Runs before first paint so the saved (or system) theme is applied with no flash. */
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <PageTransition>
          <div className="canvas">
            <div className="surface">
              <SiteHeader />
              {children}
              <SiteFooter landscape={<SunflowerFooter />} />
            </div>
          </div>
        </PageTransition>
      </body>
    </html>
  );
}
