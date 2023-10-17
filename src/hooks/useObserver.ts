import { useCallback, useRef } from 'react';

const OPTIONS = {
  root: null,
  rootMargin: '350px',
  threshold: 0,
};
const useObserver = () => {
  const refObserver: any = useRef(null);

  const refLastElement = useCallback((node: any, service: any) => {
    if (!node) {
      return;
    }

    if (refObserver.current) {
      refObserver.current.disconnect();
    }

    refObserver.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        service && service();
      }
    }, OPTIONS);

    if (node) {
      refObserver.current.observe(node);
    }
  }, []);

  return {
    refLastElement,
    refObserver,
  };
};

export default useObserver;
