import { getModel } from "../model";
import { riskAnalysisSchema } from "../schemas";
import { riskPrompt } from "../prompts";
import { buildContext } from "../context";
import { invokeWithRetry } from "../invoke-with-retry";
import type { ResearchStateType } from "../state";

/** Node 5: identifies risk factors and produces an overall risk score, informed by prior nodes. */
export async function riskNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(riskAnalysisSchema, { name: "risk_analysis" });
  const risk = await invokeWithRetry(() => model.invoke(riskPrompt(state.companyName, buildContext(state))));
  return { riskAnalysis: risk };
}
