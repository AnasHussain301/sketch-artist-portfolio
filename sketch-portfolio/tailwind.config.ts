import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16140F",
        "ink-soft": "#1E1B15",
        paper: "#EAE4D6",
        "paper-bright": "#F5F1E6",
        graphite: "#2B2721",
        "graphite-soft": "#6E6A5E",
        sanguine: "#B34A32",
        "sanguine-soft": "#C97056",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
