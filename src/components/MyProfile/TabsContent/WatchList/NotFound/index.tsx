import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { ROUTE_PATH } from '@utils/common';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='flex  w-full flex-wrap justify-center gap-[56px] rounded-[12px] bg-primary_bgblue_2 p-[24px] text-center tablet:gap-[72px]'>
      <img
        src={'/static/images/watchListNoutFound.png'}
        height={433}
        width={412}
        alt="Don't have any result"
        className=' mb-[12px] h-[330px] w-[full] object-contain tablet:h-[221px] tablet:w-[264px]'
      />
      <div className='align-center flex w-full  items-center justify-center rounded-[12px] bg-[#edf6fe] py-[44px] tablet:w-[287px]'>
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
