import { experiences } from "../data/experience";

export function ExperienceTimeline() {
  return (
    <ol className="timeline">
      {experiences.map((experience) => (
        <li key={`${experience.role}-${experience.period}`} className={experience.current ? "current" : undefined}>
          <div className="time-row">
            <h3>
              {experience.role} <span>&middot;</span>{" "}
              {experience.confidential ? <em>{experience.company}</em> : experience.company}
            </h3>
            <time>{experience.period}</time>
          </div>
          {experience.location ? <small>{experience.location}</small> : null}
          <p>{experience.summary}</p>
          {experience.bullets ? (
            <ul>
              {experience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
