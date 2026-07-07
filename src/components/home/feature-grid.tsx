"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Newspaper,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Business & Industry Analysis",
    description: "Business model, competitive landscape, and industry positioning, mapped out clearly.",
    tint: "primary",
  },
  {
    icon: Newspaper,
    title: "News & Sentiment",
    description: "A digest of recent developments alongside an overall market sentiment read.",
    tint: "accent",
  },
  {
    icon: TrendingUp,
    title: "Financial Performance",
    description: "Revenue trends and growth potential, scored for at-a-glance comparison.",
    tint: "secondary",
  },
  {
    icon: ShieldAlert,
    title: "Risk Analysis",
    description: "Regulatory, competitive, and operational risk factors surfaced up front.",
    tint: "primary",
  },
  {
    icon: Target,
    title: "SWOT Breakdown",
    description: "Strengths, weaknesses, opportunities, and threats in one structured view.",
    tint: "accent",
  },
  {
    icon: Sparkles,
    title: "Scored Recommendation",
    description: "An Invest / Hold / Avoid call backed by an investment score, risk score, and reasoning.",
    tint: "secondary",
  },
] as const;

const TINT_CLASSES: Record<(typeof FEATURES)[number]["tint"], string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  secondary: "bg-secondary/10 text-secondary",
};

export function FeatureGrid() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          One agent. <span className="text-gradient-gold">Eleven dimensions</span> of analysis.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every research run walks through the same rigorous workflow an equity analyst would follow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/card:scale-110 ${TINT_CLASSES[feature.tint]}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
