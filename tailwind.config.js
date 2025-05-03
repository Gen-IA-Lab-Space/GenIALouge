/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'carbon-black': '#121212',
        'matte-black': '#1c1c1c',
        'khaki': '#c3b091',
        'cream': '#fffdd0',
        'orange': {
          50: '#fff8f5',
          100: '#ffefea',
          200: '#ffd8cb',
          300: '#ffb79e',
          400: '#ff8a66',
          500: '#ff5722',
          600: '#ea4a19',
          700: '#c33812',
          800: '#9c2e13',
          900: '#7d2817',
          950: '#431208',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};