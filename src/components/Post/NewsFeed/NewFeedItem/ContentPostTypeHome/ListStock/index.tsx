import React from 'react';

import dynamic from 'next/dynamic';

import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';
import useSpildeOptions from '@hooks/useSplideOptions';

const ItemStock = dynamic(() => import('./ItemStock'), {
  ssr: false,
});

const ListStock = ({
  listStock,
  onTrackingViewTicker,
}: {
  listStock: string[];
  onTrackingViewTicker?: (stockCode: string) => void;
}) => {
  const { listStockSplideOptions } = useSpildeOptions();
  return (
    <SplideCustomWrap options={listStockSplideOptions}>
      {listStock?.map((item: string, index: number) => {
        return (
          <SplideSlide key={index}>
            <ItemStock onTrackingViewTicker={onTrackingViewTicker} data={item} />
          </SplideSlide>
        );
      })}
    </SplideCustomWrap>
  );
};
export default ListStock;
