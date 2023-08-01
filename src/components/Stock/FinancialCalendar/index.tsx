import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import { useFinancialCalendar } from '../service';
import CalendarItem from '../StockDetail/CalendarItem';

const FinancialCalendar = () => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();
  const { stockCode }: any = router.query;

  const { stockEvents } = useFinancialCalendar(stockCode);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{t('financial_calendar_title')}</title>
      </Head>

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
            {t('financial_calendar_title')}
          </Text>
        </div>

        <div className='grid grid-cols-1 gap-x-[15px] gap-y-[12px] tablet:mt-[20px] tablet:grid-cols-2'>
          {stockEvents?.data.list.map((item, index) => (
            <CalendarItem key={index} data={item.post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FinancialCalendar;
