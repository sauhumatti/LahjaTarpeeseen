/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F9F8',
          100: '#D5F0ED',
          200: '#A9E1DC',
          300: '#7ED3CA',
          400: '#52C4B9',
          500: '#0D9488',
          600: '#0B7C73',
          700: '#08655E',
          800: '#064E48',
          900: '#043733',
        },
        secondary: {
          50: '#f8fafc',
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
          950: '#020617'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'text-secondary-50',
    'text-secondary-100',
    'text-secondary-200',
    'text-secondary-300',
    'text-secondary-400',
    'text-secondary-500',
    'text-secondary-600',
    'text-secondary-700',
    'text-secondary-800',
    'text-secondary-900',
    'text-secondary-950'
  ]
}