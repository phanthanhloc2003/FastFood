const { theme } = require('./src/styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      zIndex: theme.zIndex,
    },
  },
  plugins: [],
}

