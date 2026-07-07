import { Lightbulb, ShieldAlert, TrendingUp, TriangleAlert } from "lucide-react";

import type { SwotAnalysis } from "@/types";
import { cn } from "@/lib/utils";

const QUADRANTS: {
  key: keyof SwotAnalysis;
  label: string;
  icon: typeof TrendingUp;
  classes: string;
}[] = [
  { key: "strengths", label: "Strengths", icon: TrendingUp, classes: "border-success/30 bg-success/[0.06]" },
  { key: "weaknesses", label: "Weaknesses", icon: ShieldAlert, classes: "border-destructive/30 bg-destructive/[0.06]" },
  { key: "opportunities", label: "Opportunities", icon: Lightbulb, classes: "border-primary/30 bg-primary/[0.06]" },
  { key: "threats", label: "Threats", icon: TriangleAlert, classes: "border-warning/30 bg-warning/[0.06]" },
];

export function SwotGrid({ swot }: { swot: SwotAnalysis }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {QUADRANTS.map((quadrant) => (
        <div key={quadrant.key} className={cn("rounded-xl border p-5", quadrant.classes)}>
          <div className="mb-3 flex items-center gap-2">
            <quadrant.icon className="h-4 w-4" />
            <h4 className="font-display text-sm font-semibold">{quadrant.label}</h4>
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {swot[quadrant.key].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-muted-foreground/50">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
