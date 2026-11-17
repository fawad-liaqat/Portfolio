import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { seriesParts, seriesPath } from "@/data/series";
import { siteConfig } from "@/data/site";
import { loadPart, publishedParts } from "@/lib/series";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import Enhancements from "@/components/portfolio/Enhancements";
import ScorecardTable from "@/components/series/ScorecardTable";
import SourcesList from "@/components/series/SourcesList";

// One static page per published part: /series/part-1/ and so on.
// Parts without content are not built; they show as "In progress" cards.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedParts().map((p) => ({ part: `part-${p.number}` }));
}

function partNumber(param: string) {
  const m = param.match(/^part-(\d+)$/);
  return m ? Number(m[1]) : NaN;
}

type Props = { params: Promise<{ part: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const part = loadPart(partNumber((await params).part));
  if (!part) return {};
  const title = `Part ${part.meta.number}: ${part.title} · ${siteConfig.name}`;
  const description = part.meta.finding ?? part.meta.scope;
  return {
    title,
    description,
    alternates: { canonical: seriesPath(part.meta.number) },
    openGraph: { title, description, url: seriesPath(part.meta.number), type: "article" },
    twitter: { title, description },
  };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export default async function SeriesPartPage({ params }: Props) {
  const part = loadPart(partNumber((await params).part));
  if (!part) notFound();
  const n = part.meta.number;
  const total = seriesParts.length;
  const prev = seriesParts.find((p) => p.number === n - 1);
  const next = seriesParts.find((p) => p.number === n + 1);
  const live = new Set(publishedParts().map((p) => p.number));

  return (
    <div className="page">
      <Navbar base="/" />
      <main id="main" className="series-page">
        <header className="series-hero">
          <div className="container">
            <p className="eyebrow">
              <Link href="/#series">Series</Link> · Part {n} of {total}
            </p>
            <h1 className="series-title">{part.title}</h1>
            {part.meta.finding && <p className="series-finding">{part.meta.finding}</p>}
            {part.scorecard?.asOf && (
              <p className="source-note">Evidence as of {formatDate(part.scorecard.asOf)}</p>
            )}
            <nav className="series-toc" aria-label="On this page">
              <a href="#explainer">In plain words</a>
              {part.scorecard && <a href="#scorecard">Scorecard</a>}
              <a href="#brief">Full brief</a>
              <a href="#sources">Sources</a>
            </nav>
          </div>
        </header>

        <section id="explainer" className="section series-block">
          <div className="container">
            <h2 className="section-title">In plain words</h2>
            <div className="prose md" dangerouslySetInnerHTML={{ __html: part.explainerHtml }} />
          </div>
        </section>

        {part.scorecard && (
          <section id="scorecard" className="section series-block">
            <div className="container">
              <h2 className="section-title">Scorecard</h2>
              <ScorecardTable data={part.scorecard} />
            </div>
          </section>
        )}

        <section id="brief" className="section series-block">
          <div className="container">
            <h2 className="section-title">Full brief</h2>
            <details className="disclosure brief-disclosure">
              <summary>Read the full brief</summary>
              <div className="disclosure-body prose md" dangerouslySetInnerHTML={{ __html: part.briefHtml }} />
            </details>
          </div>
        </section>

        <section id="sources" className="section series-block">
          <div className="container">
            <h2 className="section-title">Sources</h2>
            <SourcesList sources={part.sources} />
            {part.sourceNotesHtml && (
              <details className="disclosure">
                <summary>Notes on the sources</summary>
                <div className="disclosure-body prose md" dangerouslySetInnerHTML={{ __html: part.sourceNotesHtml }} />
              </details>
            )}
          </div>
        </section>

        <nav className="section series-pager" aria-label="Series">
          <div className="container series-pager-inner">
            {prev ? (
              live.has(prev.number) ? (
                <a className="card pager-link" href={seriesPath(prev.number)}>
                  <span className="eyebrow">Previous</span>
                  <span>Part {prev.number}: {prev.title}</span>
                </a>
              ) : (
                <span />
              )
            ) : (
              <Link className="card pager-link" href="/#series">
                <span className="eyebrow">Back</span>
                <span>All parts of the series</span>
              </Link>
            )}
            {next && (
              live.has(next.number) ? (
                <a className="card pager-link pager-next" href={seriesPath(next.number)}>
                  <span className="eyebrow">Next</span>
                  <span>Part {next.number}: {next.title}</span>
                </a>
              ) : (
                <div className="card pager-link pager-next is-pending">
                  <span className="eyebrow">Next, in progress</span>
                  <span>Part {next.number}: {next.title}</span>
                </div>
              )
            )}
          </div>
        </nav>
      </main>
      <Footer />
      <Enhancements />
    </div>
  );
}
