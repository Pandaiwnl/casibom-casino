/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0a0a',
        secondary: '#ffd700',
        accent: '#00ff00',
        'accent-foreground': '#ffffff',
        'casino-red': '#ff4444',
        'casino-green': '#00cc44',
        'casino-orange': '#ff9500',
        'casino-yellow': '#ffd700',
        'casino-blue': '#0088ff',
        'casino-dark-green': '#00aa33',
        'casino-orange-dark': '#ff7700',
        'casino-bright-green': '#00ff66',
        'casino-gold': '#ffcc00',
        'casino-silver': '#c0c0c0',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'blink': 'blink 4s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' },
        }
      }
    },
  },
  plugins: [],
}

