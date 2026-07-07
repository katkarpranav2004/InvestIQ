import { getModel } from "../model";
import { businessAnalysisSchema } from "../schemas";
import { businessPrompt } from "../prompts";
import type { ResearchStateType } from "../state";

/** Node 3: evaluates business model, industry position, and competitive landscape. */
export async function businessNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(businessAnalysisSchema, { name: "business_analysis" });
  const business = await model.invoke(businessPrompt(state.companyName));
  return { businessAnalysis: business };
}
