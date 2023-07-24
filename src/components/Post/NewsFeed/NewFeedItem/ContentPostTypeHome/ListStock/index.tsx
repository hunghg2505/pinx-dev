import React from 'react';

import Slider from 'react-slick';

import ItemStock from './ItemStock';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.8,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
};
const ListStock = ({ listStock }: { listStock: string[] }) => {
  return (
    <div className=' max-w-[680px] '>
      <Slider {...settings} className='slidePostAdmin' variableWidth>
        {listStock?.map((item: string, index: number) => {
          return <ItemStock key={index} data={item} />;
        })}
      </Slider>
    </div>
  );
};
export default ListStock;
