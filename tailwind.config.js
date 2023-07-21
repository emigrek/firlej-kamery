/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  plugins: [],
}