/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7F27",
        "primary-light": "#374151",
        black: "#000000",
        white: "#FFFFFF",
        neutral: {
          50: "#F9FAFB",
          100: "#F9FAFB",
          200: "#F4F5F7",
          300: "#E5E7EB",
          400: "#D2D6DC",
          500: "#9FA6B2",
          600: "#6B7280",
          700: "#4B5563",
          800: "#374151",
          900: "#1F2937",
        },
      }
    },
  },
  plugins: [],
});
