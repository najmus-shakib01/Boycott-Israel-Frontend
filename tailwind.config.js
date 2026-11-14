/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-d)",
          tint: "var(--primary-t)",
        },
        accent: "var(--accent)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        line: "var(--line)",
        "on-primary": "var(--on-primary)",
      },
      fontFamily: {
        sans: ["Hind Siliguri", "Inter", "system-ui", "-apple-system", "sans-serif"],
        bangla: ["Hind Siliguri", "Inter", "sans-serif"],
        arabic: ["Amiri", "Traditional Arabic", "serif"],
      },
      borderRadius: {
        sm: "var(--r-sm)",
        DEFAULT: "var(--r)",
        lg: "var(--r-lg)",
        full: "999px",
      },
      boxShadow: {
        DEFAULT: "var(--sh)",
        hover: "var(--sh-h)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};
