// charts.js — hand-built inline SVG charts for UK Figures.
//
// No chart library: every chart is a small function that turns a series of
// [label, value] points into an SVG string. The home page uses sparklines;
// subject and detail pages use full line charts and ranked bar charts.

const INK = "#1d2a30";
const TEAL = "#0e6b5c";
const OCHRE = "#c96f2e";
const GRID = "#ddd6c6";
const FAINT = "#6b7280";

// Escape text that goes inside SVG or HTML.
export function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Format a number the way the site shows it: thousands with commas, one
// decimal kept when the value has one.
export function formatNumber(value) {
  if (Number.isInteger(value)) return value.toLocaleString("en-GB");
  return value.toLocaleString("en-GB", { maximumFractionDigits: 1 });
}

// Scale one value into a y coordinate inside a chart of `height`, with the
// same 8% headroom above the max and below the min that scalePoints uses.
function scaleValue(value, min, max, height, padTop, padBottom) {
  const span = max - min || 1;
  const floor = min - span * 0.08;
  const top = max + span * 0.08;
  const ratio = (value - floor) / (top - floor);
  return padTop + (1 - ratio) * (height - padTop - padBottom);
}

// Scale a series of values into a 0..1 range for drawing.
function scalePoints(values, height, padTop, padBottom) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return values.map((value) => scaleValue(value, min, max, height, padTop, padBottom));
}

// A sparkline: a thin line with a soft fill and a dot on the last point.
// `points` is an array of [label, value]. Drawn at 260 by 64 and scaled by CSS.
export function sparklineSvg(points, options = {}) {
  const width = 260;
  const height = 64;
  const values = points.map((point) => point[1]);
  const ys = scalePoints(values, height, 8, 10);
  const step = values.length > 1 ? (width - 8) / (values.length - 1) : 0;
  const xs = values.map((_, index) => 4 + index * step);
  const line = xs.map((x, index) => (index === 0 ? "M" : "L") + x.toFixed(1) + " " + ys[index].toFixed(1)).join(" ");
  const area = line + " L" + xs[xs.length - 1].toFixed(1) + " " + (height - 2) + " L" + xs[0].toFixed(1) + " " + (height - 2) + " Z";
  const lastX = xs[xs.length - 1];
  const lastY = ys[ys.length - 1];
  const firstLabel = escapeText(points[0][0]);
  const lastLabel = escapeText(points[points.length - 1][0]);
  const accent = options.accent || TEAL;
  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="Trend from ' +
    firstLabel + " to " + lastLabel + '" preserveAspectRatio="none">' +
    '<path d="' + area + '" fill="' + accent + '" fill-opacity="0.10"></path>' +
    '<path d="' + line + '" fill="none" stroke="' + accent + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></path>' +
    '<circle cx="' + lastX.toFixed(1) + '" cy="' + lastY.toFixed(1) + '" r="4" fill="' + accent + '"></circle>' +
    "</svg>"
  );
}

// A full line chart with a baseline, gridlines, point labels and axis labels.
// `series` is { title, points, yUnit, note }. The title is drawn above the
// chart so the finding is visible even when the page text is not read.
export function lineChartSvg(series, options = {}) {
  const width = options.width || 720;
  const height = options.height || 280;
  const padLeft = 56;
  const padRight = 16;
  const padTop = 34;
  const padBottom = 34;
  const values = series.points.map((point) => point[1]);
  const ys = scalePoints(values, height, padTop, padBottom);
  const innerWidth = width - padLeft - padRight;
  const step = values.length > 1 ? innerWidth / (values.length - 1) : 0;
  const xs = values.map((_, index) => padLeft + index * step);
  const line = xs.map((x, index) => (index === 0 ? "M" : "L") + x.toFixed(1) + " " + ys[index].toFixed(1)).join(" ");
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mid = (min + max) / 2;
  const ticks = [max, mid, min];
  let grid = "";
  for (const tick of ticks) {
    const y = scaleValue(tick, min, max, height, padTop, padBottom);
    grid +=
      '<line x1="' + padLeft + '" y1="' + y.toFixed(1) + '" x2="' + (width - padRight) + '" y2="' + y.toFixed(1) +
      '" stroke="' + GRID + '" stroke-width="1"></line>' +
      '<text x="' + (padLeft - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end" font-size="12" fill="' + FAINT + '">' +
      formatNumber(tick) + (series.yUnit ? series.yUnit : "") + "</text>";
  }
  let dots = "";
  let labels = "";
  series.points.forEach((point, index) => {
    const x = xs[index];
    const y = ys[index];
    dots += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="4.5" fill="' + TEAL + '" stroke="#ffffff" stroke-width="1.5"></circle>';
    labels +=
      '<text x="' + x.toFixed(1) + '" y="' + (height - 10) + '" text-anchor="middle" font-size="12" fill="' + FAINT + '">' +
      escapeText(point[0]) + "</text>";
    labels +=
      '<text x="' + x.toFixed(1) + '" y="' + (y - 10).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="600" fill="' + INK + '">' +
      formatNumber(point[1]) + "</text>";
  });
  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + escapeText(series.title) + '">' +
    '<text x="' + padLeft + '" y="18" font-size="15" font-weight="700" fill="' + INK + '">' + escapeText(series.title) + "</text>" +
    grid +
    '<path d="' + line + '" fill="none" stroke="' + TEAL + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"></path>' +
    dots + labels +
    "</svg>"
  );
}

// A ranked horizontal bar chart: rows are [label, value], drawn largest first.
// Used for house prices by nation and any other ranked comparison.
export function barChartSvg(series, options = {}) {
  const width = options.width || 720;
  const rowHeight = 44;
  const padTop = 40;
  const labelWidth = 110;
  const padRight = 90;
  const rows = [...series.points].sort((a, b) => b[1] - a[1]);
  const height = padTop + rows.length * rowHeight + 8;
  const max = Math.max(...rows.map((row) => row[1]));
  const barMax = width - labelWidth - padRight;
  let bars = "";
  rows.forEach((row, index) => {
    const y = padTop + index * rowHeight;
    const barWidth = Math.max(4, (row[1] / max) * barMax);
    const fill = index === 0 ? OCHRE : TEAL;
    bars +=
      '<text x="' + (labelWidth - 10) + '" y="' + (y + 22) + '" text-anchor="end" font-size="14" fill="' + INK + '">' +
      escapeText(row[0]) + "</text>" +
      '<rect x="' + labelWidth + '" y="' + (y + 6) + '" width="' + barWidth.toFixed(1) + '" height="24" rx="3" fill="' + fill + '"></rect>' +
      '<text x="' + (labelWidth + barWidth + 10) + '" y="' + (y + 23) + '" font-size="13" font-weight="600" fill="' + INK + '">' +
      "£" + formatNumber(row[1]) + "</text>";
  });
  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + escapeText(series.title) + '">' +
    '<text x="0" y="20" font-size="15" font-weight="700" fill="' + INK + '">' + escapeText(series.title) + "</text>" +
    bars +
    "</svg>"
  );
}

// Pick the right chart for a series: bars when the series says so, else a line.
export function seriesChartSvg(series, options = {}) {
  if (series.kind === "bars") return barChartSvg(series, options);
  return lineChartSvg(series, options);
}
