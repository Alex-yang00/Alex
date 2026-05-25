import { Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";

const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const activeSection = useActiveSection(navItems.map((item) => item.id));
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      const isScrolled = window.scrollY > 18;
      setScrolled(isScrolled);
      document.documentElement.dataset.scrolled = String(isScrolled);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <nav className="nav" aria-label="Primary navigation" data-scrolled={scrolled}>
      <div className="nav-fade" />
      <div className="shell nav-inner">
        <div className="links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="theme-toggle"
          type="button"
          aria-label="Toggle theme"
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <Moon aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
