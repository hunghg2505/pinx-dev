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
  plugins: [],
};
