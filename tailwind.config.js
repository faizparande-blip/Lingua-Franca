/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F2A5C',
        'navy-light': '#1A3A6C',
        'navy-dark': '#0A1E42',
        cream: '#FAF6EC',
        'cream-dark': '#F0EBE0',
        'cream-300': '#E5DFD3',
        yellow: '#F5B82E',
        'yellow-light': '#FDF0D5',
        'yellow-dark': '#D9A025',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'draw': 'draw 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        draw: { '0%': { strokeDashoffset: '100' }, '100%': { strokeDashoffset: '0' } },
      },
    },
  },
  plugins: [],
}
