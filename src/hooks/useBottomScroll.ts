import { RefObject, useEffect, useState } from 'react';

const useBottomScroll = (ref: RefObject<any>, onBottomScroll: () => void) => {
  const [isBottom, setIsBottom] = useState(false);

  const isScrollAtBottom = () => {
    const domRect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - domRect.bottom;

    return spaceBelow < 500 && spaceBelow >= 0;
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop && isScrollAtBottom()) {
        setIsBottom(true);
        onBottomScroll();
      }

      lastScrollTop = st <= 0 ? 0 : st;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onBottomScroll]);

  return isBottom;
};

export default useBottomScroll;
