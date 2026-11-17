import { projects } from "@/data/projects";
import {
  stackDefaultLayer,
  stackLabels,
  stackLayers,
  stackTitle,
} from "@/data/stack";
import { seriesParts, seriesPath } from "@/data/series";
import { isPublished } from "@/lib/series";

/*
 * Diagram of Pakistan's digital public infrastructure stack.
 *
 * Each layer is a rail. Choosing a layer opens a short panel with what
 * exists in Pakistan and the projects pinned to that layer.
 *
 * Content: data/stack.ts (layers) and the `layer` field in data/projects.ts.
 * How it works: the layers are radio buttons, and CSS shows the panel of the
 * checked one (see "DPI stack diagram" in styles/globals.css). It needs no
 * JavaScript. Enhancements.tsx only adds select on hover and pauses the
 * pulses when the diagram is off screen. If a browser cannot match the
 * checked layer in CSS, all panels are shown.
 */

const current = projects.filter((p) => !p.archived);
const rows = stackLayers.map((layer, index) => ({
  ...layer,
  number: index + 1,
  work: current.filter((p) => p.layer === layer.id),
}));
const spanning = current.filter((p) => p.layer === "all");

/** The series part about a layer, if that part is published. */
function liveSeriesPart(n?: number) {
  if (!n || !isPublished(n)) return null;
  return seriesParts.find((p) => p.number === n) ?? null;
}

function ProjectLinks({ items }: { items: typeof current }) {
  return (
    <ul className="stack-links">
      {items.map((p) => (
        <li key={p.id}>
          <a href={`#project-${p.id}`}>{p.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default function DpiStackDiagram() {
  return (
    <figure className="stack" data-stack aria-label={stackTitle}>
      <figcaption className="stack-caption">
        <span className="eyebrow">{stackLabels.caption}</span>
        <span className="stack-hint" aria-hidden="true">
          {stackLabels.hint}
        </span>
      </figcaption>

      <fieldset className="stack-layers">
        <legend className="visually-hidden">{stackLabels.hint}</legend>
        {rows.map((row) => (
          <label
            key={row.id}
            className={`stack-layer stack-layer-${row.state}`}
            data-stack-layer
          >
            <input
              type="radio"
              name="stack-layer"
              value={row.id}
              defaultChecked={row.id === stackDefaultLayer}
              className="stack-input"
            />
            <span className="stack-head">
              <span className="stack-num">0{row.number}</span>
              <span className="stack-name">{row.name}</span>
              {row.badge && <span className="stack-badge">{row.badge}</span>}
            </span>
            <span className="rail" aria-hidden="true">
              <span className="rail-node" />
              <span className="rail-node" />
              <span className="rail-node" />
              {row.state === "live" && (
                <>
                  <span className="rail-pulse" />
                  <span className="rail-pulse" />
                  <span className="rail-pulse" />
                </>
              )}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="stack-panels">
        {rows.map((row) => (
          <div key={row.id} className="stack-panel">
            <p className="stack-panel-title">
              <span className="stack-num">0{row.number}</span> {row.name}
            </p>
            <div className="stack-panel-grid">
              <div>
                <p className="stack-label">{stackLabels.facts}</p>
                <ul className="stack-facts">
                  {row.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="stack-label">{stackLabels.work}</p>
                {row.work.length > 0 && <ProjectLinks items={row.work} />}
                {(() => {
                  const part = liveSeriesPart(row.seriesPart);
                  if (part)
                    return (
                      <ul className="stack-links">
                        <li>
                          <a href={seriesPath(part.number)}>
                            Part {part.number}: {part.title}
                          </a>
                        </li>
                      </ul>
                    );
                  return row.work.length === 0 && row.note ? (
                    <p className="stack-note">{row.note}</p>
                  ) : null;
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {spanning.length > 0 && (
        <div className="stack-span">
          <p className="stack-label">{stackLabels.spanning}</p>
          <ProjectLinks items={spanning} />
        </div>
      )}

      <details className="disclosure stack-text">
        <summary>{stackLabels.textVersion}</summary>
        <ol>
          {rows.map((row) => (
            <li key={row.id}>
              <strong>{row.name}.</strong> {row.facts.join(". ")}.{" "}
              {stackLabels.work}:{" "}
              {row.work.length
                ? row.work.map((p) => p.title).join(", ")
                : (liveSeriesPart(row.seriesPart)
                    ? `Part ${row.seriesPart} of the series`
                    : row.note)}
              .
            </li>
          ))}
        </ol>
        {spanning.length > 0 && (
          <p>
            {stackLabels.spanning}: {spanning.map((p) => p.title).join(", ")}.
          </p>
        )}
      </details>
    </figure>
  );
}
