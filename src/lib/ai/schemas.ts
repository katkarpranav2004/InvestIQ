import { z } from "zod";

/**
 * Zod schemas used with `model.withStructuredOutput()` so every LangGraph node
 * gets typed, predictable JSON back from Gemini instead of free-form text.
 */

export const companyOverviewSchema = z.object({
  legalName: z.string().describe("Full legal/official name of the company"),
  founded: z.string().describe("Year founded, e.g. '1976'"),
  headquarters: z.string().describe("City and country of headquarters"),
  ceo: z.string().describe("Current CEO's name"),
  sector: z.string().describe("Broad market sector, e.g. 'Technology'"),
  industry: z.string().describe("Specific industry, e.g. 'Consumer Electronics'"),
  summary: z.string().describe("2-3 sentence overview of what the company does"),
});

export const newsAnalysisSchema = z.object({
  summary: z.string().describe("3-5 sentence summary of recent news and developments"),
  keyEvents: z.array(z.string()).describe("3-5 short bullet points of notable recent events"),
  sentiment: z.enum(["Positive", "Neutral", "Negative"]).describe("Overall market sentiment"),
  sentimentScore: z.number().min(0).max(100).describe("Sentiment score, 0 = very negative, 100 = very positive"),
});

export const businessAnalysisSchema = z.object({
  businessModel: z.string().describe("2-4 sentences explaining how the company makes money"),
  industryPosition: z.string().describe("2-3 sentences on the company's position within its industry"),
  competitiveLandscape: z.string().describe("2-3 sentences on the competitive environment"),
  competitors: z.array(z.string()).describe("3-5 main competitor names"),
});

export const financialAnalysisSchema = z.object({
  summary: z.string().describe("3-5 sentence summary of financial performance and revenue trends"),
  revenueTrend: z.string().describe("Short description of the revenue trajectory, e.g. 'Growing 15% YoY'"),
  growthPotential: z.string().describe("2-3 sentences on future growth potential and drivers"),
  growthScore: z.number().min(0).max(100).describe("Growth potential score, 0 = none, 100 = exceptional"),
});

export const riskAnalysisSchema = z.object({
  summary: z.string().describe("2-3 sentence overview of the company's risk profile"),
  riskFactors: z.array(z.string()).describe("3-6 concrete risk factors"),
  riskScore: z.number().min(0).max(100).describe("Overall risk score, 0 = very low risk, 100 = very high risk"),
});

export const swotAnalysisSchema = z.object({
  strengths: z.array(z.string()).describe("3-5 key strengths"),
  weaknesses: z.array(z.string()).describe("3-5 key weaknesses"),
  opportunities: z.array(z.string()).describe("3-5 key opportunities"),
  threats: z.array(z.string()).describe("3-5 key threats"),
});

export const investmentDecisionSchema = z.object({
  investmentScore: z.number().min(0).max(100).describe("Overall investment attractiveness score, 0-100"),
  confidenceScore: z.number().min(0).max(100).describe("Confidence in this recommendation, 0-100"),
  recommendation: z.enum(["Invest", "Hold", "Avoid"]).describe("Final investment recommendation"),
  reasoning: z.string().describe("4-6 sentence detailed explanation behind the recommendation"),
  keyPositives: z.array(z.string()).describe("3-5 key positive factors supporting the case"),
  keyConcerns: z.array(z.string()).describe("3-5 key concerns or red flags"),
});
