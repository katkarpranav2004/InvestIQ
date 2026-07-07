import Link from "next/link";

import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME} &mdash; {APP_TAGLINE}
        </p>
        <p className="text-xs">
          AI-generated research for educational purposes only. Not financial advice.{" "}
          <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
            Learn more
          </Link>
        </p>
      </div>
    </footer>
  );
}
