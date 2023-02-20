/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#15141c',
        secondary: '#08070c',
        tertiary: '#24232b',
        accent: '#0090cc',
      },
      fontFamily: {
        jbmono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        ring: '0 0 0 4px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
