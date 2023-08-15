import React from 'react';

import { useTranslation } from 'next-i18next';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='width-[100%]  rounded-[12px] bg-primary_bgblue_2 p-[12px] text-center'>
      <img
        src={'/static/images/hand chat connect.png'}
        height={312}
        width={291}
        alt="Don't have any result"
        className='mx-auto mb-[12px] h-[312px] w-[291px]'
      />
      <div className='flex-col rounded-[12px] bg-[#edf6fe] py-[44px] '>
        <div className='mx-auto w-fit'>
          <p className=' mb-[20px] w-fit text-[20px] font-[600]'>{t('don’t_have_any_result')}</p>
          <button
            className='
          w-[100%]
          rounded-[8px] bg-gradient-to-l from-[#1D6CAB]
          to-[#589DC0]
        px-[24px]
        py-[12px]
        text-[16px]
        font-[700]
        text-white
        '
          >
            {t('explore')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
