import { signals, signalsSource } from "@/data/signals";

export default function SignalStrip() {
  return (
    <section id="signal" aria-label="Key figures">
      {signals.map((s) => (
        <div key={s.id} className="signal-card">
          <div className="signal-value">{s.value}</div>
          <div className="signal-label">{s.label}</div>
          <div className="signal-context">{s.context}</div>
        </div>
      ))}
      <p className="signal-source">{signalsSource}</p>
    </section>
  );
}
