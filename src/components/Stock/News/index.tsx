import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import ContentRight from '@components/Home/ContentRight';
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
    <div className='flex items-start'>
      <div className='rounded-[8px] mobile:w-[375px] tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] desktop:mr-[24px] desktop:w-[749px] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
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
      </div>

      <ContentRight />
    </div>
  );
};

export default StockNews;
