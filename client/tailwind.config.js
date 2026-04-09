/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#312f2c',
          light: '#5c636d',
          dark: '#1a1917',
        },
        secondary: {
          light: '#fafafa',
          DEFAULT: '#f4f4f4',
        },
        accent: '#d4886a',
      },
    },
  },
  plugins: [],
};
