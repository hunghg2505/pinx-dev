import { useState, useEffect } from 'react';

import { useRouter } from 'next/router';

const OPTIONS = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0,
};

const useIsVisible = (elementRef: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(elementRef.current);
          }
        }
      }, OPTIONS);
      observer.observe(elementRef.current);
    }
  }, [elementRef, router.pathname]);

  return isVisible;
};

export default useIsVisible;
