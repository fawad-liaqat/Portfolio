import { projects, type Project } from "@/data/projects";

/** The "Archived. Not updated since ..." note at the start of a description, if any. */
export function archiveNote(text: string): string {
  return text.match(/^Archived\.[^.]*\./)?.[0] ?? "";
}

const STATUS_LABELS: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  forthcoming: "Forthcoming",
};

/**
 * Split a summary into the text shown on the card and the rest, which goes
 * behind "Details". The card shows the first sentence, or the first two when
 * the first one is very short.
 */
function splitSummary(summary: string): [string, string] {
  const sentences = summary.match(/[^.!?]+[.!?]+(\s+|$)/g)?.map((x) => x.trim()) ?? [summary];
  const take = sentences.length > 1 && sentences[0].length < 60 ? 2 : 1;
  return [sentences.slice(0, take).join(" "), sentences.slice(take).join(" ")];
}

function ProjectCard({ project }: { project: Project }) {
  const { keyFigure } = project;
  // The featured card has room for the whole summary.
  const [lead, rest] = project.featured
    ? [project.summary, ""]
    : splitSummary(project.summary);
  return (
    <article
      id={`project-${project.id}`}
      className={project.featured ? "card project-card is-featured" : "card project-card"}
      data-theme={project.category}
      data-reveal
    >
      <p className="card-meta">
        <span className="tag">{project.category}</span>
        <span className={`status status-${project.status}`}>
          {STATUS_LABELS[project.status]}
        </span>
        {project.updated && (
          <span className="updated">Updated {project.updated}</span>
        )}
      </p>
      <h3 className="card-title">{project.title}</h3>
      <p className="card-lead">{lead}</p>
      {keyFigure && (
        <p className="key-figure">
          <span className="key-figure-value">{keyFigure.value}</span>
          <span className="key-figure-label">{keyFigure.label}</span>
          <span className="source-note">Source: {keyFigure.source}</span>
        </p>
      )}
      <details className="disclosure project-more">
        <summary>
          Details
          <span className="visually-hidden">: {project.title}</span>
        </summary>
        <div className="disclosure-body">
          {rest && <p>{rest}</p>}
          <p className="project-subtitle">{project.subtitle}</p>
          {project.description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
          <p className="source-note">Built on: {project.tech.join(", ")}</p>
        </div>
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
      {project.links && project.links.length > 0 && (
        <ul className="extra-links">
          {project.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
                <span className="visually-hidden">: {project.title} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function WorkSection() {
  const current = projects.filter((p) => !p.archived);
  // Featured projects come first.
  const ordered = [...current.filter((p) => p.featured), ...current.filter((p) => !p.featured)];
  const archived = projects.filter((p) => p.archived);

  return (
    <section id="work" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Work</p>
          <h2 className="section-title">Projects</h2>
        </header>

        <div className="project-grid">
          {ordered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {archived.length > 0 && (
          <details className="disclosure archive-list">
            <summary>Earlier work</summary>
            <ul className="disclosure-body">
              {archived.map((p) => (
                <li key={p.id}>
                  {p.demoUrl ? (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                  . {p.summary}{" "}
                  <span className="updated">{archiveNote(p.description[0])}</span>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </section>
  );
}
