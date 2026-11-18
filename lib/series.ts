/*
 * Reads the series content from content/series/partN/ at build time.
 * Server only: it uses the file system, so import it only from pages and
 * server components, never from a "use client" file.
 *
 * The markdown is our own content, so it is rendered as is (no sanitising).
 */
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { seriesParts, type SeriesPart } from "@/data/series";
import { allStrings, readData, type DataView } from "@/lib/series-data";

const ROOT = path.join(process.cwd(), "content", "series");
const REQUIRED = ["brief.md", "explainer.md", "sources.md"];

/**
 * One source as shown on a part page: only its name, publisher, link and
 * evidence label. Dates read, page notes and access dates in sources.md are
 * for checking and are not shown or kept here.
 */
export interface Source {
  id: string; // "S1"
  title: string;
  publisher: string;
  /** The document's own URL, or "" if sources.md gives none. */
  url: string;
  /** "Primary" or "Secondary" (other labels are kept as written, in sentence case). */
  label: string;
}

export interface LoadedPart {
  meta: SeriesPart;
  title: string;
  explainerHtml: string;
  briefHtml: string;
  sources: Source[];
  sourceNotesHtml: string;
  /** The part's table data, ready to render, if it has any. */
  data: DataView | null;
  /** Date the evidence runs to, from the data file (YYYY-MM-DD). */
  asOf?: string;
  /** Method and decision log, rendered from method.md, if present. */
  methodHtml: string;
  /** Every source id cited anywhere on the page, for checks. */
  citedIds: string[];
}

function dir(n: number) {
  return path.join(ROOT, `part${n}`);
}

/** A part is published when its required files are in the repo. */
export function isPublished(n: number): boolean {
  return REQUIRED.every((f) => fs.existsSync(path.join(dir(n), f)));
}

export function publishedParts(): SeriesPart[] {
  return seriesParts.filter((p) => isPublished(p.number));
}

function read(n: number, file: string): string | null {
  const p = path.join(dir(n), file);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

/** Removes the first level one heading and returns it with the rest. */
function splitTitle(md: string): [string, string] {
  const m = md.match(/^#\s+(.+)\n/m);
  if (!m) return ["", md];
  return [m[1].trim(), md.replace(m[0], "")];
}

/** Removes a level two section (heading to the next level two heading or the end). */
function dropSection(md: string, heading: string): string {
  const re = new RegExp(`\\n## ${heading}\\s*\\n[\\s\\S]*?(?=\\n## |$)`);
  return md.replace(re, "\n");
}

const SOURCE_ID = /\bS(\d{1,3})\b/g;

/**
 * Turns source ids such as S2 in rendered text into links to the Sources
 * list on the same page. Text inside links, code and headings is left alone.
 * Ids not in `known` (for example a source the notes say was removed) stay
 * plain text, so no link ever points at a missing entry.
 */
function linkSources(html: string, cited: Set<string>, known: Set<string>): string {
  let skip = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith("<")) {
        if (/^<(a|code|h[1-6])\b/i.test(part)) skip++;
        else if (/^<\/(a|code|h[1-6])>/i.test(part)) skip = Math.max(0, skip - 1);
        return part;
      }
      if (skip) return part;
      return part.replace(SOURCE_ID, (id) => {
        if (!known.has(id)) return id;
        cited.add(id);
        return `<a class="source-ref" href="#source-${id}">${id}</a>`;
      });
    })
    .join("");
}

/** Wraps tables so they scroll inside their box on small screens. */
function wrapTables(html: string): string {
  return html
    .replace(
      /<table>/g,
      '<div class="table-scroll" role="region" aria-label="Table, scrolls sideways" tabindex="0"><table>',
    )
    .replace(/<\/table>/g, "</table></div>");
}

function render(md: string, cited: Set<string>, known: Set<string>): string {
  return wrapTables(linkSources(marked.parse(md, { async: false }) as string, cited, known));
}

const URL_RE = /https?:\/\/[^\s<>()|`]+[^\s<>()|`.,;:]/;

/** First web address in a cell, from a markdown link or a bare URL. */
function firstUrl(cell: string): string {
  const md = cell.match(/\]\((https?:\/\/[^)\s]+)\)/);
  if (md) return md[1];
  return cell.match(URL_RE)?.[0] ?? "";
}

