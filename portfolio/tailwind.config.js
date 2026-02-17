/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        cream: '#FAF9F7',
        ink: '#1A1A1A',
        muted: '#6B6B6B',
        accent: '#2D5BE3',
        border: '#E8E6E1',
      },
    },
  },
  plugins: [],
}