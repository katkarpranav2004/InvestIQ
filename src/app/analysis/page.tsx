"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  LineChart as LineChartIcon,
  Newspaper,
  ShieldAlert,
  Target,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreGauge } from "@/components/analysis/score-gauge";
import { RecommendationBadge } from "@/components/analysis/recommendation-badge";
import { SectionCard } from "@/components/analysis/section-card";
import { SwotGrid } from "@/components/analysis/swot-grid";
import { LAST_REPORT_STORAGE_KEY } from "@/lib/constants";
import type { ResearchReport } from "@/types";

export default function AnalysisPage() {
  const [report, setReport] = useState<ResearchReport | null | undefined>(undefined);

  useEffect(() => {
    const raw = sessionStorage.getItem(LAST_REPORT_STORAGE_KEY);
    setReport(raw ? (JSON.parse(raw) as ResearchReport) : null);
  }, []);

  if (report === undefined) return null;

  if (!report) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">No report found</h1>
        <p className="mt-3 text-muted-foreground">
          Run a new research query to generate an investment analysis report.
        </p>
        <Button asChild className="mt-6" variant="gradient">
          <Link href="/research">Go to Research</Link>
        </Button>
      </section>
    );
  }

  const { overview, news, business, financial, risk, swot, decision } = report;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mb-8 p-6 md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Investment Research Report
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {overview.legalName || report.companyName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {overview.sector} &middot; {overview.industry} &middot; Generated{" "}
              {new Date(report.generatedAt).toLocaleString()}
            </p>
          </div>
          <RecommendationBadge recommendation={decision.recommendation} />
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {overview.summary}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 border-t border-white/10 pt-8 sm:justify-start">
          <ScoreGauge label="Investment Score" score={decision.investmentScore} colorClass="primary" />
          <ScoreGauge label="Risk Score" score={risk.riskScore} />
          <ScoreGauge label="Confidence" score={decision.confidenceScore} colorClass="primary" />
          <ScoreGauge label="Growth Potential" score={financial.growthScore} />
        </div>
      </motion.div>

      <Tabs defaultValue="decision">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 sm:w-fit">
          <TabsTrigger value="decision">Decision</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="financial">Financials</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="swot">SWOT</TabsTrigger>
        </TabsList>

        <TabsContent value="decision" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={Target} title="Detailed Reasoning">
            <p>{decision.reasoning}</p>
          </SectionCard>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
            <SectionCard icon={TrendingUp} title="Key Positives">
              <BulletList items={decision.keyPositives} />
            </SectionCard>
            <SectionCard icon={ShieldAlert} title="Key Concerns">
              <BulletList items={decision.keyConcerns} />
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="business" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={Building2} title="Business Model">
            <p>{business.businessModel}</p>
          </SectionCard>
          <SectionCard icon={Target} title="Industry Position &amp; Competitors">
            <p>{business.industryPosition}</p>
            <p>{business.competitiveLandscape}</p>
            <BulletList items={business.competitors} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="financial" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={LineChartIcon} title="Financial Performance">
            <p>{financial.summary}</p>
            <p className="font-medium text-foreground">{financial.revenueTrend}</p>
          </SectionCard>
          <SectionCard icon={TrendingUp} title="Growth Potential">
            <p>{financial.growthPotential}</p>
          </SectionCard>
        </TabsContent>

        <TabsContent value="news" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={Newspaper} title={`Recent News (Sentiment: ${news.sentiment})`}>
            <p>{news.summary}</p>
          </SectionCard>
          <SectionCard icon={Newspaper} title="Key Events">
            <BulletList items={news.keyEvents} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="risk" className="grid grid-cols-1 gap-4">
          <SectionCard icon={ShieldAlert} title="Risk Summary">
            <p>{risk.summary}</p>
            <BulletList items={risk.riskFactors} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="swot">
          <SwotGrid swot={swot} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-muted-foreground/50">&bull;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
