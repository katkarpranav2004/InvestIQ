import { ChatGroq } from "@langchain/groq";

/**
 * Single shared Groq client used by every LangGraph node.
 * Temperature is kept low so scores and structured fields stay consistent
 * across runs for the same company.
 */
export function getModel() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not set. Add it to your .env.local file (see .env.example)."
    );
  }

  return new ChatGroq({
    apiKey,
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    temperature: 0.3,
  });
}
