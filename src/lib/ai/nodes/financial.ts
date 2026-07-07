import { getModel } from "../model";
import { financialAnalysisSchema } from "../schemas";
import { financialPrompt } from "../prompts";
import type { ResearchStateType } from "../state";

/** Node 4: assesses revenue trends, profitability, and growth potential. */
export async function financialNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(financialAnalysisSchema, { name: "financial_analysis" });
  const financial = await model.invoke(financialPrompt(state.companyName));
  return { financialAnalysis: financial };
}
