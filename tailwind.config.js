/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bioGreen: "#185d3e",
        bioBlue: "#569eb9",
      },
    },
  },
  plugins: [],
};
