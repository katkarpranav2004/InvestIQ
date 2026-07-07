import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { APP_DESCRIPTION, APP_NAME, APP_TAGLINE } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: `${APP_NAME} — ${APP_TAGLINE}`,
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen font-sans antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <div className="fixed inset-0 -z-10">
            <AuroraBackground />
          </div>
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
