import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Mobile = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='width-[100%]  flex flex-wrap justify-center rounded-[12px] bg-primary_bgblue_2 p-[12px] text-center '>
      <img
        src={'/static/images/rocket.png'}
        height={433}
        width={412}
        alt="Don't have any result"
        className=' mb-[12px] h-[330px] w-[full] object-contain '
      />
      <div className='w-full flex-col rounded-[12px]  bg-[#edf6fe] py-[44px] '>
        <div className='mx-auto w-fit'>
          <p className=' line-[28px] mb-[20px] w-[260px]  text-[20px] font-[600] '>
            {t('start_investment')}
          </p>
          <Link
            href='https://apps.apple.com/vn/app/pinex/id1570570518'
            className='
          line-[18px]
          w-[260px]
          rounded-[8px]
          bg-gradient-to-l from-[#1D6CAB]
          to-[#589DC0]
        px-[24px]
        py-[12px]
        text-[14px]
        font-[600]
        text-white
        
        '
          >
            {t('invest_now')}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Mobile;
