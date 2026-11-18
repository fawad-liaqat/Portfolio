import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { cvLink } from "@/lib/cv";
import { siteConfig } from "@/data/site";

// Static 404 page (out/404.html). Uses the site header, footer and themes.
export const metadata: Metadata = {
  title: `Page not found · ${siteConfig.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="page">
      <Navbar base="/" cv={cvLink()} />
      <main id="main" className="not-found">
        <div className="container">
          <p className="eyebrow">404</p>
          <h1 className="not-found-title">This page is not here.</h1>
          <p className="not-found-text">
            The link may be old or mistyped. These are good places to start.
          </p>
          <div className="hero-ctas">
            <Link href="/" className="btn btn-primary">
              Go to the home page
            </Link>
            <Link href="/#series" className="btn btn-secondary">
              Read the series
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
