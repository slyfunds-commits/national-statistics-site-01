// main.js — router for UK Figures.
//
// Hash routes only, so the site works from static files with no server
// logic: #/ is home, #/prices (and the other subjects) are subject pages,
// #/indicator/<id> is a detail page, #/sources and #/about are guides, and
// #/search?q=... shows search results. After every render the page sets
// window.__shotReady so a screenshot waits for the content, not the shell.

import { SITE } from "./data.js";
import { renderRoute, renderSearchResults } from "./views.js";
import { buildSearchIndex, searchIndex } from "./search.js";

const SEARCH_ENTRIES = buildSearchIndex();
const appRoot = document.getElementById("app");

// Split a hash into its path and its query string.
function parseHash() {
  const raw = window.location.hash || "#/";
  const body = raw.startsWith("#") ? raw.slice(1) : raw;
  const cut = body.indexOf("?");
  const path = cut < 0 ? body : body.slice(0, cut);
  const query = cut < 0 ? "" : body.slice(cut + 1);
  return { path, params: new URLSearchParams(query) };
}

// Render the current route into the page.
function renderCurrentRoute() {
  window.__shotReady = false;
  const { path, params } = parseHash();
  const cleanPath = path === "" ? "/" : path;
  if (cleanPath === "/search") {
    const query = (params.get("q") || "").trim();
    const results = query === "" ? [] : searchIndex(SEARCH_ENTRIES, query);
    document.title = "Search — " + SITE.name;
    appRoot.innerHTML = renderSearchResults(query, results);
  } else {
    const page = renderRoute("#" + cleanPath);
    document.title = page.title + " — " + SITE.name;
    appRoot.innerHTML = page.html;
  }
  wireSearchBox();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// Wire the search box on the page: submitting goes to the search route,
// and typing on the home page filters the indicator cards live.
function wireSearchBox() {
  const form = appRoot.querySelector("[data-search-form]");
  if (!form) return;
  const input = form.querySelector('input[type="search"]');
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    window.location.hash = "#/search?q=" + encodeURIComponent(query);
  });
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const cards = appRoot.querySelectorAll(".card");
    cards.forEach((card) => {
      const label = card.getAttribute("data-label") || "";
      card.style.display = query === "" || label.includes(query) ? "" : "none";
    });
  });
}

// A missing indicator id in the URL still gets a working page: the router
// in views.js returns the not-found page for it.
window.addEventListener("hashchange", renderCurrentRoute);
renderCurrentRoute();
