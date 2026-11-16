import { research } from "@/data/research";

export default function ResearchSection() {
  const current = research.filter((r) => !r.archived);
  const archived = research.filter((r) => r.archived);

  return (
    <section id="research">
      <span className="section-label">Research</span>
      <h2 className="section-title">
        <span className="gradient-text">Research</span>
      </h2>

      <div className="research-list">
        {current.map((paper) => (
          <div key={paper.id} className="research-item">
            <span className="research-category">{paper.category}</span>
            <div>
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
            <span className="research-status">
              {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {archived.length > 0 && (
        <details className="archive-list">
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
    </section>
  );
}
