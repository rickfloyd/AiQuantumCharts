/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fluorescent-pink': '#FF0080',
        'hot-pink': '#FF1493',
        'fluorescent-blue': '#00FFFF',
        'electric-purple': '#9400D3',
        'pulsing-cyan': '#00FFFF',
        'electric-orange': '#FF4500',
        'electric-yellow': '#FFFF00',
        'neon-green': '#00FF00',
        'bright-magenta': '#FF00FF',
        'laser-red': '#FF0040',
        'plasma-blue': '#0080FF',
        'volt-green': '#40FF00',
        'deep-black': '#000000',
        'charcoal': '#1a1a1a',
        'dark-gray': '#2a2a2a',
      },
      backgroundImage: {
        'charcoal-gradient': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)',
        'fluorescent-gradient': 'linear-gradient(135deg, #FF0080 0%, #00FFFF 50%, #9400D3 100%)',
        'cyber-gradient': 'linear-gradient(135deg, #00FFFF 0%, #FF4500 50%, #FFFF00 100%)',
        'energy-wave': 'linear-gradient(45deg, #FF00FF 0%, #00FFFF 25%, #FFFF00 50%, #FF0080 75%, #00FF00 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-in',
        'bounce-glow': 'bounce-glow 1s ease-in-out infinite',
        'cyber-pulse': 'cyber-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 3px #FF1493, 0 0 6px #FF1493, 0 0 9px #FF1493',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 15px #00BFFF',
            transform: 'scale(1.02)'
          }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'bounce-glow': {
          '0%, 100%': { 
            transform: 'translateY(0)',
            boxShadow: '0 0 5px #FF1493'
          },
          '50%': { 
            transform: 'translateY(-10px)',
            boxShadow: '0 0 8px #00BFFF, 0 0 12px #00BFFF'
          }
        },
        'cyber-pulse': {
          '0%': { 
            boxShadow: '0 0 3px #00FFFF',
            borderColor: '#00FFFF'
          },
          '50%': { 
            boxShadow: '0 0 8px #FF4500, 0 0 12px #FF4500',
            borderColor: '#FF4500'
          },
          '100%': { 
            boxShadow: '0 0 3px #FFFF00',
            borderColor: '#FFFF00'
          }
        }
      },
      boxShadow: {
        'neon-pink': '0 0 6px #FF0080, 0 0 12px #FF0080, 0 0 18px #FF0080',
        'neon-blue': '0 0 6px #00FFFF, 0 0 12px #00FFFF, 0 0 18px #00FFFF',
        'neon-cyan': '0 0 6px #00FFFF, 0 0 12px #00FFFF, 0 0 18px #00FFFF',
        'neon-orange': '0 0 6px #FF4500, 0 0 12px #FF4500, 0 0 18px #FF4500',
        'neon-green': '0 0 6px #00FF00, 0 0 12px #00FF00, 0 0 18px #00FF00',
        'neon-yellow': '0 0 6px #FFFF00, 0 0 12px #FFFF00, 0 0 18px #FFFF00',
        'neon-hot-pink': '0 0 6px #FF1493, 0 0 12px #FF1493, 0 0 18px #FF1493',
        'neon-purple': '0 0 6px #9400D3, 0 0 12px #9400D3, 0 0 18px #9400D3',
        'neon-magenta': '0 0 6px #FF00FF, 0 0 12px #FF00FF, 0 0 18px #FF00FF',
      }
    },
  },
  plugins: [],
};