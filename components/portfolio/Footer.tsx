import { siteConfig } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-links">
          <a href={`mailto:${siteConfig.email}`}>Email</a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <span className="footer-copy">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
