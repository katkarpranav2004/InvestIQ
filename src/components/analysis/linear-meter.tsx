"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { AnimatedCounter } from "@/components/ui/animated-counter";

interface LinearMeterProps {
  label: string;
  value: number;
  icon?: React.ReactNode;
  /** "good" = high value is favorable (gold→success gradient), "bad" = high value is unfavorable (success→destructive). */
  tone?: "good" | "bad";
  helperText?: string;
}

export function LinearMeter({ label, value, icon, tone = "good", helperText }: LinearMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 100px 0px" });

  const gradient =
    tone === "bad"
      ? "linear-gradient(90deg, rgb(var(--success)), rgb(var(--warning)), rgb(var(--destructive)))"
      : "linear-gradient(90deg, rgb(var(--secondary)), rgb(var(--primary)), rgb(var(--accent)))";

  return (
    <div ref={ref} className="w-full">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="font-display text-lg font-semibold">
          <AnimatedCounter value={isInView ? value : 0} />
          <span className="text-xs text-muted-foreground">/100</span>
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ background: gradient }}
          initial={{ width: "0%" }}
          animate={{ width: isInView ? `${value}%` : "0%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </div>
      {helperText && <p className="mt-2 text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
}
