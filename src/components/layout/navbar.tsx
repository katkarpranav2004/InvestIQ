"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";

import { cn } from "@/lib/utils";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="mx-auto max-w-7xl px-6 pt-4">
        <div className="glass flex h-16 items-center justify-between rounded-2xl px-5">
          <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-[#e8c96a] to-[#b8860b] text-background shadow-glow">
              <LineChart className="h-4.5 w-4.5" />
            </span>
            <span>{APP_NAME}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === link.href && "text-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                )}
              </Link>
            ))}
          </nav>

          <MagneticButton>
            <Button asChild variant="gradient" size="sm">
              <Link href="/research">Start Research</Link>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </motion.header>
  );
}
