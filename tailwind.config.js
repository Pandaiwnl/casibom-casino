/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#ffd700',
        accent: '#00ff00',
        'accent-foreground': '#ffffff',
        'casino-red': '#ff0000',
        'casino-green': '#00ff00',
        'casino-orange': '#ff8c00',
        'casino-yellow': '#ffd700',
        'casino-blue': '#0066cc',
        'casino-dark-green': '#1B5E20',
        'casino-orange-dark': '#F57C00',
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

