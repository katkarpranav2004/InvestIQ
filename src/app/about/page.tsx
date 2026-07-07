import { Bot, GitBranch, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WORKFLOW_STEPS } from "@/lib/constants";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          About <span className="text-gradient">InvestIQ</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          InvestIQ is an AI investment research agent built with LangGraph and Google
          Gemini. It automates the research process a junior equity analyst would
          follow, and returns a structured, scored recommendation in seconds.
        </p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="glass-card">
          <CardHeader>
            <Bot className="mb-2 h-6 w-6 text-primary" />
            <CardTitle className="text-base">Autonomous Agent</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A LangGraph state machine runs eight specialized analysis steps in sequence,
            each one building on what earlier steps discovered.
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <ShieldCheck className="mb-2 h-6 w-6 text-primary" />
            <CardTitle className="text-base">Structured Output</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Every node returns type-safe, schema-validated JSON via Zod, so scores and
            recommendations are always predictable to render.
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <Sparkles className="mb-2 h-6 w-6 text-primary" />
            <CardTitle className="text-base">Transparent Reasoning</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            The final recommendation always ships with the detailed reasoning, key
            positives, and key concerns behind it &mdash; never a bare score.
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card mb-12">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <GitBranch className="h-5 w-5 text-primary" />
          <CardTitle>The Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WORKFLOW_STEPS.map((step, i) => (
              <li key={step.id} className="flex gap-3 rounded-lg border border-white/5 p-3">
                <span className="font-display text-sm font-bold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-warning/30 bg-warning/[0.06] p-5 text-sm text-muted-foreground">
        <strong className="text-foreground">Disclaimer:</strong> InvestIQ generates
        AI-based research for educational and demonstration purposes only. It is not
        financial advice, and its output can be inaccurate or incomplete. Always
        consult a licensed financial advisor and primary sources before investing.
      </div>
    </section>
  );
}
