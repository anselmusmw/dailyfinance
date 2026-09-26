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
- **Monthly reset**: every month starts at Rp 0. Use ‹ › to browse past months.
- Amounts in Rupiah (IDR). Works in light and dark mode, on desktop and mobile.

## Run it

Open `index.html` in any browser. Data is saved in your browser's local storage on that device.

To use it from your phone, enable **GitHub Pages**: go to Settings → Pages, set Source to `main` and folder to `/ (root)`, then open the URL GitHub gives you.

## Push this folder to GitHub

This folder is already a git repo, with `origin` pointing at `https://github.com/anselmusmw/dailyfinance.git`. From inside it, run:

```bash
git push -u origin main
```

If git asks for a password, use a GitHub personal access token or sign in with GitHub Desktop.
