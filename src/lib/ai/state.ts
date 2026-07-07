import { Annotation } from "@langchain/langgraph";

import type {
  BusinessAnalysis,
  CompanyOverview,
  FinancialAnalysis,
  InvestmentDecision,
  NewsAnalysis,
  ResearchReport,
  RiskAnalysis,
  SwotAnalysis,
} from "@/types";

/**
 * Shared state that flows through every node of the LangGraph workflow.
 * Each node reads what earlier nodes produced and writes its own slice.
 */
// Note: channel keys must not collide with the graph's node names (e.g. "news",
// "risk"), or LangGraph throws at compile time — hence the Analysis/Decision/Report suffixes.
export const ResearchState = Annotation.Root({
  companyName: Annotation<string>,
  overview: Annotation<CompanyOverview | undefined>,
  newsAnalysis: Annotation<NewsAnalysis | undefined>,
  businessAnalysis: Annotation<BusinessAnalysis | undefined>,
  financialAnalysis: Annotation<FinancialAnalysis | undefined>,
  riskAnalysis: Annotation<RiskAnalysis | undefined>,
  swotAnalysis: Annotation<SwotAnalysis | undefined>,
  investmentDecision: Annotation<InvestmentDecision | undefined>,
  finalReport: Annotation<ResearchReport | undefined>,
});

export type ResearchStateType = typeof ResearchState.State;
