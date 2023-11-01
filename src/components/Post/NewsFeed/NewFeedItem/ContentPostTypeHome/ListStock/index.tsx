import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import ItemStock from './ItemStock';

// const settings = {
//   dots: false,
//   infinite: false,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   // autoplay: true,
//   // autoplaySpeed: 1000,
// };
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
            <div
              style={{
                display: 'inline-block',
              }}
            >
              <ItemStock onTrackingViewTicker={onTrackingViewTicker} data={item} />
            </div>
          </SplideSlide>
        );
      })}
    </Splide>
  );
};
export default ListStock;
