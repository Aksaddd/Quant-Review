/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        surface: {
          0:   '#08080e',
          1:   '#0f0f1a',
          2:   '#151522',
          3:   '#1c1c2e',
          4:   '#23233a',
          5:   '#2a2a46',
        },
        /* Apple luminance scale — use for monochromatic hierarchy */
        apple: {
          50:  '#fafafa',
          100: '#f5f5f7',
          200: '#e8e8ed',
          300: '#d2d2d7',
          400: '#a1a1a6',
          500: '#86868b',
          600: '#6e6e73',
          700: '#424245',
          800: '#1d1d1f',
          900: '#000000',
        },
        /* Accent is driven by --eureka-accent at runtime via the store */
        accent: {
          DEFAULT: 'var(--eureka-accent)',
          tint:    'var(--eureka-accent-tint)',
          strong:  'var(--eureka-accent-tint-strong)',
        },
      },
      backdropBlur: {
        material: '30px',
        'material-strong': '40px',
      },
      backdropSaturate: {
        material: '180%',
      },
      backgroundColor: {
        'material-thin-light':    'rgba(255,255,255,0.72)',
        'material-regular-light': 'rgba(255,255,255,0.82)',
        'material-thin-dark':     'rgba(28,28,30,0.72)',
        'material-regular-dark':  'rgba(28,28,30,0.82)',
      },
      borderRadius: {
        hud:  '20px',
        pill: '9999px',
      },
      boxShadow: {
        hud:      '0 0 0 0.5px rgba(0,0,0,0.08), 0 10px 40px -12px rgba(0,0,0,0.25)',
        'hud-dark': '0 0 0 0.5px rgba(255,255,255,0.08), 0 10px 40px -12px rgba(0,0,0,0.6)',
      },
      transitionTimingFunction: {
        standard:   'cubic-bezier(0.22, 1, 0.36, 1)',
        emphasized: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        soft:       'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'flip-in':  'flipIn 0.35s ease-in-out',
        'flip-out': 'flipOut 0.35s ease-in-out',
        'fade-up':  'fadeUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        'shimmer':  'shimmer 1.5s infinite',
      },
      keyframes: {
        flipIn: {
          '0%':   { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)',  opacity: '1' },
        },
        flipOut: {
          '0%':   { transform: 'rotateY(0deg)',   opacity: '1' },
          '100%': { transform: 'rotateY(-90deg)', opacity: '0' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition:  '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
