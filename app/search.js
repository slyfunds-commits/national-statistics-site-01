// search.js — client-side search over the local numbers table.
//
// No network, no server: the index is built from app/data.js at load time,
// so a plain question ("inflation", "jobs", "house prices", "how long do
// people live") finds the page that answers it. Every entry links to a real
// page; a search with no match says so plainly instead of showing nothing.

import { INDICATORS, SUBJECTS, sourceLine } from "./data.js";

// One searchable entry per indicator, per subject page, and per guide page.
export function buildSearchIndex() {
  const entries = [];
  for (const indicator of INDICATORS) {
    entries.push({
      kind: "Indicator",
      title: indicator.label + ": " + indicator.value,
      text: indicator.headline + " " + indicator.detail.join(" ") + " " + sourceLine(indicator.source),
      href: "#/indicator/" + indicator.id,
    });
  }
  for (const subject of SUBJECTS) {
    entries.push({
      kind: "Subject",
      title: subject.title,
      text: subject.question + " " + subject.intro,
      href: "#/" + subject.id,
    });
  }
  entries.push({
    kind: "Guide",
    title: "Sources and methods",
    text: "Every source used on this site, with its publisher, title and release date, and how each figure is measured.",
    href: "#/sources",
  });
  entries.push({
    kind: "Guide",
    title: "About this site",
    text: "What UK Figures is, which figures it shows, and the rule that only figures published to 25 November 2025 are used.",
    href: "#/about",
  });
  entries.push({
    kind: "Guide",
    title: "Key indicators",
    text: "All fourteen headline numbers for the United Kingdom on one page.",
    href: "#/",
  });
  return entries;
}

// Example plain-language questions for the search box, each opening the
// page that answers it. Shown under the search field on the home page.
export function exampleQuestions() {
  return [
    { question: "What is the inflation rate?", href: "#/indicator/cpi" },
    { question: "How many people are out of work?", href: "#/indicator/unemployment" },
    { question: "What does the average house cost?", href: "#/indicator/house-prices" },
    { question: "How long do people live?", href: "#/indicator/life-expectancy" },
    { question: "How big is the NHS waiting list?", href: "#/indicator/nhs-waiting-list" },
  ];
}

// Split a question into words and score each entry: a word in the title
// counts double, a word in the text counts once. Returns best first.
export function searchIndex(entries, query) {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9%£]+/)
    .filter((word) => word.length > 1);
  if (words.length === 0) return [];
  const scored = [];
  for (const entry of entries) {
    const title = entry.title.toLowerCase();
    const text = entry.text.toLowerCase();
    let score = 0;
    let matched = 0;
    for (const word of words) {
      const inTitle = title.includes(word);
      const inText = text.includes(word);
      if (inTitle) score += 2;
      if (inText) score += 1;
      if (inTitle || inText) matched += 1;
    }
    if (matched > 0) scored.push({ entry, score, matched });
  }
  scored.sort((a, b) => b.score - a.score || b.matched - a.matched);
  return scored.map((hit) => hit.entry);
}
