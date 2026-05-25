import { highlights } from "../data/highlights";

export function Highlights() {
  return (
    <div className="highlights">
      {highlights.map((item) => (
        <article key={item.label}>
          <p>{item.label}</p>
          <strong>{item.value}</strong>
          <span>{item.detail}</span>
        </article>
      ))}
    </div>
  );
}
