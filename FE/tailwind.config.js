/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite', // Slower spin (2 seconds per rotation)
      },
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