/** "PRIMARY" becomes "Primary". */
function sentenceCase(label: string): string {
  const t = label.replace(/[*_`]/g, "").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() : t;
}

/**
 * Reads the sources table in sources.md. Columns are found by their header
 * names, so the table can gain or lose columns (for example the Accessed
 * column) without breaking the page:
 *   ID; Title (or Name, Source); Publisher; Label;
 *   the link comes from a Link or URL column if there is one, otherwise from
 *   the first web address in any other cell of the row.
 */
function parseSources(md: string): { sources: Source[]; rest: string } {
  const sources: Source[] = [];
  const keep: string[] = [];
  let cols: string[] | null = null;
  const splitRow = (line: string) =>
    line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const col = (names: string[]) =>
    cols ? cols.findIndex((c) => names.some((n) => c.startsWith(n))) : -1;

  for (const line of md.split("\n")) {
    const cells = line.trim().startsWith("|") ? splitRow(line) : null;
    if (cells && cells[0].toLowerCase() === "id") {
      cols = cells.map((c) => c.toLowerCase());
      continue; // header row
    }
    if (cells && /^-+$/.test(cells[0].replace(/:/g, ""))) continue; // divider row
    if (cells && /^S\d+$/.test(cells[0])) {
      const at = (i: number) => (i >= 0 ? cells[i] ?? "" : "");
      const iTitle = cols ? col(["title", "name", "source"]) : 1;
      const iPub = cols ? col(["publisher"]) : 2;
      const iLabel = cols ? col(["label", "evidence"]) : cells.length - 1;
      const iLink = cols ? col(["link", "url"]) : -1;
      const url =
        firstUrl(at(iLink)) ||
        cells.map((c, i) => (i === iTitle || i === iPub || i === iLabel ? "" : firstUrl(c))).find(Boolean) ||
        firstUrl(at(iTitle)) ||
        "";
      sources.push({
        id: cells[0],
        title: at(iTitle),
        publisher: at(iPub),
        url,
        label: sentenceCase(at(iLabel)),
      });
      continue;
    }
    keep.push(line);
  }
  return { sources, rest: keep.join("\n") };
}

/** Renders inline markdown (backticks, links, emphasis) for one source field. */
export function inline(md: string): string {
  return marked.parseInline(md, { async: false }) as string;
}

export function loadPart(n: number): LoadedPart | null {
  const meta = seriesParts.find((p) => p.number === n);
  if (!meta || !isPublished(n)) return null;
  const cited = new Set<string>();

  const { sources, rest } = parseSources(read(n, "sources.md")!);
  const known = new Set(sources.map((src) => src.id));

  const [title, briefBody] = splitTitle(read(n, "brief.md")!);
  // The page has its own Sources list, so the brief's short list is not repeated.
  const briefHtml = render(dropSection(briefBody, "Sources"), cited, known);

  const [, explainerBody] = splitTitle(read(n, "explainer.md")!);
  const explainerHtml = render(explainerBody, cited, known);

  const methodMd = read(n, "method.md");
  const methodHtml = methodMd ? render(splitTitle(methodMd)[1], cited, known) : "";

  const [, notesBody] = splitTitle(rest);
  const sourceNotesHtml = render(notesBody.trim(), cited, known);

  let data: DataView | null = null;
  let asOf: string | undefined;
  const raw = meta.data ? read(n, meta.data.file) : null;
  if (meta.data && raw) {
    const json = JSON.parse(raw);
    asOf = json.asOf;
    data = readData(meta.data.shape, json);
    for (const text of allStrings(json))
      for (const m of text.matchAll(SOURCE_ID)) cited.add(m[0]);
  }

  return {
    meta,
    title: title || meta.title,
    explainerHtml,
    briefHtml,
    sources,
    sourceNotesHtml,
    methodHtml,
    data,
    asOf,
    citedIds: [...cited],
  };
}

/** Splits a scorecard source string like "S1 p.16; S19" into linked pieces. */
export function sourceRefParts(text: string): { text: string; id?: string }[] {
  const out: { text: string; id?: string }[] = [];
  let last = 0;
  for (const m of text.matchAll(SOURCE_ID)) {
    if (m.index! > last) out.push({ text: text.slice(last, m.index) });
    out.push({ text: m[0], id: m[0] });
    last = m.index! + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}
