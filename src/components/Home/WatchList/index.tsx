import React from 'react';

import Image from 'next/image';
import Slider from 'react-slick';

import Text from '@components/UI/Text';

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
    <div className='mt-[22px] flex h-[179px] min-w-[375px] justify-center overflow-hidden'>
      {watchList ? (
        <div>
          <Slider {...settings} className='slide-watchlist flex' variableWidth>
            {data?.map((item: IWatchListItem, index: number) => {
              return <ItemStock key={index} data={item} />;
            })}
          </Slider>
        </div>
      ) : (
        <div className='flex h-[160px] w-[104px] flex-col items-center rounded-[12px] border-[1px] border-dashed border-[#589DC0] bg-[#FFF] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <Image
            src='/static/icons/iconAddStock.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='mb-[24px] mt-[48px] h-[38px] w-[38px]'
          />
          <Text type='body-14-bold' color='primary-1' className='text-center'>
            Add favorite stock
          </Text>
        </div>
      )}
    </div>
  );
};
export default WatchList;
