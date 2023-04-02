/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: '#e4f3f4',
        'theme-400': '#A0E7E5',
        'theme-500': '#04baba',
        sblack: '#0b0b0b',
        'sgray-100': '#f9f9f9',
        'sgray-400': '#b5b5c3',
        'sgray-500': '#5e6278',
        sgreen: '#20d489',
        sblue: '#00b2ff',
        dgray: '#f3f5f7',
        'dblue-100': '#9ca8ba',
        'dgray-200': '#f1f1f1',
        dblue: '#d6eef8',
        dyellow: '#faedcd',
        dgreen: '#c1f1e3',
        dpink: '#ffe2f0',
        dpurple: '#e8e3fe'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        loginback: "url('assets/media/loginback.png')",
        setupback: "url('assets/media/setup-bg.png')"
      }
    }
  },
  plugins: []
}
