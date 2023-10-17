import { useState, useEffect } from 'react';

const OPTIONS = {
  root: null,
  rootMargin: '10px',
  threshold: 0,
};

const useIsVisible = (elementRef: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (elementRef?.current && typeof window !== 'undefined') {
      const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(elementRef.current);
          }
        }
      }, OPTIONS);

      if (observer.observe) {
        observer.observe(elementRef.current);
      }
    }
  }, [elementRef]);

  return isVisible;
};

export default useIsVisible;
