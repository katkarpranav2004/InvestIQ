import type { ResearchReport } from "@/types";
import type { ResearchStateType } from "../state";

/** Node 8: assembles every prior node's output into the single report shape the UI renders. */
export async function reportNode(state: ResearchStateType) {
  if (
    !state.overview ||
    !state.newsAnalysis ||
    !state.businessAnalysis ||
    !state.financialAnalysis ||
    !state.riskAnalysis ||
    !state.swotAnalysis ||
    !state.investmentDecision
  ) {
    throw new Error("Cannot compile final report: an earlier workflow step did not complete.");
  }

  const report: ResearchReport = {
    companyName: state.companyName,
    generatedAt: new Date().toISOString(),
    overview: state.overview,
    news: state.newsAnalysis,
    business: state.businessAnalysis,
    financial: state.financialAnalysis,
    risk: state.riskAnalysis,
    swot: state.swotAnalysis,
    decision: state.investmentDecision,
  };

  return { finalReport: report };
}
