/**
 * Shared domain types for InvestIQ.
 * These mirror the Zod schemas in `src/lib/ai/schemas.ts` — the schemas are the
 * runtime source of truth, these types are what the rest of the app codes against.
 */

export type Recommendation = "Invest" | "Hold" | "Avoid";

export type Sentiment = "Positive" | "Neutral" | "Negative";

export interface CompanyOverview {
  legalName: string;
  founded: string;
  headquarters: string;
  ceo: string;
  sector: string;
  industry: string;
  summary: string;
}

export interface NewsAnalysis {
  summary: string;
  keyEvents: string[];
  sentiment: Sentiment;
  sentimentScore: number; // 0-100
}

export interface BusinessAnalysis {
  businessModel: string;
  industryPosition: string;
  competitiveLandscape: string;
  competitors: string[];
}

export interface FinancialAnalysis {
  summary: string;
  revenueTrend: string;
  growthPotential: string;
  growthScore: number; // 0-100
}

export interface RiskAnalysis {
  summary: string;
  riskFactors: string[];
  riskScore: number; // 0-100, higher = riskier
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface InvestmentDecision {
  investmentScore: number; // 0-100
  confidenceScore: number; // 0-100
  recommendation: Recommendation;
  reasoning: string;
  keyPositives: string[];
  keyConcerns: string[];
}

/** Full assembled report returned by the API and rendered on the analysis page. */
export interface ResearchReport {
  companyName: string;
  generatedAt: string;
  overview: CompanyOverview;
  news: NewsAnalysis;
  business: BusinessAnalysis;
  financial: FinancialAnalysis;
  risk: RiskAnalysis;
  swot: SwotAnalysis;
  decision: InvestmentDecision;
}

/** Node identifiers, in execution order, used to drive the live agent-progress UI. */
export type WorkflowStep =
  | "research"
  | "news"
  | "business"
  | "financial"
  | "risk"
  | "swot"
  | "decision"
  | "report";

/** Server-sent event payload shape streamed from /api/research. */
export type ResearchStreamEvent =
  | { type: "step"; step: WorkflowStep; status: "started" | "completed" }
  | { type: "result"; report: ResearchReport }
  | { type: "error"; message: string };
