import { guide } from "@/data/guide";

// "Where to start": four short routes into the work, under the hero.
// Content: data/guide.ts.
export default function StartGuide() {
  return (
    <section id="start" className="start" aria-labelledby="start-title">
      <div className="container">
        <p className="eyebrow start-eyebrow">{guide.eyebrow}</p>
        <h2 id="start-title" className="visually-hidden">
          {guide.title}
        </h2>
        <ol className="start-grid">
          {guide.items.map((item, i) => (
            <li key={item.id}>
              <a
                className="card start-card"
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="start-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="start-q">{item.question}</span>
                <span className={item.external ? "start-a is-external" : "start-a"}>
                  {item.action}
                  {item.external && <span className="visually-hidden"> (opens in a new tab)</span>}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
