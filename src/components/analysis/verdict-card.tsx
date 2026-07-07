"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ScoreGauge } from "@/components/analysis/score-gauge";
import { LinearMeter } from "@/components/analysis/linear-meter";
import { RecommendationBadge } from "@/components/analysis/recommendation-badge";
import type { InvestmentDecision } from "@/types";

export function VerdictCard({ decision }: { decision: InvestmentDecision }) {
  return (
    <Card className="gradient-border overflow-visible p-1">
      <div className="grid grid-cols-1 gap-8 p-7 md:grid-cols-[auto_1fr] md:items-center md:p-9">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <ScoreGauge label="Investment Score" score={decision.investmentScore} colorClass="primary" size="lg" />
        </motion.div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <Gauge className="h-4 w-4" />
              Investment Verdict
            </span>
            <RecommendationBadge recommendation={decision.recommendation} />
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">{decision.reasoning}</p>

          <LinearMeter label="Confidence" value={decision.confidenceScore} tone="good" />
        </div>
      </div>
    </Card>
  );
}
