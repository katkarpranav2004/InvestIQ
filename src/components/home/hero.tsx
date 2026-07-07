"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MouseGlow } from "@/components/ui/mouse-glow";
import { Particles } from "@/components/ui/particles";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { APP_TAGLINE, HOME_STATS, TICKER_COMPANIES } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-28 pt-24 md:pt-32">
      <AuroraBackground dense />
      <MouseGlow />
      <Particles />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="glass mb-7 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Powered by LangGraph &amp; Groq
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-balance font-display text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="text-gradient-luxe">{APP_TAGLINE}</span>
          <br />
          <span className="text-foreground">for every public company.</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground"
        >
          Type a company name and watch an autonomous AI research agent analyze its
          business, financials, risks, and market sentiment — then deliver a
          scored, evidence-backed investment recommendation in seconds.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton>
            <Button asChild size="lg" variant="gradient">
              <Link href="/research">
                Research a Company <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">How it works</Link>
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-16 grid grid-cols-3 gap-6 sm:gap-14"
        >
          {HOME_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1 max-w-[9rem] text-center text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        custom={5}
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="relative mt-20 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...TICKER_COMPANIES, ...TICKER_COMPANIES].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-sm font-medium tracking-wide text-muted-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
