import { research } from "@/data/research";
import { archiveNote } from "./WorkSection";

export default function ResearchSection() {
  const current = research.filter((r) => !r.archived);
  const archived = research.filter((r) => r.archived);

  return (
    <section id="research" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Writing</p>
          <h2 className="section-title">Research</h2>
        </header>

        <ul className="research-list">
          {current.map((paper, i) => (
            <li key={paper.id} className="research-item" data-reveal>
              <span className="research-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="research-body">
                <p className="card-meta">
                  <span className="tag">{paper.category}</span>
                  <span className="status">
                    {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                  </span>
                  {paper.updated && (
                    <span className="updated">Updated {paper.updated}</span>
                  )}
                </p>
                <h3 className="research-title">
                  {paper.url ? (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  ) : (
                    paper.title
                  )}
                </h3>
                {paper.links && paper.links.length > 0 && (
                  <ul className="extra-links">
                    {paper.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer">
                          {l.label}
                          <span className="visually-hidden">: {paper.title} (opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <details className="disclosure">
                  <summary>
                    Summary
                    <span className="visually-hidden">: {paper.title}</span>
                  </summary>
                  <p className="disclosure-body">{paper.description}</p>
                </details>
              </div>
            </li>
          ))}
        </ul>

        {archived.length > 0 && (
          <details className="disclosure archive-list">
            <summary>Earlier writing</summary>
            <ul className="disclosure-body">
              {archived.map((paper) => (
                <li key={paper.id}>
                  {paper.url ? (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  ) : (
                    paper.title
                  )}{" "}
                  <span className="updated">{archiveNote(paper.description)}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
