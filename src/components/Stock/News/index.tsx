import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import { useStockNews } from '../service';
import NewsItem from '../StockDetail/NewsItem';

const StockNews = () => {
  const router = useRouter();
  const { stockCode }: any = router.query;

  const { stockNews, refreshStockNews } = useStockNews(stockCode);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className='relative flex h-[46px] items-center justify-center tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9]'>
        <div className='absolute left-[16px] top-1/2 flex -translate-y-1/2 items-center justify-between tablet:left-[24px]'>
          <div
            className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
            onClick={handleBack}
          >
            <img
              src='/static/icons/icon_back_header.svg'
              alt=''
              className='h-[14px] w-[7px] object-contain tablet:hidden'
            />

            <img
              src='/static/icons/iconBack.svg'
              alt=''
              className='hidden h-[19px] w-[19px] object-contain tablet:block'
            />
          </div>
        </div>

        <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
          Recent news
        </Text>
      </div>

      <div className='mb-[16px]'>
        {stockNews?.data.list.map((item, index) => (
          <NewsItem
            key={index}
            data={item}
            className={classNames({
              'border-none': index === stockNews.data.list?.length - 1,
            })}
            onRefreshNews={refreshStockNews}
          />
        ))}
      </div>
    </>
  );
};

export default StockNews;
