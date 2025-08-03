/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3c84e3',
        gradient: {
          from: '#3e51b5',
          to: '#9B51E0',
        },
      },
      fontFamily: {
        'linertinas': ['Linertinas Sans', 'sans-serif'],
        'figtree': ['Figtree', 'sans-serif'],
        'lora': ['Lora', 'serif'],
      },
      letterSpacing: {
        'breathable': '0.025em',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.line-clamp-2': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
        '.line-clamp-3': {
          'display': '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
        },
      })
    }
  ],
}