import { useResponsive } from './useResponsive';

const useSpildeOptions = () => {
  const { isMobile } = useResponsive();
  const defaultSplideOptions = {
    type: 'loop',
    perPage: 4,
    speed: 500,
    gap: '16px',
    breakpoints: {
      1024: {
        perPage: 3,
      },
      480: {
        perPage: 2,
      },
    },
    pagination: false,
    arrows: !isMobile,
  };

  const listStockSplideOptions = {
    type: 'slide',
    fixedWidth: 70,
    speed: 500,
    pagination: false,
    arrows: false,
  };

  const stockProductSplideOptions = {
    type: 'slide',
    fixedWidth: 112,
    gap: '14px',
    speed: 500,
    pagination: false,
  };

  const watchlistThemeSplideOptions = {
    type: 'loop',
    perPage: 1,
    speed: 500,
    pagination: false,
  };

  const interestWatchlistSplideOptions = {
    type: 'slide',
    gap: '16px',
    perPage: 5,
    speed: 500,
    pagination: false,
  };

  return {
    defaultSplideOptions,
    listStockSplideOptions,
    stockProductSplideOptions,
    watchlistThemeSplideOptions,
    interestWatchlistSplideOptions,
  };
};

export default useSpildeOptions;
