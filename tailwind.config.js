/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': {
          50: '#f5f7fa',
          100: '#eaeff4',
          200: '#cbd7e4',
          300: '#9cb5cf',
          400: '#678db3',
          500: '#43709b',
          600: '#325881',
          700: '#284668',
          800: '#233d59',
          900: '#1f4265',
          950: '#152435',
        },
        gold: {
          50: '#FFFDF5',
          100: '#F5E6C8',
          200: '#EDDA9E',
          300: '#E8C874',
          400: '#D4A437',
          500: '#C9A84C',
          600: '#B8963E',
          700: '#96701F',
          800: '#745715',
          900: '#5C450F',
        },
        sand: {
          50: '#fbfaf9',
          100: '#f4ece3',
          200: '#e8d6c4',
          300: '#d7bc9f',
          400: '#c39d75',
          500: '#b48356',
          600: '#a8714b',
          700: '#8c593f',
          800: '#734a36',
          900: '#5e3e2f',
          950: '#322018',
        },

      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        'cinzel-decorative': ['Cinzel Decorative', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'slide-left': 'slideLeft 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(201, 168, 76, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.6), 0 0 40px rgba(201, 168, 76, 0.3)' },
        },
        pulseGold: {
          '0%, 100%': { borderColor: 'rgba(201, 168, 76, 0.3)' },
          '50%': { borderColor: 'rgba(201, 168, 76, 0.8)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #C9A84C 0%, #F5E6C8 50%, #C9A84C 100%)',
        'gradient-royal': 'linear-gradient(135deg, #fbfaf9 0%, #f4ece3 50%, #e8d6c4 100%)',
        'gradient-dark': 'linear-gradient(180deg, #fbfaf9 0%, #e8d6c4 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 168, 76, 0.2)',
        'gold-lg': '0 10px 40px rgba(201, 168, 76, 0.25)',
        'royal': '0 4px 20px rgba(168, 142, 104, 0.15)',
        'inner-gold': 'inset 0 0 30px rgba(201, 168, 76, 0.08)',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
}
