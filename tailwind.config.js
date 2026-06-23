/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          // 50: '#fef7ee',
          // 100: '#fdebd2',
          // 200: '#fad4a5',
          // 300: '#f6b56d',
          // 400: '#f18d33',
          // 500: '#ee6f0d',
          // 600: '#df5503',
          // 700: '#b93d04',
          // 800: '#93310b',
          // 900: '#772b0c',
          950: '#401305',
          50:  "#F5F0FF",
          100: "#EDE0FF",
          200: "#D9BFFF",
          300: "#C49DFF",
          400: "#A870F8",
          500: "#8B44EF",
          600: "#6D25D4",
          700: "#5518B0",   // primary
          800: "#3B0764",   // dark (header)
          900: "#250044",
        },
        gold: '#d4a017',
      },
    },
  },
  plugins: [],
}
