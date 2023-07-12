import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import NewsItem from '../StockDetail/NewsItem';

const StockNews = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='mx-auto mobile:w-[375px]'>
      <div className='inline-block cursor-pointer items-center p-[16px]' onClick={handleBack}>
        <img
          src='/static/icons/icon_back_header.svg'
          alt=''
          className='h-[14px] w-[7px] object-contain'
        />
      </div>

      <div className='mb-[16px]'>
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem />
        <NewsItem
          className={classNames({
            'border-none': true,
          })}
        />
      </div>
    </div>
  );
};

export default StockNews;
