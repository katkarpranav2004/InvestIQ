import { getModel } from "../model";
import { companyOverviewSchema } from "../schemas";
import { researchPrompt } from "../prompts";
import { invokeWithRetry } from "../invoke-with-retry";
import type { ResearchStateType } from "../state";

/** Node 1: gathers a general company profile (founding, HQ, CEO, sector, summary). */
export async function researchNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(companyOverviewSchema, { name: "company_overview" });
  const overview = await invokeWithRetry(() => model.invoke(researchPrompt(state.companyName)));
  return { overview };
}
