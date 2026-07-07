"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";

import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface ScoreGaugeProps {
  label: string;
  score: number;
  colorClass?: "primary" | "success" | "warning" | "destructive" | "accent";
  size?: "default" | "lg";
}

const COLOR_MAP: Record<NonNullable<ScoreGaugeProps["colorClass"]>, string> = {
  primary: "rgb(var(--primary))",
  accent: "rgb(var(--accent))",
  success: "rgb(var(--success))",
  warning: "rgb(var(--warning))",
  destructive: "rgb(var(--destructive))",
};

/** Auto-picks a color based on the score when no explicit colorClass is given (higher = better). */
function autoColor(score: number): NonNullable<ScoreGaugeProps["colorClass"]> {
  if (score >= 70) return "success";
  if (score >= 45) return "warning";
  return "destructive";
}

export function ScoreGauge({ label, score, colorClass, size = "default" }: ScoreGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 100px 0px" });
  const [animatedScore, setAnimatedScore] = useState(0);
  const resolvedColor = COLOR_MAP[colorClass ?? autoColor(score)];
  const dimension = size === "lg" ? 168 : 128;

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setAnimatedScore(score), 100);
      return () => clearTimeout(timeout);
    }
  }, [isInView, score]);

  const data = [{ value: animatedScore, fill: resolvedColor }];

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative" style={{ height: dimension, width: dimension }}>
        <RadialBarChart
          width={dimension}
          height={dimension}
          innerRadius={size === "lg" ? "68%" : "62%"}
          outerRadius={size === "lg" ? "84%" : "80%"}
          barSize={size === "lg" ? 12 : 10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: "rgb(var(--muted))" }} dataKey="value" cornerRadius={10} isAnimationActive />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display font-semibold", size === "lg" ? "text-4xl" : "text-2xl")}>
            <AnimatedCounter value={isInView ? score : 0} />
          </span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="mt-2 text-center text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}
