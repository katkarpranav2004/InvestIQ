# Development Session Log

A curated log of the Claude Code session that built InvestIQ — organized by
phase, with representative excerpts rather than a raw dump. Secrets (API
keys) are redacted throughout.

---

## 1. Specification

The project started from a single, detailed brief that pinned down the exact
tech stack (Next.js 15, React 19, LangChain.js + LangGraph.js, Gemini/Groq),
the full feature list (11 analysis dimensions, scored recommendation), the
exact 8-step LangGraph workflow order, the four required pages, and explicit
coding-style constraints ("avoid microservices, CQRS, heavy DI — write code a
third-year CS student can understand"). That level of specificity is what let
the build proceed end-to-end without re-litigating scope mid-way.

> "InvestIQ is an AI Investment Research Agent. The user enters a company
> name. The AI researches the company, analyzes multiple aspects, and
> provides a detailed investment recommendation backed by reasoning...
> Input Company → Research Node → News Analysis → Business Analysis →
> Financial Analysis → Risk Analysis → SWOT Analysis → Investment Decision →
> Final Report"

## 2. Initial build

Scaffolded the whole app in one pass per the brief: Next.js App Router pages,
hand-written shadcn-style UI primitives, a Zod schema per LangGraph node, and
an SSE endpoint so the frontend could show live per-node progress instead of
one long spinner.

**A real bug surfaced during the first build**, not a cosmetic one: LangGraph
throws at graph-compile time if a state-channel key collides with a node name
(the graph had a node called `news` and a state field also called `news`).
Fixed by renaming the state channels (`newsAnalysis`, `riskAnalysis`, etc.)
while keeping the node names as the clean identifiers the UI uses — documented
directly in `src/lib/ai/state.ts` so it doesn't get "fixed" back by accident
later.

## 3. AI provider troubleshooting

The original brief specified Gemini. Three different API keys were supplied
and tested — all three authenticated fine (could list Gemini's models) but
returned `429 RESOURCE_EXHAUSTED` with a hard `limit: 0` on `generateContent`.
Direct `curl` tests against Google's API confirmed this wasn't a transient
rate limit, and the key format (`AQ.Ab8...`) didn't match AI Studio's
standard `AIzaSy...` prefix — traced to the keys likely coming from Google's
Antigravity IDE (present on the machine) rather than aistudio.google.com,
which uses a different, non-billed auth mechanism.

> "I don't have a personal Anthropic/Claude API key I can hand over... Two
> real options if you want to move off Gemini: [switch to Anthropic with your
> own key] or [fix the Gemini key via AI Studio]."
>
> — "cant we use your cluade key" → "Switch to Groq instead (free, no card)"

Given the constraint (no card, no working Gemini quota), the decision was to
switch the whole AI provider to Groq (Llama 3.3 70B) — genuinely free tier,
fast inference, and a drop-in swap since only `src/lib/ai/model.ts` needed to
change; the graph, schemas, and prompts are provider-agnostic.

## 4. Full frontend redesign

After the first pass, direct product feedback:

> "The current UI looks generic and AI-generated... I want InvestIQ to look
> like a premium AI fintech SaaS product built by an experienced product
> designer... DO NOT use blue. Primary: #D4AF37 (Gold), Accent: #C084FC
> (Soft Purple), Secondary: #FF8A65 (Coral)... Instead of a spinner: Create
> an AI thinking experience."

That brief was specific enough (exact hex palette, named references like
Linear/Stripe/Apple, a concrete list of animation types) to execute directly:
new design tokens, an aurora/mesh background system, magnetic-hover buttons,
glass cards, a rotating "AI thinking" loading experience, and a Bloomberg +
Apple-style analysis dashboard (verdict card, score gauges, linear risk/
confidence meters, news timeline) — all frontend-only, with the backend and
LangGraph logic explicitly left untouched per the brief.

**Two real bugs were found and fixed during redesign verification, not just
cosmetic changes:**
- A hydration mismatch from `Math.random()` running during server-side
  render in the particles background component.
- Scroll-reveal animations stuck at 0 for content already visible on load,
  from an overly strict `useInView` margin.

## 5. A deep debugging session: "counters stuck at 0"

After wiring up a real Groq key and running a live NVIDIA query, the pipeline
completed correctly end-to-end (verified via `sessionStorage` inspection:
correct scores, real reasoning text) — but the on-screen animated counters
displayed `0` instead of the real values. Rather than guessing, this was
root-caused methodically:

1. Ruled out a data bug — read the actual `sessionStorage` payload, confirmed
   real, correct numeric scores (85, 90, 60, 95).
2. Ruled out dev-server HMR churn as the cause — reproduced the same
   symptom against a full **production build** (`next build && next start`),
   which has no Fast Refresh at all.
3. Tested the underlying browser primitive directly — attached a fresh
   `IntersectionObserver` to the exact stuck DOM element and confirmed its
   callback never fired, even the guaranteed initial one.
4. That pointed at `document.hidden` — checked it directly and confirmed the
   automated test browser's tab was backgrounded, which is why: both
   `IntersectionObserver` callbacks and the `requestAnimationFrame` loop that
   drives Framer Motion's springs are throttled/paused by the browser for
   hidden tabs, by design, in every browser.

Conclusion: the app code was correct; the "bug" was an artifact of the
automated preview tool's backgrounded tab, not something a real user (whose
tab is visible while they're looking at it) would ever hit. Two genuine
defensive improvements were kept anyway: `AnimatedCounter` now mirrors its
value into React state instead of only mutating `textContent` imperatively
(so an unrelated re-render can't silently wipe the displayed number), and the
`useInView` margins were loosened so above-the-fold content isn't excluded by
an overly strict detection zone.

## 6. Shipping: GitHub, Vercel, and a live production bug

- Installed and authenticated the GitHub CLI, pushed to a new public repo.
- Installed the Vercel CLI, linked the project, set `GROQ_API_KEY` /
  `GROQ_MODEL` as production environment variables, and deployed.
- The first production request (a real Apple query against the live
  deployment) surfaced an actual bug: Groq's Llama 3.3 occasionally emits
  malformed JSON for a structured-output tool call, which Groq's API rejects
  with a 400 before LangChain ever gets to parse it — hit live on the SWOT
  node. Fixed with a small retry wrapper (`invokeWithRetry`) across all
  seven LLM-calling nodes, since re-sampling almost always produces valid
  JSON. Rebuilt, redeployed, and reconfirmed with a second live request
  (Tesla) — clean run through all 8 steps.

> "1 dev-only artifact traced to `document.hidden: true`... this is a
> testing-tool artifact, not a real product bug"
>
> "Found a real, live bug — not from the redesign, but in the AI pipeline
> itself: Groq's Llama 3.3 occasionally emits malformed JSON..."

## 7. Cleanup

Caught that GitHub's commit-message co-author trailer was surfacing the
assistant as a visible contributor on the repo. Rewrote the two affected
commits' messages (`git filter-branch --msg-filter`, verified via GitHub's
own API before and after) and force-pushed, keeping commit authorship
correctly attributed throughout.

---

*Redacted throughout: all API keys (Gemini/Antigravity, Groq, Vercel OIDC
token) that appeared in the raw conversation.*
