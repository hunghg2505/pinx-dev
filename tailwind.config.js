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
      neutral_07: '#EBEBEB',
      neutral_06: '#CCCCCC',
      primary_bgblue_2: '#D8EBFC',
      primary_blue: '#1F6EAC',
      primary_06: '#B1D5F1',
      light_orange: '#F1BA09',
      primary_gray: '#808A9D',
      neutral_black: '#0D0D0D',
    },
    screens: {
      mobile: '320px',
      'mobile-max': { max: '480px' },
      'tablet-max': { max: '768px' },
      'laptop-max': { max: '1024px' },
      'desktop-max': { max: '1366px' },
      tablet: '769px',
      //  @media (min-width: 640px) { ... }
      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }
      desktop: '1280px',
      xdesktop: '1366px',
      // => @media (min-width: 1280px) { ... }
    },
    container: {
      center: true,
      screens: {
        mobile: '375px',
        tablet: '768px',
        laptop: '1024px',
        xl: '1280px',
        desktop: '1366px',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
