import { projects, type Project } from "@/data/projects";

const STATUS_LABELS: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  forthcoming: "Forthcoming",
};

function ProjectCard({ project }: { project: Project }) {
  const { keyFigure } = project;
  return (
    <article
      id={`project-${project.id}`}
      className={project.featured ? "project-card project-card-featured" : "project-card"}
      data-theme={project.category}
    >
      <p className="project-meta">
        <span className="tag">{project.category}</span>
        <span className="project-status">{STATUS_LABELS[project.status]}</span>
      </p>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      {keyFigure && (
        <p className="key-figure">
          <span className="key-figure-value">{keyFigure.value}</span>
          <span className="key-figure-label">{keyFigure.label}</span>
          <span className="source-note">Source: {keyFigure.source}</span>
        </p>
      )}
      <details className="disclosure project-more">
        <summary>More detail</summary>
        <p className="project-subtitle">{project.subtitle}</p>
        {project.description.map((d, i) => (
          <p key={i}>{d}</p>
        ))}
        <p className="source-note">Built on: {project.tech.join(", ")}</p>
      </details>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link project-link"
        >
          Open the tool
          <span className="visually-hidden">: {project.title} (opens in a new tab)</span>
        </a>
      )}
    </article>
  );
}

export default function WorkSection() {
  const current = projects.filter((p) => !p.archived);
  const featured = current.filter((p) => p.featured);
  const regular = current.filter((p) => !p.featured);
  const archived = projects.filter((p) => p.archived);

  return (
    <section id="work" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>

        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        <div className="project-grid">
          {regular.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {archived.length > 0 && (
          <details className="disclosure archive-list">
            <summary>Earlier work</summary>
            <ul>
              {archived.map((p) => (
                <li key={p.id}>
                  {p.demoUrl ? (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                  . {p.summary}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
