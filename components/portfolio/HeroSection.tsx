import { siteConfig } from "@/data/site";
import DpiStackDiagram from "./DpiStackDiagram";

// The animated NetworkCanvas is no longer mounted. It is kept in the repo
// (components/portfolio/NetworkCanvas.tsx) and replaced here by the stack diagram.
export default function HeroSection() {
  const { hero } = siteConfig;
  // The second sentence of the headline carries the accent colour.
  const [first, ...rest] = hero.headline.split(". ");
  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{siteConfig.tagline}</p>
          <h1 className="hero-headline">
            {rest.length > 0 ? (
              <>
                {first}. <span className="accent-text">{rest.join(". ")}</span>
              </>
            ) : (
              hero.headline
            )}
          </h1>
          <p className="hero-sub">{hero.sub}</p>
          <p className="hero-status">
            <span className="status-dot" aria-hidden="true" />
            {hero.status}
          </p>
          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary">
              {hero.primaryCta}
            </a>
            <a href="#research" className="btn btn-secondary">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
        <DpiStackDiagram />
      </div>
    </section>
  );
}
