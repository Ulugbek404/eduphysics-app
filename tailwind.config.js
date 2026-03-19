/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // class asosida dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // ── Tema ranglari ──
      colors: {
        primary: {
          50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD',
          400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8',
          800: '#1E40AF', 900: '#1E3A8A',
        },
        accent: {
          50: '#FAF5FF', 100: '#F3E8FF', 200: '#E9D5FF', 300: '#D8B4FE',
          400: '#C084FC', 500: '#A855F7', 600: '#9333EA', 700: '#7E22CE',
          800: '#6B21A8', 900: '#581C87',
        },
        // Dark tema ranglari
        'theme-dark': {
          bg: '#020617', surface: '#0f172a', card: '#1e293b',
          border: '#334155', text: '#f8fafc', muted: '#94a3b8',
        },
        // Light tema ranglari
        'theme-light': {
          bg: '#f8fafc', surface: '#ffffff', card: '#f1f5f9',
          border: '#e2e8f0', text: '#0f172a', muted: '#64748b',
        },
        // Black tema ranglari
        'theme-black': {
          bg: '#000000', surface: '#0a0a0a', card: '#141414',
          border: '#262626', text: '#ffffff', muted: '#737373',
        },
      },


      // Custom Font Family
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },

      // Custom Animations
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-border': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideInUp': 'slideInUp 0.4s ease-out',
        'slideInLeft': 'slideInLeft 0.4s ease-out',
        'slideInRight': 'slideInRight 0.4s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
      },

      // Custom Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      // Custom Spacing (8px grid)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Custom Border Radius
      borderRadius: {
        '4xl': '2rem',
      },

      // Custom Box Shadow
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
      },

      // Custom Z-Index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // Custom Transitions
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}