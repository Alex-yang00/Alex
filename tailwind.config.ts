import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        geist: ["GeistSans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        page: "var(--bg)",
        ink: "var(--fg)",
        soft: "var(--soft)",
        muted: "var(--muted)",
        line: "var(--line)",
      },
    },
  },
  plugins: [],
} satisfies Config;
