import { Github, Globe2, Play, Radio } from "lucide-react";
import type { PointerEvent } from "react";
import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

const icons = {
  github: Github,
  social: Radio,
  video: Play,
  website: Globe2,
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

      {project.links?.length ? (
        <div className="project-links">
          {project.links.map((link) => {
            const Icon = icons[link.type ?? "website"];

            return (
              <a
                key={`${project.name}-${link.href}`}
                href={link.href}
                target={link.href.startsWith("/") ? undefined : "_blank"}
                rel={link.href.startsWith("/") ? undefined : "noreferrer"}
              >
                <Icon aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </article>
  );
}
