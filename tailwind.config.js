/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        logo: '#AC8869',
        'logo-light': '#F5E9DF',
        'logo-dark': '#7A5C3A',
      },
    },
  },
  plugins: [],
};
