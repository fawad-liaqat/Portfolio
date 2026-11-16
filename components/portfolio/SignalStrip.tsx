import { signals, signalsSource } from "@/data/signals";

export default function SignalStrip() {
  return (
    <section id="signal" className="signals" aria-label="Key figures">
      <div className="container">
        <dl className="signal-grid">
          {signals.map((s) => (
            <div key={s.id} className="signal">
              <dt className="signal-label">{s.label}</dt>
              <dd className="signal-value">{s.value}</dd>
              <dd className="signal-context">{s.context}</dd>
            </div>
          ))}
        </dl>
        <p className="source-note">{signalsSource}</p>
      </div>
    </section>
  );
}
