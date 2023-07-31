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

      <div className='rounded-[8px] bg-white pb-[20px] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
        <div className='relative flex h-[46px] items-center justify-center tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9]'>
          <div className='absolute left-[16px] top-1/2 flex -translate-y-1/2 items-center justify-between tablet:left-[24px]'>
            <div
              className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
              onClick={handleBack}
            >
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

        <div className='px-[16px] tablet:px-[24px]'>
          <div className='mb-[32px] mt-[20px] grid grid-cols-1 gap-x-[15px] gap-y-[12px] tablet:grid-cols-2'>
            {stockEvents?.data.list.map((item, index) => (
              <CalendarItem key={index} data={item.post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialCalendar;
