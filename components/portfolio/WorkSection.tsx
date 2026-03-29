"use client";

import { projects } from "@/data/projects";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import GradientText from "@/components/ui/GradientText";
import Pill from "@/components/ui/Pill";

function StatusDot({ status }: { status: string }) {
  const cls = status === "completed" ? "status-complete" : "status-progress";
  const label = status === "completed" ? "Completed" : "In Progress";
  return (
    <p className="project-status" style={{ marginTop: "1rem" }}>
      <span className={`status-dot ${cls}`} />
      {label}
    </p>
  );
}

function FeaturedCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <RevealOnScroll>
      <div className="featured-card">
        <span className="featured-badge">Flagship Project · In Progress</span>
        <h3 className="featured-title">{project.title}</h3>
        <p className="featured-subtitle">{project.subtitle}</p>
        {project.description.map((d, i) => (
          <p key={i} className="featured-desc">
            {d}
          </p>
        ))}
        <div className="featured-tech">
          {project.tech.map((t) => (
            <Pill key={t} label={t} />
          ))}
        </div>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            View Demo
          </a>
        )}
      </div>
    </RevealOnScroll>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <RevealOnScroll>
      <div className="project-card">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        {project.description.map((d, i) => (
          <p key={i} className="project-desc">
            {d}
          </p>
        ))}
        <div className="featured-tech">
          {project.tech.map((t) => (
            <Pill key={t} label={t} />
          ))}
        </div>
        <StatusDot status={project.status} />
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              marginTop: "0.75rem",
              display: "inline-block",
              fontSize: "0.8rem",
            }}
          >
            View Demo →
          </a>
        )}
      </div>
    </RevealOnScroll>
  );
}

export default function WorkSection() {
  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="work">
      <RevealOnScroll>
        <span className="section-label">04 — Work</span>
        <h2 className="section-title">
          <GradientText>Projects</GradientText>
        </h2>
      </RevealOnScroll>

      {featured.map((p) => (
        <FeaturedCard key={p.id} project={p} />
      ))}

      <div className="project-grid">
        {regular.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
