/*
 * Builds chart data from a part's table view, so a chart always shows the
 * same numbers as the table under it. Charts are declared in data/series.ts.
 * A chart that does not match its data stops the build with a clear error,
 * rather than drawing something wrong.
 */
import type { SeriesChart } from "@/data/series";
import type { DataView } from "@/lib/series-data";

export interface ChartPanel {
  title: string;
  bars: { label: string; value: number | null; text: string }[];
}

export interface ChartData {
  title: string;
  unit: string;
  max: number;
  panels: ChartPanel[];
  source: string;
  highlight?: string;
}

/** First number in a value such as "27%; gender gap 30 points". */
function firstNumber(text: string | undefined): number | null {
  const m = text?.replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
}

export function buildChart(spec: SeriesChart, view: DataView, part: number): ChartData {
  const fail = (why: string) => {
    throw new Error(`Chart "${spec.title}" in Part ${part}: ${why}`);
  };
  const unit = spec.unit ?? "";
  const fmt = (v: number | null) => (v === null ? "not available" : `${v}${unit}`);
  let panels: ChartPanel[] = [];

  if (view.kind === "records") {
    const table = view.tables.find((t) => t.id === spec.table) ?? fail(`table ${spec.table} not found`);
    const keys = table!.keys ?? fail("table has no column keys");
    panels = (spec.columns ?? []).map((key) => {
      const i = keys!.indexOf(key);
      if (i < 0) fail(`column ${key} not found`);
      return {
        title: table!.columns[i],
        bars: table!.rows.map((row) => {
          const value = firstNumber(row[i]?.value);
          return { label: row[0]?.value ?? "", value, text: fmt(value) };
        }),
      };
    });
  } else {
    const rows = view.groups.flatMap((g) => g.rows);
    panels = (spec.rows ?? []).map((id) => {
      const row = rows.find((r) => r.id === id) ?? fail(`row ${id} not found`);
      return {
        title: row!.label,
        bars: view.columns.map((c) => {
          const value = firstNumber(row!.cells[c.key]?.value);
          return { label: c.name, value, text: fmt(value) };
        }),
      };
    });
  }
  if (!panels.length) fail("nothing to plot");

  const values = panels.flatMap((p) => p.bars.map((b) => b.value ?? 0));
  const max = unit === "%" ? 100 : Math.max(...values, 1);
  return { title: spec.title, unit, max, panels, source: spec.source, highlight: spec.highlight };
}
