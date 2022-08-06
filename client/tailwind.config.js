module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          light: '#e7eaef',
          default: '#707070',
          dark: '#333',
        },
        green: {
          light: '#3cc6b7',
          dark: '#3ba58b',
          50: '#3cc6b787',
        },
        indigo: {
          default: '#4d426d',
        },
        orange: {
          default: '#ffa338',
        },
        dark: {
          100: '#141414',
          90: '#1f1f1f',
          80: '#353535',
          75: '#4f4f4f',
          70: '#8d8d8d',
        },
        light: {
          80: '#dddddd',
          75: '#a6a6a6',
        },
      },
      fontFamily: {
        fira: ['Fira Sans, sans-serif'],
        roboto: ['Roboto, sans-serif'],
        cairo: ['cairo, sans-serif'],
        poppins: ['Poppins, sans-serif'],
        ds: ['Dancing Script, sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-hyphens')],
};
