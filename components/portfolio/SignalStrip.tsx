import { signals, signalsSource } from "@/data/signals";

export default function SignalStrip() {
  return (
    <section id="signal" className="signals" aria-label="Key figures">
      <div className="container">
        <dl className="signal-grid">
          {signals.map((s) => (
            <div key={s.id} className="signal">
              <dt className="signal-label">{s.label}</dt>
              {/* The final value is in the HTML. Enhancements.tsx counts up to it. */}
              <dd className="signal-value" data-countup>
                {s.value}
              </dd>
              <dd className="signal-context">{s.context}</dd>
            </div>
          ))}
        </dl>
        <p className="source-note">{signalsSource}</p>
      </div>
    </section>
  );
}
