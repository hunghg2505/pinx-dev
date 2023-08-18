import React from 'react';

import { Skeleton } from '@components/UI/Skeleton';
import StockLoading from '@components/WatchList/ComponentWatchList/Skeleton';

import TrendingDesktopLoading from '../Trending/TrendingDesktop/Skeleton';

const ContentRightFake = () => {
  return (
    <>
      <div className='mb-[25px] min-h-[536px] w-full rounded-[8px] bg-[#fff]  px-[20px] py-[30px] '>
        <Skeleton className='mb-[25px]' round />

        <Skeleton
          rows={3}
          wrapClassName='!flex-row gap-x-[12px] mb-[20px]'
          className='!w-full'
          round
        />
        <Skeleton
          round
          rows={3}
          wrapClassName='!flex-row gap-x-[12px] mb-[40px]'
          className='!w-full'
        />

        <Skeleton height={350} className='!w-full !rounded-[9px]' />
      </div>

      <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px] '>
        <div className='mx-[20px]'>
          <StockLoading />
          <StockLoading />
          <StockLoading />
          <StockLoading />
          <StockLoading />
          <StockLoading />
        </div>
      </div>
      <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px]'>
        <div className='mx-[20px]'>
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
        </div>
      </div>
    </>
  );
};

export default ContentRightFake;
