# Money Diary

A personal expense and investment tracker in a single HTML file. It has no build step and no dependencies.

## Features

- **Overview tab**: the big picture for the month. It shows income, expenses, investments, emergency fund and what's left, plus a spending pie chart, a 6-month trend chart and recent activity.
- **Income**: a regular monthly income that carries forward until you change it, plus **extra income** such as a bonus, THR, side job or gift, added only in the month you receive it.
- **Expenses by category**, each with its own colour:
  Me time (cyan), Transport (green), Eat (purple), With friends (dark blue), Others (brown), Emergency (red).
  Filter to a single category to see only that category's total, share and entries.
- **Investments**: stocks, mutual funds, gold, bonds/SBN, savings/deposits, crypto or other, shown as a pie chart per month plus an all-time total.
- **Emergency Fund**: put money in or take it out, see the running balance, and set a target with a progress bar. The app suggests a target of 3–6 months of your spending.
- **PDF report**: download a report covering 1 to 6 months, ending with the month you're viewing. It includes a summary, month-by-month table, spending pie chart, stacked monthly spending chart, biggest expenses, income and extra income, investments, and optionally every expense entry.
  - **Conclusion**: every report ends its summary page with a conclusion that has a headline, highlights and suggestions. On claude.ai, Claude (AI) writes it from your numbers. Elsewhere, such as GitHub Pages or a local file, the app writes one from built-in rules.
- **Monthly reset**: every month starts at Rp 0. Use ‹ › to browse past months.
- Amounts in Rupiah (IDR). Works in light and dark mode, on desktop and mobile.

## Project files

| File | What it does |
|---|---|
| `index.html` | The whole app: screens, charts and PDF report |
| `api/conclusion.js` | Server function that asks Claude to write the report conclusion. Your API key stays here, never in the browser. |
| `server.js` | Small local server for running the app on your laptop |
| `.env.example` | Template for your API key. Copy it to `.env`. |

## Run it on your laptop (VS Code)

1. Install **Node.js 18 or newer** from nodejs.org.
2. Open this folder in VS Code (**File -> Open Folder**).
3. Copy `.env.example` to `.env` and paste your Claude API key after `ANTHROPIC_API_KEY=`.
4. Open the terminal (**Terminal -> New Terminal**) and run `npm start`.
5. Open http://localhost:3000.

Without a key the app still works fully. The report then uses the built-in (non-AI) conclusion.

## Use it on your phone

- **Same Wi-Fi:** while `npm start` is running, open the "Phone" address printed in the terminal.
- **Anywhere:** deploy to Vercel (free). Import this GitHub repo at vercel.com, add `ANTHROPIC_API_KEY` under Settings -> Environment Variables, and redeploy. Every `git push` updates it automatically.

Data is saved per device and browser, so your laptop and phone keep separate records.

## Push changes to GitHub

```bash
git add .
git commit -m "Describe your change"
git push
```

`.env` is in `.gitignore`, so your API key is never uploaded.
