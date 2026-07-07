import { getModel } from "../model";
import { swotAnalysisSchema } from "../schemas";
import { swotPrompt } from "../prompts";
import { buildContext } from "../context";
import type { ResearchStateType } from "../state";

/** Node 6: maps strengths, weaknesses, opportunities, and threats. */
export async function swotNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(swotAnalysisSchema, { name: "swot_analysis" });
  const swot = await model.invoke(swotPrompt(state.companyName, buildContext(state)));
  return { swotAnalysis: swot };
}
