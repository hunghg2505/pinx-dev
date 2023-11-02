import React from 'react';

import { useTranslation } from 'next-i18next';

import { useFinancialCalendar } from '@components/Stock/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { STOCK_EVENT } from 'src/constant/route';
import { getMoreInfoTracking } from 'src/mixpanel/mixpanel';

import StockCalendarSkeleton from './skeleton';
import CalendarItem from '../CalendarItem';

const STOCK_EVENT_ITEM_LIMIT = 4;

interface IStockCalendarProps {
  stockCode: string;
  handleAnalyze: (infoType: string) => void;
}

const StockCalendar = ({ stockCode, handleAnalyze }: IStockCalendarProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const { stockEvents, loading } = useFinancialCalendar(stockCode);

  if (loading) {
    return <StockCalendarSkeleton />;
  }

  if (!stockEvents?.data.list || !stockEvents?.data.list.length) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('financial_calendar_title')}
      </Text>

      <Text type='body-14-regular' className='mb-[12px] galaxy-max:text-[12px]'>
        {t('financial_calendar_desc')}
      </Text>

      <div className='grid grid-cols-1 gap-x-[15px] gap-y-[12px] tablet:grid-cols-2'>
        {stockEvents?.data.list.slice(0, STOCK_EVENT_ITEM_LIMIT).map((item, index) => (
          <CalendarItem key={index} data={item.post} />
        ))}
      </div>

      {stockEvents.data.list.length > STOCK_EVENT_ITEM_LIMIT && (
        <CustomLink
          onClick={() => {
            handleAnalyze('Stock events');
            getMoreInfoTracking('Stock detail screen', 'Events', 'Events of company');
          }}
          href={STOCK_EVENT(stockCode)}
        >
          <button className='mt-[16px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
            <Text type='body-14-bold' color='primary-2'>
              {t('more_events', {
                stockCode,
              })}
            </Text>
          </button>
        </CustomLink>
      )}
    </div>
  );
};

export default StockCalendar;
