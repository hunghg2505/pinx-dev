import { useCallback, useRef } from 'react';

const useLoadMore = (
  data?: {
    list: any;
    hasNext: boolean;
    last: string;
  },
  loading?: boolean,
  run?: any,
) => {
  const observer: any = useRef();
  const lastElementRef = useCallback(
    (node: any) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.hasNext) {
          run(data?.list, data?.last);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, data?.hasNext],
  );
  return { lastElementRef };
};
export default useLoadMore;
