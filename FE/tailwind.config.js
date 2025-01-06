/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: "#5C3D2E",
        cream: "#F9F3EC",
        brown: "#38221A",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
