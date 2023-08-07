import React, { useEffect, useRef, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import useBottomScroll from '@hooks/useBottomScroll';

import { useFinancialCalendar } from '../service';
import CalendarItem from '../StockDetail/CalendarItem';
import { IResponseStockEvents2 } from '../type';

const FinancialCalendar = () => {
  const ref = useRef(null);
  const [stockEvents, setStockEvents] = useState<IResponseStockEvents2>();
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();
  const { stockCode }: any = router.query;

  const { onGetFinancialCalendar, loading } = useFinancialCalendar(stockCode, {
    manual: true,
    onSuccess: ({ data }: IResponseStockEvents2) => {
      setStockEvents((prev) => ({
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
    if (stockEvents?.data.hasNext && !loading) {
      onGetFinancialCalendar(stockEvents.data.last);
    }
  });

  useEffect(() => {
    onGetFinancialCalendar();
  }, []);

  return (
    <>
      <Head>
        <title>{t('financial_calendar_title')}</title>
      </Head>

      <div className='p-[10px] desktop:p-0'>
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
              {t('financial_calendar_title')}
            </Text>
          </div>

          <div
            ref={ref}
            className='grid grid-cols-1 gap-x-[15px] gap-y-[12px] tablet:mt-[20px] tablet:grid-cols-2'
          >
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
