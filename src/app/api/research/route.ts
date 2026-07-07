import { NextRequest } from "next/server";

import { buildResearchGraph } from "@/lib/ai/graph";
import { WORKFLOW_STEPS } from "@/lib/constants";
import type { ResearchReport, ResearchStreamEvent, WorkflowStep } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const STEP_ORDER: WorkflowStep[] = WORKFLOW_STEPS.map((s) => s.id);

function sseEncode(event: ResearchStreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

export async function POST(req: NextRequest) {
  let body: { companyName?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const companyName = body.companyName?.trim();
  if (!companyName) {
    return Response.json({ error: "companyName is required" }, { status: 400 });
  }

  const graph = buildResearchGraph();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event: ResearchStreamEvent) => controller.enqueue(encoder.encode(sseEncode(event)));

      try {
        send({ type: "step", step: STEP_ORDER[0], status: "started" });

        const events = await graph.stream(
          { companyName },
          { streamMode: "updates" }
        );

        let report: ResearchReport | undefined;

        for await (const chunk of events) {
          const nodeName = Object.keys(chunk)[0] as WorkflowStep;
          const nodeOutput = chunk[nodeName] as { finalReport?: ResearchReport };
          if (nodeName === "report" && nodeOutput.finalReport) {
            report = nodeOutput.finalReport;
          }

          send({ type: "step", step: nodeName, status: "completed" });

          const next = STEP_ORDER[STEP_ORDER.indexOf(nodeName) + 1];
          if (next) {
            send({ type: "step", step: next, status: "started" });
          }
        }

        if (!report) {
          throw new Error("Workflow finished without producing a report.");
        }

        send({ type: "result", report });
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error while researching company.";
        send({ type: "error", message });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
