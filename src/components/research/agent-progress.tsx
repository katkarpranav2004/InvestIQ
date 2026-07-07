"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { WORKFLOW_STEPS } from "@/lib/constants";
import type { WorkflowStep } from "@/types";

interface AgentProgressProps {
  activeStep: WorkflowStep | null;
  completedSteps: WorkflowStep[];
}

export function AgentProgress({ activeStep, completedSteps }: AgentProgressProps) {
  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="mb-6 font-display text-base font-semibold">AI Agent Progress</h3>
      <ol className="space-y-4">
        {WORKFLOW_STEPS.map((step, i) => {
          const isDone = completedSteps.includes(step.id);
          const isActive = activeStep === step.id && !isDone;

          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="flex items-start gap-3"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  isDone && "border-success bg-success/20 text-success",
                  isActive && "border-primary bg-primary/20 text-primary",
                  !isDone && !isActive && "border-border text-muted-foreground"
                )}
              >
                {isDone ? (
                  <Check className="h-3.5 w-3.5" />
                ) : isActive ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  i + 1
                )}
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    (isDone || isActive) ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
