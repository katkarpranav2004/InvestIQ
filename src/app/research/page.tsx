"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import { SearchForm } from "@/components/research/search-form";
import { AgentProgress } from "@/components/research/agent-progress";
import { useResearch } from "@/hooks/use-research";
import { LAST_REPORT_STORAGE_KEY } from "@/lib/constants";

export default function ResearchPage() {
  const router = useRouter();
  const { isLoading, error, report, completedSteps, activeStep, runResearch } = useResearch();

  useEffect(() => {
    if (report) {
      sessionStorage.setItem(LAST_REPORT_STORAGE_KEY, JSON.stringify(report));
      router.push("/analysis");
    }
  }, [report, router]);

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 text-center"
      >
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Research <span className="text-gradient-luxe">Dashboard</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Enter any public company and let the AI agent build a full investment research report.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <SearchForm onSubmit={runResearch} isLoading={isLoading} />
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </motion.div>
      )}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <AgentProgress activeStep={activeStep} completedSteps={completedSteps} />
        </motion.div>
      )}
    </section>
  );
}
