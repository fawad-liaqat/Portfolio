import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { CV_IMAGE, cvLink } from "@/lib/cv";
import { siteConfig } from "@/data/site";

// The CV page (/cv/). Shows the CV as an image first, so it reads on any
// phone without a PDF viewer, then offers the PDF to download.
const title = `CV · ${siteConfig.name}`;
const description =
  "One page CV: digital payments and open banking, financial inclusion, customer protection and customer experience.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cv/" },
  openGraph: { title, description, url: "/cv/", type: "profile", siteName: siteConfig.name },
};

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

function Actions({ where }: { where: "top" | "bottom" }) {
  const cv = cvLink();
  return (
    <div className={`cv-actions cv-actions-${where}`}>
      <a className="btn btn-primary cv-download" href={cv.pdf} download={cv.fileName}>
        <DownloadIcon />
        Download PDF
      </a>
      <Link className="btn btn-secondary" href="/">
        Back to the site
      </Link>
    </div>
  );
}

export default function CvPage() {
  return (
    <div className="page">
      <Navbar base="/" cv={cvLink()} current="cv" />
      <main id="main" className="cv-page">
        <div className="container">
          <header className="cv-head">
            <p className="eyebrow">
              <Link href="/">Home</Link> · CV
            </p>
            <h1 className="cv-title">CV</h1>
            <p className="cv-intro">One page. Read it here or download the PDF.</p>
            <Actions where="top" />
          </header>
          <figure className="cv-figure">
            {/* The image links to itself at full size, for zooming on a phone. */}
            <a className="cv-sheet" href={CV_IMAGE.src}>
              {/* A plain img: the site is a static export without the image optimiser. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CV_IMAGE.src}
                width={CV_IMAGE.width}
                height={CV_IMAGE.height}
                alt={CV_IMAGE.alt}
                decoding="async"
              />
            </a>
            <figcaption className="cv-zoom-hint">Tap the page to open it full size.</figcaption>
          </figure>
          <Actions where="bottom" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
