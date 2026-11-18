import { research } from "@/data/research";
import { workGroups } from "@/data/guide";

// Second group of the Work section: the articles. It used to be its own
// Research section; the anchor #research is kept so old links still land here.
export default function ResearchSection() {
  return (
    <div id="articles" className="work-group">
      <span id="research" className="anchor-alias" aria-hidden="true" />
      <header className="group-head" data-reveal>
        <h3 className="group-label">
          <span className="group-index" aria-hidden="true">02</span>
          {workGroups.articles.label}
        </h3>
        <p className="group-hook">{workGroups.articles.hook}</p>
      </header>

      <ul className="research-list">
        {research.map((paper, i) => (
          <li key={paper.id} className="research-item" data-reveal>
            <span className="research-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="research-body">
              <p className="card-meta">
                <span className="tag">{paper.category}</span>
                {paper.updated && (
                  <span className="updated">Updated {paper.updated}</span>
                )}
              </p>
              <h4 className="research-title">
                {paper.url ? (
                  <a href={paper.url} target="_blank" rel="noopener noreferrer">
                    {paper.title}
                  </a>
                ) : (
                  paper.title
                )}
              </h4>
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
    </div>
  );
}
