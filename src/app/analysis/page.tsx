"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Newspaper,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerdictCard } from "@/components/analysis/verdict-card";
import { CompanyOverviewCard } from "@/components/analysis/company-overview-card";
import { LinearMeter } from "@/components/analysis/linear-meter";
import { ScoreGauge } from "@/components/analysis/score-gauge";
import { SectionCard } from "@/components/analysis/section-card";
import { SwotGrid } from "@/components/analysis/swot-grid";
import { NewsTimeline } from "@/components/analysis/news-timeline";
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
        <h1 className="font-display text-2xl font-semibold">No report found</h1>
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
    <section className="relative mx-auto max-w-5xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Investment Research Report</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {overview.legalName || report.companyName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {overview.sector} &middot; {overview.industry} &middot; Generated{" "}
            {new Date(report.generatedAt).toLocaleString()}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5"
      >
        <VerdictCard decision={decision} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        <div className="glass-card flex items-center p-6">
          <LinearMeter
            label="Risk Score"
            value={risk.riskScore}
            tone="bad"
            icon={<ShieldAlert className="h-4 w-4" />}
            helperText="Higher means riskier"
          />
        </div>
        <div className="glass-card flex items-center justify-center gap-6 p-6">
          <ScoreGauge label="Growth Potential" score={financial.growthScore} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <CompanyOverviewCard overview={overview} />
      </motion.div>

      <Tabs defaultValue="highlights">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 sm:w-fit">
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="financial">Financials</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="swot">SWOT</TabsTrigger>
        </TabsList>

        <TabsContent value="highlights" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={TrendingUp} title="Key Positives" tint="primary">
            <BulletList items={decision.keyPositives} />
          </SectionCard>
          <SectionCard icon={TrendingDown} title="Key Concerns" tint="secondary">
            <BulletList items={decision.keyConcerns} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="business" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={Building2} title="Business Model" tint="primary">
            <p>{business.businessModel}</p>
          </SectionCard>
          <SectionCard icon={Target} title="Industry Position &amp; Competitors" tint="accent">
            <p>{business.industryPosition}</p>
            <p>{business.competitiveLandscape}</p>
            <BulletList items={business.competitors} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="financial" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={TrendingUp} title="Financial Performance" tint="primary">
            <p>{financial.summary}</p>
            <p className="font-medium text-foreground">{financial.revenueTrend}</p>
          </SectionCard>
          <SectionCard icon={Sparkles} title="Growth Potential" tint="accent">
            <p>{financial.growthPotential}</p>
          </SectionCard>
        </TabsContent>

        <TabsContent value="news" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SectionCard icon={Newspaper} title={`Recent News (Sentiment: ${news.sentiment})`} tint="primary">
            <p>{news.summary}</p>
          </SectionCard>
          <SectionCard icon={Newspaper} title="Key Events Timeline" tint="accent">
            <NewsTimeline events={news.keyEvents} />
          </SectionCard>
        </TabsContent>

        <TabsContent value="risk" className="grid grid-cols-1 gap-4">
          <SectionCard icon={ShieldAlert} title="Risk Summary" tint="secondary">
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
