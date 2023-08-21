/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    "./src/client/index.html",
    "./src/client/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fdf8ed',
          '100': '#f9eacc',
          '200': '#f3d494',
          '300': '#edb95c',
          '400': '#eaa540',
          '500': '#e1801f',
          '600': '#c76018',
          '700': '#a64317',
          '800': '#873519',
          '900': '#6f2c18',
          '950': '#3f1509',
          DEFAULT: '#eaa540'
        },
        background: { ...colors.neutral, DEFAULT: colors.neutral[950] },
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.drag-none': {
          '-webkit-user-drag': 'none',
          '-khtml-user-drag': 'none',
          '-moz-user-drag': 'none',
          '-o-user-drag': 'none',
          'user-drag': 'none'
        }
      });
    })
  ]
}

