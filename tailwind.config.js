/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        serene: {
          900: '#0B1A3B',
          800: '#11265D',
          700: '#183F9A',
          600: '#2054CD',
          500: '#2667FF',
          400: '#457DFF',
          300: '#7AA2FF',
          200: '#A7C1FF',
          100: '#D1DFFF',
          50: '#F6F8FF',
        },
      },
    },
  },
  plugins: [],
}

