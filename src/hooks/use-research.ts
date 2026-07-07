"use client";

import { useCallback, useRef, useState } from "react";

import type { ResearchReport, ResearchStreamEvent, WorkflowStep } from "@/types";

interface UseResearchResult {
  isLoading: boolean;
  error: string | null;
  report: ResearchReport | null;
  completedSteps: WorkflowStep[];
  activeStep: WorkflowStep | null;
  runResearch: (companyName: string) => Promise<void>;
  reset: () => void;
}

/**
 * Drives a research run against /api/research, consuming the server-sent
 * event stream so the UI can show each LangGraph node completing live
 * instead of one long spinner.
 */
export function useResearch(): UseResearchResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [completedSteps, setCompletedSteps] = useState<WorkflowStep[]>([]);
  const [activeStep, setActiveStep] = useState<WorkflowStep | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setError(null);
    setReport(null);
    setCompletedSteps([]);
    setActiveStep(null);
  }, []);

  const runResearch = useCallback(async (companyName: string) => {
    reset();
    setIsLoading(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to start research.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const messages = buffer.split("\n\n");
        buffer = messages.pop() ?? "";

        for (const message of messages) {
          if (!message.startsWith("data: ")) continue;
          const event: ResearchStreamEvent = JSON.parse(message.slice(6));

          if (event.type === "step") {
            if (event.status === "started") {
              setActiveStep(event.step);
            } else {
              setCompletedSteps((prev) => (prev.includes(event.step) ? prev : [...prev, event.step]));
            }
          } else if (event.type === "result") {
            setReport(event.report);
          } else if (event.type === "error") {
            throw new Error(event.message);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [reset]);

  return { isLoading, error, report, completedSteps, activeStep, runResearch, reset };
}
