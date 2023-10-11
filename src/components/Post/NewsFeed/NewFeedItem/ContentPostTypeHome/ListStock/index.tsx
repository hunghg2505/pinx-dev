import React from 'react';

import Slider from 'react-slick';

import ItemStock from './ItemStock';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
};
const ListStock = ({
  listStock,
  onTrackingViewTicker,
}: {
  listStock: string[];
  onTrackingViewTicker?: (stockCode: string) => void;
}) => {
  return (
    <Slider {...settings} className='slidePostAdmin' variableWidth>
      {listStock?.map((item: string, index: number) => {
        return <ItemStock onTrackingViewTicker={onTrackingViewTicker} key={index} data={item} />;
      })}
    </Slider>
  );
};
export default ListStock;
