"use client";

import { research } from "@/data/research";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import GradientText from "@/components/ui/GradientText";

export default function ResearchSection() {
  return (
    <section id="research">
      <RevealOnScroll>
        <span className="section-label">04 — Research</span>
        <h2 className="section-title">
          <GradientText>Research</GradientText>
        </h2>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="research-list">
          {research.map((paper) => (
            <div key={paper.id} className="research-item">
              <span className="research-category">{paper.category}</span>
              <div>
                <h3 className="research-title">
                  {paper.url ? (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
      </RevealOnScroll>
    </section>
  );
}
