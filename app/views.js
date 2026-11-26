// views.js — page templates for UK Figures.
//
// Each route renders from app/data.js and nothing else, so a figure shown
// on two pages is always the same figure. Templates return HTML strings;
// app/main.js puts them on the page and wires up the search box.

import { INDICATORS, SUBJECTS, SOURCES, RELEASES, SITE, indicatorById, subjectById, sourceByKey, sourceLine } from "./data.js";
import { sparklineSvg, seriesChartSvg, escapeText, formatNumber } from "./charts.js";
import { exampleQuestions } from "./search.js";

// One line naming a figure's source and period, used under every value.
export function sourceCaption(indicator) {
  const source = sourceByKey(indicator.source);
  const publisher = source ? source.publisher : "";
  return publisher + " · " + indicator.period;
}

// A headline indicator card for the home grid: value, change, sparkline,
// source and period, and a link to its detail page.
export function indicatorCard(indicator) {
  const chart = sparklineSvg(indicator.series.points, { accent: "#0e6b5c" });
  const arrow = indicator.direction === "up" ? "▲" : indicator.direction === "down" ? "▼" : "—";
  return (
    '<article class="card" data-label="' + escapeText(indicator.label.toLowerCase()) + " " + escapeText(indicator.short.toLowerCase()) + '">' +
    '<h3><a href="#/indicator/' + indicator.id + '">' + escapeText(indicator.label) + "</a></h3>" +
    '<p class="value">' + escapeText(indicator.value) + "</p>" +
    '<p class="change"><span aria-hidden="true">' + arrow + "</span> " + escapeText(indicator.change) + "</p>" +
    '<div class="spark" aria-hidden="true">' + chart + "</div>" +
    '<p class="source">' + escapeText(sourceCaption(indicator)) + "</p>" +
    '<p class="more"><a href="#/indicator/' + indicator.id + '">See the detail →</a></p>' +
    "</article>"
  );
}

// A tile linking to one subject page, with its question as the hook.
export function subjectTile(subject) {
  return (
    '<article class="tile">' +
    '<h3><a href="#/' + subject.id + '">' + escapeText(subject.title) + "</a></h3>" +
    "<p>" + escapeText(subject.question) + "</p>" +
    "</article>"
  );
}

// The home page: search, fourteen key indicators, eight subjects, releases.
export function renderHomePage() {
  const cards = INDICATORS.map(indicatorCard).join("\n");
  const tiles = SUBJECTS.map(subjectTile).join("\n");
  const examples = exampleQuestions()
    .map((item) => '<a href="' + item.href + '">' + escapeText(item.question) + "</a>")
    .join(" · ");
  const releases = RELEASES.map(
    (release) =>
      '<li><span class="release-date">' + escapeText(release.date) + "</span> " + escapeText(release.text) + "</li>"
  ).join("\n");
  return (
    '<section class="hero">' +
    "<h1>" + escapeText(SITE.tagline) + "</h1>" +
    "<p>" + escapeText(SITE.intro) + "</p>" +
    '<form class="search" action="#/search" method="get" data-search-form>' +
    '<label for="site-search">Ask a question about the UK</label>' +
    '<input id="site-search" name="q" type="search" placeholder="Try: what is the inflation rate?" autocomplete="off">' +
    '<button type="submit">Search</button>' +
    "</form>" +
    '<p class="examples">Try: ' + examples + "</p>" +
    '<p class="vintage">' + escapeText(SITE.asOf) + "</p>" +
    "</section>" +
    '<section aria-labelledby="key-indicators">' +
    '<h2 id="key-indicators">Key indicators</h2>' +
    '<p class="section-intro">Fourteen numbers that say where the country stands, each with its trend, its source and the period it covers. Select any card for its chart, table and method.</p>' +
    '<div class="grid">' + cards + "</div>" +
    "</section>" +
    '<section aria-labelledby="browse-subjects">' +
    '<h2 id="browse-subjects">Browse by question</h2>' +
    '<p class="section-intro">Organised by what visitors ask, not by the name of the survey that produced the figure.</p>' +
    '<div class="tiles">' + tiles + "</div>" +
    "</section>" +
    '<section aria-labelledby="latest-releases">' +
    '<h2 id="latest-releases">Latest releases</h2>' +
    "<ul class=\"releases\">" + releases + "</ul>" +
    '<p class="section-intro">Each release is named on its own page, under <a href="#/sources">Sources and methods</a>.</p>' +
    "</section>"
  );
}

