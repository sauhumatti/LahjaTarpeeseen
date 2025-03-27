// website/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './pages/**/*.{js,ts,jsx,tsx,mdx}', // Consider removing this line as you use the app router
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define all colors at the top level for better compatibility
        'primary-50': '#F0F9F8',
        'primary-100': '#D5F0ED',
        'primary-200': '#A9E1DC',
        'primary-300': '#7ED3CA',
        'primary-400': '#52C4B9',
        'primary-500': '#0D9488',
        'primary-600': '#0B7C73',
        'primary-700': '#08655E',
        'primary-800': '#064E48',
        'primary-900': '#043733',
        'secondary-50': '#f8fafc',
        'secondary-100': '#F8F9FA',
        'secondary-200': '#E9ECEF',
        'secondary-300': '#DEE2E6',
        'secondary-400': '#CED4DA',
        'secondary-500': '#ADB5BD',
        'secondary-600': '#6C757D',
        'secondary-700': '#495057',
        'secondary-800': '#343A40',
        'secondary-900': '#212529',
        'secondary-950': '#020617'
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