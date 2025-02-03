/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3D55DD",
        secondary: "#C6C6C6",
        light: "#F0F5FF",
        info: "#F6F6F6",
      },
    },
  },
  plugins: [],
};
