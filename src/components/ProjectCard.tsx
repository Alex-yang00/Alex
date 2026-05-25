import { Github, Globe2 } from "lucide-react";
import type { PointerEvent } from "react";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    card.style.transform = `translateY(-2px) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "";
  };

  return (
    <article className="project-card" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div className="project-meta">
        <span>{project.category}</span>
        <strong>{project.outcome}</strong>
      </div>

      <header>
        <h3>{project.name}</h3>
      </header>

      <p>{project.description}</p>

      <div className="project-tags">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className="project-links">
            {project.github ? (
              <a href={project.github} aria-label={`${project.name} GitHub`} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" />
                GitHub
              </a>
            ) : null}
            {project.website ? (
              <a href={project.website} aria-label={`${project.name} website`} target="_blank" rel="noreferrer">
                <Globe2 aria-hidden="true" />
                View
              </a>
            ) : null}
      </div>
    </article>
  );
}
