# Money Diary

A calm, personal expense, income and investment tracker. It runs fully in your browser: no account, no server costs, no AI fees. It works offline and installs on your phone like an app.

## Features

- **Overview**: income, expenses, invested, emergency fund and what's left for the month, plus a spending pie chart, a 6-month trend and recent activity.
- **Quick add**: the **+ Expense** button is always at the bottom right. Tap any expense to edit or delete it.
- **Expenses by category**, each with its own colour: Me time (cyan), Transport (green), Eat (purple), With friends (dark blue), Others (brown), Emergency (red). Filter to one category at a time.
- **Income**: a regular monthly income that carries forward, plus extra income (bonus, THR, side job, gift) that counts only in the month you add it.
- **Investments** and an **Emergency Fund** with a target and progress bar.
- **PDF report** for 1–6 months, with charts, tables and a written conclusion based on your numbers.
- **Backup & restore**: download your data as a file and restore it on any device. The app reminds you if you haven't backed up in 14 days.
- **Monthly reset**: every month starts at Rp 0. Use ‹ › to browse past months.

## Use it on your phone (recommended: GitHub Pages, free)

1. Push this folder to GitHub (see below).
2. On GitHub, open the repo and go to **Settings → Pages**. Set the source to **Deploy from a branch**, then choose **main** and **/ (root)**, and click **Save**.
3. After 1–2 minutes, open `https://anselmusmw.github.io/dailyfinance/` on your phone.
4. Install it:
   - **iPhone (Safari):** tap Share, then **Add to Home Screen**.
   - **Android (Chrome):** tap ⋮, then **Install app** (or **Add to Home screen**).

Once opened, it works offline too.

## Run it on your laptop (VS Code)

1. Install Node.js (LTS) from nodejs.org.
2. Open this folder in VS Code, then open **Terminal → New Terminal**.
3. Run `npm start` and open http://localhost:3000.

You can also just double-click `index.html`. Everything works except offline install.

## Laptop and phone data

Each browser keeps its own data. To move data between devices, go to **Backup → Download backup** on one device, then **Backup → Restore from a backup file** on the other. Restoring replaces the data on that device.

## Push changes to GitHub

```bash
git add .
git commit -m "Describe your change"
git push
```

When you change the app, also bump `VERSION` in `sw.js` (for example `money-diary-v2`) so installed phones pick up the new version.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline support and the home-screen app icon |
| `vendor/jspdf.umd.min.js` | PDF library (MIT licence, see `vendor/jspdf-LICENSE.txt`), stored locally so reports work offline |
| `server.js` | Optional local server for `npm start` |
