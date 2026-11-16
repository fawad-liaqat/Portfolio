import { siteConfig } from "@/data/site";
import DpiStackDiagram from "./DpiStackDiagram";

// The animated NetworkCanvas is no longer mounted. It is kept in the repo
// (components/portfolio/NetworkCanvas.tsx) and replaced here by a static diagram.
export default function HeroSection() {
  const { hero } = siteConfig;
  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-lead">
            <p className="eyebrow">{siteConfig.tagline}</p>
            <h1 className="hero-headline">{hero.headline}</h1>
          </div>
          <div className="hero-body">
            <p className="hero-sub">{hero.sub}</p>
            <p className="hero-status">{hero.status}</p>
            <div className="hero-ctas">
              <a href="#work" className="btn btn-primary">
                {hero.primaryCta}
              </a>
              <a href="#research" className="btn btn-secondary">
                {hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>
        <DpiStackDiagram />
      </div>
    </section>
  );
}
