/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          pink: '#ec4899',
          orange: '#f59e42',
          green: '#22c55e',
          yellow: '#eab308',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px 0 #22d3ee',
        'neon-pink': '0 0 20px 0 #ec4899',
        'neon-orange': '0 0 20px 0 #f59e42',
        'neon-blue': '0 0 20px 0 #3b82f6',
        'neon-green': '0 0 20px 0 #22c55e',
        'neon-yellow': '0 0 20px 0 #eab308',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(90deg, #22d3ee, #ec4899, #f59e42, #3b82f6)',
      },
    },
  },
  plugins: [],
};
