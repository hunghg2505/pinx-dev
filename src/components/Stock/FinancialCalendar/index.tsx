import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import CalendarItem from '../StockDetail/CalendarItem';

const FinancialCalendar = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Financial Calendar</title>
      </Head>

      <div className='mx-auto px-[16px] mobile:w-[375px]'>
        <div className='flex items-center justify-between'>
          <div
            className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
            onClick={handleBack}
          >
            <img
              src='/static/icons/icon_back_header.svg'
              alt=''
              className='h-[14px] w-[7px] object-contain'
            />
          </div>
        </div>

        <div className='mb-[32px] mt-[20px] flex flex-col gap-y-[12px]'>
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
        </div>
      </div>
    </>
  );
};

export default FinancialCalendar;
