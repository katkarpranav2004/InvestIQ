/**
 * Prompt templates for each LangGraph node. Kept as plain template strings
 * (rather than LangChain PromptTemplate objects) since none of them need
 * partials or example selectors — plain strings are easier to read and debug.
 */

const BASE_INSTRUCTION = (companyName: string) =>
  `You are a senior equity research analyst at a top-tier investment bank. Use your general knowledge of "${companyName}" to produce a rigorous, factual analysis. If you are not fully certain of a specific figure, give your best reasoned estimate rather than refusing to answer. Do not mention that you are an AI model.`;

export const researchPrompt = (companyName: string) => `${BASE_INSTRUCTION(companyName)}

Produce a company overview for "${companyName}" covering its legal name, founding year, headquarters, current CEO, market sector, industry, and a short summary of what the company does.`;

export const newsPrompt = (companyName: string) => `${BASE_INSTRUCTION(companyName)}

Summarize the most significant recent news, product launches, leadership changes, and market-moving events for "${companyName}" that you are aware of. Assess the overall market sentiment toward the company right now.`;

export const businessPrompt = (companyName: string) => `${BASE_INSTRUCTION(companyName)}

Analyze the business model of "${companyName}": how it generates revenue, its position within its industry, the competitive landscape it operates in, and its main competitors.`;

export const financialPrompt = (companyName: string) => `${BASE_INSTRUCTION(companyName)}

Analyze the financial performance of "${companyName}": revenue trends, profitability, and overall growth potential based on its markets, products, and strategy.`;

export const riskPrompt = (companyName: string, context: string) => `${BASE_INSTRUCTION(companyName)}

Given the following prior analysis of "${companyName}":
${context}

Identify the key risk factors an investor should be aware of — regulatory, competitive, financial, operational, and macroeconomic — and produce an overall risk score.`;

export const swotPrompt = (companyName: string, context: string) => `${BASE_INSTRUCTION(companyName)}

Given the following prior analysis of "${companyName}":
${context}

Produce a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).`;

export const decisionPrompt = (companyName: string, context: string) => `${BASE_INSTRUCTION(companyName)}

You are making a final investment recommendation for "${companyName}" based on the complete research below:
${context}

Weigh growth potential against risk factors, then produce an investment score, a confidence score for your own recommendation, a final recommendation (Invest, Hold, or Avoid), detailed reasoning, and the key positives and concerns driving your decision.`;
