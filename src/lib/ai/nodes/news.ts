import { getModel } from "../model";
import { newsAnalysisSchema } from "../schemas";
import { newsPrompt } from "../prompts";
import type { ResearchStateType } from "../state";

/** Node 2: summarizes recent news, key events, and overall market sentiment. */
export async function newsNode(state: ResearchStateType) {
  const model = getModel().withStructuredOutput(newsAnalysisSchema, { name: "news_analysis" });
  const news = await model.invoke(newsPrompt(state.companyName));
  return { newsAnalysis: news };
}
