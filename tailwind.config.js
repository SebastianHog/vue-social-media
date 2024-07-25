/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      jockey: ['"Jockey One"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#13293d",
        secondary: "#2a628f",
        tertiary: "#3e92cc",
      },
    },
  },
  plugins: [],
};
