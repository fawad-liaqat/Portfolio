import { siteConfig } from '@/data/site';

export default function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Approach</p>
          <h2 className="section-title">About</h2>
        </header>
        <ul className="pillar-grid">
          {about.pillars.map((pillar, i) => (
            <li key={pillar.title} className="card pillar" data-reveal>
              <span className="pillar-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </li>
          ))}
        </ul>
        <details className="disclosure about-more">
          <summary>Read more</summary>
          <div className="disclosure-body prose">
            <p>{about.intro}</p>
            <p>{about.market}</p>
            <p>{about.standard}</p>
          </div>
        </details>
      </div>
    </section>
  );
}
