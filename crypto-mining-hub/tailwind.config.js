/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: '#f7931e',
        ethereum: '#627eea',
        'hot-pink': '#ff1493',
        'fluorescent-pink': '#ff69b4',
      }
    },
  },
  plugins: [],
}