/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: '#fff',
      neutral_08: '#F7F6F8',
      neutral_07: '#EBEBEB',
      neutral_06: '#CCCCCC',
      neutral_05: '#B3B3B3',
      primary_bgblue_2: '#D8EBFC',
      primary_blue: '#1F6EAC',
      primary_light_blue: '#589DC0',
      primary_blue_light: '#EFF2F5',
      primary_06: '#B1D5F1',
      light_orange: '#F1BA09',
      primary_gray: '#808A9D',
      neutral_black: '#0D0D0D',
      neutral_gray: '#999999',
      blue_light: '#EEF5F9',
      dark_grey: '#474D57',
      green: '#128F63',
      orange: '#EAA100',
    },
    screens: {
      mobile: '280px',
      'galaxy-max': { max: '300px' },
      'mobile-max': { max: '480px' },

      'tablet-max': { max: '768px' },
      'laptop-max': { max: '1024px' },
      'desktop-max': { max: '1355px' },
      tablet: '769px',
      //  @media (min-width: 640px) { ... }
      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }
      desktop: '1200px',
      xdesktop: '1355px',

      // => @media (min-width: 1280px) { ... }
    },
    container: {
      center: true,
      screens: {
        mobile: '375px',
        tablet: '768px',
        laptop: '1024px',
        xl: '1200px',
        desktop: '1355px',
      },
    },
    extend: {},
  },
  plugins: [],
};
