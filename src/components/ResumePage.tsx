import { ArrowLeft, Mail, Printer } from "lucide-react";
import { experiences } from "../data/experience";
import { highlights, education, languages } from "../data/highlights";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

export function ResumePage() {
  return (
    <>
      <div className="background" aria-hidden="true" />
      <main className="resume-shell">
        <header className="resume-top">
          <a href="/" className="resume-back">
            <ArrowLeft aria-hidden="true" />
            Back
          </a>
          <button type="button" className="resume-print" onClick={() => window.print()}>
            <Printer aria-hidden="true" />
            Print
          </button>
        </header>

        <article className="resume-document">
          <section className="resume-hero">
            <div>
              <p className="resume-kicker">Developer Relations / AI Infrastructure</p>
              <h1>{profile.name}</h1>
              <p>{profile.intro}</p>
            </div>
            <div className="resume-contact">
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" />
                {profile.email}
              </a>
              <a href={profile.socials.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.socials.x} target="_blank" rel="noreferrer">
                X / Agent_Crafter
              </a>
            </div>
          </section>

          <section className="resume-section">
            <h2>Selected Impact</h2>
            <div className="resume-impact-grid">
              {highlights.slice(0, 4).map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>Experience</h2>
            <div className="resume-list">
              {experiences.map((item) => (
                <section key={`${item.company}-${item.period}`} className="resume-item">
                  <div className="resume-item-head">
                    <div>
                      <h3>{item.role}</h3>
                      <p>{item.company}</p>
                    </div>
                    <time>{item.period}</time>
                  </div>
                  {item.location ? <p className="resume-location">{item.location}</p> : null}
                  <p className="resume-summary">{item.summary}</p>
                  {item.bullets ? (
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <h2>Projects</h2>
            <div className="resume-projects">
              {projects.map((project) => (
                <section key={project.name}>
                  <div>
                    <h3>{project.name}</h3>
                    <span>{project.outcome}</span>
                  </div>
                  <p>{project.description}</p>
                  <div>
                    {project.tech.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section className="resume-section resume-two-col">
            <div>
              <h2>Education</h2>
              <h3>{education.school}</h3>
              <p>
                {education.program}, {education.period}
              </p>
              <p>{education.details.join(", ")}</p>
            </div>
            <div>
              <h2>Languages</h2>
              <p>{languages.join(" / ")}</p>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
