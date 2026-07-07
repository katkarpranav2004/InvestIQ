import { CheckCircle2, MinusCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Recommendation } from "@/types";

const CONFIG: Record<Recommendation, { icon: typeof CheckCircle2; classes: string; label: string }> = {
  Invest: {
    icon: CheckCircle2,
    classes: "bg-success/15 text-success border-success/40",
    label: "Invest",
  },
  Hold: {
    icon: MinusCircle,
    classes: "bg-warning/15 text-warning border-warning/40",
    label: "Hold",
  },
  Avoid: {
    icon: XCircle,
    classes: "bg-destructive/15 text-destructive border-destructive/40",
    label: "Avoid",
  },
};

export function RecommendationBadge({ recommendation }: { recommendation: Recommendation }) {
  const { icon: Icon, classes, label } = CONFIG[recommendation];

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border px-5 py-2 text-lg font-bold",
        classes
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </div>
  );
}
