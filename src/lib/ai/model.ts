import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

/**
 * Single shared Gemini client used by every LangGraph node.
 * Temperature is kept low so scores and structured fields stay consistent
 * across runs for the same company.
 */
export function getModel() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY is not set. Add it to your .env.local file (see .env.example)."
    );
  }

  return new ChatGoogleGenerativeAI({
    apiKey,
    model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
    temperature: 0.3,
  });
}
