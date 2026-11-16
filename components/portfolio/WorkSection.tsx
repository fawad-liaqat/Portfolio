import { projects, type Project } from "@/data/projects";

function statusLabel(status: Project["status"]) {
  return status === "completed" ? "Completed" : "In progress";
}

function ProjectCard({ project }: { project: Project }) {
  const featured = Boolean(project.featured);
  return (
    <article className={featured ? "featured-card" : "project-card"}>
      <span className={featured ? "featured-badge" : "project-category"}>
        {project.category} · {statusLabel(project.status)}
      </span>
      <h3 className={featured ? "featured-title" : "project-title"}>
        {project.title}
      </h3>
      <p className={featured ? "featured-subtitle" : "project-subtitle"}>
        {project.subtitle}
      </p>
      <p className={featured ? "featured-desc" : "project-desc"}>
        {project.summary}
      </p>
      <details className="project-more">
        <summary>More detail</summary>
        {project.description.map((d, i) => (
          <p key={i} className="project-desc">
            {d}
          </p>
        ))}
        <p className="project-sources">Built on: {project.tech.join(", ")}</p>
      </details>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary project-link"
        >
          Open the tool
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
    <section id="work">
      <span className="section-label">Work</span>
      <h2 className="section-title">
        <span className="gradient-text">Projects</span>
      </h2>

      {featured.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}

      <div className="project-grid">
        {regular.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {archived.length > 0 && (
        <details className="archive-list">
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
    </section>
  );
}
