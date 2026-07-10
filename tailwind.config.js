import colors from 'tailwindcss/colors';

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
      // ── Rang tizimi ──────────────────────────────────────────────
      // brand  — asosiy brend (teal): navigatsiya, progress, asosiy tugmalar
      // ai     — faqat AI funksiyalari (AI ustoz, AI test) uchun belgi
      // xp     — XP / streak / yutuqlar (gamifikatsiya)
      // ok / danger — test natijalari va semantik holatlar
      colors: {
        'white-fixed': '#ffffff',
        'black-fixed': '#000000',
        brand: colors.teal,
        ai: colors.indigo,
        xp: colors.amber,
        ok: colors.emerald,
        danger: colors.red,
      },

      // ── Semantik yuzalar — theme.css o'zgaruvchilariga ulangan ───
      // (html.light / html.dark almashganda avtomatik moslashadi)
      backgroundColor: {
        app: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        'card-hover': 'var(--bg-card-hover)',
        elevated: 'var(--bg-elevated)',
        field: 'var(--bg-input)',
      },
      textColor: {
        main: 'var(--text-primary)',
        soft: 'var(--text-secondary)',
        faint: 'var(--text-muted)',
      },
      borderColor: {
        line: 'var(--border-color)',
        'line-light': 'var(--border-light)',
        'line-brand': 'var(--border-brand)',
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
        'shake': 'shake 0.4s ease-in-out',
        'pop': 'pop 0.35s ease-out',
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
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
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
        'card': 'var(--shadow-card)',
        'glow-brand': '0 0 20px rgba(13, 148, 136, 0.3)',
        'glow-ai': '0 0 20px rgba(99, 102, 241, 0.3)',
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
