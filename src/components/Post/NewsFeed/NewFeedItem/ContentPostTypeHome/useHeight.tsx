import { useLayoutEffect, useState } from 'react';

const useHeight = (ref: React.RefObject<HTMLDivElement>) => {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);
  return height;
};

export default useHeight;
