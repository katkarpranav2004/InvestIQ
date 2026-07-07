"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { WORKFLOW_STEPS } from "@/lib/constants";

export function WorkflowStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          A transparent LangGraph workflow
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          No black box — every research run visibly steps through the same eight-node graph.
        </p>
      </div>

      <div className="glass-card flex flex-wrap items-center justify-center gap-y-4 p-6">
        {WORKFLOW_STEPS.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center"
          >
            <div className="flex flex-col items-center gap-1.5 px-3 text-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </div>
              <span className="max-w-[6.5rem] text-xs font-medium text-muted-foreground">{step.label}</span>
            </div>
            {i < WORKFLOW_STEPS.length - 1 && (
              <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-muted-foreground/40" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
