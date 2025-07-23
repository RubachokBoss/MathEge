// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
