import Link from "next/link";

import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-gradient-luxe font-medium">{APP_NAME}</span> &mdash; {APP_TAGLINE}
        </p>
        <p className="text-xs">
          AI-generated research for educational purposes only. Not financial advice.{" "}
          <Link href="/about" className="text-primary/80 underline underline-offset-4 hover:text-primary">
            Learn more
          </Link>
        </p>
      </div>
    </footer>
  );
}
