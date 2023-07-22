import { useRef } from 'react';

const useElementOnscreen = (triger = () => {}) => {
  const observer: any = useRef(null);
  const lastElementRef = (node: any) => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        triger();
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  };

  return { lastElementRef };
};
export default useElementOnscreen;