// A subject page: the question, the key message, one full chart per
// indicator, and the extra figures that belong to this subject.
export function renderSubjectPage(subject) {
  const blocks = subject.indicators
    .map((id) => indicatorById(id))
    .filter((indicator) => indicator !== null)
    .map((indicator) => {
      const chart = seriesChartSvg(indicator.series, {});
      return (
        '<article class="subject-block">' +
        "<h3>" + escapeText(indicator.label) + ": " + escapeText(indicator.value) + "</h3>" +
        "<p>" + escapeText(indicator.headline) + "</p>" +
        '<div class="chart">' + chart + "</div>" +
        '<p class="chart-note">' + escapeText(indicator.series.note) + "</p>" +
        '<p class="source">' + escapeText(sourceCaption(indicator)) + ' · <a href="#/indicator/' + indicator.id + '">See the detail →</a></p>' +
        "</article>"
      );
    })
    .join("\n");
  const extras = subject.extra
    .map(
      (stat) =>
        '<div class="stat"><span class="stat-value">' + escapeText(stat.value) + '</span><span class="stat-label">' +
        escapeText(stat.label) + '</span><span class="stat-note">' + escapeText(stat.note) + "</span></div>"
    )
    .join("\n");
  return (
    '<section class="subject">' +
    '<p class="crumb"><a href="#/">Key indicators</a> / ' + escapeText(subject.title) + "</p>" +
    "<h1>" + escapeText(subject.title) + "</h1>" +
    '<p class="question">' + escapeText(subject.question) + "</p>" +
    "<p>" + escapeText(subject.intro) + "</p>" +
    blocks +
    '<h2>Also on this subject</h2>' +
    '<div class="stats">' + extras + "</div>" +
    '<p class="section-intro"><a href="#/sources">Sources and methods</a> names the release behind every figure on this page.</p>' +
    "</section>"
  );
}

// An indicator detail page: the finding, a full chart, the data table, the
// story in words, how it is measured, and its source.
export function renderIndicatorPage(indicator) {
  const chart = seriesChartSvg(indicator.series, {});
  const rows = indicator.series.points
    .map(
      (point) =>
        "<tr><th scope=\"row\">" + escapeText(point[0]) + "</th><td>" + formatNumber(point[1]) +
        (indicator.series.yUnit ? " " + escapeText(indicator.series.yUnit) : "") + "</td></tr>"
    )
    .join("\n");
  const paragraphs = indicator.detail.map((para) => "<p>" + escapeText(para) + "</p>").join("\n");
  const related = INDICATORS.filter((other) => other.id !== indicator.id)
    .slice(0, 4)
    .map((other) => '<li><a href="#/indicator/' + other.id + '">' + escapeText(other.label) + ": " + escapeText(other.value) + "</a></li>")
    .join("\n");
  return (
    '<section class="detail">' +
    '<p class="crumb"><a href="#/">Key indicators</a> / ' + escapeText(indicator.label) + "</p>" +
    "<h1>" + escapeText(indicator.label) + "</h1>" +
    '<p class="headline">' + escapeText(indicator.headline) + "</p>" +
    '<p class="value big">' + escapeText(indicator.value) + ' <span class="value-period">' + escapeText(indicator.period) + "</span></p>" +
    '<p class="change">' + escapeText(indicator.change) + "</p>" +
    '<div class="chart">' + chart + "</div>" +
    '<p class="chart-note">' + escapeText(indicator.series.note) + "</p>" +
    "<h2>The figures</h2>" +
    '<div class="table-wrap"><table class="data-table"><thead><tr><th scope="col">Period</th><th scope="col">Value</th></tr></thead><tbody>' +
    rows +
    "</tbody></table></div>" +
    "<h2>What this shows</h2>" +
    paragraphs +
    "<h2>How it is measured</h2>" +
    "<p>" + escapeText(indicator.method) + "</p>" +
    "<h2>Source</h2>" +
    "<p>" + escapeText(sourceLine(indicator.source)) + "</p>" +
    "<h2>Also worth a look</h2>" +
    "<ul>" + related + "</ul>" +
    "</section>"
  );
}

