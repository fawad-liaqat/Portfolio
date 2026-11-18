import { projects, type Project } from "@/data/projects";
import { workGroups } from "@/data/guide";
import SeriesSection from "@/components/series/SeriesSection";
import ResearchSection from "./ResearchSection";

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
      <h4 className="card-title">{project.title}</h4>
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

/**
 * The Work section: one section with three groups, in this order:
 * Series (#series), Articles (#articles, also #research) and Projects
 * (#projects). Each group has a one line hook from data/guide.ts.
 */
export default function WorkSection() {
  return (
    <section id="work" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Work</p>
          <h2 className="section-title">{workGroups.title}</h2>
          <nav className="group-jump" aria-label="Parts of Work">
            <a href="#series">{workGroups.series.label}</a>
            <a href="#articles">{workGroups.articles.label}</a>
            <a href="#projects">{workGroups.projects.label}</a>
          </nav>
        </header>

        <SeriesSection />
        <ResearchSection />

        <div id="projects" className="work-group">
          <header className="group-head" data-reveal>
            <h3 className="group-label">
              <span className="group-index" aria-hidden="true">03</span>
              {workGroups.projects.label}
            </h3>
            <p className="group-hook">{workGroups.projects.hook}</p>
          </header>
          {/* Cards follow the order in data/projects.ts. */}
          <div className="project-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
