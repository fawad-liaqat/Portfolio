import { siteConfig } from "@/data/site";
import { cvLink } from "@/lib/cv";

/** Show a web address without the protocol or trailing slash. */
function display(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function ConnectSection() {
  const cv = cvLink();
  const links = [
    { label: "Email", href: `mailto:${siteConfig.email}`, text: siteConfig.email, external: false },
    { label: "LinkedIn", href: siteConfig.social.linkedin, text: display(siteConfig.social.linkedin), external: true },
    { label: "GitHub", href: siteConfig.social.github, text: display(siteConfig.social.github), external: true },
  ];

  return (
    <section id="connect" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Connect</p>
          <h2 className="section-title">Get in touch</h2>
        </header>
        <p className="connect-intro" data-reveal>
          {siteConfig.connect.intro}
        </p>
        <p className="connect-cv" data-reveal>
          <a className="btn btn-primary" href={cv.page}>
            View CV
          </a>
        </p>
        <ul className="connect-grid">
          {links.map((link) => (
            <li key={link.label} data-reveal>
              <a
                className="card connect-card"
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="eyebrow">{link.label}</span>
                <span className="connect-text">{link.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
