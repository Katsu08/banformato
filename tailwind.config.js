const { colors } = require("quasar");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        normal: '#12D1ED',
        50: '#F6FDFE',
        100: '#0D92A6',
        200: '#07545F',
        300: '#042A2F'
      },
      shadows: {
        50: '#EEF6F7',
        100: '#C1DDE2',
      },
      semitransparent: 'rgba(51,73,77,0.41)',
      transparent: 'transparent',
      gray: {
        ...colors.gray
      },
      white: {
        ...colors.white
      },
      black: {
        ...colors.black
      }
    },
    fontFamily: {
      'sans': ['Nunito'],
      'footer': ['Noto Sans']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-elevation')(['responsive']),
  ],
}
