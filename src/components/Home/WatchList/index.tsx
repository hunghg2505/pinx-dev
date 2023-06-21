import React from 'react';

import Slider from 'react-slick';

import ItemStock from '../ItemStock';

const WatchList = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    // slidesToShow: ,
    slidesToScroll: 1,
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 1000,
  };
  return (
    <div className='mt-[22px] h-[179px] min-w-[375px] overflow-hidden'>
      <Slider {...settings} className='slide-watchlist flex' variableWidth>
        <ItemStock />
        <ItemStock />
        <ItemStock />
        <ItemStock />
        <ItemStock />
        <ItemStock />
        <ItemStock />
      </Slider>
    </div>
  );
};
export default WatchList;
