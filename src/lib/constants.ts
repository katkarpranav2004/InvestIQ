import type { WorkflowStep } from "@/types";

export const APP_NAME = "InvestIQ";
export const APP_TAGLINE = "AI-Powered Investment Intelligence";
export const APP_DESCRIPTION =
  "InvestIQ researches any public company end-to-end with an autonomous AI agent, then delivers a scored, evidence-backed investment recommendation in seconds.";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
];

/** Ordered list of the LangGraph workflow steps, with copy used to drive the live progress UI. */
export const WORKFLOW_STEPS: { id: WorkflowStep; label: string; description: string }[] = [
  { id: "research", label: "Company Research", description: "Gathering company profile and background" },
  { id: "news", label: "News & Sentiment", description: "Scanning recent news and market sentiment" },
  { id: "business", label: "Business Analysis", description: "Evaluating business model and competitive position" },
  { id: "financial", label: "Financial Analysis", description: "Assessing revenue performance and growth potential" },
  { id: "risk", label: "Risk Analysis", description: "Identifying key risk factors" },
  { id: "swot", label: "SWOT Analysis", description: "Mapping strengths, weaknesses, opportunities, threats" },
  { id: "decision", label: "Investment Decision", description: "Scoring the opportunity and forming a recommendation" },
  { id: "report", label: "Final Report", description: "Compiling the full investment research report" },
];

export const EXAMPLE_COMPANIES = ["NVIDIA", "Tesla", "Apple", "Amazon", "Microsoft", "Netflix"];

/** Wider ticker list for the animated marquee on the home hero (display only). */
export const TICKER_COMPANIES = [
  "NVIDIA",
  "Tesla",
  "Apple",
  "Amazon",
  "Microsoft",
  "Netflix",
  "Google",
  "Meta",
  "Berkshire Hathaway",
  "Visa",
  "JPMorgan",
  "Costco",
];

/** Animated stat chips shown on the home hero. */
export const HOME_STATS: { value: number; suffix: string; label: string }[] = [
  { value: 8, suffix: "", label: "Analysis steps per run" },
  { value: 11, suffix: "", label: "Dimensions evaluated" },
  { value: 100, suffix: "%", label: "Structured, typed output" },
];

/** Flavor text shown while each workflow step is actively running, for the "AI thinking" loading UI. */
export const THINKING_MESSAGES: Record<WorkflowStep, string[]> = {
  research: ["Pulling up the company profile...", "Mapping headquarters, leadership, sector..."],
  news: ["Reading the latest headlines...", "Gauging market sentiment..."],
  business: ["Reviewing the business model...", "Mapping the competitive landscape..."],
  financial: ["Analyzing financial statements...", "Modeling revenue and growth trends..."],
  risk: ["Evaluating regulatory and market risks...", "Stress-testing the downside..."],
  swot: ["Building the SWOT analysis...", "Weighing strengths against threats..."],
  decision: ["Weighing the full picture...", "Generating the investment recommendation..."],
  report: ["Compiling the final report...", "Polishing the numbers..."],
};

/** sessionStorage key used to hand the freshly-generated report off to the /analysis page. */
export const LAST_REPORT_STORAGE_KEY = "investiq:last-report";

export const SCORE_THRESHOLDS = {
  investment: { strong: 70, moderate: 45 },
  risk: { low: 35, moderate: 65 },
};
