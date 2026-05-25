import { education, highlights, languages } from "../data/highlights";

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

      <article className="wide">
        <p>Education</p>
        <strong>{education.school}</strong>
        <span>
          {education.program} / {education.period}. {education.details.join(", ")}.
        </span>
      </article>

      <article className="wide">
        <p>Languages</p>
        <strong>Chinese / English / Korean</strong>
        <span>{languages.join(" | ")}</span>
      </article>
    </div>
  );
}
