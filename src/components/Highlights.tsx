import { highlights } from "../data/highlights";

export function Highlights() {
  return (
    <div className="highlights">
      {highlights.map((item) => (
        <article className={item.wide ? "wide" : undefined} key={item.label}>
          <p>{item.label}</p>
          <strong>{item.value}</strong>
          <span>{item.detail}</span>
        </article>
      ))}
    </div>
  );
}
