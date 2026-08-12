import { Analytics } from "@vercel/analytics/react";
import { ContributionGraph } from "./components/ContributionGraph";
import { ContactFooter } from "./components/ContactFooter";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { GalleryPage } from "./components/GalleryPage";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { ResumePage } from "./components/ResumePage";
import { Section } from "./components/Section";
import { useReveal } from "./hooks/useReveal";

export function App() {
  const isResumePage = window.location.pathname === "/resume";
  const isGalleryPage = window.location.pathname === "/gallery" || window.location.pathname === "/projects";
  useReveal();

  if (isResumePage) {
    return (
      <>
        <ResumePage />
        <Analytics />
      </>
    );
  }

  if (isGalleryPage) {
    return (
      <>
        <GalleryPage />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="background" aria-hidden="true" />

      <main>
        <section className="hero shell" id="home">
          <Hero />
          <ContributionGraph />

          <Section title="Highlights">
            <Highlights />
          </Section>

          <Section title="Experience" id="experience">
            <ExperienceTimeline />
          </Section>

          <Section title="Selected Work" id="work">
            <Projects compact />
          </Section>

          <ContactFooter />
        </section>
      </main>
      <Analytics />
    </>
  );
}
