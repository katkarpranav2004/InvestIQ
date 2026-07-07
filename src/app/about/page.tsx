"use client";

import { motion } from "framer-motion";
import { Bot, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WORKFLOW_STEPS } from "@/lib/constants";

const PILLARS = [
  {
    icon: Bot,
    title: "Autonomous Agent",
    tint: "primary",
    body: "A LangGraph state machine runs eight specialized analysis steps in sequence, each one building on what earlier steps discovered.",
  },
  {
    icon: ShieldCheck,
    title: "Structured Output",
    tint: "accent",
    body: "Every node returns type-safe, schema-validated JSON via Zod, so scores and recommendations are always predictable to render.",
  },
  {
    icon: Sparkles,
    title: "Transparent Reasoning",
    tint: "secondary",
    body: "The final recommendation always ships with the detailed reasoning, key positives, and key concerns behind it — never a bare score.",
  },
] as const;

const TINT_CLASSES: Record<(typeof PILLARS)[number]["tint"], string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  secondary: "bg-secondary/10 text-secondary",
};

export default function AboutPage() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 text-center"
      >
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          About <span className="text-gradient-luxe">InvestIQ</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          InvestIQ is an AI investment research agent built with LangGraph and Groq.
          It automates the research process a junior equity analyst would follow,
          and returns a structured, scored recommendation in seconds.
        </p>
      </motion.div>

      <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-2xl ${TINT_CLASSES[pillar.tint]}`}>
                  <pillar.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">{pillar.body}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GitBranch className="h-5 w-5" />
            </div>
            <CardTitle>The Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {WORKFLOW_STEPS.map((step, i) => (
                <li
                  key={step.id}
                  className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3.5"
                >
                  <span className="font-display text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-warning/25 bg-warning/[0.06] p-5 text-sm text-muted-foreground"
      >
        <strong className="text-foreground">Disclaimer:</strong> InvestIQ generates
        AI-based research for educational and demonstration purposes only. It is not
        financial advice. Always consult a licensed financial advisor and primary
        sources before investing.
      </motion.div>
    </section>
  );
}
