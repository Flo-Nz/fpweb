import { heroui } from "@heroui/react";

export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      defaultTheme: "light",
      themes: {
        dark: {
          colors: {
            background: "#262626",
            foreground: "white",
          },
        },
        light: {
          colors: {
            background: "#262626",
            foreground: "#262626",
            primary: {
              foreground: "#e5e5e5",
              DEFAULT: "#e5e5e5",
            },
            secondary: {
              foreground: "#ffffff",
              DEFAULT: "#191815",
            },
            content1: "#e5e5e5",
          },
        },
      },
    }),
  ],
};
