import { Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";

const navItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "gallery", label: "Projects", href: "/projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

type NavProps = {
  currentPage?: "home" | "gallery";
};

export function Nav({ currentPage = "home" }: NavProps) {
  const sectionItems = navItems.filter((item) => item.id !== "gallery");
  const activeSection = useActiveSection(sectionItems.map((item) => item.id));
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
              href={item.href}
              className={currentPage === "gallery"
                ? item.id === "gallery" ? "active" : undefined
                : activeSection === item.id ? "active" : undefined}
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
