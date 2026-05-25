import { ContributionGraph } from "./components/ContributionGraph";
import { ContactFooter } from "./components/ContactFooter";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { ResumePage } from "./components/ResumePage";
import { Section } from "./components/Section";
import { useReveal } from "./hooks/useReveal";

export function App() {
  const isResumePage = window.location.pathname === "/resume";
  useReveal();

  if (isResumePage) {
    return <ResumePage />;
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

          <Section title="Projects" id="components">
            <Projects />
          </Section>

          <Section title="Experience">
            <ExperienceTimeline />
          </Section>

          <ContactFooter />
        </section>
      </main>
    </>
  );
}
