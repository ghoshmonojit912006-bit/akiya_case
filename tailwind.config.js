/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFCFA',
          100: '#FFF9F5', // Soft cream background
          200: '#FDF0E7',
          300: '#FBE4D6',
        },
        blush: {
          50: '#FDF5F8',
          100: '#FBF0F4',
          200: '#F6DCE5', // Blush pink
          300: '#EEBACD',
          400: '#E591B0',
          500: '#D9658E',
        },
        lavender: {
          50: '#F7F5FF',
          100: '#EFEAFF',
          200: '#DCD5FF', // Lavender
          300: '#C2B5FF',
          400: '#A490FF',
        },
        pastelBlue: {
          50: '#F3F9FD',
          100: '#E4F3FB',
          200: '#D7ECF7', // Pastel blue
          300: '#B0D8EF',
        },
        charcoal: {
          900: '#29252A', // Dark charcoal typography
          800: '#3D373F',
          700: '#554E57',
          600: '#6E6671',
          500: '#8C8490',
          400: '#ADA6B1',
          300: '#D0CAD3',
          200: '#E5E1E7',
          100: '#F3F1F4',
        },
        roseGold: '#EAA9A9',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Fraunces', 'serif'],
        cursive: ['"Italiana"', '"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(41, 37, 42, 0.05)',
        'soft-hover': '0 20px 40px rgba(41, 37, 42, 0.1)',
        'card': '0 4px 20px rgba(246, 220, 229, 0.35)',
        'float': '0 15px 35px -5px rgba(220, 213, 255, 0.45)',
        'glow': '0 0 25px rgba(246, 220, 229, 0.8)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
