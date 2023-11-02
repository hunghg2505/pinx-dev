import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import dynamic from 'next/dynamic';

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
    <Splide
      options={{
        perPage: 3,
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
    </Splide>
  );
};
export default ListStock;
