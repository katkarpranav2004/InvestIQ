import type { ResearchStateType } from "./state";

/**
 * Flattens whatever the graph has learned so far into a compact text block
 * that later nodes (risk, SWOT, decision) can pass to the model as context,
 * instead of re-sending the entire structured state.
 */
export function buildContext(state: ResearchStateType): string {
  const parts: string[] = [];

  if (state.overview) {
    parts.push(`OVERVIEW: ${state.overview.summary}`);
  }
  if (state.newsAnalysis) {
    parts.push(`NEWS & SENTIMENT (${state.newsAnalysis.sentiment}): ${state.newsAnalysis.summary}`);
  }
  if (state.businessAnalysis) {
    parts.push(
      `BUSINESS MODEL: ${state.businessAnalysis.businessModel}\nINDUSTRY POSITION: ${state.businessAnalysis.industryPosition}\nCOMPETITORS: ${state.businessAnalysis.competitors.join(", ")}`
    );
  }
  if (state.financialAnalysis) {
    parts.push(
      `FINANCIALS: ${state.financialAnalysis.summary}\nREVENUE TREND: ${state.financialAnalysis.revenueTrend}\nGROWTH POTENTIAL: ${state.financialAnalysis.growthPotential}`
    );
  }
  if (state.riskAnalysis) {
    parts.push(`RISK FACTORS: ${state.riskAnalysis.riskFactors.join("; ")}`);
  }
  if (state.swotAnalysis) {
    parts.push(
      `SWOT — Strengths: ${state.swotAnalysis.strengths.join("; ")} | Weaknesses: ${state.swotAnalysis.weaknesses.join("; ")} | Opportunities: ${state.swotAnalysis.opportunities.join("; ")} | Threats: ${state.swotAnalysis.threats.join("; ")}`
    );
  }

  return parts.join("\n\n");
}
