import type { Config } from 'tailwindcss';

/**
 * Novus MFB design system.
 *
 * Brand tokens are derived from the official Novus MFB logo:
 *   - Primary indigo/navy: #010065 (dominant brand colour in the mark)
 *   - Accent red: #FF0000 (secondary accent in the mark)
 *   - Surface white: #FFFFFF
 *
 * All colours below are exposed as CSS variables (see src/app/globals.css) so the
 * branding can be updated centrally without touching component code.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#eef0ff',
          100: '#dfe2ff',
          200: '#c3c8ff',
          300: '#9ea5ff',
          400: '#7a7ffb',
          500: '#3d40e6',
          600: '#1a1bcc',
          700: '#010065', // primary brand (from logo)
          800: '#01004f',
          900: '#01003b',
          950: '#000028',
          DEFAULT: '#010065',
        },
        // Neutral band behind the app-download section (reference: #ededed).
        band: '#f5f6fa',
        accent: {
          DEFAULT: '#ff0000', // accent from logo
          600: '#d90000',
          700: '#b30000',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f5f6fa',
          subtle: '#eef0f6',
        },
        // Reference uses #210f60 for nav/heading text; Novus uses near-black ink.
        ink: {
          DEFAULT: '#0b0b1f',
          muted: '#4b4b63',
          subtle: '#71718a',
          brand: '#010065', // stands in for the reference's #210f60
        },
        success: '#12805c',
        warning: '#b45309',
        danger: '#b91c1c',
        border: '#e3e5ee',
        // Reference header/footer surfaces (#f4fcfa green-tinted → Novus indigo-tinted).
        'header-tint': '#eef0ff',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      height: {
        // Reference header is exactly 80px on desktop (17.78vw on mobile).
        nav: '80px',
        'nav-mobile': '17.78vw',
      },
      spacing: {
        // Reference desktop container padding: 80px.
        gutter: '80px',
        // Reference section content padding: 5.65vw.
        section: '5.65vw',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(1, 0, 101, 0.04), 0 8px 24px rgba(1, 0, 101, 0.06)',
        'card-hover': '0 4px 8px rgba(1, 0, 101, 0.06), 0 16px 40px rgba(1, 0, 101, 0.1)',
        header: '0 1px 0 rgba(1, 0, 101, 0.06)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        // Reference hero uses fadeInUp / fadeInUp-delay-250 / fadeInUp-delay-500.
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'typing-dot': {
          '0%, 60%, 100%': { opacity: '0.25', transform: 'translateY(0)' },
          '30%': { opacity: '1', transform: 'translateY(-3px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-up': 'slide-up 0.5s ease-out both',
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-up-250': 'fade-up 0.7s ease-out 0.25s both',
        'fade-up-500': 'fade-up 0.7s ease-out 0.5s both',
        'typing-dot': 'typing-dot 1.2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
