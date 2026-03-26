'use client';

import { siteConfig } from '@/data/site';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import GradientText from '@/components/ui/GradientText';

export default function ConnectSection() {
  return (
    <section id="connect">
      <RevealOnScroll>
        <span className="section-label">05 — Connect</span>
        <h2 className="section-title">
          <GradientText>Get in Touch</GradientText>
        </h2>
        <p className="connect-intro">
          Open to conversations about fintech infrastructure, emerging market systems,
          research collaboration, and opportunities where the work matters.
        </p>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="connect-grid">
          <a
            href={`mailto:${siteConfig.email}`}
            className="connect-card"
          >
            <span className="connect-icon">&#9993;</span>
            <h3 className="connect-card-title">Email</h3>
            <p className="connect-card-detail">{siteConfig.email}</p>
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="connect-card"
          >
            <span className="connect-icon">in</span>
            <h3 className="connect-card-title">LinkedIn</h3>
            <p className="connect-card-detail">linkedin.com/in/fawadliaqat</p>
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="connect-card"
          >
            <span className="connect-icon">&lt;/&gt;</span>
            <h3 className="connect-card-title">GitHub</h3>
            <p className="connect-card-detail">github.com/fawadliaqat</p>
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}
