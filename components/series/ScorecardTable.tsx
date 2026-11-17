import type { Scorecard } from "@/lib/series";
import { sourceRefParts } from "@/lib/series";

function SourceRefs({ text }: { text?: string | null }) {
  if (!text) return <span className="evidence">No source</span>;
  return (
    <span className="cell-source">
      {sourceRefParts(text).map((p, i) =>
        p.id ? (
          <a key={i} className="source-ref" href={`#source-${p.id}`}>
            {p.text}
          </a>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </span>
  );
}

/** CSS class for a status chip. The text label is always shown too. */
function statusClass(status: string) {
  return `chip chip-${status.replace(/\s+/g, "-")}`;
}

/**
 * The scorecard as a table: one row per indicator, one column per country.
 * Each cell shows status, value, evidence label and linked sources. The
 * longer notes are listed below the table, behind a disclosure.
 */
export default function ScorecardTable({ data }: { data: Scorecard }) {
  const notes = data.layers.flatMap((layer) =>
    layer.indicators.flatMap((ind) =>
      data.countries
        .map((c) => ({ ind, country: c, cell: ind.cells[c.code] }))
        .filter((x) => x.cell?.note),
    ),
  );

  return (
    <>
      <div
        className="table-scroll scorecard-scroll"
        role="region"
        aria-labelledby="scorecard-caption"
        tabIndex={0}
      >
        <table className="scorecard">
          <caption id="scorecard-caption">
            Status of each indicator by country. Scroll sideways on small screens.
          </caption>
          <thead>
            <tr>
              <th scope="col">Indicator</th>
              {data.countries.map((c) => (
                <th key={c.code} scope="col">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          {data.layers.map((layer) => (
            <tbody key={layer.id}>
              <tr className="scorecard-layer">
                <th scope="colgroup" colSpan={data.countries.length + 1}>
                  {layer.name}
                </th>
              </tr>
              {layer.indicators.map((ind) => (
                <tr key={ind.id}>
                  <th scope="row">
                    <span className="indicator-id">{ind.id}</span> {ind.label}
                  </th>
                  {data.countries.map((c) => {
                    const cell = ind.cells[c.code];
                    if (!cell) return <td key={c.code}>Not found</td>;
                    return (
                      <td key={c.code}>
                        <span className={statusClass(cell.status)}>{cell.status}</span>
                        {cell.value && <span className="cell-value">{cell.value}</span>}
                        {cell.year && <span className="cell-year">{cell.year}</span>}
                        <span className="cell-meta">
                          {cell.evidence && <span className="evidence">{cell.evidence}</span>}
                          <SourceRefs text={cell.sourceId} />
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      {data.statusNotes && <p className="source-note scorecard-note">{data.statusNotes}</p>}
      {notes.length > 0 && (
        <details className="disclosure">
          <summary>Notes on each cell</summary>
          <dl className="disclosure-body cell-notes">
            {notes.map(({ ind, country, cell }) => (
              <div key={`${ind.id}-${country.code}`}>
                <dt>
                  {ind.id} {ind.label}, {country.name}
                </dt>
                <dd>{cell!.note}</dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </>
  );
}
