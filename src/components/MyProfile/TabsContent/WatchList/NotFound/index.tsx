import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { ROUTE_PATH } from '@utils/common';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='  flex w-full flex-wrap justify-center gap-[5px] rounded-[12px] bg-primary_bgblue_2  py-[24px] text-center tablet:flex-nowrap tablet:justify-between tablet:gap-[36px] tablet:p-[24px]'>
      <div className='flex-2 flex  w-full items-center tablet:mb-[12px] '>
        <img
          src={'/static/images/watchListNoutFoundFull.png'}
          alt="Don't have any result"
          className='  mb-[12px]  w-[full] object-contain tablet:mx-0 '
        />
      </div>
      <div className='align-center flex-0 mx-[24px] flex  w-full items-center justify-center rounded-[12px] bg-[#edf6fe] px-4 py-[44px] tablet:mr-0'>
        <div className='mx-auto my-auto w-fit'>
          <p className=' line-[28px]  mb-[30px]  max-w-[225px] text-[20px] font-[600]'>
            {t('watch_list_not_found')}
          </p>
          <Link
            href={ROUTE_PATH.TOP_WATCHING}
            className='
          line-[18px]
          block
          max-w-[260px]
          rounded-[8px] bg-gradient-to-l
          from-[#1D6CAB]
        to-[#589DC0]
        px-[24px]
        py-[12px]
        text-[14px]
        font-[600]
        text-white
        '
          >
            {t('explore')}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
