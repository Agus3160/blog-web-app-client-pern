/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "darkBlue": {
          100: '#0e1047',
          200: '#0c0d37',
          300: '#0a0b27',
          400: '#080917',
          500: '#060707',
        },
      }
    },
  },
  plugins: [],
}