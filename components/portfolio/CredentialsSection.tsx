import { credentials } from "@/data/credentials";

export default function CredentialsSection() {
  return (
    <section id="training" className="section">
      <div className="container">
        <h2 className="section-title">Training</h2>
        <dl className="credential-list">
          {credentials.map((group) => (
            <div key={group.id} className="credential-row">
              <dt className="eyebrow">{group.label}</dt>
              <dd>
                {group.provider && (
                  <p className="credential-provider">{group.provider}</p>
                )}
                {group.items.length > 1 ? (
                  <ul className="credential-items">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{group.items[0]}</p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
