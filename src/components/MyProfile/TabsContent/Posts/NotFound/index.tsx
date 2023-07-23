import React from 'react';

import { useTranslation } from 'next-i18next';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='mt-[41px]  flex w-full flex-wrap justify-between gap-[24px] rounded-[12px] bg-primary_bgblue_2 p-[24px] text-center tablet:px-0'>
      <img
        src={'/static/images/write_now.png'}
        height={433}
        width={412}
        alt="Don't have any result"
        className=' mb-[50px] w-[full]  object-contain tablet:mb-[12px] tablet:h-[240px] tablet:w-[367px]'
      />
      <div className='align-center mr-[12px] flex  w-full items-center justify-center rounded-[12px] bg-[#edf6fe] py-[44px] tablet:w-[287px]'>
        <div className='mx-auto my-auto w-fit'>
          <p className=' line-[28px]  mb-[30px]  max-w-[225px] text-[20px] font-[600]'>
            {t('post_empty')}
          </p>
          <button
            className='
              line-[18px]
          block
          w-full
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
            {t('write_now')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
