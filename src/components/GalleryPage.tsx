import { ArrowLeft, ExternalLink, Github, Play } from "lucide-react";
import { useEffect } from "react";
import { hostedEvents, launchStudioUrl, studioProjects } from "../data/gallery";
import { ContactFooter } from "./ContactFooter";
import { Nav } from "./Nav";

const linkIcons = {
  source: Github,
  video: Play,
  website: ExternalLink,
};

export function GalleryPage() {
  useEffect(() => {
    document.title = "Projects | Alex YANG";
  }, []);

  return (
    <>
      <Nav currentPage="gallery" />
      <div className="background" aria-hidden="true" />

      <main className="gallery-page shell">
        <header className="gallery-hero reveal">
          <a className="gallery-back" href="/">
            <ArrowLeft aria-hidden="true" />
            Back home
          </a>
          <p className="gallery-eyebrow">Selected work / project index</p>
          <h1>Sessions, workshops<br />and things shipped.</h1>
          <p className="gallery-intro">
            A working archive of developer sessions I have hosted or joined, alongside the
            launch pages and educational experiences built around them.
          </p>
          <div className="gallery-counts" aria-label="Gallery summary">
            <span><strong>{hostedEvents.length}</strong> recorded sessions</span>
            <span><strong>{studioProjects.length}</strong> selected projects</span>
          </div>
        </header>

        <section className="gallery-section" aria-labelledby="sessions-heading">
          <div className="gallery-section-head">
            <div>
              <p>On air</p>
              <h2 id="sessions-heading">Hosted sessions</h2>
            </div>
            <span>Watch the full recordings</span>
          </div>

          <div className="event-grid">
            {hostedEvents.map((event, index) => (
              <article className="event-card reveal" key={event.title}>
                <a
                  className="event-media"
                  href={event.links[0].href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Watch ${event.title}`}
                >
                  <img src={event.image} alt={event.imageAlt} loading={index === 0 ? "eager" : "lazy"} />
                  <span className="event-play"><Play aria-hidden="true" /></span>
                  <span className="event-number">0{index + 1}</span>
                </a>
                <div className="event-body">
                  <div className="event-meta">
                    <span>{event.category}</span>
                    <span>{event.role}</span>
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="gallery-links">
                    {event.links.map((link) => {
                      const Icon = linkIcons[link.type];
                      return (
                        <a key={link.href} href={link.href} target={link.href.startsWith("/") ? undefined : "_blank"} rel={link.href.startsWith("/") ? undefined : "noreferrer"}>
                          <Icon aria-hidden="true" />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section studio-section" aria-labelledby="studio-heading">
          <div className="gallery-section-head reveal">
            <div>
              <p>Build log</p>
              <h2 id="studio-heading">Projects &amp; launch pages</h2>
            </div>
            <a className="studio-repo" href={launchStudioUrl} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              Open source repository
            </a>
          </div>

          <div className="studio-list">
            {studioProjects.map((project) => (
              <article className="studio-item reveal" key={project.title}>
                <span className="studio-index">{project.index}</span>
                <div className="studio-copy">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span>{project.description}</span>
                </div>
                <div className="gallery-links studio-links">
                  {project.links.map((link) => {
                    const Icon = linkIcons[link.type];
                    return (
                      <a key={link.href} href={link.href} target={link.href.startsWith("/") ? undefined : "_blank"} rel={link.href.startsWith("/") ? undefined : "noreferrer"}>
                        <Icon aria-hidden="true" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <ContactFooter />
      </main>
    </>
  );
}
