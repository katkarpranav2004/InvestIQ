"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { WORKFLOW_STEPS } from "@/lib/constants";

export function WorkflowStrip() {
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
          A transparent <span className="text-gradient-luxe">LangGraph</span> workflow
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          No black box — every research run visibly steps through the same eight-node graph.
        </p>
      </motion.div>

      <div className="glass-card flex flex-wrap items-center justify-center gap-y-6 p-8">
        {WORKFLOW_STEPS.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex items-center"
          >
            <div className="flex flex-col items-center gap-2 px-3 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-xs font-bold text-primary shadow-[0_0_0_1px_rgb(255_255_255_/_0.04)_inset]">
                {i + 1}
              </div>
              <span className="max-w-[6.5rem] text-xs font-medium text-muted-foreground">{step.label}</span>
            </div>
            {i < WORKFLOW_STEPS.length - 1 && (
              <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-muted-foreground/30" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
