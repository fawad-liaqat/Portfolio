import { Fragment } from "react";
import { sourceRefParts } from "@/lib/series";
import type { DataCell, DataView, MatrixView, RecordsView } from "@/lib/series-data";

/** Text with source ids such as S2 turned into links to the Sources list. */
function Linked({ text }: { text: string }) {
  return (
    <>
      {sourceRefParts(text).map((p, i) =>
        p.id ? (
          <a key={i} className="source-ref" href={`#source-${p.id}`}>
            {p.text}
          </a>
        ) : (
          <Fragment key={i}>{p.text}</Fragment>
        ),
      )}
    </>
  );
}

/** CSS class for a status chip. The text label is always shown too. */
function statusClass(status: string) {
  return `chip chip-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

/** One cell. Shows whatever the cell has; notes only when asked (inlineNote). */
function Cell({ cell, inlineNote }: { cell: DataCell; inlineNote?: boolean }) {
  const hasMeta = cell.evidence || cell.calc || cell.sources;
  return (
    <>
      {cell.label && <span className="cell-label">{cell.label}</span>}
      {cell.status && <span className={statusClass(cell.status)}>{cell.status}</span>}
      {cell.value && (
        <span className={cell.status || cell.label ? "cell-value" : "cell-value is-first"}>
          <Linked text={cell.value} />
        </span>
      )}
      {cell.list && cell.list.length > 0 && (
        <ul className="cell-list">
          {cell.list.map((item, i) => (
            <li key={i}>
              <Linked text={item} />
            </li>
          ))}
        </ul>
      )}
      {cell.tag && <span className="chip chip-tag">{cell.tag}</span>}
      {cell.year && <span className="cell-year">{cell.year}</span>}
      {hasMeta && (
        <span className="cell-meta">
          {cell.evidence && <span className="evidence">{cell.evidence}</span>}
          {cell.calc && <span className="evidence">My calculation</span>}
          {cell.sources && (
            <span className="cell-source">
              <Linked text={cell.sources} />
            </span>
          )}
        </span>
      )}
      {inlineNote && cell.note && (
        <span className="cell-note">
          <Linked text={cell.note} />
        </span>
      )}
    </>
  );
}

function Scroll({ labelledBy, children }: { labelledBy: string; children: React.ReactNode }) {
  return (
    <div className="table-scroll" role="region" aria-labelledby={labelledBy} tabIndex={0}>
      {children}
    </div>
  );
}

/** Rows of indicators, one column per country. Notes sit in a disclosure below. */
function MatrixTable({ view, id }: { view: MatrixView; id: string }) {
  const notes = view.groups.flatMap((g) =>
    g.rows.flatMap((row) =>
      view.columns
        .map((c) => ({ row, col: c, cell: row.cells[c.key] }))
        .filter((x) => x.cell?.note),
    ),
  );
  const capId = `${id}-caption`;
  return (
    <>
      <Scroll labelledBy={capId}>
        <table className="data-table matrix">
          <caption id={capId}>
            {/[.!?]$/.test(view.caption) ? view.caption : `${view.caption}.`} Scroll sideways
            on small screens.
          </caption>
          <thead>
            <tr>
              <th scope="col">{view.firstColumn}</th>
              {view.columns.map((c) => (
                <th key={c.key} scope="col">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          {view.groups.map((g, gi) => (
            <tbody key={gi}>
              {g.name && (
                <tr className="group-row">
                  <th scope="colgroup" colSpan={view.columns.length + 1}>
                    {g.name}
                  </th>
                </tr>
              )}
              {g.rows.map((row, ri) => (
                <tr key={row.id ?? ri}>
                  <th scope="row">
                    {row.id && <span className="indicator-id">{row.id}</span>} {row.label}
                  </th>
                  {view.columns.map((c) => {
                    const cell = row.cells[c.key];
                    return <td key={c.key}>{cell ? <Cell cell={cell} /> : "Not found"}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </Scroll>
      {view.footnote && (
        <p className="source-note table-footnote">
          <Linked text={view.footnote} />
        </p>
      )}
      {notes.length > 0 && (
        <details className="disclosure">
          <summary>Notes on each cell</summary>
          <dl className="disclosure-body cell-notes">
            {notes.map(({ row, col, cell }, i) => (
              <div key={i}>
                <dt>
                  {row.id ? `${row.id} ` : ""}
                  {row.label}, {col.name}
                </dt>
                <dd>
                  <Linked text={cell!.note!} />
                </dd>
              </div>
            ))}
          </dl>
        </details>
      )}
    </>
  );
}

/** A set of small tables, one row per item. */
function RecordTables({ view, id }: { view: RecordsView; id: string }) {
  return (
    <>
      {view.footnote && (
        <p className="source-note table-footnote">
          <Linked text={view.footnote} />
        </p>
      )}
      {view.tables.map((t, ti) => {
        const capId = `${id}-t${ti}`;
        const { meta } = t;
        const hasMeta = meta.sources || meta.year || meta.evidence;
        return (
          <div key={ti} className="record-block">
            <h3 className="record-title" id={capId}>
              {t.id && <span className="indicator-id">{t.id}</span>} {t.title}
            </h3>
            <Scroll labelledBy={capId}>
              <table className="data-table records" data-cols={t.columns.length}>
                <thead>
                  <tr>
                    {t.columns.map((c, i) => (
                      <th key={i} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) =>
                        ci === 0 ? (
                          <th key={ci} scope="row">
                            <Cell cell={cell} inlineNote />
                          </th>
                        ) : (
                          <td key={ci}>
                            <Cell cell={cell} inlineNote />
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Scroll>
            {(hasMeta || meta.note) && (
              <p className="source-note table-footnote">
                {meta.sources && (
                  <>
                    Source: <Linked text={meta.sources} />.{" "}
                  </>
                )}
                {meta.year && <>{meta.year}. </>}
                {meta.evidence && <>{meta.evidence}. </>}
                {meta.note && <Linked text={meta.note} />}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function DataTables({ view, id }: { view: DataView; id: string }) {
  return view.kind === "matrix" ? (
    <MatrixTable view={view} id={id} />
  ) : (
    <RecordTables view={view} id={id} />
  );
}
