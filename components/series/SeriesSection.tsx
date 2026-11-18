import { seriesParts, seriesPath, seriesTitle } from "@/data/series";
import { workGroups } from "@/data/guide";
import { isPublished } from "@/lib/series";

// First group of the Work section (id "series", so old #series links land
// here). A part links to its page once its content is in
// content/series/partN/; until then it shows as "In progress".
export default function SeriesSection() {
  return (
    <div id="series" className="work-group">
      <header className="group-head" data-reveal>
        <p className="group-label">
          <span className="group-index" aria-hidden="true">01</span>
          {workGroups.series.label}
        </p>
        <h3 className="group-title">{seriesTitle}</h3>
        <p className="group-hook">{workGroups.series.hook}</p>
      </header>
      <ol className="series-grid">
        {seriesParts.map((part) => {
          const live = isPublished(part.number);
          const body = (
            <>
              <span className="card-meta">
                <span className="series-num">Part {part.number}</span>
                {live && part.number === 1 ? (
                  <span className="status status-start">Start here</span>
                ) : (
                  <span className={live ? "status status-completed" : "status status-in-progress"}>
                    {live ? "Published" : "In progress"}
                  </span>
                )}
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
  );
}
