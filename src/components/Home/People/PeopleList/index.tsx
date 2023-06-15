import React from 'react';

import Slider from 'react-slick';

import ItemPeople from '../ItemPeople';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
};
const PeopleList = () => {
  return (
    <div className='overflow-hidden'>
      <Slider {...settings} className='slide-watchlist'>
        <div>
          <ItemPeople />
        </div>
        <div>
          <ItemPeople />
        </div>
        <div>
          <ItemPeople />
        </div>
        <div>
          <ItemPeople />
        </div>
      </Slider>
    </div>
  );
};
export default PeopleList;
