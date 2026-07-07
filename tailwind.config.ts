import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--primary) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--background) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          foreground: "rgb(var(--background) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          foreground: "rgb(var(--background) / <alpha-value>)",
        },
        gold: "rgb(var(--primary) / <alpha-value>)",
        coral: "rgb(var(--secondary) / <alpha-value>)",
        lilac: "rgb(var(--accent) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(2%, -4%) scale(1.05)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-3%, 3%) scale(1.08)" },
        },
        aurora: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-slow": "float-slow 14s ease-in-out infinite",
        "float-slower": "float-slower 18s ease-in-out infinite",
        aurora: "aurora 12s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgb(var(--primary) / 0.35)",
        "glow-lg": "0 0 80px -12px rgb(var(--primary) / 0.4)",
        "glow-accent": "0 0 40px -8px rgb(var(--accent) / 0.4)",
        premium: "0 1px 1px rgb(0 0 0 / 0.1), 0 20px 40px -12px rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
