import { siteConfig } from '@/data/site';

export default function AboutSection() {
  const { about } = siteConfig;

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About</h2>
        <div className="about-grid">
          <div className="prose">
            <p>{about.intro}</p>
            <p>{about.market}</p>
            <p>{about.standard}</p>
          </div>
          <ul className="pillar-list">
            {about.pillars.map((pillar) => (
              <li key={pillar.title} className="pillar">
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
