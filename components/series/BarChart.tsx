import { Fragment } from "react";
import type { ChartData } from "@/lib/series-charts";
import { sourceRefParts } from "@/lib/series";

/*
 * Small multiples of horizontal bars: one panel per measure, one bar per
 * row. Drawn with plain HTML and CSS rather than SVG text, so labels keep
 * their real size on phones. Screen readers get the figure caption and a
 * text version of every value; the bars themselves are hidden from them.
 * The same numbers are in the table below the chart.
 */
export default function BarChart({ chart, id }: { chart: ChartData; id: string }) {
  const textVersion = chart.panels
    .map((p) => `${p.title}: ${p.bars.map((b) => `${b.label} ${b.text}`).join(", ")}.`)
    .join(" ");

  return (
    <figure className="chart" aria-labelledby={`${id}-title`} data-reveal>
      <figcaption id={`${id}-title`} className="chart-title">
        {chart.title}
      </figcaption>
      <p className="visually-hidden">{textVersion}</p>
      <div className="chart-panels" aria-hidden="true">
        {chart.panels.map((panel, pi) => (
          <div key={pi} className="chart-panel">
            <p className="chart-panel-title">{panel.title}</p>
            <ul className="chart-bars">
              {panel.bars.map((bar, bi) => (
                <li
                  key={bi}
                  className={bar.label === chart.highlight ? "chart-row is-highlight" : "chart-row"}
                >
                  <span className="chart-label">{bar.label}</span>
                  <span className="chart-track">
                    {bar.value !== null && (
                      <span
                        className="chart-bar"
                        style={{ width: `${Math.max(0, Math.min(100, (bar.value / chart.max) * 100))}%` }}
                      />
                    )}
                  </span>
                  <span className="chart-value">{bar.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="source-note chart-source">
        Source:{" "}
        {sourceRefParts(chart.source).map((p, i) =>
          p.id ? (
            <a key={i} className="source-ref" href={`#source-${p.id}`}>
              {p.text}
            </a>
          ) : (
            <Fragment key={i}>{p.text}</Fragment>
          ),
        )}
        . Same data as the table below.
      </p>
    </figure>
  );
}
