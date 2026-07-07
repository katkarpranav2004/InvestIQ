import { getModel } from "../model";
import { businessAnalysisSchema } from "../schemas";
import { businessPrompt } from "../prompts";
import { invokeWithRetry } from "../invoke-with-retry";
import type { ResearchStateType } from "../state";

/** Node 3: evaluates business model, industry position, and competitive landscape. */
export async function businessNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(businessAnalysisSchema, { name: "business_analysis" });
  const business = await invokeWithRetry(() => model.invoke(businessPrompt(state.companyName)));
  return { businessAnalysis: business };
}
