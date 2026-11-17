import { inline, type Source } from "@/lib/series";

/** Numbered sources. Each entry has id="source-S1" so citations can link to it. */
export default function SourcesList({ sources }: { sources: Source[] }) {
  return (
    <ol className="sources-list">
      {sources.map((s) => (
        <li key={s.id} id={`source-${s.id}`} className="source-item">
          <span className="source-id">{s.id}</span>
          <div>
            <p className="source-title" dangerouslySetInnerHTML={{ __html: inline(s.title) }} />
            <p className="source-meta">
              <span dangerouslySetInnerHTML={{ __html: inline(`${s.publisher}. ${s.date}.`) }} />{" "}
              <span className={`evidence evidence-${s.label.toLowerCase()}`}>{s.label}</span>
            </p>
            <p className="source-loc">
              <span dangerouslySetInnerHTML={{ __html: inline(s.location) }} /> Accessed {s.accessed}.
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
