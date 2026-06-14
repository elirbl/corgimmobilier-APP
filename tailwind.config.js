/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f8',
          100: '#d4dceb',
          200: '#a9b9d7',
          300: '#7e96c3',
          400: '#4d6aa0',
          500: '#2c4a80',
          600: '#1f3661',
          700: '#172a4d',
          800: '#101d38',
          900: '#0a1326',
          950: '#050a16',
        },
        brand: {
          50: '#fcf5ed',
          100: '#f9e8d7',
          200: '#f4d1af',
          300: '#edb882',
          400: '#e7a15a',
          500: '#e28a32',
          600: '#c9731d',
          700: '#a55e18',
          800: '#814a12',
          900: '#62380e',
        },
      },
    },
  },
  plugins: [],
}
