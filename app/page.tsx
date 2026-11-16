import PortfolioZone from '@/components/portfolio/PortfolioZone';

// The portfolio renders directly. The old landing gate (components/landing)
// is kept in the repo but no longer mounted, so the full page is in the
// served HTML for search engines and link previews.
export default function Home() {
  return <PortfolioZone />;
}
