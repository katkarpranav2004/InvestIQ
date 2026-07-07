/**
 * LLM function-calling occasionally produces malformed JSON for a structured
 * output call, which Groq rejects before LangChain can even parse it. A retry
 * almost always succeeds since it re-samples the generation.
 */
export async function invokeWithRetry<T>(call: () => Promise<T>, retries = 2): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await call();
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError;
}
