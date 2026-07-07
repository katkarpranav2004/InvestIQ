import { getModel } from "../model";
import { investmentDecisionSchema } from "../schemas";
import { decisionPrompt } from "../prompts";
import { buildContext } from "../context";
import type { ResearchStateType } from "../state";

/** Node 7: weighs all prior analysis into a final score, recommendation, and reasoning. */
export async function decisionNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(investmentDecisionSchema, { name: "investment_decision" });
  const decision = await model.invoke(decisionPrompt(state.companyName, buildContext(state)));
  return { investmentDecision: decision };
}
