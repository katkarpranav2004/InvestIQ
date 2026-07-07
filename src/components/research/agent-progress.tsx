"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { THINKING_MESSAGES, WORKFLOW_STEPS } from "@/lib/constants";
import type { WorkflowStep } from "@/types";

interface AgentProgressProps {
  activeStep: WorkflowStep | null;
  completedSteps: WorkflowStep[];
}

/** The "AI is thinking" experience: a pulsing orb, rotating flavor text, and a step tracker. */
export function AgentProgress({ activeStep, completedSteps }: AgentProgressProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    setMessageIndex(0);
    if (!activeStep) return;
    const messages = THINKING_MESSAGES[activeStep];
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [activeStep]);

  const activeLabel = WORKFLOW_STEPS.find((s) => s.id === activeStep)?.label;
  const message = activeStep ? THINKING_MESSAGES[activeStep][messageIndex] : "";

  return (
    <div className="glass-card flex flex-col items-center p-8 md:p-10">
      <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full opacity-70"
          style={{
            background: "conic-gradient(from 0deg, rgb(var(--primary)), rgb(var(--accent)), rgb(var(--secondary)), rgb(var(--primary)))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[3px] rounded-full bg-card" />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.03] text-primary"
        >
          <Brain className="h-7 w-7" />
        </motion.div>
      </div>

      <p className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {activeLabel ?? "Working"}
      </p>

      <div className="mt-2 flex h-7 items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="shimmer-text text-base font-medium"
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-2">
        {WORKFLOW_STEPS.map((step) => {
          const isDone = completedSteps.includes(step.id);
          const isActive = activeStep === step.id && !isDone;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isDone && "border-success/30 bg-success/10 text-success",
                isActive && "border-primary/40 bg-primary/10 text-primary",
                !isDone && !isActive && "border-white/[0.06] bg-white/[0.02] text-muted-foreground"
              )}
            >
              {isDone ? (
                <Check className="h-3 w-3" />
              ) : (
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isActive ? "animate-pulse-glow bg-primary" : "bg-muted-foreground/40"
                  )}
                />
              )}
              {step.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
