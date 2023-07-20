import { useCallback, useRef } from 'react';

import { FILTER_TYPE } from './ModalFilter';

const useLoadMore = (
  filterType: any,
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
          run(filterType || filterType || FILTER_TYPE.MOST_RECENT, data?.last);
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
