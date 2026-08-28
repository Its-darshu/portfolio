/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5C1F',
        background: '#F5EFE3',
        gray: '#191512',
      },
      fontFamily: {
        'mono': ['"DM Mono"', 'monospace'],
        'fat': ['"Fat Molly"', '"Arial Black"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}