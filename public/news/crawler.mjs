import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

const directory = path.dirname(fileURLToPath(import.meta.url));
const sources = JSON.parse(await readFile(path.join(directory, "sources.json"), "utf8"));
const outputPath = path.join(directory, "feed.json");
const checkOnly = process.argv.includes("--check");
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true
});

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function text(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object") return text(value["#text"] ?? value.__cdata ?? "");
  return "";
}

function clean(value, limit = 260) {
  const normalized = text(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit - 1).replace(/\s+\S*$/, "")}…`;
}

function linkFrom(entry) {
  if (typeof entry.link === "string") return entry.link;
  const links = asArray(entry.link);
  const alternate = links.find((link) => link?.["@_rel"] === "alternate") || links[0];
  return text(alternate?.["@_href"] ?? alternate);
}

function validHttpUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

function parseFeed(xml, source) {
  const document = parser.parse(xml);
  const rssItems = asArray(document?.rss?.channel?.item);
  const atomItems = asArray(document?.feed?.entry);
  return [...rssItems, ...atomItems].map((entry) => {
    const url = validHttpUrl(linkFrom(entry) || text(entry.guid));
    const title = clean(entry.title, 180);
    const published = text(entry.pubDate ?? entry.published ?? entry.updated ?? entry["dc:date"]);
    const parsedDate = new Date(published);
    const summary = clean(entry.description ?? entry.summary ?? entry.content ?? entry["content:encoded"]);
    if (!url || !title || Number.isNaN(parsedDate.getTime())) return null;
    return {
      id: createHash("sha256").update(`${source.name}:${url}`).digest("hex").slice(0, 20),
      source: source.name,
      title,
      summary: summary || "Open the original publisher to read this report.",
      url,
      publishedAt: parsedDate.toISOString()
    };
  }).filter(Boolean);
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  try {
    const response = await fetch(source.url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "accept": "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9",
        "user-agent": "AstroOpenInfrastructure-NewsWire/1.0 (+https://www.astrochannel.one/newsroom.html)"
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();
    const items = parseFeed(xml, source);
    if (!items.length) throw new Error("No valid entries");
    return { source: source.name, items, error: null };
  } catch (error) {
    return { source: source.name, items: [], error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

const results = await Promise.all(sources.map(fetchSource));
const successful = results.filter((result) => result.items.length);
if (!successful.length) {
  throw new Error(`Every source failed: ${results.map((result) => `${result.source}: ${result.error}`).join("; ")}`);
}

const seenUrls = new Set();
const seenTitles = new Set();
const items = results
  .flatMap((result) => result.items)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .filter((item) => {
    const titleKey = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seenUrls.has(item.url) || seenTitles.has(titleKey)) return false;
    seenUrls.add(item.url);
    seenTitles.add(titleKey);
    return true;
  })
  .slice(0, 80);

const output = {
  generatedAt: new Date().toISOString(),
  policy: {
    mode: "headline-index",
    fullTextStored: false,
    attributionRequired: true,
    refreshHours: 6
  },
  sources: results.map((result) => ({
    name: result.source,
    status: result.items.length ? "ok" : "unavailable",
    itemCount: result.items.length,
    error: result.error
  })),
  items
};

console.log(`Collected ${items.length} unique headlines from ${successful.length}/${sources.length} sources.`);
for (const failed of results.filter((result) => result.error)) {
  console.warn(`${failed.source}: ${failed.error}`);
}

if (!checkOnly) {
  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outputPath}`);
}
