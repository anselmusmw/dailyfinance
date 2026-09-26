# Daily Finance

A personal expense and investment tracker in a single HTML file. It has no build step and no dependencies.

## Features

- **Expenses by category**, each with its own colour:
  Me time (cyan), Transport (green), Eat (purple), With friends (dark blue), With girlfriend (pink), Emergency (red)
- **Monthly reset**: every month starts at Rp 0. Use ‹ › to look back at past months.
- **Adjustable income**: set it once and later months carry it forward until you change it. You can also override a single month only.
- **Investments**: log money going into stocks, mutual funds, gold, bonds/SBN, savings/deposits, crypto or other, and see where it goes each month and all-time.
- **Month summary**: income, spent, invested and what's left, plus a colour strip showing where the month's money went.
- Amounts in Rupiah (IDR).

## Run it

Open `index.html` in any browser. Data is saved in your browser's local storage on that device.

To use it from your phone, enable **GitHub Pages**: go to Settings → Pages, set Source to `main` and folder to `/ (root)`, then open the URL GitHub gives you.

## Push this folder to GitHub

This folder is already a git repo, with `origin` pointing at `https://github.com/anselmusmw/dailyfinance.git`. From inside it, run:

```bash
git push -u origin main
```

If git asks for a password, use a GitHub personal access token or sign in with GitHub Desktop.
