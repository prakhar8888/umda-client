/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: {
          600: "#a16207",
          700: "#854d0e",
          800: "#713f12",
        },
        clay: "#e3d5ca",
        maroon: "#800000",
        indigo: "#4b0082",
      },
    },
  },
  plugins: [],
};
