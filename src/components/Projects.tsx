import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects({ compact = false }: { compact?: boolean }) {
  const visibleProjects = compact ? projects.filter((project) => project.featured).slice(0, 4) : projects;

  return (
    <>
    <div className={compact ? "projects projects-compact" : "projects"}>
      {visibleProjects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
    {compact ? <a className="work-index-link" href="/projects">View all projects <span aria-hidden="true">-&gt;</span></a> : null}
    </>
  );
}
