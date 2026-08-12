import { FileText, Github, Images, Mail } from "lucide-react";
import { profile } from "../data/profile";

export function Hero() {
  return (
    <>
      <div className="identity reveal">
        <img src={profile.avatar} alt={profile.name} className="avatar" />
        <div>
          <h1>{profile.name}</h1>
          <div className="role" aria-live="polite">
            {profile.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="intro reveal">
        {profile.intro}
      </p>

      <div className="action-rail reveal" id="about" aria-label="Contact and profile links">
        <a href={`mailto:${profile.email}`} className="action-pill action-pill-primary">
          <Mail aria-hidden="true" />
          <span>Email</span>
          <small>{profile.email}</small>
        </a>
        <a href={profile.socials.github} aria-label="GitHub" target="_blank" rel="noreferrer" className="action-pill action-pill-icon">
          <Github aria-hidden="true" />
        </a>
        <a href={profile.socials.x} aria-label="X" target="_blank" rel="noreferrer" className="action-pill action-pill-icon x-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.9 2h3.3l-7.3 8.3L23.4 22h-6.7l-5.2-6.8L5.4 22H2.1l7.8-8.9L1.8 2h6.9l4.7 6.2L18.9 2Z" />
          </svg>
        </a>
        <a href={profile.socials.resume} aria-label="Resume" target="_blank" rel="noreferrer" className="action-pill">
          <FileText aria-hidden="true" />
          Resume
        </a>
        <a href="/projects" className="action-pill">
          <Images aria-hidden="true" />
          Projects
        </a>
      </div>
    </>
  );
}
