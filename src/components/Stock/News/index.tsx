import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import { useStockNews } from '../service';
import NewsItem from '../StockDetail/NewsItem';

const StockNews = () => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();
  const { stockCode }: any = router.query;

  const { stockNews, refreshStockNews } = useStockNews(stockCode);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='box-shadow card-style bg-white'>
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

      <div>
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
  );
};

export default StockNews;
