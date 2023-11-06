import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import useSpildeOptions from '@hooks/useSplideOptions';

import ItemStock from './ItemStock';

const ListStock = ({
  listStock,
  onTrackingViewTicker,
}: {
  listStock: string[];
  onTrackingViewTicker?: (stockCode: string) => void;
}) => {
  const { listStockSplideOptions } = useSpildeOptions();
  return (
    <Splide options={listStockSplideOptions}>
      {listStock?.map((item: string, index: number) => {
        return (
          <SplideSlide key={index}>
            <ItemStock onTrackingViewTicker={onTrackingViewTicker} data={item} />
          </SplideSlide>
        );
      })}
    </Splide>

  );
};
export default ListStock;
