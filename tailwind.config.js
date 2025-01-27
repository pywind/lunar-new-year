/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tet-red': '#CC0000',
        'tet-gold': '#FFD700',
      },
    },
  },
  plugins: [],
} 