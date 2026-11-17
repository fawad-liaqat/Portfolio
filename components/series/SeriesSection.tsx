import { seriesIntro, seriesParts, seriesPath, seriesTitle } from "@/data/series";
import { isPublished } from "@/lib/series";

// Homepage section. A part links to its page once its content is in
// content/series/partN/; until then it shows as "In progress".
export default function SeriesSection() {
  return (
    <section id="series" className="section">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Series</p>
          <h2 className="section-title">{seriesTitle}</h2>
          <p className="section-intro">{seriesIntro}</p>
        </header>
        <ol className="series-grid">
          {seriesParts.map((part) => {
            const live = isPublished(part.number);
            const body = (
              <>
                <span className="card-meta">
                  <span className="series-num">Part {part.number}</span>
                  <span className={live ? "status status-completed" : "status status-in-progress"}>
                    {live ? "Published" : "In progress"}
                  </span>
                </span>
                <span className="card-title">{part.title}</span>
                <span className="series-text">
                  {live && part.finding ? part.finding : part.scope}
                </span>
                {live && <span className="series-cta">Read Part {part.number}</span>}
              </>
            );
            return (
              <li key={part.number} data-reveal>
                {live ? (
                  <a className="card series-card is-live" href={seriesPath(part.number)}>
                    {body}
                  </a>
                ) : (
                  <div className="card series-card is-pending">{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
