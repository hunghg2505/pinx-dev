import React from 'react';

import { useTranslation } from 'next-i18next';

import { useStockNews } from '@components/Stock/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import StockNewsSkeleton from './skeleton';
import NewsItem from '../NewsItem';

const NEWS_ITEM_LIMIT = 3;

interface IStockNewsProps {
  stockCode: string;
  handleAnalyze: (infoType: string) => void;
}

const StockNews = ({ stockCode, handleAnalyze }: IStockNewsProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const { stockNews, loading } = useStockNews(stockCode);

  if (loading) {
    return <StockNewsSkeleton />;
  }

  if (!stockNews?.data.list || stockNews.data.list.length === 0) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <div className='mb-[4px]'>
        <Text type='body-20-semibold'>{t('recent_news')}</Text>
      </div>

      {stockNews?.data?.list.slice(0, NEWS_ITEM_LIMIT).map((item, index) => (
        <NewsItem key={index} data={item} />
      ))}

      {stockNews?.data?.list.length > NEWS_ITEM_LIMIT && (
        <CustomLink
          onClick={() => handleAnalyze('Stock news')}
          href={ROUTE_PATH.STOCK_NEWS(stockCode)}
        >
          <button className='mt-[12px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
            <Text type='body-14-bold' color='primary-2'>
              {t('more_news', {
                stockCode,
              })}
            </Text>
          </button>
        </CustomLink>
      )}
    </div>
  );
};

export default StockNews;
