# Deploying InvestIQ to Vercel

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: InvestIQ"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import your GitHub repository.
3. Vercel auto-detects Next.js — no build command changes needed.

## 3. Set environment variables

In the Vercel project settings, add:

| Variable         | Value                                             |
| ---------------- | -------------------------------------------------- |
| `GOOGLE_API_KEY` | Your Gemini API key from aistudio.google.com/apikey |
| `GEMINI_MODEL`   | `gemini-2.0-flash` (or another Gemini model)         |

## 4. Deploy

Click **Deploy**. Vercel builds and hosts the app; subsequent pushes to `main`
auto-deploy.

## Notes

- The `/api/research` route streams Server-Sent Events and can run for up to
  60 seconds (`export const maxDuration = 60` in `route.ts`). If your Vercel
  plan caps function duration lower than that, reduce it accordingly or
  upgrade your plan.
- No database or external services are required beyond the Gemini API key.
