import { siteConfig } from "@/data/site";
import NetworkCanvas from "./NetworkCanvas";

export default function HeroSection() {
  const { hero } = siteConfig;
  return (
    <section id="hero">
      <div className="hero-content">
        <span className="section-label">{hero.label}</span>
        <h1 className="hero-headline">
          <span className="gradient-text">{hero.headline}</span>
        </h1>
        <p className="hero-sub">{hero.sub}</p>
        <p className="hero-sub hero-status">{hero.status}</p>
        <div className="hero-ctas">
          <a href="#work" className="btn-primary">
            {hero.primaryCta}
          </a>
          <a href="#research" className="btn-secondary">
            {hero.secondaryCta}
          </a>
        </div>
      </div>
      <div className="network-canvas-container" aria-hidden="true">
        <NetworkCanvas />
      </div>
    </section>
  );
}
