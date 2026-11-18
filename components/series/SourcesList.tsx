import { inline, type Source } from "@/lib/series";

/**
 * Numbered sources. Each shows only its name and publisher, a link to the
 * document, and Primary or Secondary. Each entry has id="source-S1" so
 * citations on the page can link to it.
 */
export default function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <ol className="sources-list">
      {sources.map((s) => {
        // A title written as a markdown link keeps only its text here.
        const name = s.title.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
        return (
          <li key={s.id} id={`source-${s.id}`} className="source-item">
            <span className="source-id">{s.id}</span>
            <div>
              <p className="source-title">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    <span dangerouslySetInnerHTML={{ __html: inline(name) }} />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: inline(name) }} />
                )}
              </p>
              <p className="source-meta">
                <span dangerouslySetInnerHTML={{ __html: inline(s.publisher) }} />{" "}
                <span className={`evidence evidence-${s.label.toLowerCase()}`}>{s.label}</span>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
