import { useEffect } from 'react';

const isScrollAtBottom = () => {
  const body = document.body;
  const html = document.documentElement;

  const documentHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );

  return window.scrollY + window.innerHeight > documentHeight - 100;
};

const useBottomScroll = (onBottomScroll: () => void) => {
  const isBottom = isScrollAtBottom();

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop && isScrollAtBottom()) {
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
