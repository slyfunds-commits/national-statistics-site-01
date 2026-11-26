[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/slyfunds-commits/national-statistics-site-01/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/slyfunds-commits/national-statistics-site-01/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# UK Figures — the United Kingdom in numbers

A national statistics site for the United Kingdom: fourteen headline indicators on one dashboard, eight subject pages organised by the question visitors ask (Prices, Jobs, Population, Economy, Health, Education, Trade, Regions), a detail page for every indicator with its chart, data table, method and source, plus a sources-and-methods page and a working search box.

## What it is

- **One numbers table.** Every figure on the site is rendered from `app/data.js` alone, so no figure can contradict itself across pages.
- **Real, sourced, dated figures.** Inflation 3.6% (year to October 2025), unemployment 5.0% (July–September 2025), GDP +0.1% (Quarter 3 2025), Bank Rate 4.00%, population 69.3 million (mid-2024), life expectancy 82.8 / 78.8 years (2021–23), NHS waiting list 7.4 million (end of September 2025), and seven more — each checked against its ONS, Bank of England or NHS England release at build time.
- **Figures as published to 25 November 2025.** Only figures published by that date are used as the latest; later releases are not shown.
- **Hand-built charts.** Inline SVG sparklines, line charts and ranked bar charts — no chart library, no framework, vanilla JS and CSS.
- **Works on a phone.** Single-column layout, big tap targets, tables that scroll sideways, charts that resize.
- **No network.** The site loads only its own files under `app/` and makes no requests to any origin.

## Run it

```sh
# Serve app/ and open it in a browser
python3 -m http.server 8000 --directory app
# then open http://localhost:8000/

# Build the hand-in (copies app/ + screenshots/, writes dossier.json)
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Verification

Every figure was checked against its named ONS, Bank of England or NHS England release at build time (25–26 November 2025). The full verification notes are in the build notes kept with the entry. The hand-in program runs twice with byte-identical output, and the kit check passes with no failures.

## Files

- `app/index.html` — the page shell
- `app/main.js` — the hash router
- `app/views.js` — page templates (home, subject, indicator detail, sources, about, search)
- `app/charts.js` — hand-built SVG chart builders
- `app/data.js` — the one numbers table and the sources
- `app/search.js` — client-side search over the numbers table
- `app/style.css` — the site's look
- `main.ts` — the hand-in program (Node 22 standard library only)
- `vendor/makefun-frontend.ts` — make.fun's dossier library, unchanged from the kit
- `screenshots/` — four real renders of the site in a browser
- `shots.json` — which page and viewport each screenshot shows

UK Figures is an independent guide. It is not affiliated with the Office for National Statistics, the Bank of England or NHS England.
