import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <div className="projects">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
