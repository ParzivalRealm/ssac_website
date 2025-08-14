import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Enterprise SSAC Color Palette
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#4A90A4', // Steel Blue - Innovation and technology
          600: '#3a7a8c',
          700: '#2d5f6b',
          800: '#1f4449',
          900: '#102a2e',
        },
        navy: {
          50: '#f4f6f9',
          100: '#e8edf4',
          200: '#d0dce8',
          300: '#aec2d4',
          400: '#85a1bb',
          500: '#6580a2',
          600: '#516687',
          700: '#42526c',
          800: '#394759',
          900: '#1B2951', // Deep Navy - Trust and reliability
        },
        accent: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fad4b3',
          300: '#f7b985',
          400: '#f39c56',
          500: '#E67E22', // Orange - Energy and action
          600: '#c86a1a',
          700: '#a05613',
          800: '#7d420e',
          900: '#5a2f0a',
        },
        electric: {
          50: '#f0feff',
          100: '#ccfcff',
          200: '#99f7ff',
          300: '#66f0ff',
          400: '#33e8ff',
          500: '#00D4FF', // Electric Blue - Interactive elements
          600: '#00aed6',
          700: '#0088ad',
          800: '#006284',
          900: '#003c5b',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#27AE60', // Professional Green - Growth and sustainability
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        gray: {
          50: '#F8F9FA', // Light Gray
          100: '#f1f3f4',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#7F8C8D', // Medium Gray
          700: '#495057',
          800: '#343a40',
          900: '#2C3E50', // Charcoal
        },
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Open Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'electric-pulse': 'electricPulse 2s ease-in-out infinite',
        'gear-spin': 'gearSpin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        electricPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        gearSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'electric': '0 0 20px rgba(0, 212, 255, 0.3)',
        'enterprise': '0 10px 25px rgba(27, 41, 81, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config