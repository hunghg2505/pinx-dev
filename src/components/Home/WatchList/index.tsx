import React from 'react';

import Slider from 'react-slick';

import ItemStock from '../ItemStock';
import { IWatchListItem, useGetWatchList } from '../service';

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
  // socket.on('public', (message: any) => {
  //   const data = message.data;
  //   console.log('🚀 ~ file: index.tsx:21 ~ socket.on ~ data:', data);
  // });
  const { watchList } = useGetWatchList();
  const data = watchList?.[0]?.stocks;
  return (
    <div className='mt-[22px] h-[179px] min-w-[375px] overflow-hidden'>
      <Slider {...settings} className='slide-watchlist flex' variableWidth>
        {data?.map((item: IWatchListItem, index: number) => {
          return <ItemStock key={index} data={item} />;
        })}
      </Slider>
    </div>
  );
};
export default WatchList;
