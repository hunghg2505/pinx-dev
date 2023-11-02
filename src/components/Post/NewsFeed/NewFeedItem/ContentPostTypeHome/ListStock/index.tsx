import React from 'react';

import dynamic from 'next/dynamic';

import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';

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
  return (
    <SplideCustomWrap
      options={{
        perPage: 5,
        pagination: false,
        arrows: false,
        gap: 10,
        breakpoints: {
          1024: {
            perPage: 3,
          },
          768: {
            perPage: 3,
          },
          480: {
            perPage: 2,
          },
        },
      }}
    >
      {listStock?.map((item: string) => {
        return (
          <SplideSlide key={`ItemInfluence-${item}`}>
            <ItemStock onTrackingViewTicker={onTrackingViewTicker} data={item} />
          </SplideSlide>
        );
      })}
    </SplideCustomWrap>
  );
};
export default ListStock;
