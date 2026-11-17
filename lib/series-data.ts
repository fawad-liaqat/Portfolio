/*
 * Turns each part's data file into one of two table views for the page:
 *  - a matrix (rows of indicators, one column per country), or
 *  - a set of record tables (one row per item).
 * The shape of each file is declared in data/series.ts. To support a new
 * shape, add a reader here and a value to DataShape.
 */
import type { DataShape } from "@/data/series";

/** One table cell. Every field is optional; the renderer shows what is there. */
export interface DataCell {
  /** Small label above the value, such as the sector name. */
  label?: string;
  /** Status chip, such as "in place". */
  status?: string;
  value?: string;
  /** Bullet list, such as the Pakistan evidence for a case. */
  list?: string[];
  /** Small chip after the value, such as the strength of the evidence. */
  tag?: string;
  year?: string;
  /** Source ids and pages, such as "S1 p.19; S19". Ids become links. */
  sources?: string;
  /** PRIMARY, SECONDARY, NOT FOUND and so on. */
  evidence?: string;
  /** True when the value is the author's own calculation. */
  calc?: boolean;
  note?: string;
}

export interface MatrixView {
  kind: "matrix";
  caption: string;
  firstColumn: string;
  columns: { key: string; name: string }[];
  groups: {
    name?: string;
    rows: { id?: string; label: string; cells: Record<string, DataCell> }[];
  }[];
  footnote?: string;
}

export interface RecordTable {
  id?: string;
  title: string;
  columns: string[];
  /** Column keys as written in the data file, same order as `columns`. */
  keys?: string[];
  rows: DataCell[][];
  /** Shown under the table. */
  meta: { sources?: string; year?: string; evidence?: string; note?: string };
}

export interface RecordsView {
  kind: "records";
  tables: RecordTable[];
  footnote?: string;
}

export type DataView = MatrixView | RecordsView;

// The data files are our own JSON with known shapes (see the readers below).
// eslint-disable-next-line
type Json = any;

const str = (v: unknown) =>
  v === null || v === undefined || v === "" ? undefined : String(v);

/** "has_account" becomes "Has account". */
function humanize(key: string) {
  const t = key.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function scorecard(d: Json): MatrixView {
  return {
    kind: "matrix",
    caption: "Status of each indicator by country.",
    firstColumn: "Indicator",
    columns: d.countries.map((c: Json) => ({ key: c.code, name: c.name })),
    groups: d.layers.map((layer: Json) => ({
      name: layer.name,
      rows: layer.indicators.map((ind: Json) => ({
        id: ind.id,
        label: ind.label,
        cells: Object.fromEntries(
          Object.entries(ind.cells).map(([k, c]: [string, Json]) => [
            k,
            {
              status: str(c.status),
              value: str(c.value),
              year: str(c.year),
              note: str(c.note),
              sources: str(c.sourceId),
              evidence: str(c.evidence),
            },
          ]),
        ),
      })),
    })),
    footnote: str(d.statusNotes),
  };
}

/** Display names for country codes used as plain strings in the data files. */
const COUNTRY_NAMES: Record<string, string> = {
  PK: "Pakistan",
  IN: "India",
  BR: "Brazil",
  EG: "Egypt",
  UK: "United Kingdom",
  GB: "United Kingdom",
  KE: "Kenya",
};

function comparison(d: Json): MatrixView {
  return {
    kind: "matrix",
    caption: str(d.title) ?? "Comparison by country.",
    firstColumn: "Dimension",
    columns: d.countries.map((c: Json) =>
      typeof c === "string"
        ? { key: c, name: COUNTRY_NAMES[c] ?? c }
        : { key: c.code, name: c.name },
    ),
    groups: [
      {
        rows: d.dimensions.map((dim: Json) => ({
          label: dim.label,
          cells: Object.fromEntries(
            Object.entries(dim.cells).map(([k, c]: [string, Json]) => [
              k,
              {
                value: str(c.value),
                sources: str(c.sources),
                evidence: str(c.evidence),
                note: str(c.note),
              },
            ]),
          ),
        })),
      },
    ],
  };
}

/** Keys of an object row that go into the Source column, not their own column. */
const SOURCE_KEYS = ["source", "sources", "evidence", "calc", "note"];

function tables(d: Json): RecordsView {
  return {
    kind: "records",
    footnote: str(d.notes),
    tables: d.tables.map((t: Json): RecordTable => {
      const meta = {
        sources: str(t.source),
        year: str(t.year),
        evidence: str(t.evidence),
        note: str(t.note),
      };
      const rows: Json[] = t.rows ?? [];
      if (rows.length && Array.isArray(rows[0])) {
        return {
          id: t.id,
          title: t.title,
          columns: (t.columns as string[]).map(humanize),
          keys: t.columns as string[],
          rows: rows.map((r: Json[]) => r.map((v) => ({ value: str(v) ?? "" }))),
          meta,
        };
      }
      // Object rows: one column per key, in order of first appearance,
      // with source, evidence, calculation flag and note gathered at the end.
      const keys: string[] = [];
      for (const r of rows)
        for (const k of Object.keys(r))
          if (!SOURCE_KEYS.includes(k) && !keys.includes(k)) keys.push(k);
      const hasSource = rows.some((r) => SOURCE_KEYS.some((k) => k in r));
      return {
        id: t.id,
        title: t.title,
        columns: [...keys.map(humanize), ...(hasSource ? ["Source"] : [])],
        keys: [...keys, ...(hasSource ? ["source"] : [])],
        rows: rows.map((r: Json) => [
          ...keys.map((k) => ({ value: str(r[k]) ?? "" })),
          ...(hasSource
            ? [
                {
                  sources: str(r.source ?? r.sources),
                  evidence: str(r.evidence),
                  calc: Boolean(r.calc),
                  note: str(r.note),
                },
              ]
            : []),
        ]),
        meta,
      };
    }),
  };
}

function casebook(d: Json): RecordsView {
  const list = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);
  return {
    kind: "records",
    footnote: str(d.notes),
    tables: [
      {
        title: "One case per sector",
        columns: ["Sector and case", "Adoption", "Value", "In Pakistan", "Confidence"],
        rows: d.cases.map((c: Json) => [
          { label: str(c.vertical), value: str(c.case) },
          { value: str(c.adoption), sources: str(c.adoption_source) },
          {
            value: str(c.value),
            sources: str(c.value_source),
            tag: str(c.value_strength) && `Evidence of value: ${c.value_strength}`,
          },
          { list: list(c.pakistan) },
          { value: str(c.confidence) },
        ]),
        meta: {},
      },
      ...(Array.isArray(d.conditions) && d.conditions.length
        ? [
            {
              title: "What the cases have in common",
              columns: ["Pattern", "Cases", "Sources"],
              rows: d.conditions.map((c: Json) => [
                { value: str(c.pattern) },
                { value: list(c.cases).join(", ") },
                { sources: list(c.sources).join("; ") },
              ]),
              meta: {},
            } as RecordTable,
          ]
        : []),
    ],
  };
}

const READERS: Record<DataShape, (d: Json) => DataView> = {
  scorecard,
  comparison,
  tables,
  casebook,
};

export function readData(shape: DataShape, json: Json): DataView {
  return READERS[shape](json);
}

/** Every string in a JSON value, for collecting the source ids it cites. */
export function allStrings(v: Json, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => allStrings(x, out));
  return out;
}
