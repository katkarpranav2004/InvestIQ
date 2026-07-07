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
  },
  {
    icon: Newspaper,
    title: "News & Sentiment",
    description: "A digest of recent developments alongside an overall market sentiment read.",
  },
  {
    icon: TrendingUp,
    title: "Financial Performance",
    description: "Revenue trends and growth potential, scored for at-a-glance comparison.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Analysis",
    description: "Regulatory, competitive, and operational risk factors surfaced up front.",
  },
  {
    icon: Target,
    title: "SWOT Breakdown",
    description: "Strengths, weaknesses, opportunities, and threats in one structured view.",
  },
  {
    icon: Sparkles,
    title: "Scored Recommendation",
    description: "An Invest / Hold / Avoid call backed by an investment score, risk score, and reasoning.",
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          One agent. Eleven dimensions of analysis.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every research run walks through the same rigorous workflow an equity analyst would follow.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Card className="glass-card h-full transition-transform hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
