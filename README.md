# InvestIQ

**AI-Powered Investment Intelligence**

InvestIQ is an AI investment research agent. Type in any public company and an
autonomous LangGraph workflow researches it end-to-end — business model,
industry position, recent news, financials, risk, and SWOT — then produces a
scored, evidence-backed Invest / Hold / Avoid recommendation with full reasoning.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![LangGraph](https://img.shields.io/badge/LangGraph.js-orange)

---

## Tech Stack

| Layer      | Technology                                            |
| ---------- | ------------------------------------------------------ |
| Frontend   | Next.js 15 (App Router), React 19, TypeScript          |
| Styling    | Tailwind CSS, shadcn/ui-style components, Framer Motion |
| Backend    | Next.js API Routes (Node.js runtime)                   |
| AI         | LangChain.js + LangGraph.js + Google Gemini            |
| Validation | Zod (structured output schemas)                        |
| Charts     | Recharts                                                |
| Deployment | Vercel                                                  |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                            Browser                               │
│                                                                    │
│   Home        Research Dashboard        Analysis Result   About   │
│   (page.tsx)  (search + live progress)  (scored report)  (page)   │
│                        │                        ▲                 │
└────────────────────────┼────────────────────────┼─────────────────┘
                          │ POST /api/research     │ SSE stream
                          ▼                        │
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js API Route (Node.js)                  │
│                  src/app/api/research/route.ts                   │
│         Streams step-by-step progress + final JSON report        │
└────────────────────────┬──────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                  LangGraph Research Workflow                     │
│                    src/lib/ai/graph.ts                            │
│                                                                    │
│  Research → News → Business → Financial → Risk → SWOT → Decision  │
│                                                    │                │
│                                                    ▼                │
│                                              Final Report           │
└────────────────────────┬──────────────────────────────────────────┘
                          ▼
                 Google Gemini (via LangChain.js
                 structured output + Zod schemas)
```

## System Flow Diagram

```
 User enters "NVIDIA"
        │
        ▼
 SearchForm (client) ──POST──▶ /api/research
        │                          │
        │                          ▼
        │                 buildResearchGraph().stream()
        │                          │
        │           ┌──────────────┴──────────────┐
        │           │  Node 1: research             │→ CompanyOverview
        │           │  Node 2: news                  │→ NewsAnalysis
        │           │  Node 3: business               │→ BusinessAnalysis
        │           │  Node 4: financial               │→ FinancialAnalysis
        │           │  Node 5: risk                     │→ RiskAnalysis
        │           │  Node 6: swot                      │→ SwotAnalysis
        │           │  Node 7: decision                   │→ InvestmentDecision
        │           │  Node 8: report                      │→ ResearchReport
        │           └──────────────┬──────────────┘
        │                          │ each node completion emitted as SSE
        │◀─────────────────────────┘
        ▼
 AgentProgress (client) updates live checklist
        │
        ▼ (on "result" event)
 sessionStorage.setItem(report) → router.push("/analysis")
        │
        ▼
 Analysis page renders score gauges, recommendation,
 and tabbed sections (Decision / Business / Financials / News / Risk / SWOT)
```

## Project Structure

```
InvestIQ/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home
│   │   ├── layout.tsx                # Root layout, fonts, nav/footer
│   │   ├── globals.css               # Design tokens, glassmorphism utilities
│   │   ├── research/page.tsx         # Research Dashboard (input + live progress)
│   │   ├── analysis/page.tsx         # Analysis Result (scored report)
│   │   ├── about/page.tsx            # About
│   │   └── api/research/route.ts     # SSE endpoint that runs the LangGraph workflow
│   ├── components/
│   │   ├── ui/                       # button, card, badge, tabs, progress, etc.
│   │   ├── layout/                   # navbar, footer
│   │   ├── home/                     # hero, feature grid, workflow strip
│   │   ├── research/                 # search form, live agent progress
│   │   └── analysis/                 # score gauge, SWOT grid, recommendation badge
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── model.ts              # Gemini client
│   │   │   ├── schemas.ts            # Zod schemas per workflow node
│   │   │   ├── prompts.ts            # Prompt templates per workflow node
│   │   │   ├── state.ts              # LangGraph state (Annotation.Root)
│   │   │   ├── context.ts            # Builds context string for downstream nodes
│   │   │   ├── graph.ts              # StateGraph wiring (the 8-node workflow)
│   │   │   └── nodes/                # One file per node
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── types/index.ts                # Shared domain types
│   └── hooks/use-research.ts         # Client hook that consumes the SSE stream
├── .env.example
└── package.json
```

## Getting Started

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Get a free Gemini API key** at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   # then edit .env.local and paste your key
   ```

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## The LangGraph Workflow

InvestIQ's core is an 8-node LangGraph `StateGraph` (`src/lib/ai/graph.ts`), run
in strict sequence so each step can build on what earlier steps learned:

1. **Research** — company profile (founding, HQ, CEO, sector, summary)
2. **News** — recent developments and market sentiment
3. **Business** — business model, industry position, competitors
4. **Financial** — revenue trend and growth potential
5. **Risk** — risk factors and an overall risk score
6. **SWOT** — strengths, weaknesses, opportunities, threats
7. **Decision** — investment score, confidence score, recommendation, reasoning
8. **Report** — assembles everything into the final `ResearchReport`

Every node calls Gemini through `model.withStructuredOutput(zodSchema)`, so the
graph always gets back type-safe JSON instead of free-form text that would
need fragile parsing.

The API route streams each node's completion over Server-Sent Events, so the
Research Dashboard shows the agent's progress live instead of one long spinner.

## Known Limitations & Notes

- **No live web/news APIs.** The News and Research nodes rely on Gemini's own
  training knowledge rather than a live search API, so very recent events may
  not be reflected. See "Future Enhancements" below.
- **No persistence.** Reports are handed from the Research page to the
  Analysis page via `sessionStorage` — there's no database, so reports aren't
  saved across sessions. This keeps the project simple and dependency-free.
- **Dependency advisories.** `npm audit` reports moderate/high advisories in
  the LangChain.js v0.3 dependency tree. Fixing them requires upgrading to
  LangChain v1 / LangGraph v1, which changes core APIs (`StateGraph`,
  `Annotation`) — left as a deliberate follow-up rather than a blind major
  version bump inside this build.

## Future Enhancements

- Integrate a real financial data API (e.g. Alpha Vantage, Financial Modeling Prep) for accurate live financials.
- Integrate a real news/search API (e.g. Tavily, NewsAPI) for up-to-the-minute news.
- Persist reports in a database (Postgres/Supabase) with shareable report URLs.
- Add authentication and per-user research history.
- Add PDF export of the analysis report.
- Add side-by-side company comparison.
- Add caching so re-running the same company within a time window doesn't reissue Gemini calls.

## Resume Project Description

> **InvestIQ — AI-Powered Investment Research Platform**
> Built a full-stack AI SaaS product that autonomously researches public
> companies using an 8-node LangGraph.js workflow orchestrating Google Gemini,
> streaming live agent progress over Server-Sent Events to a Next.js 15 /
> React 19 dashboard. Designed Zod-validated structured-output schemas for
> every workflow node, producing a scored Invest/Hold/Avoid recommendation
> with full SWOT, risk, and financial analysis.

---

Disclaimer: InvestIQ generates AI-based research for educational and
demonstration purposes only. It is not financial advice.
