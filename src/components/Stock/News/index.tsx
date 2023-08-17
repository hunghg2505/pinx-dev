import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import useBottomScroll from '@hooks/useBottomScroll';

import { useStockNews } from '../service';
import NewsItem from '../StockDetail/NewsItem';
import { IResponseStockNews } from '../type';

const StockNews = () => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();
  const { stockCode }: any = router.query;
  const ref = useRef(null);
  const [stockNews, setStockNews] = useState<IResponseStockNews>();

  const { loading, onGetStockNews, refreshStockNews } = useStockNews(stockCode, {
    manual: true,
    onSuccess: ({ data }: IResponseStockNews) => {
      setStockNews((prev) => ({
        data: {
          hasNext: data.hasNext,
          last: data.last,
          list: [...(prev?.data.list || []), ...data.list],
        },
      }));
    },
  });

  const handleBack = () => {
    router.back();
  };

  useBottomScroll(ref, () => {
    if (stockNews?.data.hasNext && !loading) {
      onGetStockNews(stockNews.data.last);
    }
  });

  useEffect(() => {
    onGetStockNews();
  }, []);

  return (
    <div className='p-[10px] galaxy-max:p-0 desktop:p-0'>
      <div className='box-shadow card-style'>
        <div className='relative mb-[12px] flex h-[44px] items-center justify-center tablet:mb-0 tablet:h-[48px]'>
          <div className='absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-between'>
            <div className='cursor-pointer items-center pr-[16px]' onClick={handleBack}>
              <img
                src='/static/icons/back_icon.svg'
                alt=''
                className='h-[28px] w-[28px] object-contain'
              />
            </div>
          </div>

          <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
            {t('recent_news')}
          </Text>
        </div>

        <div ref={ref}>
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
    </div>
  );
};

export default StockNews;
