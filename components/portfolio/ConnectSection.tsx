import { siteConfig } from "@/data/site";

export default function ConnectSection() {
  return (
    <section id="connect">
      <>
        <span className="section-label">Connect</span>
        <h2 className="section-title">
          <span className="gradient-text">Get in touch</span>
        </h2>
        <p className="connect-intro">
          {siteConfig.connect.intro}
        </p>
      </>
      <>
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
            <p className="connect-card-detail">{siteConfig.social.linkedin}</p>
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="connect-card"
          >
            <span className="connect-icon">&lt;/&gt;</span>
            <h3 className="connect-card-title">GitHub</h3>
            <p className="connect-card-detail">{siteConfig.social.github}</p>
          </a>
        </div>
      </>
    </section>
  );
}
