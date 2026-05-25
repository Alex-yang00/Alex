import { FileText, Github, Mail } from "lucide-react";
import { profile } from "../data/profile";

export function ContactFooter() {
  return (
    <footer className="site-footer reveal" id="contact">
      <section className="work-together" aria-labelledby="work-together-title">
        <p className="eyebrow">Available for collaboration</p>
        <h2 id="work-together-title">Let's Work Together</h2>
        <p>
          Open to DevRel partnerships, AI infrastructure demos, agent tooling collaborations,
          developer education, and technical growth systems.
        </p>
        <div className="footer-actions action-rail" aria-label="Contact and profile links">
          <a href={`mailto:${profile.email}`} className="action-pill action-pill-primary">
            <Mail aria-hidden="true" />
            <span>Email</span>
            <small>{profile.email}</small>
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="action-pill action-pill-icon">
            <Github aria-hidden="true" />
          </a>
          <a href={profile.socials.x} target="_blank" rel="noreferrer" aria-label="X" className="action-pill action-pill-icon x-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.9 2h3.3l-7.3 8.3L23.4 22h-6.7l-5.2-6.8L5.4 22H2.1l7.8-8.9L1.8 2h6.9l4.7 6.2L18.9 2Z" />
            </svg>
          </a>
          <a href={profile.socials.resume} target="_blank" rel="noreferrer" className="action-pill">
            <FileText aria-hidden="true" />
            Resume
          </a>
        </div>
      </section>

      <div className="footer-bar">
        <span>© 2026 Alex YANG</span>
        <span>Developer Relations · AI Infrastructure · Agent Tooling</span>
      </div>
    </footer>
  );
}