// The sources and methods page: every source in one table, then the rules
// the site follows when it shows a figure.
export function renderSourcesPage() {
  const rows = Object.entries(SOURCES)
    .map(
      ([, source]) =>
        "<tr><td>" + escapeText(source.publisher) + "</td><td>" + escapeText(source.title) + "</td><td>" +
        escapeText(source.released) + "</td><td>" + escapeText(source.covers) + "</td></tr>"
    )
    .join("\n");
  return (
    '<section class="guide">' +
    "<h1>Sources and methods</h1>" +
    "<p>Every figure on this site comes from one of the releases below. The table names the publisher, the release and the date it was published, so any figure can be checked.</p>" +
    '<div class="table-wrap"><table class="data-table sources-table"><thead><tr><th scope="col">Publisher</th><th scope="col">Release</th><th scope="col">Published</th><th scope="col">Covers</th></tr></thead><tbody>' +
    rows +
    "</tbody></table></div>" +
    "<h2>How figures are shown</h2>" +
    "<ul>" +
    "<li><strong>One numbers table.</strong> All figures are rendered from a single table, so a figure shown on two pages is always the same figure.</li>" +
    "<li><strong>Published to 25 November 2025.</strong> Only figures published by that date are used as the latest. A later release is not shown, even when it revises an earlier number.</li>" +
    "<li><strong>Seasonal adjustment.</strong> Labour market and trade figures are seasonally adjusted where the publisher adjusts them; the text says so where it matters.</li>" +
    "<li><strong>Small groups are volatile.</strong> The ONS warns that estimates for small groups, such as young people not in education, employment or training, move more from quarter to quarter than the headline rates.</li>" +
    "<li><strong>Pathways are not people.</strong> The NHS waiting list counts treatment pathways; one person can be on more than one, so the list is larger than the number of people waiting.</li>" +
    "<li><strong>Rounding.</strong> Figures are shown as published. Where a total is the sum of rounded parts, the parts may not add to it exactly.</li>" +
    "</ul>" +
    "</section>"
  );
}

// The about page: what the site is, how it chooses figures, and who it is not.
export function renderAboutPage() {
  return (
    '<section class="guide">' +
    "<h1>About this site</h1>" +
    "<p>UK Figures is a guide to the United Kingdom in numbers. It shows fourteen headline indicators and eight subjects — prices, jobs, population, the economy, health, education, trade and the regions — each with its source and the period it covers.</p>" +
    "<h2>How figures were chosen</h2>" +
    "<p>Each indicator answers a question people actually ask: how fast prices are rising, whether work is easy to find, how long people live, what a home costs. A figure is shown only when it can be checked against the release that published it.</p>" +
    "<h2>What the site is not</h2>" +
    "<p>" + escapeText(SITE.affiliation) + "</p>" +
    "<h2>Using the site</h2>" +
    "<p>Use the search box to ask a plain question — “what is the inflation rate?” works, and so does “house prices”. Every page is reached by a link, every chart has a table of its figures underneath it on the detail page, and the layout works on a phone.</p>" +
    "<h2>When it was built</h2>" +
    "<p>" + escapeText(SITE.asOf) + ". " + escapeText(SITE.vintageNote) + "</p>" +
    "</section>"
  );
}

// Search results: the matches in rank order, or an honest empty state.
export function renderSearchResults(query, results) {
  const safeQuery = escapeText(query);
  if (results.length === 0) {
    return (
      '<section class="guide"><h1>Search</h1>' +
      '<p>No page on this site matches “' + safeQuery + '”. Try “inflation”, “jobs”, “house prices” or “life expectancy”.</p>' +
      '<p><a href="#/">Back to the key indicators</a></p></section>'
    );
  }
  const items = results
    .map(
      (entry) =>
        '<li><span class="result-kind">' + escapeText(entry.kind) + '</span> <a href="' + entry.href + '">' +
        escapeText(entry.title) + "</a></li>"
    )
    .join("\n");
  return (
    '<section class="guide"><h1>Search</h1>' +
    "<p>" + results.length + " result" + (results.length === 1 ? "" : "s") + " for “" + safeQuery + "”.</p>" +
    '<ul class="results">' + items + "</ul></section>"
  );
}

// A route that names nothing on the site.
export function renderNotFound(route) {
  return (
    '<section class="guide"><h1>Page not found</h1>' +
    "<p>There is no page at “" + escapeText(route) + "” on this site.</p>" +
    '<p><a href="#/">Back to the key indicators</a></p></section>'
  );
}

// Resolve a hash route to its page: returns { title, html }.
export function renderRoute(route) {
  const path = route.replace(/^#\/?/, "");
  const parts = path.split("/");
  if (path === "" || path === "/") return { title: "Key indicators", html: renderHomePage() };
  if (parts[0] === "search") return { title: "Search", html: null };
  if (parts[0] === "sources") return { title: "Sources and methods", html: renderSourcesPage() };
  if (parts[0] === "about") return { title: "About this site", html: renderAboutPage() };
  if (parts[0] === "indicator" && parts[1]) {
    const indicator = indicatorById(parts[1]);
    if (indicator) return { title: indicator.label, html: renderIndicatorPage(indicator) };
  }
  if (parts[0]) {
    const subject = subjectById(parts[0]);
    if (subject) return { title: subject.title, html: renderSubjectPage(subject) };
  }
  return { title: "Page not found", html: renderNotFound(route) };
}
