'use client';

import { siteConfig } from '@/data/site';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import GradientText from '@/components/ui/GradientText';

export default function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about">
      <RevealOnScroll>
        <div className="about-text">
          <span className="section-label">02 — About</span>
          <h2 className="section-title">
            <GradientText>About</GradientText>
          </h2>
          <p>{about.intro}</p>
          <p>{about.market}</p>
          <p>{about.standard}</p>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="about-pillars">
          {about.pillars.map((pillar) => (
            <div key={pillar.title} className="pillar">
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
