/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4CAF50',
          dark: '#388E3C',
        },
        secondary: {
          light: '#ff5252',
          dark: '#d32f2f',
        },
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        surface: {
          light: '#f8f9fa',
          dark: '#2d2d2d',
        },
        text: {
          light: '#1a1a1a',
          dark: '#ffffff',
        }
      }
    },
  },
  plugins: [],
} 