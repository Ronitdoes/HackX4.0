import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: "#FAF8F5",
          DEFAULT: "#F9F6F0",
          dark: "#EFECE6",
        },
        dark: {
          DEFAULT: "#0F0F0F",
          muted: "#666666",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        anton: ["var(--font-anton)", "sans-serif"],
      },
      height: {
        "screen-stable": "calc(var(--vh, 1vh) * 100)",
      },
      minHeight: {
        "screen-stable": "calc(var(--vh, 1vh) * 100)",
      },
      maxHeight: {
        "screen-stable": "calc(var(--vh, 1vh) * 100)",
      },
    },
  },
  plugins: [],
};
export default config;
