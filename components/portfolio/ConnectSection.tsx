import { siteConfig } from "@/data/site";

/** Show a web address without the protocol or trailing slash. */
function display(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function ConnectSection() {
  const links = [
    { label: "Email", href: `mailto:${siteConfig.email}`, text: siteConfig.email, external: false },
    { label: "LinkedIn", href: siteConfig.social.linkedin, text: display(siteConfig.social.linkedin), external: true },
    { label: "GitHub", href: siteConfig.social.github, text: display(siteConfig.social.github), external: true },
  ];

  return (
    <section id="connect" className="section">
      <div className="container">
        <h2 className="section-title">Get in touch</h2>
        <p className="connect-intro">{siteConfig.connect.intro}</p>
        <dl className="connect-list">
          {links.map((link) => (
            <div key={link.label} className="connect-row">
              <dt className="eyebrow">{link.label}</dt>
              <dd>
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.text}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
