import { research } from "@/data/research";

export default function ResearchSection() {
  const current = research.filter((r) => !r.archived);
  const archived = research.filter((r) => r.archived);

  return (
    <section id="research" className="section">
      <div className="container">
        <h2 className="section-title">Research</h2>

        <ul className="research-list">
          {current.map((paper) => (
            <li key={paper.id} className="research-item">
              <p className="research-meta">
                <span className="tag">{paper.category}</span>
                <span className="research-status">
                  {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                </span>
              </p>
              <div className="research-body">
                <h3 className="research-title">
                  {paper.url ? (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  ) : (
                    paper.title
                  )}
                </h3>
                <p className="research-desc">{paper.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {archived.length > 0 && (
          <details className="disclosure archive-list">
            <summary>Earlier writing</summary>
            <ul>
              {archived.map((paper) => (
                <li key={paper.id}>
                  {paper.url ? (
                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  ) : (
                    paper.title
                  )}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
