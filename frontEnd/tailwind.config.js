/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'EinaBold': ['EinaBold', 'sans-serif'],
    },
    // colors: {
    //   'greenish': '#003d29'
    // },
    extend: {},
  },
  plugins: [],
}

