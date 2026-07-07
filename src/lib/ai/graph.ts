import { StateGraph } from "@langchain/langgraph";

import { ResearchState } from "./state";
import { researchNode } from "./nodes/research";
import { newsNode } from "./nodes/news";
import { businessNode } from "./nodes/business";
import { financialNode } from "./nodes/financial";
import { riskNode } from "./nodes/risk";
import { swotNode } from "./nodes/swot";
import { decisionNode } from "./nodes/decision";
import { reportNode } from "./nodes/report";

/**
 * The InvestIQ research workflow, wired exactly as the assignment's flow diagram:
 *
 *   Input Company -> Research -> News -> Business -> Financial
 *   -> Risk -> SWOT -> Investment Decision -> Final Report
 *
 * Each node writes its own slice of state; later nodes (risk, swot, decision)
 * read everything written before them via buildContext().
 */
export function buildResearchGraph() {
  const graph = new StateGraph(ResearchState)
    .addNode("research", researchNode)
    .addNode("news", newsNode)
    .addNode("business", businessNode)
    .addNode("financial", financialNode)
    .addNode("risk", riskNode)
    .addNode("swot", swotNode)
    .addNode("decision", decisionNode)
    .addNode("report", reportNode)
    .addEdge("__start__", "research")
    .addEdge("research", "news")
    .addEdge("news", "business")
    .addEdge("business", "financial")
    .addEdge("financial", "risk")
    .addEdge("risk", "swot")
    .addEdge("swot", "decision")
    .addEdge("decision", "report")
    .addEdge("report", "__end__");

  return graph.compile();
}
