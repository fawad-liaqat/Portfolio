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

export interface Source {
  id: string; // "S1"
  title: string;
  publisher: string;
  date: string;
  location: string;
  accessed: string;
  label: string; // PRIMARY, SECONDARY, ...
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
 */
function linkSources(html: string, cited: Set<string>): string {
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

function render(md: string, cited: Set<string>): string {
  return wrapTables(linkSources(marked.parse(md, { async: false }) as string, cited));
}

/**
 * Some sources were read from files the owner supplied. The page shows their
 * page references and official URL, never the local file name or path.
 * Handles "Local file `name.pdf` (owner supplied); pp. 1, 4" and
 * "Local file supplied by the owner: name.pdf, 30 pages; https://...".
 */
export function publicLocation(location: string): string {
  return location
    .replace(/Local file supplied by the owner:[^;]*;?/gi, "")
    .replace(/Local file\s*`[^`]*`\s*(\(owner supplied\))?\s*;?/gi, "")
    .replace(/^[\s;,]+|[\s;,]+$/g, "")
    .trim();
}

/** Reads the `| S1 | Title | Publisher | Date | Location | Accessed | Label |` rows. */
function parseSources(md: string): { sources: Source[]; rest: string } {
  const sources: Source[] = [];
  const lines = md.split("\n");
  const keep: string[] = [];
  for (const line of lines) {
    const cells = line.trim().startsWith("|")
      ? line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim())
      : null;
    if (cells && /^S\d+$/.test(cells[0]) && cells.length >= 7) {
      const [id, title, publisher, date, location, accessed, label] = cells;
      sources.push({ id, title, publisher, date, location: publicLocation(location), accessed, label });
      continue;
    }
    // Drop the table header and divider rows too.
    if (cells && (cells[0] === "ID" || /^-+$/.test(cells[0].replace(/:/g, "")))) continue;
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

  const [title, briefBody] = splitTitle(read(n, "brief.md")!);
  // The page has its own Sources list, so the brief's short list is not repeated.
  const briefHtml = render(dropSection(briefBody, "Sources"), cited);

  const [, explainerBody] = splitTitle(read(n, "explainer.md")!);
  const explainerHtml = render(explainerBody, cited);

  const { sources, rest } = parseSources(read(n, "sources.md")!);
  const [, notesBody] = splitTitle(rest);
  const sourceNotesHtml = render(notesBody.trim(), cited);

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
