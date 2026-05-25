import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const savedTheme = window.localStorage.getItem("theme");
  return savedTheme === "light" ? "light" : "dark";
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
  };
}
