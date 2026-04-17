/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#fdf5f5",
          100: "#f8e8e8",
          200: "#f0caca",
          300: "#dfa0a0",
          400: "#c96d6f",
          500: "#b44d52",
          600: "#93343b",
          700: "#7c2931",
          800: "#5a1720",
          900: "#3d0c13",
        },
        gold: {
          50: "#fff9e8",
          100: "#feefbf",
          200: "#f9da73",
          300: "#e7bd3d",
          400: "#d7a828",
          500: "#b98612",
          600: "#93670d",
          700: "#6d4b09",
          800: "#4f3606",
          900: "#342202",
        },
        cream: "#f8f2e8",
        charcoal: "#1f1614",
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', "serif"],
        body: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        royal: "0 24px 60px rgba(61, 12, 19, 0.24)",
      },
      backgroundImage: {
        "royal-glow":
          "radial-gradient(circle at top, rgba(231, 189, 61, 0.35), transparent 35%), linear-gradient(135deg, rgba(61, 12, 19, 0.98), rgba(122, 41, 49, 0.92))",
      },
    },
  },
  plugins: [],
};
