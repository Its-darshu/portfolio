/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0015FF',
        background: '#262626',
        gray: '#CDCDCD',
      },
      fontFamily: {
        'fira': ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}
