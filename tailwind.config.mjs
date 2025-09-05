/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          300: "#D1D5DB",
          800: "#1F2937",
        },
      },
      backdropBlur: {
        lg: "20px",
      },
      borderColor: {
        "white/10": "rgba(255, 255, 255, 0.1)",
        "white/20": "rgba(255, 255, 255, 0.2)",
      },
      backgroundColor: {
        "black/20": "rgba(0, 0, 0, 0.2)",
        "black/50": "rgba(0, 0, 0, 0.5)",
        "white/10": "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
