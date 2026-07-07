"use client";

import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";

import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  label: string;
  score: number;
  colorClass?: "primary" | "success" | "warning" | "destructive";
}

const COLOR_MAP: Record<NonNullable<ScoreGaugeProps["colorClass"]>, string> = {
  primary: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  destructive: "hsl(var(--destructive))",
};

/** Auto-picks a color based on the score when no explicit colorClass is given (higher = better). */
function autoColor(score: number): NonNullable<ScoreGaugeProps["colorClass"]> {
  if (score >= 70) return "success";
  if (score >= 45) return "warning";
  return "destructive";
}

export function ScoreGauge({ label, score, colorClass }: ScoreGaugeProps) {
  const resolvedColor = COLOR_MAP[colorClass ?? autoColor(score)];
  const data = [{ value: score, fill: resolvedColor }];

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <RadialBarChart
          width={128}
          height={128}
          innerRadius={48}
          outerRadius={62}
          barSize={10}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar background={{ fill: "hsl(var(--muted))" }} dataKey="value" cornerRadius={10} />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold">{Math.round(score)}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className={cn("mt-2 text-center text-sm font-medium text-muted-foreground")}>{label}</p>
    </div>
  );
}
